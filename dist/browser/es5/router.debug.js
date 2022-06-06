"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var router = function () {
  var listener = function listener() {
    if (!(typeof router.route === 'function')) {
      throw 'Method "route" is invalid.';
    }

    var _ref = window.location.hash ? decodeURI(window.location.hash).substring(1).split('?') : [''],
        _ref2 = _slicedToArray(_ref, 2),
        hash = _ref2[0],
        query = _ref2[1];

    var paths = hash.split('/');
    router.route({
      hash: hash,
      paths: paths,
      query: query
    });
  };

  return {
    start: function start() {
      window.addEventListener('popstate', listener);
      listener();
      return router;
    },
    push: function push(path) {
      if (!(typeof path === 'string')) {
        throw 'Argument "path" is invalid.';
      }

      window.history.pushState({}, path, "#".concat(path));
      listener();
      return router;
    },
    replace: function replace(path) {
      if (!(typeof path === 'string')) {
        throw 'Argument "path" is invalid.';
      }

      window.history.replaceState({}, path, "#".concat(path));
      listener();
      return router;
    },
    stop: function stop() {
      window.removeEventListener('popstate', listener);
      return router;
    }
  };
}();
/* exported router */