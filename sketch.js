/**
 * @file sketch.js
 * @author humanbydefinition (on github | instagram)
 * @date 05/2024
 *
 * @repository https://github.com/humanbydefinition/p5js-ascii-renderer
 *
 * @brief This is the main entry point for the p5.js ascii renderer using a glsl fragment shader.
 * 
 * It includes the setup and draw functions, which are the main entry points for p5.js. 
 * It also includes the logic for handling key press events, resizing the window, and preloading necessary assets.
 * 
 * The ascii renderer uses a shader to convert a 3D scene into an ascii grid. The scene is rendered to a
 * graphic buffer, which is then passed to the shader. The shader uses a character set texture to map
 * the brightness of the scene to ASCII characters.
 * 
 * The project also includes a UI for adjusting parameters during run-time. This is done
 * using the Tweakpane library. The UI can be toggled on and off using the tilde (~) key.
 * 
 * The project also supports recording the output to a video file. This is done using the p5.Capture library.
 * 
 * NOTE: This project is not optimized for mobile devices and may not work as expected on such devices. 
 *       During my testing, I noticed that the graphic isn't centered properly.
 */

// Default parameters for the sketch on startup
const PARAMS = {
  desiredFrameRate: 60,

  asciiFontSize: 8,

  gridCellCountX: 0, // Those values will be updated in the setup function, but also in the windowResized function. Can also be updated during runtime.
  gridCellCountY: 0,

  asciiShaderActive: true,

  asciiFont: "UrsaFont",
  asciiCharacterSet: "0123456789",
  asciiInvertCharacters: false,

  asciiCharacterColorMode: 0, // 0: sampled, 1: fixed
  asciiBackgroundColorMode: 1,

  asciiCharacterColor: "#ffffff",
  asciiBackgroundColor: "#000000",

  recordingType: "webm",
  recordingActive: false,
  recordingElapsedTime: "00:00:00.0",

  fontFileInput: "",
  fontObject: ""
};

// Set the default options for P5.Capture
P5Capture.setDefaultOptions({
  disableUi: false,
  quality: 1,
  framerate: 60,
  verbose: true,
});

// Other global objects, which are used across this project, just like PARAMS
let characterSet; // The character set object, contains the texture of the characters to be used in the shader

let asciiShader; // The shader object, used to render the ASCII grid

let grid; // The grid object, used for calculating the grid dimensions, which are passed to the shader

let overlay; // The overlay object, used for rendering the Tweakpane UI

// The capturer object, used for recording the canvas using p5.Capture
let capturer;
let recordingStartTime = 0;

let font;

let frameBuffer; // The frame buffer, used for rendering the ASCII grid

/**
 * Preloads the necessary assets for the sketch.
 * @function preload
 * @global
 * @returns {void}
 */
function preload() {
  asciiShader = loadShader("shaders/ascii/shader.vert", "shaders/ascii/shader.frag"); // Load the ASCII shader

  font = loadFont("assets/fonts/UrsaFont.ttf"); // Load the default font
}

/**
 * Sets up the sketch.
 * @function setup
 * @global
 * @returns {void}
 */
function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL); // Create a canvas with WEBGL mode to make use of shaders
  pixelDensity(1); // Set the pixel density to 1 so it works equally on all screens

  frameBuffer = createFramebuffer({ format: FLOAT }); // Create a frame buffer for rendering the ASCII grid

  characterSet = new CharacterSet({ font: font, fontSize: PARAMS.asciiFontSize, characters: PARAMS.asciiCharacterSet });
  grid = new Grid({ cellWidth: characterSet.maxGlyphDimensions.width, cellHeight: characterSet.maxGlyphDimensions.height });

  PARAMS.gridCellCountX = grid.cols; // Update the PARAMS with the calculated grid dimensions
  PARAMS.gridCellCountY = grid.rows;

  overlay = new Overlay(); // Initialize the overlay and the capturer
}

/**
 * The draw function is called continuously by p5.js and is used to update and render the canvas.
 * @function draw
 * @global
 * @returns {void}
 */
function draw() {
  overlay.generalView.fps_graph.begin(); // Wrap the draw function with the FPS graph to determine the frame rate

  /**
   * Your creative code goes here to replace the following code, drawing to the graphic buffer.
   * Currently, the code draws a Tim Rodenbroeker-esque rotating 3D box to the graphic buffer.
   * Check out his courses on creative coding at https://timrodenbroeker.de/
   */
  frameBuffer.begin();

  noStroke();
  background(0);
  fill(255);
  rotateX(radians(frameCount * 3));
  rotateZ(radians(frameCount));
  directionalLight(255, 255, 255, 0, 0, -1);
  box(500, 50, 50);

  frameBuffer.end();

  asciiShader.setUniform("u_characterTexture", characterSet.texture);
  asciiShader.setUniform("u_simulationTexture", frameBuffer);
  asciiShader.setUniform("u_charsetCols", characterSet.charsetCols);
  asciiShader.setUniform("u_charsetRows", characterSet.charsetRows);
  asciiShader.setUniform("u_totalChars", characterSet.characters.length);
  asciiShader.setUniform("u_gridOffsetDimensions", [grid.offsetX, grid.offsetY]);
  asciiShader.setUniform("u_gridPixelDimensions", [grid.width, grid.height]);
  asciiShader.setUniform("u_gridDimensions", [grid.cols, grid.rows]);
  asciiShader.setUniform("u_characterColor", ColorTranslator.hexToShaderColor(PARAMS.asciiCharacterColor));
  asciiShader.setUniform("u_characterColorMode", PARAMS.asciiCharacterColorMode);
  asciiShader.setUniform("u_backgroundColor", ColorTranslator.hexToShaderColor(PARAMS.asciiBackgroundColor));
  asciiShader.setUniform("u_backgroundColorMode", PARAMS.asciiBackgroundColorMode);
  asciiShader.setUniform("u_invertMode", PARAMS.asciiInvertCharacters);

  if (PARAMS.asciiShaderActive) { // If the ASCII shader is active, apply it to the frame buffer
    frameBuffer.begin();

    shader(asciiShader);
    rect(0, 0, windowWidth, windowHeight);

    frameBuffer.end();
  }

  image(frameBuffer, -windowWidth / 2, -windowHeight / 2); // Draw the frame buffer to the canvas

  if (PARAMS.recordingActive) { // If recording is active, update the elapsed time
    const captureTimerElement = document.querySelector('.p5c-counter');  // Get the capture timer element
    PARAMS.recordingElapsedTime = captureTimerElement.innerText;
  } else {
    PARAMS.recordingElapsedTime = '0:00:00.0'; // Reset the elapsed time when not recording
  }

  overlay.generalView.fps_graph.end();
}

/**
 * Resizes the canvas when the window is resized.
 * @function windowResized
 * @global
 * @returns {void}
 */
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  grid.windowResized()
  PARAMS.gridCellCountX = grid.cols;
  PARAMS.gridCellCountY = grid.rows;

  overlay.shadersView.initializeGridDimensionsFolder(); // Reinitalize the grid dimensions folder in the Tweakpane with the grid dimensions
}

/**
 * Event handler for key press events.
 * @function keyPressed
 * @global
 * @returns {void}
 */
function keyPressed() {
  if (key === "~") {
    // Hide the tweakpane based on its current state
    if (overlay.pane.element.style.display === "none") {
      overlay.pane.element.style.display = "block";
    } else {
      overlay.pane.element.style.display = "none";
    }
  }
}


