/**
 * @export
 * @template T
 * @param {(count: number) => T} func
 * @param {number} [times=1]
 * @returns
 */
export declare function call<T>(func: (count: number) => T, times?: number): T;
/**
 * Rules
 */
export declare namespace Rules {
    /**
     * @param obj
     */
    const isUndefined: (obj: any) => obj is undefined;
    /**
     * @param obj
     */
    const isNumber: (obj: any) => obj is number;
    /**
     * @param obj
     */
    const isFrameProps: (obj: any) => obj is FrameProps;
}
/**
 * @interface Frame
 */
interface Frame {
    (): void;
}
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
    delta: number;
}
/**
 * @interface UnSchedule
 */
interface UnSchedule {
    (): void;
}
/**
 * the delta is 1/60 second
 *
 * @export
 * @param {Update} update
 * @returns {UnSchedule}
 */
export declare function schedule(update: Update): UnSchedule;
/**
 * the delta is const
 *
 * @export
 * @param {Update} update
 * @param {number} delta
 * @returns {UnSchedule}
 */
export declare function schedule(update: Update, delta: number): UnSchedule;
/**
 * the delta can be changed
 *
 * @export
 * @param {Update} update
 * @param {FrameProps} frameProps
 * @returns {UnSchedule}
 */
export declare function schedule(update: Update, frameProps: FrameProps): UnSchedule;
/**
 * the delta is const
 *
 * @export
 * @param {Update} update
 * @param {number} delta
 * @returns {Frame}
 */
export declare function scheduleUpdateWithNumber(update: Update, delta: number): Frame;
/**
 * the delta can be changed
 *
 * @export
 * @param {Update} update
 * @param {FrameProps} frameProps
 * @returns {Frame}
 */
export declare function scheduleUpdateWithFrameProps(update: Update, frameProps: FrameProps): Frame;
/**
 * the delta is 1/60 second
 *
 * @export
 * @param {Update} update
 * @returns {Frame}
 */
export declare function scheduleUpdateWithUndefined(update: Update): Frame;
export {};
