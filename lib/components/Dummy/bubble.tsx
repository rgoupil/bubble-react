import { Dummy } from '.';
import { createBubblePlugin, useComponentState } from '../../shared';

interface State {
  name: string;
}

const initState: State = {
  name: 'Doofus',
};

export const DummyApp = () => {
  const { name } = useComponentState<State>();

  return (
    <Dummy name={name} />
  );
};

createBubblePlugin('Dummy', DummyApp, initState);
