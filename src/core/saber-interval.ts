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
  /**
   * interval of the frames.
   *
   * @type {number}
   * @memberof FrameProps
   */
  delta: number
  /**
   * destroy schedule?
   *
   * @type {boolean}
   * @memberof FrameProps
   */
  cancel?: boolean
  /**
   * timeout to destroy schedule auto.
   *
   * @type {number}
   * @memberof FrameProps
   */
  delayCancel?: number
}
/**
 * @interface UnSchedule
 */
interface UnSchedule {
  (): boolean
}
/**
 * schedule
 *
 * @export
 * @param {Update} update
 * @returns {UnSchedule}
 */
export function schedule(update: Update): UnSchedule
/**
 * schedule
 *
 * @export
 * @param {Update} update
 * @param {FrameProps} frameProps
 * @returns {UnSchedule}
 */
export function schedule(update: Update, frameProps: FrameProps): UnSchedule
export function schedule(update: Update, frameProps?: FrameProps): UnSchedule {
  let before = Date.now()
  let delta = {
    value: frameProps ? frameProps.delta : 17
  }
  let cancel = {
    value: frameProps ? frameProps.cancel : false
  }
  let delayCancel = {
    value: frameProps ? frameProps.delayCancel : -1
  }
  const frame = () => {
    if (cancel.value) {
      return
    }
    if (Date.now() - before > delta.value) {
      before = Date.now()
      update(delta.value)
    }
    requestAnimationFrame(frame)
  }
  requestAnimationFrame(frame)
  if (delayCancel.value > 0) {
    setTimeout(() => (cancel.value = true), delayCancel.value)
  }
  return () => (cancel.value = true)
}
