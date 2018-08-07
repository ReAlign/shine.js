/**
 * @fileOverview Encapsulates data for lights.
 * @author <a href="http://benjaminbojko.com">Benjamin Bojko</a>
 * Copyright (c) 2015 Big Spaceship; Licensed MIT
 */

'use strict';

/**
 * @constructor
 * @param {?_.Point=} optPosition An optional position. Defaults to (0, 0).
 */
module.exports = ((_) => {
  _.Light = function Light(optPosition) {
    /**
     * @type {_.Point}
     */
    this.position = optPosition || new _.Point(0, 0);

    /**
     * @type {number}
     */
    this.intensity = 1.0;
  };
});
