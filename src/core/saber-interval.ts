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
export function call<T>(func: (count: number) => T, times: number = 1) {
  let count = 0
  let result: T
  let loop = (): T => {
    if (count >= times) {
      return result
    }
    count++
    result = func(count)
    loop()
    return result
  }
  return loop()
}
/**
 * @interface Update
 */
interface Update {
  (dt: number): void
}
/**
 * @export
 * @interface FrameProps
 */
export interface FrameProps {
  delta?: number
  isStop?: boolean
}
/**
 * schedule
 *
 * @export
 * @param {Update} update
 */
export function schedule(update: Update): void
/**
 * schedule
 *
 * @export
 * @param {Update} update
 * @param {FrameProps} frameProps
 */
export function schedule(update: Update, frameProps: FrameProps): void
export function schedule(update: Update, frameProps?: FrameProps): void {
  let before = Date.now()
  const frame = () => {
    let delta = frameProps ? frameProps.delta : 17
    if (Date.now() - before > delta) {
      before = Date.now()
      update(delta)
    }
    if (frameProps ? frameProps.isStop : false) {
      return
    }
    requestAnimationFrame(frame)
  }
  requestAnimationFrame(frame)
}
