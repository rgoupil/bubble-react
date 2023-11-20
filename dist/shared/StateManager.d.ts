type StateListenerType<T> = (state: T) => void;
export type StateType = Exclude<object, {
    bubble: never;
}>;
export declare class StateManager<T extends StateType> {
    private state;
    private listeners;
    constructor(initState: T);
    getState(): T;
    subscribe(listener: StateListenerType<T>): void;
    unsubscribe(listener: StateListenerType<T>): void;
    updateState(properties: Partial<T>): void;
}
export {};
