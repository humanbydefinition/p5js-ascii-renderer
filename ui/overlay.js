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
            by [@humandefinition](https://www.instagram.com/humanbydefinition/)
            **[links](#):**
            * **github:** github.com/humanbydefinition
            * **ig:** instagram.com/humanbydefinition`,
            markdown: true,
            border: true
        });

        this.tabBar.pages[2].addBlade({
            view: 'infodump',
            content: `# controls
            * **~ (ALT + 126):** toggle the ui on/off`,
            markdown: true,
            border: true
        });

        this.tabBar.pages[2].addBlade({
            view: 'infodump',
            content: `# libraries/plugins used
            * **[p5.js](https://p5js.org/):** a JS client-side library for creating graphic and interactive experiences
            * **[Tweakpane](https://cocopon.github.io/tweakpane/):** a compact GUI for fine-tuning parameters and monitoring variables
            * **[Tweakpane Essentials Plugin](#):** a plugin for Tweakpane that adds essential features
            * **[Tweakpane Infodump Plugin](#):** a plugin for Tweakpane that adds markdown support to infodump blades
            * **[CCapture.js](#):** a library to capture canvas-based animations
            * ...and more, since some of those libraries also have dependencies themselves`,
            markdown: true,
            border: true
        });

        this.tabBar.pages[2].addBlade({
            view: 'infodump',
            content: `# assets used
            **[UrsaFont](#):** a textmode font by _UrsaFrank_ on [itch.io](https://ursafrank.itch.io/ursafont)`,
            markdown: true,
            border: true
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