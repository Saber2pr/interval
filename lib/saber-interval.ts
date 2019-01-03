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
 * Rules
 */
export namespace Rules {
  /**
   * @param obj
   */
  export const isUndefined = (obj: any): obj is undefined =>
    typeof obj === 'undefined'
  /**
   * @param obj
   */
  export const isNumber = (obj: any): obj is number => typeof obj === 'number'
  /**
   * @param obj
   */
  export const isFrameProps = (obj: any): obj is FrameProps =>
    typeof (obj as FrameProps)['delta'] !== 'undefined'
}
/**
 * @interface Frame
 */
interface Frame {
  (): void
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
  delta: number
}
/**
 * @interface UnSchedule
 */
interface UnSchedule {
  (): void
}
/**
 * the delta is 1/60 second
 *
 * @export
 * @param {Update} update
 * @returns {UnSchedule}
 */
export function schedule(update: Update): UnSchedule
/**
 * the delta is const
 *
 * @export
 * @param {Update} update
 * @param {number} delta
 * @returns {UnSchedule}
 */
export function schedule(update: Update, delta: number): UnSchedule
/**
 * the delta can be changed
 *
 * @export
 * @param {Update} update
 * @param {FrameProps} frameProps
 * @returns {UnSchedule}
 */
export function schedule(update: Update, frameProps: FrameProps): UnSchedule
export function schedule(
  update: Update,
  props?: FrameProps | number
): UnSchedule {
  let frame: Frame
  if (Rules.isUndefined(props)) {
    frame = scheduleUpdateWithUndefined(update)
  } else if (Rules.isNumber(props)) {
    frame = scheduleUpdateWithNumber(update, props)
  } else if (Rules.isFrameProps(props)) {
    frame = scheduleUpdateWithFrameProps(update, props)
  }
  let unschedule = requestAnimationFrame(frame)
  return () => cancelAnimationFrame(unschedule)
}
/**
 * the delta is const
 *
 * @export
 * @param {Update} update
 * @param {number} delta
 * @returns {Frame}
 */
export function scheduleUpdateWithNumber(update: Update, delta: number): Frame {
  let before = Date.now()
  const frame = () => {
    if (Date.now() - before > delta) {
      before = Date.now()
      update(delta)
    }
    requestAnimationFrame(frame)
  }
  return frame
}
/**
 * the delta can be changed
 *
 * @export
 * @param {Update} update
 * @param {FrameProps} frameProps
 * @returns {Frame}
 */
export function scheduleUpdateWithFrameProps(
  update: Update,
  frameProps: FrameProps
): Frame {
  let before = Date.now()
  const frame = () => {
    if (Date.now() - before > frameProps.delta) {
      before = Date.now()
      update(frameProps.delta)
    }
    requestAnimationFrame(frame)
  }
  return frame
}
/**
 * the delta is 1/60 second
 *
 * @export
 * @param {Update} update
 * @returns {Frame}
 */
export function scheduleUpdateWithUndefined(update: Update): Frame {
  let before = Date.now()
  const frame: Frame = () => {
    if (Date.now() - before > 17) {
      before = Date.now()
      update(17)
    }
    requestAnimationFrame(frame)
  }
  return frame
}
