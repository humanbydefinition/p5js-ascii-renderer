/**
 * Represents a controller for managing the ascii shader and the grid in the UI.
 * @class
 */
class AsciiController {
    /**
     * Represents a ShadersController.
     * @param {AsciiView} shadersView - The ShadersView instance.
     */
    constructor(shadersView) {
        this.shadersView = shadersView;

        this.bindEvents();
    }

    /**
     * Binds events to corresponding methods in the shaders controller.
     * @returns {void}
     */
    bindEvents() {
        const events = ['setGridDimensions', 'toggleAsciiShader', 'setFontSize', 'setCharacters', 'updateFont'];

        events.forEach(event => {
            this.shadersView.on(event, this[event].bind(this));
        });
    }

    /**
     * Updates the font used for rendering the ASCII shader.
     * @param {*} param0 
     * @returns 
     */
    updateFont({ fontFileInput }) {
        if (fontFileInput === null) return;

        let reader = new FileReader();
        reader.onload = function (e) {
            let fontData = e.target.result;

            // Load the font data as bytes
            let blob = new Blob([new Uint8Array(fontData)], { type: 'application/octet-stream' });
            let url = URL.createObjectURL(blob);

            // Load the font using p5.js loadFont method
            loadFont(url, (font) => {
                PARAMS.fontObject = font;

                characterSet.setFontObject(PARAMS.fontObject); // Set the font object in the character set

                grid.resizeCellDimensions(characterSet.maxGlyphDimensions.width, characterSet.maxGlyphDimensions.height); // Resize the grid cell dimensions

                PARAMS.gridCellCountX = grid.cols; // Update the PARAMS with the new grid dimensions
                PARAMS.gridCellCountY = grid.rows;

                overlay.shadersView.initializeGridDimensionsFolder(); // Reinitialize the grid dimensions folder in the UI
            });
        };
        reader.readAsArrayBuffer(fontFileInput);
    }

    /**
     * Sets the characters used for rendering.
     * @param {string[]} characters - An array of characters to be used for rendering.
     */
    setCharacters({ characters }) {
        characterSet.setCharacterSet(characters);
    }

    /**
     * Sets the dimensions of the grid.
     * @returns {void}
     */
    setGridDimensions() {
        grid.resizeGridCellDimensions(PARAMS.gridCellCountX, PARAMS.gridCellCountY);
    }

    /**
     * Sets the font size for the ASCII renderer.
     * @param {number} fontSize - The desired font size.
     */
    setFontSize(fontSize) {
        characterSet.setFontSize(fontSize); // Set the font size in the character set

        grid.resizeCellDimensions(characterSet.maxGlyphDimensions.width, characterSet.maxGlyphDimensions.height); // Resize the grid cell dimensions

        PARAMS.gridCellCountX = grid.cols; // Update the PARAMS with the new grid dimensions
        PARAMS.gridCellCountY = grid.rows;

        this.shadersView.initializeGridDimensionsFolder(); // Reinitialize the grid dimensions folder in the UI
    }

    /**
     * Toggles the ASCII shader.
     * @param {boolean} active - Indicates whether the shader should be active or not.
     */
    toggleAsciiShader({ active }) {
        if (!active) {
            resetShader();
        }
    }
}