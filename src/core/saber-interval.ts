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
export interface Update {
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
  /**
   * the times of update.
   *
   * @type {number}
   * @memberof FrameProps
   */
  frames?: number
}
/**
 * @interface UnSchedule
 */
export interface UnSchedule {
  (): boolean
}
/**
 * schedule
 * @example
 * ```ts
// simple update
schedule(() => console.log('simple update!'))

// delay cancel update
schedule(() => console.log('delay cancel update!'), {
  delta: 100,
  delayCancel: 2000
})
 * ```
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
  let frames = {
    value: frameProps ? frameProps.frames : -1
  }
  let counter = 0
  const frame = () => {
    if (Date.now() - before > delta.value) {
      if (cancel.value) {
        return
      }
      if (frames.value > 0) {
        if (counter >= frames.value) {
          return
        }
      }
      before = Date.now()
      update(delta.value)
      counter++
    }
    requestAnimationFrame(frame)
  }
  requestAnimationFrame(frame)
  if (delayCancel.value > 0) {
    setTimeout(() => (cancel.value = true), delayCancel.value)
  }
  return () => (cancel.value = true)
}
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
export const scheduleOnce = (update: Update, delay: number) =>
  schedule(update, { delta: delay, frames: 1 })
