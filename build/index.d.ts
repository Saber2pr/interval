declare module "lib/saber-interval" {
    /**
     * @export
     * @template T
     * @param {(count: number) => T} func
     * @param {number} [times=1]
     * @returns
     */
    export function call<T>(func: (count: number) => T, times?: number): T;
    /**
     * Rules
     */
    export namespace Rules {
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
    export function schedule(update: Update): UnSchedule;
    /**
     * the delta is const
     *
     * @export
     * @param {Update} update
     * @param {number} delta
     * @returns {UnSchedule}
     */
    export function schedule(update: Update, delta: number): UnSchedule;
    /**
     * the delta can be changed
     *
     * @export
     * @param {Update} update
     * @param {FrameProps} frameProps
     * @returns {UnSchedule}
     */
    export function schedule(update: Update, frameProps: FrameProps): UnSchedule;
    /**
     * the delta is const
     *
     * @export
     * @param {Update} update
     * @param {number} delta
     * @returns {Frame}
     */
    export function scheduleUpdateWithNumber(update: Update, delta: number): Frame;
    /**
     * the delta can be changed
     *
     * @export
     * @param {Update} update
     * @param {FrameProps} frameProps
     * @returns {Frame}
     */
    export function scheduleUpdateWithFrameProps(update: Update, frameProps: FrameProps): Frame;
    /**
     * the delta is 1/60 second
     *
     * @export
     * @param {Update} update
     * @returns {Frame}
     */
    export function scheduleUpdateWithUndefined(update: Update): Frame;
}
declare module "saber-interval" {
    export * from "lib/saber-interval";
}
declare module "test/test" { }
