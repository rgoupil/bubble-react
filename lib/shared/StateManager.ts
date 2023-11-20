type StateListenerType<T> = (state: T) => void;

export type StateType = Exclude<object, { bubble: never }>;

export class StateManager<T extends StateType> {
  private state: T;
  private listeners: Array<StateListenerType<T>> = [];

  constructor(initState: T) {
    this.state = initState;
  }

  getState() {
    return this.state;
  }

  subscribe(listener: StateListenerType<T>) {
    this.listeners = [...this.listeners, listener];
  }

  unsubscribe(listener: StateListenerType<T>) {
    this.listeners = this.listeners.filter((l) => l !== listener);
  }

  updateState(properties: Partial<T>) {
    const newState = Object.keys(properties).reduce((acc, prop) => {
      if (prop in this.state && prop !== 'bubble' && (this.state as never)[prop] !== (properties as never)[prop]) {
        acc[prop] = (properties as never)[prop];
      }
      return acc;
    }, {} as { [key: string]: unknown });

    this.state = { ...this.state, ...newState };
    this.listeners.forEach((l) => l(this.state));
  }
}
