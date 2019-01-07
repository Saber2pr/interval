"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var saber_interval_1 = require("../core/saber-interval");
saber_interval_1.schedule(function (dt) { return console.log('update', dt); }, { delta: 100, delayCancel: 2000 });
// schedule(() => console.log('simple update!'))
