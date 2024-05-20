/**
 * A utility class for converting colors between different formats.
 */
class ColorTranslator {

    /**
     * Converts a hexadecimal color code to an RGB color array.
     * @param {string} hex - The hexadecimal color code to convert.
     * @returns {number[]} The RGB color array [r, g, b].
     */
    static hexToRgb(hex) {
        let r = parseInt(hex.slice(1, 3), 16);
        let g = parseInt(hex.slice(3, 5), 16);
        let b = parseInt(hex.slice(5, 7), 16);
        return [r, g, b];
    }

    /**
     * Converts an RGB color array to a shader color array.
     * @param {number[]} color - The RGB color array to convert.
     * @returns {number[]} The shader color array.
     */
    static rgbToShaderColor(color) {
        return [color[0] / 255, color[1] / 255, color[2] / 255];
    }

    /**
     * Converts a hexadecimal color value to a shader color value.
     * @param {string} hex - The hexadecimal color value to convert.
     * @returns {number[]} The shader color value.
     */
    static hexToShaderColor(hex) {
        return this.rgbToShaderColor(this.hexToRgb(hex));
    }
}