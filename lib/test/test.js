"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var saber_interval_1 = require("../core/saber-interval");
// simple update
saber_interval_1.schedule(function () { return console.log('simple update!'); });
// delay cancel update
saber_interval_1.schedule(function () { return console.log('delay cancel update!'); }, {
    delta: 100,
    delayCancel: 2000
});
// setTimeout 2000
saber_interval_1.scheduleOnce(function (dt) { return console.log('setTimeout!', dt); }, 2000);
saber_interval_1.call(function () { return console.log('call func 5 times!'); }, 5);
