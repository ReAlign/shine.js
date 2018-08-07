/**
 * @fileOverview Adds a shadow to a DOM elment using CSS.
 * @author <a href="http://benjaminbojko.com">Benjamin Bojko</a>
 * Copyright (c) 2015 Big Spaceship; Licensed MIT
 */

'use strict';

/**
 * @constructor
 * @param {!HTMLElement} domElement
 */
module.exports = ((_) => {
  _.Shadow = function(domElement) {
    /** @type {!_.Point} */
    this.position = new _.Point(0, 0);
    /** @type {!HTMLElement} */
    this.domElement = domElement;

    /** @type {!string} */
    this.shadowProperty = 'textShadow';

    /**
     * @const
     * @type {Function}
     */
    this.fnHandleViewportUpdate = null;
    this.fnHandleWindowLoaded = this.handleWindowLoaded.bind(this);

    this.enableAutoUpdates();
    this.handleViewportUpdate();

    // this.fnHandleViewportUpdate will get set in enableAutoUpdates();
    window.addEventListener('load', this.fnHandleWindowLoaded, false);
  };

  /**
   * Removes all listeners and frees resources.
   * Destroyed instances can't be reused.
   */
  _.Shadow.prototype.destroy = function() {
    window.removeEventListener('load', this.fnHandleWindowLoaded, false);
    this.disableAutoUpdates();
    this.fnHandleWindowLoaded = null;
    this.domElement = null;
    this.position = null;
  };

  /**
   * Draw this shadow with based on a light source
   * @param {_.Light} light
   * @param {!Config} config
   */
  _.Shadow.prototype.draw = function(light, config) {

    var delta = this.position.delta(light.position);
    var distance = Math.sqrt(delta.x * delta.x + delta.y * delta.y);
    distance = Math.max(32, distance);  // keep a min amount of shadow

    var shadows = [];

    for (var i = 0; i < config.numSteps; i++) {
      var ratio = i / config.numSteps;

      var ratioOpacity = Math.pow(ratio, config.opacityPow);
      var ratioOffset = Math.pow(ratio, config.offsetPow);
      var ratioBlur = Math.pow(ratio, config.blurPow);

      var opacity = light.intensity * Math.max(0, config.opacity * (1.0 - ratioOpacity));
      var offsetX = - config.offset * delta.x * ratioOffset;
      var offsetY = - config.offset * delta.y * ratioOffset;
      var blurRadius = distance * config.blur * ratioBlur / 512;

      var shadow = this.getShadow(config.shadowRGB, opacity, offsetX, offsetY, blurRadius);
      shadows.push(shadow);
    }

    this.drawShadows(shadows);
  };

  /**
   * Returns an individual shadow step for this caster
   * @param {_.Color} colorRGB
   * @param {number} opacity
   * @param {number} offsetX
   * @param {number} offsetY
   * @param {number} blurRadius
   * @return {string}
   */
  _.Shadow.prototype.getShadow = function(colorRGB, opacity, offsetX, offsetY, blurRadius) {
    var color = 'rgba(' + colorRGB.r + ', ' + colorRGB.g + ', ' + colorRGB.b + ', ' + opacity + ')';
    return color + ' ' + offsetX + 'px ' + offsetY + 'px ' + Math.round(blurRadius) + 'px';
  };

  /**
   * Applies shadows to the DOM element
   * @param {Array.<string>} shadows
   */
  _.Shadow.prototype.drawShadows = function(shadows) {
    this.domElement.style[this.shadowProperty] = shadows.join(', ');
  };

  /**
   * Adds DOM event listeners for resize, scroll and load
   */
  _.Shadow.prototype.enableAutoUpdates = function() {
    this.disableAutoUpdates();

    // store reference fore more efficient minification
    var fnHandleViewportUpdate = this.fnHandleViewportUpdate =
      _.Timing.debounce(this.handleViewportUpdate, 1000/15, this);
      // this.handleViewportUpdate.bind(this);

    document.addEventListener('resize', fnHandleViewportUpdate, false);
    window.addEventListener('resize', fnHandleViewportUpdate, false);
    window.addEventListener('scroll', fnHandleViewportUpdate, false);
  };

  /**
   * Removes DOM event listeners for resize, scroll and load
   */
  _.Shadow.prototype.disableAutoUpdates = function() {

    // store reference fore more efficient minification
    var fnHandleViewportUpdate = this.fnHandleViewportUpdate;

    // old FF versions break when removing listeners that haven't been added
    if (!fnHandleViewportUpdate) {
      return;
    }

    this.fnHandleViewportUpdate = null;

    document.removeEventListener('resize', fnHandleViewportUpdate, false);
    window.removeEventListener('resize', fnHandleViewportUpdate, false);
    window.removeEventListener('scroll', fnHandleViewportUpdate, false);
  };

  /**
   * @private Called when DOM event listeners fire
   */
  _.Shadow.prototype.handleViewportUpdate = function() {
    var boundingRect = this.domElement.getBoundingClientRect();
    this.position.x = boundingRect.left + boundingRect.width * 0.5;
    this.position.y = boundingRect.top + boundingRect.height * 0.5;
  };

  /**
   * @private Called when window loads
   */
  _.Shadow.prototype.handleWindowLoaded = function() {
    this.handleViewportUpdate();
  };
});
