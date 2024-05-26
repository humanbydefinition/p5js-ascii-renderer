/**
 * Overlay class serves as an entry point for initializing the tweakpane overlay.
 */
class Overlay {
    /**
     * Constructs an instance of the Overlay class.
     * Initializes the tweakpane, registers plugins, adds tabs, and sets up views and controllers.
     */
    constructor() {
        this.pane = new Tweakpane.Pane();
        this.pane.registerPlugin(TweakpaneEssentialsPlugin);
        this.pane.registerPlugin(TweakpaneInfodumpPlugin);
        this.pane.registerPlugin(TweakpaneFileImportPlugin);

        this.tabBar = this.pane.addTab({ pages: [{ title: 'general' }, { title: 'ascii' }, { title: 'about' }] });

        this.generalView = new GeneralView(this.tabBar.pages[0]);
        this.generalController = new GeneralController(this.generalView);

        this.shadersView = new AsciiView(this.tabBar.pages[1]);
        this.shadersController = new AsciiController(this.shadersView);

        this.generalController.on('importPreset', this.importPreset.bind(this));

        this.initializeAboutTab();
    }

    /**
     * Initializes the about tab.
     * @returns {void}
     */
    initializeAboutTab() {
        this.tabBar.pages[2].addBlade({
            view: 'infodump',
            content: `# brightness based ascii renderer
            \`built with p5.js v1.9.3 and Tweakpane 3.1.10\`
            by **humanbydefinition**
            **links:**
            * **github:** [github.com/humanbydefinition](https://github.com/humanbydefinition)
            * **ig:** [instagram.com/humanbydefinition](https://instagram.com/humanbydefinition)`,
            markdown: true,
        });

        this.tabBar.pages[2].addBlade({
            view: 'infodump',
            content: `# controls
            * **~ (ALT + 126):** toggle the ui on/off`,
            markdown: true,
        });

        this.tabBar.pages[2].addBlade({
            view: 'infodump',
            content: `# libraries/plugins used
            * **[p5.js](https://p5js.org/):** a JS client-side library for creating graphic and interactive experiences
            * **[Tweakpane](https://cocopon.github.io/tweakpane/):** a compact GUI for fine-tuning parameters and monitoring variables
            * **[Tweakpane Essentials Plugin](https://github.com/tweakpane/plugin-essentials):** a plugin for Tweakpane that adds essential features
            * **[Tweakpane Infodump Plugin](https://github.com/doersino/tweakpane-plugin-infodump):** a plugin for Tweakpane that adds markdown support to infodump blades
            * **[Tweakpane File Import Plugin](https://github.com/LuchoTurtle/tweakpane-plugin-file-import):** a plugin for Tweakpane that adds file import support
            * **[CCapture.js](https://github.com/spite/ccapture.js/):** a library to capture canvas-based animations
            * ...and more, since some of those libraries also have dependencies themselves`,
            markdown: true,
        });

        this.tabBar.pages[2].addBlade({
            view: 'infodump',
            content: `# assets used
            **[UrsaFont](https://ursafrank.itch.io/ursafont):** a textmode font by _UrsaFrank_ on [itch.io](https://itch.io/)`,
            markdown: true,
        });
    }

    /**
     * Imports a preset into the tweakpane.
     * @param {string} preset - The preset to be imported, in JSON format.
     * @returns {void}
     */
    importPreset(preset) {
        const PARAMS = JSON.parse(preset);
        this.pane.importPreset(PARAMS);
        this.pane.refresh();
    }
}