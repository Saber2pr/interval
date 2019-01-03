define("lib/saber-interval", ["require", "exports"], function (require, exports) {
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
});
define("saber-interval", ["require", "exports", "lib/saber-interval"], function (require, exports, saber_interval_1) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    __export(saber_interval_1);
});
define("test/test", ["require", "exports", "lib/saber-interval"], function (require, exports, saber_interval_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var frame = {
        delta: 1000
    };
    setTimeout(function () {
        frame.delta = 100;
    }, 3000);
    saber_interval_2.schedule(function (dt) { return console.log('update', dt); }, frame);
});
// schedule(dt => console.log('update', dt), 1000)
// schedule(dt => console.log('update', dt))
