"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function router() {
  var routes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return {
    route: function route() {
      for (var index = 0, length = routes.length; index < length; index++) {
        var _routes$index = routes[index],
            _routes$index$regex = _routes$index.regex,
            regex = _routes$index$regex === void 0 ? /.*/ : _routes$index$regex,
            callback = _routes$index.callback;

        var _ref = window.location.hash ? decodeURI(window.location.hash).substring(1).split('?') : [''],
            _ref2 = _slicedToArray(_ref, 2),
            hash = _ref2[0],
            query = _ref2[1];

        var result = regex.exec(hash);

        if (result) {
          callback.call.apply(callback, [this].concat(_toConsumableArray(result), [query]));
          break;
        }
      }

      return this;
    },
    start: function start() {
      var _this = this;

      if (!this.listender) {
        this.listender = function () {
          return void _this.route();
        };

        window.addEventListener('popstate', this.listender);
        this.route();
      }

      return this;
    },
    end: function end() {
      if (this.listender) {
        window.removeEventListener('popstate', this.listender);
        this.listender = null;
      }

      return this;
    },
    push: function push(path) {
      window.history.pushState({}, path, "#".concat(path));
      this.route();
      return this;
    },
    replace: function replace(path) {
      window.history.replaceState({}, path, "#".concat(path));
      this.route();
      return this;
    }
  };
}
/* exported router */