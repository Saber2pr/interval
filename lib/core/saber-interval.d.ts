/**
 * @export
 * @template T
 * @param {(count: number) => T} func
 * @param {number} [times=1]
 * @returns
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
}
/**
 * @interface UnSchedule
 */
interface UnSchedule {
    (): boolean;
}
/**
 * schedule
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
export {};
