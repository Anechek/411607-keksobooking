'use strict';
(function () {
  var DEBOUNCE_INTERVAL = 500;

  var lastTimeout;
  window.debounce = function (debouncedFunction) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(debouncedFunction, DEBOUNCE_INTERVAL);
  };
})();
