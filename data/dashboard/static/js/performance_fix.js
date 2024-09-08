// Overwrite the addEventListener method to set passive option to true
(function () {
    var originalAddEventListener = EventTarget.prototype.addEventListener;

    EventTarget.prototype.addEventListener = function (type, listener, options) {
        // If the event is touchstart or mousewheel, force the listener to be passive
        const defaultOptions = { passive: true };

        if (type === 'touchstart' || type === 'mousewheel') {
            if (typeof options === 'boolean') {
                options = defaultOptions;
            } else {
                options = Object.assign({}, options, defaultOptions);
            }
        }

        return originalAddEventListener.call(this, type, listener, options);
    };
})();
