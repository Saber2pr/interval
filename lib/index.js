"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./core/saber-interval"));
// import { schedule, FrameProps } from './core/saber-interval'
// let frame: FrameProps = {
//   delta: 100,
//   isStop: false
// }
// schedule(dt => console.log('update', dt), frame)
// setTimeout(() => {
//   frame.isStop = true
// }, 2000)
// schedule(() => console.log('simple update!'))
