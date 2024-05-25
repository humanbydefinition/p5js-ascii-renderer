/**
 * ShadersView class serves as an entry point for initializing the tweakpane 'ascii' tab.
 * @extends EventEmitter
 */
class AsciiView extends EventEmitter {

    /**
     * Constructs a new instance of the ShadersView class.
     * @param {Tab} tab - The tab object associated with the view.
     */
    constructor(tab) {
        super();
        this.tab = tab;

        this.asciiShaderFolder = this.tab.addFolder({ title: 'shader' });
        this.gridDimensionsFolder = this.tab.addFolder({ title: 'grid dimensions' });

        this.initializeAsciiShaderFolder();
        this.initializeGridDimensionsFolder();
    }

    /**
     * Initializes the grid dimensions folder.
     * @returns {void}
     */
    initializeGridDimensionsFolder() {
        // Remove existing inputs, since this method is called when the window is resized, to update the grid cell count inputs.
        if (this.gridCellCountXInput || this.gridCellCountYInput) {
            this.gridDimensionsFolder.remove(this.gridCellCountXInput);
            this.gridDimensionsFolder.remove(this.gridCellCountYInput);
        }

        // Add inputs and their event listeners
        this.gridCellCountXInput = this.gridDimensionsFolder.addInput(PARAMS, 'gridCellCountX', {
            label: 'columns', min: 1, max: PARAMS.gridCellCountX, step: 1
        }).on('change', () => this.emit('setGridDimensions'));

        this.gridCellCountYInput = this.gridDimensionsFolder.addInput(PARAMS, 'gridCellCountY', {
            label: 'rows', min: 1, max: PARAMS.gridCellCountY, step: 1
        }).on('change', () => this.emit('setGridDimensions'));
    }

    /**
     * Initializes the ASCII shader folder.
     * @returns {void}
     */
    initializeAsciiShaderFolder() {
        this.asciiShaderFolder.addInput(PARAMS, 'asciiShaderActive', { label: 'active' })
            .on('change', (ev) => { this.emit('toggleAsciiShader', { active: ev.value }); });

        this.asciiShaderFolder.addInput(PARAMS, 'asciiCharacterSet', { label: 'charset', })
            .on('change', (ev) => { this.emit('setCharacters', { characters: ev.value }); });

        this.asciiShaderFolder.addInput(PARAMS, 'asciiInvertCharacters', { label: 'invert chars' })

        // Font upload input
        this.asciiShaderFolder.addInput(PARAMS, 'fontFileInput', {
            view: 'file-input', lineCount: 1, filetypes: ['.ttf', '.otf'], label: 'font'
        }).on('change', (ev) => { this.emit("updateFont", { fontFileInput: ev.value }) });

        this.asciiShaderFolder.addInput(PARAMS, 'asciiFontSize', {
            label: 'font size', options: { 2: 2, 4: 4, 8: 8, 16: 16, 32: 32, 64: 64, 128: 128, 256: 256, 512: 512 }
        }).on('change', (ev) => { this.emit("setFontSize", ev.value); });

        this.asciiShaderFolder.addInput(PARAMS, 'asciiCharacterColorMode', { options: { 'sampled': 0, 'fixed color': 1 }, label: 'char color mode' })
            .on('change', (ev) => { this.emit('toggleAsciiCharacterColorMode', { colorMode: ev.value }); });

        this.asciiShaderFolder.addInput(PARAMS, 'asciiBackgroundColorMode', { options: { 'sampled': 0, 'fixed color': 1 }, label: 'bg color mode' })
            .on('change', (ev) => { this.emit('toggleAsciiBackgroundColorMode', { colorMode: ev.value }); });

        this.asciiShaderFolder.addInput(PARAMS, 'asciiCharacterColor', { label: 'char color' })
            .on('change', (ev) => { this.emit('setAsciiCharacterColor', { color: ev.value }); });

        this.asciiShaderFolder.addInput(PARAMS, 'asciiBackgroundColor', { label: 'bg color' })
            .on('change', (ev) => { this.emit('setAsciiBackgroundColor', { color: ev.value }) });
    }
}