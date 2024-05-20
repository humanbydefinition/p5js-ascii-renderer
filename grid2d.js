/**
 * Represents a grid in a 2D space.
 */
class Grid {
    /**
     * Constructor for a Grid object.
     * @param {number} cellWidth - The width of each cell in the grid.
     * @param {number} cellHeight - The height of each cell in the grid.
     */
    constructor({ cellWidth, cellHeight }) {
        this.cellWidth = cellWidth;
        this.cellHeight = cellHeight;

        let [cols, rows] = this._calculateGridCellDimensions();
        this.cols = cols;
        this.rows = rows;

        this._resizeGrid();
    }

    /**
     * Recalculates the grid width and height based on the number of number of columns/rows and the cell width/height.
     * Also recalculates the offset to the edge of the canvas.
     * @private
     * @returns {void}
     */
    _resizeGrid() {
        this.width = this.cols * this.cellWidth;
        this.height = this.rows * this.cellHeight;

        this.offsetX = Math.floor((windowWidth - this.width) / 2);
        this.offsetY = Math.floor((windowHeight - this.height) / 2);
    }

    /**
     * Calculates the cell dimensions of the grid based on the window width and height, and the cell width and height.
     * @private
     * @returns {number[]} An array containing the number of cells in the X and Y directions.
     */
    _calculateGridCellDimensions() {
        const cellsX = Math.floor(windowWidth / this.cellWidth);
        const cellsY = Math.floor(windowHeight / this.cellHeight);
        return [cellsX, cellsY];
    }

    /**
     * This method gets called when the window is resized to recalculate the grid cell dimensions.
     * @returns {void}
     */
    windowResized() {
        let [cols, rows] = this._calculateGridCellDimensions();
        this.cols = cols;
        this.rows = rows;

        this._resizeGrid();
    }

    /**
     * Resizes the grid cell dimensions.
     * @param {number} newCellCountX - The new number of cells in the X direction.
     * @param {number} newCellCountY - The new number of cells in the Y direction.
     * @returns {void}
     */
    resizeGridCellDimensions(newCellCountX, newCellCountY) {
        this.cols = newCellCountX;
        this.rows = newCellCountY;

        this._resizeGrid();
    }

    /**
     * Resizes the cell dimensions of the grid.
     * @param {number} newCellWidth - The new width of each cell.
     * @param {number} newCellHeight - The new height of each cell.
     * @returns {void}
     */
    resizeCellDimensions(newCellWidth, newCellHeight) {
        this.cellWidth = newCellWidth;
        this.cellHeight = newCellHeight;

        let [cols, rows] = this._calculateGridCellDimensions();
        this.cols = cols;
        this.rows = rows;

        this._resizeGrid();
    }
}