"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Router = function () {
  function createArgument(router) {
    var _ref = window.location.hash ? decodeURI(window.location.hash).substring(1).split('?') : [''],
        _ref2 = _slicedToArray(_ref, 2),
        hash = _ref2[0],
        query = _ref2[1];

    var paths = hash.split('/');
    return {
      router: router,
      hash: hash,
      paths: paths,
      query: query
    };
  }

  return /*#__PURE__*/function () {
    function _class(route) {
      var _this = this;

      _classCallCheck(this, _class);

      if (!(typeof route === 'function')) {
        throw 'Argument "route" is invalid.';
      }

      this.route = route;

      this.listener = function () {
        return void _this.route(createArgument(_this));
      };
    }

    _createClass(_class, [{
      key: "start",
      value: function start() {
        window.addEventListener('popstate', this.listener);
        this.route(createArgument(this));
        return this;
      }
    }, {
      key: "push",
      value: function push(path) {
        if (!(typeof path === 'string')) {
          throw 'Argument "path" is invalid.';
        }

        window.history.pushState({}, path, "#".concat(path));
        this.route(createArgument(this));
        return this;
      }
    }, {
      key: "replace",
      value: function replace(path) {
        if (!(typeof path === 'string')) {
          throw 'Argument "path" is invalid.';
        }

        window.history.replaceState({}, path, "#".concat(path));
        this.route(createArgument(this));
        return this;
      }
    }, {
      key: "stop",
      value: function stop() {
        window.removeEventListener('popstate', this.listender);
        return this;
      }
    }]);

    return _class;
  }();
}();
/* exported Router */