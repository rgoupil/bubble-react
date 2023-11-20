import { Root, createRoot } from 'react-dom/client';
import { ComponentContextComponent } from './ComponentContext';
import { BubbleContext } from './BubbleContext';
import { BubbleInstance, BubblePreviewInstance } from './BubbleInstance';
import { StateManager } from '.';
import { StrictMode } from 'react';

declare global {
  interface Window {
    components: Record<string, {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      initPlugin: (instance: BubbleInstance<any>, context: BubbleContext) => StateManager<any>;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      previewPlugin: (instance: BubbleInstance<any>, properties: any) => void;
    }>;
  }
}

function renderPlugin<State extends object>(root: Root, initState: State, Element: () => JSX.Element) {
  const stateManager = new StateManager(initState);

  root.render(
    <StrictMode>
      <ComponentContextComponent stateManager={stateManager}>
        <Element />
      </ComponentContextComponent>
    </StrictMode>
  );

  return stateManager;
}

export const createBubblePlugin = <State extends object>(name: string, Element: () => JSX.Element, initState: State) => {
  if (!window.components) {
    window.components = {};
  }

  if (window.components[name]) {
    return;
  }

  window.components[name] = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    initPlugin: (instance: BubbleInstance<State>, _context: BubbleContext) => {
      const div = document.createElement('div');
      instance.canvas.append(div);
      div.style.height = '100%';
      div.style.width = '100%';

      const root = createRoot(div);

      const stateManager = renderPlugin(root, initState, Element);

      instance.data.stateManager = stateManager;

      const state = stateManager.getState();
      for (const prop in state) {
        instance.publishState(prop, state[prop]);
        stateManager.subscribe((state) => {
          instance.publishState(prop, state[prop]);
        });
      }

      return stateManager;
    },
    previewPlugin: (instance: BubblePreviewInstance<State>, properties: State) => {
      const div = document.createElement('div');
      instance.canvas.append(div);
      div.style.height = '100%';
      div.style.width = '100%';

      const root = createRoot(div);

      return renderPlugin(root, properties, Element);
    },
  };
};
