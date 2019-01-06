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
    delta?: number;
    isStop?: boolean;
}
/**
 * schedule
 *
 * @export
 * @param {Update} update
 */
export declare function schedule(update: Update): void;
/**
 * schedule
 *
 * @export
 * @param {Update} update
 * @param {FrameProps} frameProps
 */
export declare function schedule(update: Update, frameProps: FrameProps): void;
export {};
