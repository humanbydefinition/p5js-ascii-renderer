/**
 * Represents the general view, which contains the framerate, import/export, and capture folders.
 * @extends EventEmitter
 */
class GeneralView extends EventEmitter {
    /**
     * Represents a GeneralView object.
     * @param {Tab} tab - The tab object associated with the view.
     */
    constructor(tab) {
        super();

        this.tab = tab;

        this.frameRateFolder = this.tab.addFolder({ title: 'framerate' });
        this.importExportFolder = this.tab.addFolder({ title: 'import/export' });
        this.captureFolder = this.tab.addFolder({ title: 'capture', expanded: false });

        this.initializeFrameRateFolder();
        this.initializeImportExportFolder();
        this.initializeCaptureFolder();
    }

    /**
     * Initializes the import and export folder.
     * @returns {void}
     */
    initializeImportExportFolder() {
        this.importExportFolder.addButton({ title: 'export preset' })
            .on('click', () => { this.emit('exportPreset'); });

        this.importExportFolder.addButton({ title: 'import preset' })
            .on('click', () => { this.emit('importPreset') });
    }

    /**
     * Initializes the frame rate folder.
     * @returns {void}
     */
    initializeFrameRateFolder() {
        this.fps_graph = this.frameRateFolder.addBlade({ view: 'fpsgraph', label: 'graph', rows: 1 });

        this.frameRateFolder.addInput(PARAMS, 'desiredFrameRate', { label: 'limit', min: 1, max: 60, step: 1 })
            .on('change', () => this.emit("frameRateChanged"));
    }

    /**
     * Initializes the capture folder by adding subfolders and UI elements for capturing images and recordings.
     */
    initializeCaptureFolder() {
        this.captureImageFolder = this.captureFolder.addFolder({ title: 'image' });
        this.captureRecordingFolder = this.captureFolder.addFolder({ title: 'recording' });

        this.captureImageFolder.addBlade({ view: 'buttongrid', size: [2, 1], cells: (x) => ({ title: ['png', 'jpg'][x], }) })
            .on('click', (ev) => { this.emit('saveImage', ['png', 'jpg'][ev.index[0]]); });

        this.captureRecordingFolder.addBlade({
            view: "infodump",
            content: "Occasionally, the sketch breaks when trying to record. ¯\\_(ツ)_/¯ If this happens, export your preset, refresh the page, and reimport the preset to retry.",
            border: true,
            markdown: false,
          });

        this.captureRecordingFolder.addInput(PARAMS, 'recordingType', { options: { 'webm': "webm", 'gif': "gif", 'png': "png", 'jpg': "jpg" }, label: 'type' });

        this.captureRecordingFolder.addMonitor(PARAMS, 'recordingElapsedTime', { label: 'elapsed time' });

        this.captureRecordingFolder.addBlade({ view: 'buttongrid', size: [2, 1], cells: (x) => ({ title: ['start', 'stop'][x], }) })
            .on('click', (ev) => { this.emit('toggleRecording', ['start', 'stop'][ev.index[0]]); });
    }
}
