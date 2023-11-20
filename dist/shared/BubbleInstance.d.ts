import { StateManager } from './StateManager';
export interface BubbleInstance<State extends object = never> {
    publishState: <T>(key: string, value: T) => void;
    canvas: HTMLElement;
    data: {
        stateManager: StateManager<State>;
    };
}
export type BubblePreviewInstance<State extends object = never> = Pick<BubbleInstance<State>, 'canvas'>;
