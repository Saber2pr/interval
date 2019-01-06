"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var saber_interval_1 = require("../core/saber-interval");
var frame = {
    delta: 100,
    isStop: false
};
saber_interval_1.schedule(function (dt) { return console.log('update', dt); }, frame);
setTimeout(function () {
    frame.isStop = true;
}, 2000);
// schedule(() => console.log('simple update!'))
