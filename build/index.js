module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("diff");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = blame;

var _diff = __webpack_require__(0);

function blame(codes) {
  var passedOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (!(Array.isArray(codes) && codes.every(function (item) {
    return item instanceof Object || typeof item === 'string';
  }))) {
    throw new TypeError('Value of argument "codes" violates contract.\n\nExpected:\nArray<Object | string>\n\nGot:\n' + _inspect(codes));
  }

  if (!(passedOptions instanceof Object)) {
    throw new TypeError('Value of argument "passedOptions" violates contract.\n\nExpected:\nObject\n\nGot:\n' + _inspect(passedOptions));
  }

  var result = [];
  var options = Object.assign({}, passedOptions);

  // Last code is oldest

  if (!(options instanceof Object)) {
    throw new TypeError('Value of variable "options" violates contract.\n\nExpected:\nObject\n\nGot:\n' + _inspect(options));
  }

  codes.reverse().forEach(function (compareWith, codeIndex) {
    if (!(compareWith instanceof Object || typeof compareWith === 'string')) {
      throw new TypeError('Value of argument "compareWith" violates contract.\n\nExpected:\nObject | string\n\nGot:\n' + _inspect(compareWith));
    }

    if (!(typeof codeIndex === 'number')) {
      throw new TypeError('Value of argument "codeIndex" violates contract.\n\nExpected:\nnumber\n\nGot:\n' + _inspect(codeIndex));
    }

    var base = codes[codeIndex - 1];

    if (!(base == null || base instanceof Object || typeof base === 'string')) {
      throw new TypeError('Value of variable "base" violates contract.\n\nExpected:\n?Object | string\n\nGot:\n' + _inspect(base));
    }

    var compareWithCode = typeof compareWith === 'string' ? compareWith : options.getCode(compareWith);

    // Diff code

    if (!(typeof compareWithCode === 'string')) {
      throw new TypeError('Value of variable "compareWithCode" violates contract.\n\nExpected:\nstring\n\nGot:\n' + _inspect(compareWithCode));
    }

    var diffResults = null;

    if (!(diffResults == null || Array.isArray(diffResults))) {
      throw new TypeError('Value of variable "diffResults" violates contract.\n\nExpected:\n?Array\n\nGot:\n' + _inspect(diffResults));
    }

    var diffOptions = {
      newlineIsToken: false
    };
    if (base) {
      var baseCode = typeof base === 'string' ? base : options.getCode(base);

      if (!(typeof baseCode === 'string')) {
        throw new TypeError('Value of variable "baseCode" violates contract.\n\nExpected:\nstring\n\nGot:\n' + _inspect(baseCode));
      }

      diffResults = (0, _diff.diffLines)(baseCode, compareWithCode, diffOptions);

      if (!(diffResults == null || Array.isArray(diffResults))) {
        throw new TypeError('Value of variable "diffResults" violates contract.\n\nExpected:\n?Array\n\nGot:\n' + _inspect(diffResults));
      }
    } else {
      diffResults = (0, _diff.diffLines)('', compareWithCode, diffOptions);

      if (!(diffResults == null || Array.isArray(diffResults))) {
        throw new TypeError('Value of variable "diffResults" violates contract.\n\nExpected:\n?Array\n\nGot:\n' + _inspect(diffResults));
      }
    }

    // Walk through diff result and check which parts needs to be updated
    var lineIndex = 0;
    diffResults.forEach(function (diffResult) {
      if (!(diffResult instanceof Object)) {
        throw new TypeError('Value of argument "diffResult" violates contract.\n\nExpected:\nObject\n\nGot:\n' + _inspect(diffResult));
      }

      if (diffResult.added) {
        diffResult.value.split('\n').slice(0, diffResult.count).forEach(function (line) {
          if (!(typeof line === 'string')) {
            throw new TypeError('Value of argument "line" violates contract.\n\nExpected:\nstring\n\nGot:\n' + _inspect(line));
          }

          // Add line to result
          result.splice(lineIndex, 0, {
            origin: typeof compareWith === 'string' ? codes.length - codeIndex - 1 : options.getOrigin(compareWith),
            value: line.trimRight()
          });
          lineIndex += 1;
        });
      } else if (diffResult.removed) {
        // Remove lines from result
        result.splice(lineIndex, diffResult.count);
      } else {
        // Nothing to do as the code is already part of the result
        lineIndex += diffResult.count;

        if (!(typeof lineIndex === 'number')) {
          throw new TypeError('Value of variable "lineIndex" violates contract.\n\nExpected:\nnumber\n\nGot:\n' + _inspect(lineIndex));
        }
      }
    });
  });

  return result;
}

function _inspect(input, depth) {
  var maxDepth = 4;
  var maxKeys = 15;

  if (depth === undefined) {
    depth = 0;
  }

  depth += 1;

  if (input === null) {
    return 'null';
  } else if (input === undefined) {
    return 'void';
  } else if (typeof input === 'string' || typeof input === 'number' || typeof input === 'boolean') {
    return typeof input === 'undefined' ? 'undefined' : _typeof(input);
  } else if (Array.isArray(input)) {
    if (input.length > 0) {
      if (depth > maxDepth) return '[...]';

      var first = _inspect(input[0], depth);

      if (input.every(function (item) {
        return _inspect(item, depth) === first;
      })) {
        return first.trim() + '[]';
      } else {
        return '[' + input.slice(0, maxKeys).map(function (item) {
          return _inspect(item, depth);
        }).join(', ') + (input.length >= maxKeys ? ', ...' : '') + ']';
      }
    } else {
      return 'Array';
    }
  } else {
    var keys = Object.keys(input);

    if (!keys.length) {
      if (input.constructor && input.constructor.name && input.constructor.name !== 'Object') {
        return input.constructor.name;
      } else {
        return 'Object';
      }
    }

    if (depth > maxDepth) return '{...}';
    var indent = '  '.repeat(depth - 1);
    var entries = keys.slice(0, maxKeys).map(function (key) {
      return (/^([A-Z_$][A-Z0-9_$]*)$/i.test(key) ? key : JSON.stringify(key)) + ': ' + _inspect(input[key], depth) + ';';
    }).join('\n  ' + indent);

    if (keys.length >= maxKeys) {
      entries += '\n  ' + indent + '...';
    }

    if (input.constructor && input.constructor.name && input.constructor.name !== 'Object') {
      return input.constructor.name + ' {\n  ' + indent + entries + '\n' + indent + '}';
    } else {
      return '{\n  ' + indent + entries + '\n' + indent + '}';
    }
  }
}

/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map