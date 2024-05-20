/**
 * Represents a Font Asset Manager that handles loading and managing font assets.
 */
class FontAssetManager {

  /**
   * Creates a new instance of the FontAssetManager class.
   * @param {string} path - The base path for the font files.
   */
  constructor(path) {

    /**
     * Since I am not allowed to upload the font files to GitHub, I can just set up the paths for you.
     * As stated on the GitHub page, 
     * the following fonts have been tested successfully with this project without clipping issues in the 2d characterset texture.
     */

    this.fontPaths = {
      "UrsaFont": path + '/UrsaFont.ttf',
      //"C64_Pro_Mono-STYLE": path + '/C64_Pro_Mono-STYLE.otf',
      //"Px437_DOS-V_re_JPN12": path + '/Px437_DOS-V_re_JPN12.ttf',
      //"Retromoticons-RPLv": path + '/Retromoticons-RPLv.ttf',
      //"og-dcm-emoji": path + '/og-dcm-emoji.ttf',
      //"pixelated-wingdings": path + '/pixelated-wingdings.ttf',
      //"pixerrain-8": path + '/pixerrain-8.ttf',
      //"FROGBLOCK-V2.1": path + '/FROGBLOCK-V2.1.ttf',
      //"CHUNKY": path + '/CHUNKY.ttf',
      //"Kitchen Sink": path + '/Kitchen Sink.ttf',
      //"CozetteVector": path + '/CozetteVector.ttf', 
      //"PixelCode": path + '/PixelCode.ttf', 
      //"ark-pixel-font": path + '/ark-pixel-10px-monospaced-latin.ttf', 
      //"Vonwaon": path + '/VonwaonBitmap-16px.ttf',
      //"unscii-16": path + '/unscii-16.ttf',
      //"VG5000-Regular": path + '/VG5000-Regular.otf',
      //"Unifontexmono-K744D": path + '/Unifontexmono-K744D.ttf',
    };

    this.fonts = {}; // The fonts will be loaded in the preload() function
  }
}
