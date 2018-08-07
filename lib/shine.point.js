/**
 * @fileOverview Encapsulates data and logic for 2d points.
 * @author <a href="http://benjaminbojko.com">Benjamin Bojko</a>
 * Copyright (c) 2015 Big Spaceship; Licensed MIT
 */

'use strict';

/**
 * @constructor
 * @param {number=} x
 * @param {number=} y
 */
module.exports = ((_) => {
  _.Point = function(x, y) {
    /** @type {number} */
    this.x = x || 0;
    /** @type {number} */
    this.y = y || 0;
  };

  /**
   * A point representing the x and y distance to a point <code>p</code>
   * @param {_.Point} p
   * @return {_.Point} A new instance of _.Point
   */
  _.Point.prototype.delta = function(p) {
    return new _.Point(p.x - this.x, p.y - this.y);
  };
});
