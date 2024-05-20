/**
 * EventEmitter class for handling events and listeners.
 */
class EventEmitter {
    /**
     * Constructs an instance of the EventEmitter class.
     */
    constructor() {
        this.events = {};
    }

    /**
     * Registers a listener for a specific event.
     * @param {string} event - The name of the event.
     * @param {Function} listener - The callback function to be invoked when the event is emitted.
     * @returns {void}
     */
    on(event, listener) {
        if (typeof this.events[event] !== 'object') {
            this.events[event] = [];
        }
        this.events[event].push(listener);
    }

    /**
     * Emits an event, causing all listeners registered to this event to be called.
     * @param {string} event - The name of the event.
     * @param {...*} args - The arguments to be passed to the listeners.
     * @returns {void}
     */
    emit(event, ...args) {
        if (typeof this.events[event] === 'object') {
            this.events[event].forEach(listener => listener.apply(this, args));
        }
    }

    /**
     * Removes a specific listener from an event.
     * @param {string} event - The name of the event.
     * @param {Function} listener - The listener to be removed.
     * @returns {void}
     */
    removeListener(event, listener) {
        if (typeof this.events[event] === 'object') {
            const idx = this.events[event].indexOf(listener);
            if (idx > -1) {
                this.events[event].splice(idx, 1);
            }
        }
    }
}