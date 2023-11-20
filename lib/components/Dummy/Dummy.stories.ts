import type { Meta, StoryObj } from '@storybook/react';

import { Dummy } from '.';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Dummy',
  component: Dummy,
  tags: ['autodocs'],
  argTypes: {
    name: { control: 'string' },
  },
} satisfies Meta<typeof Dummy>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    name: 'Doofus',
  },
};
