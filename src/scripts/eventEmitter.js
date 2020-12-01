"use strict";

export class EventEmitter {
    constructor() {
        this._events = {};
    }
    on(evt, listener) {
        (this._events[evt] || (this._events[evt] = [])).push(listener);
        return this;
    }
    emit(evt, ...args) {
        (this._events[evt] || []).slice().forEach(lsn => lsn(...args));
    }
}