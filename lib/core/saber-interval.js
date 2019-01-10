"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: AK-12
 * @Date: 2018-12-28 20:09:54
 * @Last Modified by: AK-12
 * @Last Modified time: 2019-01-10 13:21:22
 */
/**
 * call function more times.
 * @example
 * ```ts
call(() => console.log('call func 5 times!'), 5)
 * ```
 * @param func
 * @param times
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
function schedule(update, frameProps) {
    var before = Date.now();
    var delta = {
        value: frameProps ? frameProps.delta : 17
    };
    var cancel = {
        value: frameProps ? frameProps.cancel : false
    };
    var delayCancel = {
        value: frameProps ? frameProps.delayCancel : -1
    };
    var frames = {
        value: frameProps ? frameProps.frames : -1
    };
    var counter = 0;
    var frame = function () {
        if (Date.now() - before > delta.value) {
            if (cancel.value) {
                return;
            }
            if (frames.value > 0) {
                if (counter >= frames.value) {
                    return;
                }
            }
            before = Date.now();
            update(delta.value);
            counter++;
        }
        requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
    if (delayCancel.value > 0) {
        setTimeout(function () { return (cancel.value = true); }, delayCancel.value);
    }
    return function () { return (cancel.value = true); };
}
exports.schedule = schedule;
/**
 * scheduleOnce
 * @example
 * ```ts
// setTimeout 2000
scheduleOnce(dt => console.log('setTimeout!', dt), 2000)
 * ```
 *
 * @param update
 * @param delay
 */
exports.scheduleOnce = function (update, delay) {
    return schedule(update, { delta: delay, frames: 1 });
};
