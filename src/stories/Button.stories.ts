import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import { Button } from '../components/Button/Button';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/Button',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/arg-types
  argTypes: {
    variant: { control: 'inline-radio' },
    size: { control: 'inline-radio' },
    style: { table: { disable: true } },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#story-args
  args: {
    children: 'Button',
    onClick: fn(),
    style: { width: 'auto' },
    size: 'medium',
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    variant: 'primary',
  },
};

export const Neutral: Story = {
  args: {
    variant: 'neutral',
  },
};

export const Subtle: Story = {
  args: {
    variant: 'subtle',
  },
};

export const Small: Story = {
  args: {
    variant: 'primary',
    size: 'small',
  },
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    disabled: true,
  },
};
