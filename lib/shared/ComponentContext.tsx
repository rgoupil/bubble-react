import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { StateManager, StateType } from './StateManager';

const ComponentContext = createContext({} as StateManager<StateType>);

export const ComponentContextComponent = function <T extends StateType>({
  children,
  stateManager,
}: {
  children: ReactNode;
  stateManager: StateManager<T>;
}) {
  return (
    <ComponentContext.Provider value={stateManager as never}>
      {children}
    </ComponentContext.Provider>
  );
};

export const useStateManager = <T extends StateType>(): StateManager<T> =>
  useContext(ComponentContext as never);

export const useComponentState = <T extends StateType>() => {
  const stateManager = useStateManager<T>();
  const [state, setState] = useState(stateManager.getState());
  useEffect(() => {
    const listener = (newState: T) => {
      setState(newState);
    };
    stateManager.subscribe(listener);
    return () => {
      stateManager.unsubscribe(listener);
    };
  }, [stateManager]);

  return state;
};
