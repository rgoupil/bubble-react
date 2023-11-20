import { BubbleContext } from './BubbleContext';
import { BubbleInstance } from './BubbleInstance';
import { StateManager } from '.';
declare global {
    interface Window {
        components: Record<string, {
            initPlugin: (instance: BubbleInstance<any>, context: BubbleContext) => StateManager<any>;
            previewPlugin: (instance: BubbleInstance<any>, properties: any) => void;
        }>;
    }
}
export declare const createBubblePlugin: <State extends object>(name: string, Element: () => JSX.Element, initState: State) => void;
