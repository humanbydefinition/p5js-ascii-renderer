/**
 * Represents a character set, that holds a 2d texture of characters.
 */
class CharacterSet {
    /**
     * Creates a new instance of the CharacterSet class.
     * @param {object} font - The font object.
     * @param {number} [fontSize=16] - The font size.
     * @param {string} characters - The characters to include in the character set.
     */
    constructor({ font, fontSize = 16, characters }) {
        this.font = font;
        this.fontSize = fontSize;
        this.characters = Array.from(characters);

        // Load all glyphs from the fonts underlying opentype.js font object
        this.glyphs = Object.values(this.font.font.glyphs.glyphs);
        this.glyphs = this.glyphs.filter(glyph => glyph.unicode !== undefined); // Remove glyphs without unicode

        this.maxGlyphDimensions = this.getMaxGlyphDimensions(this.fontSize); // Calculate the maximum dimensions of all the glyphs in the whole font.

        this.createTexture({ fontSize: 512 }); // Create the texture of the defined characters
    }

    /**
     * Calculates the maximum dimensions of the glyphs in the character set.
     * @param {number} fontSize - The font size to use for calculating the dimensions.
     * @returns {Object} An object containing the maximum width and height of the glyphs.
     */
    getMaxGlyphDimensions(fontSize) {
        return this.glyphs.reduce((maxDims, glyph) => {
            const bounds = glyph.getPath(0, 0, fontSize).getBoundingBox();
            return {
                width: Math.ceil(Math.max(maxDims.width, bounds.x2 - bounds.x1)),
                height: Math.ceil(Math.max(maxDims.height, bounds.y2 - bounds.y1))
            };
        }, { width: 0, height: 0 });
    }

    setFontObject(font) {
        this.font = font;

        // Load all glyphs from the font
        this.glyphs = Object.values(this.font.font.glyphs.glyphs);
        this.glyphs = this.glyphs.filter(glyph => glyph.unicode !== undefined); // Remove glyphs without unicode

        this.maxGlyphDimensions = this.getMaxGlyphDimensions(this.fontSize); // Recalculate the maximum dimensions of the glyphs
        this.createTexture({ fontSize: 512 }); // Recreate the texture with the new font
    }

    /**
     * Sets the character set used for rendering.
     * @param {string} characters - The new character set to use.
     * @returns {void}
     */
    setCharacterSet(characters) {
        this.characters = Array.from(characters);

        this.createTexture({ fontSize: 512 }); // Recreate the texture with the new characters
    }

    /**
     * Sets the font size for the rendered characters.
     * @param {number} fontSize - The font size to set.
     * @returns {void}
     */
    setFontSize(fontSize) {
        this.fontSize = fontSize;
        this.maxGlyphDimensions = this.getMaxGlyphDimensions(this.fontSize);
    }

    /**
     * Creates a 2D texture containing the glyphs of the character set.
     * @param {object} fontSize - The font size to use for the texture. Set to 512 by default, so the characters are rendered at a high resolution.
     * @returns {void}
     */
    createTexture({ fontSize }) {
        // Calculate the number of columns and rows for the texture based on the number of characters
        this.charsetCols = Math.ceil(Math.sqrt(this.characters.length));
        this.charsetRows = Math.ceil(this.characters.length / this.charsetCols);

        let dimensions = this.getMaxGlyphDimensions(fontSize); // Calculate the dimensions of the texture


        if (!this.texture) { // Initially create the framebuffer containing the unique characters. Otherwise, resize the existing texture.
            this.texture = createFramebuffer({ format: FLOAT, width: dimensions.width * this.charsetCols, height: dimensions.height * this.charsetRows });
        } else {
            this.texture.resize(dimensions.width * this.charsetCols, dimensions.height * this.charsetRows);
        }

        this.texture.begin();

        clear();
        textFont(this.font);
        fill(255);
        textSize(fontSize);
        textAlign(LEFT, TOP);
        noStroke();

        // Draw each character to to a cell/tile in the texture
        for (let i = 0; i < this.characters.length; i++) {
            const col = i % this.charsetCols;
            const row = Math.floor(i / this.charsetCols);
            const x = dimensions.width * col;
            const y = dimensions.height * row;

            const character = this.characters[i];
            text(character, x - ((dimensions.width * this.charsetCols) / 2), y - ((dimensions.height * this.charsetRows) / 2));
        }

        this.texture.end();
    }
}