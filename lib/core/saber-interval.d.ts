/**
 * call function more times.
 * @example
 * ```ts
call(() => console.log('call func 5 times!'), 5)
 * ```
 * @param func
 * @param times
 */
export declare function call<T>(func: (count: number) => T, times?: number): T;
/**
 * @interface Update
 */
interface Update {
    (dt: number): void;
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
    delta: number;
    /**
     * destroy schedule?
     *
     * @type {boolean}
     * @memberof FrameProps
     */
    cancel?: boolean;
    /**
     * timeout to destroy schedule auto.
     *
     * @type {number}
     * @memberof FrameProps
     */
    delayCancel?: number;
    /**
     * the times of update.
     *
     * @type {number}
     * @memberof FrameProps
     */
    frames?: number;
}
/**
 * @interface UnSchedule
 */
interface UnSchedule {
    (): boolean;
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
export declare function schedule(update: Update): UnSchedule;
/**
 * schedule
 *
 * @export
 * @param {Update} update
 * @param {FrameProps} frameProps
 * @returns {UnSchedule}
 */
export declare function schedule(update: Update, frameProps: FrameProps): UnSchedule;
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
export declare const scheduleOnce: (update: Update, delay: number) => UnSchedule;
export {};
