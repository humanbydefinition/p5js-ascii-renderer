# p5.js ASCII renderer

![header](https://github.com/humanbydefinition/p5js-ascii-renderer/blob/main/assets/repository_media/logo_gif.gif)

This repository contains a [`p5.js`](https://github.com/processing/p5.js) ASCII renderer that uses a [`GLSL`](https://en.wikipedia.org/wiki/OpenGL_Shading_Language) fragment shader to convert a [`WebGL`](https://de.wikipedia.org/wiki/WebGL) scene into an ASCII grid. The shader works by sampling the brightness at various points in the scene. Based on the sampled brightness, it determines the appropriate ASCII character to render at each point, creating a unique ASCII representation of the scene.

The goal of this project is to provide a starting point for those interested in creating ASCII art using [`p5.js`](https://github.com/processing/p5.js). The [`WebGL`](https://de.wikipedia.org/wiki/WebGL) scene in this project only features a simple 3D box which is being rotated based on the current frame count, but you can let your creativity run wild and asciify any of your [`p5.js`](https://github.com/processing/p5.js) creations.
- The rotating 3D box animation is based on creative coding courses from [`timrodenbroeker.de`](https://timrodenbroeker.de/), which I can highly recommend as a starting point for beginners who are new to the realm of creative coding.

<br />

If there are any questions regarding this project, feel free to reach out to me via email (_travellingwithoutarriving@gmail.com_) or instagram (_[`@humanbydefinition`](https://www.instagram.com/humanbydefinition/)_).

## Demo
- [`editor.p5js.org`](https://editor.p5js.org/humanbydefinition/full/ibclfMqlk)

**Note:** The demo should work on all types of devices and screens, even though you can't hide the overlay without a keyboard. **Let me know if you experience any issues!**

## Features
- `🎮 Control` Adjust parameters during run-time through an overlay.
- `🎬 Capture` Capture and export the canvas into various image formats, aswell as videos in gif- or webm-format.
- `🎨 Customize` Customize the font, font size, character set, colors, grid dimensions and more during run-time.
- `♻️ Re-use` Import and export presets in [`JSON`](https://en.wikipedia.org/wiki/JSON)-format for re-use.

## Structure
- [`/`](https://github.com/humanbydefinition/p5js-ascii-renderer/): Contains [`index.html`](https://github.com/humanbydefinition/p5js-ascii-renderer/blob/main/index.html), [`sketch.js`](https://github.com/humanbydefinition/p5js-ascii-renderer/blob/main/sketch.js), [`characterset.js`](https://github.com/humanbydefinition/p5js-ascii-renderer/blob/main/characterset.js) _(used for creating a 2D texture from a font file)_, and [`grid2d.js`](https://github.com/humanbydefinition/p5js-ascii-renderer/blob/main/grid2d.js) _(used for managing grid dimensions)_.
- [`assets/`](https://github.com/humanbydefinition/p5js-ascii-renderer/tree/main/assets): Contains font file(s).
- [`libraries/`](https://github.com/humanbydefinition/p5js-ascii-renderer/tree/main/libraries): Contains libraries unavailable on CDNs like [jsdelivr.com](https://jsdelivr.com/), that are redistributable under the MIT License.
- [`shaders/`](https://github.com/humanbydefinition/p5js-ascii-renderer/tree/main/shaders/ascii): Contains the GLSL shader for ASCII rendering.
- [`ui/`](https://github.com/humanbydefinition/p5js-ascii-renderer/tree/main/ui): Contains the code for the Tweakpane user interface.
- [`utilities/`](https://github.com/humanbydefinition/p5js-ascii-renderer/tree/main/utilities): Contains utility functions, specifically for translating color formats.

## Installation
To get started with the p5.js ASCII Renderer, follow these steps to set up a local or remote web server and run the project:
1. **Clone the Repository**:
    ```
    git clone https://github.com/humanbydefinition/p5js-ascii-renderer.git
    cd p5js-ascii-renderer
    ```
2. **Set Up a Web Server**:
    - For local development, you need a web server to run the project. Refer to the [p5.js Wiki](https://github.com/processing/p5.js/wiki/Local-server) for detailed instructions on setting up a local server.
3. **Open the Project**:
    - Once the server is set up, open [`index.html`](https://github.com/humanbydefinition/p5js-ascii-renderer/blob/main/index.html) in your browser to see the renderer in action.

_Personally, as described in the above wiki article, I recommend using [VS Code](https://code.visualstudio.com/) with the [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) for a smooth development experience._

## Dependencies
- [`p5.js (1.9.3)`](https://github.com/processing/p5.js) _(licensed under the LGPL-2.1 License)_
- [`Ccapture.js (1.1.0)`](https://github.com/spite/ccapture.js/) _(licensed under the MIT License)_
- [`Tweakpane (3.1.10)`](https://github.com/cocopon/tweakpane) _(licensed under the MIT License)_
    - [`Essentials Plugin (0.1.8)`](https://github.com/tweakpane/plugin-essentials) _(licensed under the MIT License)_
    - [`Infodump Plugin (0.3.0)`](https://github.com/doersino/tweakpane-plugin-infodump) _(licensed under the MIT License)_

For a complete list of dependencies, please refer to the repositories linked above.

## Assets
- [`UrsaFont`](https://ursafrank.itch.io/ursafont) - A textmode font by [UrsaFrank](https://ursafrank.itch.io/) on [itch.io](https://itch.io/). _(licensed under the CC0 1.0 Universal License)_

Besides this awesome font, I am unfortunately not allowed to redistribute any other fonts here. However, here are some other textmode/pixel fonts that have been successfully tested without any issues:

| Font  | Description | 
| ------------- | ------------- |
| [C64 Pro Mono](https://style64.org/c64-truetype)  | Includes all 304 unique C64 glyphs.  |
| [DOS/V re. JPN12](https://int10h.org/oldschool-pc-fonts/fontlist/font?dos-v_re_jpn12)  | Japanese versions of IBM (PC-)DOS / MS-DOS.  |
| [Retromoticons](https://www.fontspace.com/retromoticons-font-f26602)  | Bitmap emoticon dingbat font containing 77 glyphs. |
| [og-emoji-font](https://github.com/notwaldorf/og-emoji-font)  | Based on the original DoCoMo emoji set, designed in 1999 by Shigetaka Kurita. |
| [pixelated-wingdings](https://fontstruct.com/fontstructions/show/1218140/pixelated-wingdings)  | Pixelated/8-bit version of the Wingdings font. |
| [FROGBLOCK-V2.1](https://polyducks.itch.io/frogblock)  | Monospaced 8x8 textmode font with 256 glyphs. |
| [CHUNKY](https://batfeula.itch.io/chunky)  | 8x8 textmode font with 366 glyphs. |
| [Kitchen Sink](https://polyducks.itch.io/kitchen-sink-textmode-font)  | Monospaced 8x8 textmode font with 256 glyphs. |
| [CozetteVector](https://github.com/slavfox/Cozette)  | 6x13 bitmap programming font. |
| [PixelCode](https://qwerasd205.github.io/PixelCode/)  | Monospace pixel art style programming font. |
| [ark-pixel-font](https://github.com/TakWolf/ark-pixel-font)  | Open source pan-Chinese, Japanese and Korean pixel font. |
| [Vonwaon](https://timothyqiu.itch.io/vonwaon-bitmap)  | Chinese pixel font with thousands of glyphs. |
| [unscii-16](http://viznut.fi/unscii/)  | Bitmapped Unicode fonts based on classic system fonts. |

In [`fontassetmanager.js`](https://github.com/humanbydefinition/p5js-ascii-renderer/blob/main/assets/managers/fontassetmanager.js), you can find commented-out references to these fonts. You can download them from the links in the table above.

Feel free to test your favorite fonts, but keep in mind that the current implementation for creating a 2D character tile map texture from a [`p5.Font`](https://p5js.org/reference/#/p5.Font) object may not work properly with all fonts. For fonts not mentioned here, characters might overlap into other tiles on the texture.

**If you have font suggestions to share, I'd love to hear them! 😊**

## Contributing
Contributions are welcome. Please [`open an issue`](https://github.com/humanbydefinition/p5js-ascii-renderer/issues) or [`submit a pull request`](https://github.com/humanbydefinition/p5js-ascii-renderer/pulls) on GitHub.

## License
This project is licensed under the MIT License. See the [`LICENSE`](https://github.com/humanbydefinition/p5js-ascii-renderer/blob/main/LICENSE) file for more details.


