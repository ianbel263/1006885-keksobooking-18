'use strict';

(function () {
  window.Coordinate = function (x, y, minX, minY, maxX, maxY) {
    this.x = x;
    this.y = y;

    this._minX = minX;
    this._minY = minY;
    this._maxX = maxX;
    this._maxY = maxY;
  };

  window.Coordinate.prototype.setX = function (x) {
    if (x >= this._minX &&
        x <= this._maxX) {
      this.x = x;
    }
  };

  window.Coordinate.prototype.setY = function (y) {
    if (y >= this._minY &&
        y <= this._maxY) {
      this.y = y;
    }
  };
})();
