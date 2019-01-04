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
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: AK-12
 * @Date: 2018-12-28 20:09:54
 * @Last Modified by: AK-12
 * @Last Modified time: 2019-01-03 11:22:17
 */
/**
 * @export
 * @template T
 * @param {(count: number) => T} func
 * @param {number} [times=1]
 * @returns
 */
function call(func, times) {
    if (times === void 0) { times = 1; }
    var count = 0;
    var result;
    var loop = function () {
        if (count >= times) {
            return result;
        }
        count++;
        result = func(count);
        loop();
        return result;
    };
    return loop();
}
exports.call = call;
/**
 * Rules
 */
var Rules;
(function (Rules) {
    /**
     * @param obj
     */
    Rules.isUndefined = function (obj) {
        return typeof obj === 'undefined';
    };
    /**
     * @param obj
     */
    Rules.isNumber = function (obj) { return typeof obj === 'number'; };
    /**
     * @param obj
     */
    Rules.isFrameProps = function (obj) {
        return typeof obj['delta'] !== 'undefined';
    };
})(Rules = exports.Rules || (exports.Rules = {}));
function schedule(update, props) {
    var frame;
    if (Rules.isUndefined(props)) {
        frame = scheduleUpdateWithUndefined(update);
    }
    else if (Rules.isNumber(props)) {
        frame = scheduleUpdateWithNumber(update, props);
    }
    else if (Rules.isFrameProps(props)) {
        frame = scheduleUpdateWithFrameProps(update, props);
    }
    var unschedule = requestAnimationFrame(frame);
    return function () { return cancelAnimationFrame(unschedule); };
}
exports.schedule = schedule;
/**
 * the delta is const
 *
 * @export
 * @param {Update} update
 * @param {number} delta
 * @returns {Frame}
 */
function scheduleUpdateWithNumber(update, delta) {
    var before = Date.now();
    var frame = function () {
        if (Date.now() - before > delta) {
            before = Date.now();
            update(delta);
        }
        requestAnimationFrame(frame);
    };
    return frame;
}
exports.scheduleUpdateWithNumber = scheduleUpdateWithNumber;
/**
 * the delta can be changed
 *
 * @export
 * @param {Update} update
 * @param {FrameProps} frameProps
 * @returns {Frame}
 */
function scheduleUpdateWithFrameProps(update, frameProps) {
    var before = Date.now();
    var frame = function () {
        if (Date.now() - before > frameProps.delta) {
            before = Date.now();
            update(frameProps.delta);
        }
        requestAnimationFrame(frame);
    };
    return frame;
}
exports.scheduleUpdateWithFrameProps = scheduleUpdateWithFrameProps;
/**
 * the delta is 1/60 second
 *
 * @export
 * @param {Update} update
 * @returns {Frame}
 */
function scheduleUpdateWithUndefined(update) {
    var before = Date.now();
    var frame = function () {
        if (Date.now() - before > 17) {
            before = Date.now();
            update(17);
        }
        requestAnimationFrame(frame);
    };
    return frame;
}
exports.scheduleUpdateWithUndefined = scheduleUpdateWithUndefined;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(0));
var saber_interval_1 = __webpack_require__(0);
saber_interval_1.schedule(function (dt) { return console.log(dt); }, 1000);


/***/ })
/******/ ]);