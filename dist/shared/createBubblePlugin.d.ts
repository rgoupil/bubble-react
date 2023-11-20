import { BubbleContext } from './BubbleContext';
import { BubbleInstance } from './BubbleInstance';
import { StateManager } from '.';
declare global {
    interface Window {
        initPlugin: (instance: BubbleInstance<any>, context: BubbleContext) => StateManager<any>;
        previewPlugin: (instance: BubbleInstance<any>, properties: any) => void;
    }
}
export declare const createBubblePlugin: <State extends object>(Element: () => JSX.Element, initState: State) => (instance: BubbleInstance<any>, context: BubbleContext) => StateManager<any>;
