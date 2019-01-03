"use strict";
exports.__esModule = true;
var saber_interval_1 = require("../lib/saber-interval");
var frame = {
    delta: 1000
};
setTimeout(function () {
    frame.delta = 100;
}, 3000);
saber_interval_1.schedule(function (dt) { return console.log('update', dt); }, frame);
// schedule(dt => console.log('update', dt), 1000)
// schedule(dt => console.log('update', dt))
