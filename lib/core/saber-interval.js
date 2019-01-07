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
    var frame = function () {
        if (cancel.value) {
            return;
        }
        if (Date.now() - before > delta.value) {
            before = Date.now();
            update(delta.value);
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
