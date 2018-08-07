'use strict';

/* jshint ignore:start */
var shinejs;
var shinejsGlobal;

// Wrap assigments in try/catch to support running unminified code
try {
  window.shinejs = shinejs || exports || {};
} catch(error) {
  window.shinejs = {};
}
try {
  window.shinejsGlobal = shinejsGlobal || global || {};
} catch(error) {
  window.shinejsGlobal = {};
}
/* jshint ignore:end */
