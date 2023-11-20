import type { StoryObj } from '@storybook/react';
import { Dummy } from '.';
declare const meta: {
    title: string;
    component: typeof Dummy;
    tags: string[];
    argTypes: {
        name: {
            control: string;
        };
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Primary: Story;
