/*rollup sideEffects: true */
import { Dummy, Props } from '.';
import { createBubblePlugin, useComponentState } from '../../shared';

const initialState: Props = {
  name: 'Doofus',
};

// eslint-disable-next-line react-refresh/only-export-components
export default () => createBubblePlugin('Dummy', () => {
  const props = useComponentState<Props>();

  return (
    <Dummy {...props} />
  );
}, initialState);
