declare module "lib/saber-interval" {
    export function call<T>(func: (count: number) => T, times?: number): T;
    export namespace Rules {
        const isUndefined: (obj: any) => obj is undefined;
        const isNumber: (obj: any) => obj is number;
        const isFrameProps: (obj: any) => obj is FrameProps;
    }
    interface Frame {
        (): void;
    }
    interface Update {
        (dt: number): void;
    }
    export interface FrameProps {
        delta: number;
    }
    interface UnSchedule {
        (): void;
    }
    export function schedule(update: Update): UnSchedule;
    export function schedule(update: Update, delta: number): UnSchedule;
    export function schedule(update: Update, frameProps: FrameProps): UnSchedule;
    export function scheduleUpdateWithNumber(update: Update, delta: number): Frame;
    export function scheduleUpdateWithFrameProps(update: Update, frameProps: FrameProps): Frame;
    export function scheduleUpdateWithUndefined(update: Update): Frame;
}
declare module "saber-interval" {
    export * from "lib/saber-interval";
}
declare module "test/test" { }
