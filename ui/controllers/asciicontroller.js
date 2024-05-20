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
        const events = ['setGridDimensions', 'toggleAsciiShader', 'setFont', 'setFontSize', 'setCharacters'];

        events.forEach(event => {
            this.shadersView.on(event, this[event].bind(this));
        });
    }

    /**
     * Sets the characters used for rendering.
     * @param {string[]} characters - An array of characters to be used for rendering.
     */
    setCharacters({ characters }) {
        characterSet.setCharacterSet(characters);
    }

    /**
     * Sets the font for the ASCII renderer.
     * @param {string} fontName - The name of the font to set.
     * @returns {void}
     */
    setFont({ fontName }) {
        characterSet.setFont(fontName); // Set the font in the character set

        grid.resizeCellDimensions(characterSet.maxGlyphDimensions.width, characterSet.maxGlyphDimensions.height); // Resize the grid cell dimensions

        PARAMS.gridCellCountX = grid.cols; // Update the PARAMS with the new grid dimensions
        PARAMS.gridCellCountY = grid.rows;

        this.shadersView.initializeGridDimensionsFolder(); // Reinitialize the grid dimensions folder in the UI
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