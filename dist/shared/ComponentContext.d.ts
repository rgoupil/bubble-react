import { ReactNode } from 'react';
import { StateManager } from './StateManager';
export declare const ComponentContextComponent: <T extends object>({ children, stateManager, }: {
    children: ReactNode;
    stateManager: StateManager<T>;
}) => import("react/jsx-runtime").JSX.Element;
export declare const useStateManager: <T extends object>() => StateManager<T>;
export declare const useComponentState: <T extends object>() => T;
