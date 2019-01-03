define("lib/saber-interval", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
    var Rules;
    (function (Rules) {
        Rules.isUndefined = function (obj) {
            return typeof obj === 'undefined';
        };
        Rules.isNumber = function (obj) { return typeof obj === 'number'; };
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
