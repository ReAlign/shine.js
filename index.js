'use strict';

let _ = {};

require('./lib/util/util')(_);

require('./lib/shine.color')(_);
require('./lib/shine.config')(_);
require('./lib/shine.light')(_);
require('./lib/shine.point')(_);
require('./lib/shine.shadow')(_);
require('./lib/shine.splitter')(_);
require('./lib/shine.style-injector')(_);
require('./lib/shine.timing')(_);

require('./lib/shine')(_);
// Export it
module.exports = _;