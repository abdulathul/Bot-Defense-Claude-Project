import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';
import type { SVGProps } from 'react';

import { Button } from '../components/Button/Button';

function StarIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false" {...props}>
      <path
        d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-2.9-5.6 2.9 1.1-6.2L3 9.6l6.2-.9L12 3Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/Button',
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
    fullWidth: { table: { disable: true } },
    iconOnly: { control: 'boolean' },
    style: { table: { disable: true } },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#story-args
  args: {
    children: 'Button',
    onClick: fn(),
    size: 'medium',
    fullWidth: false,
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

export const NeutralSmall: Story = {
  args: {
    variant: 'neutral',
    size: 'small',
  },
};

export const SubtleSmall: Story = {
  args: {
    variant: 'subtle',
    size: 'small',
  },
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    disabled: true,
  },
};

export const NeutralDisabled: Story = {
  args: {
    variant: 'neutral',
    disabled: true,
  },
};

export const SubtleDisabled: Story = {
  args: {
    variant: 'subtle',
    disabled: true,
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Delete',
  },
};

export const DangerSubtle: Story = {
  args: {
    variant: 'dangerSubtle',
    children: 'Delete',
  },
};

export const DangerSubtleSmall: Story = {
  args: {
    variant: 'dangerSubtle',
    size: 'small',
    children: 'Delete',
  },
};

export const DangerSmall: Story = {
  args: {
    variant: 'danger',
    size: 'small',
    children: 'Delete',
  },
};

export const DangerDisabled: Story = {
  args: {
    variant: 'danger',
    disabled: true,
    children: 'Delete',
  },
};

export const DangerSubtleDisabled: Story = {
  args: {
    variant: 'dangerSubtle',
    disabled: true,
    children: 'Delete',
  },
};

export const IconPrimary: Story = {
  args: {
    variant: 'primary',
    iconOnly: true,
    children: <StarIcon />,
    'aria-label': 'Add to favorites',
  },
};

export const IconNeutral: Story = {
  args: {
    variant: 'neutral',
    iconOnly: true,
    children: <StarIcon />,
    'aria-label': 'Add to favorites',
  },
};

export const IconSubtle: Story = {
  args: {
    variant: 'subtle',
    iconOnly: true,
    children: <StarIcon />,
    'aria-label': 'Add to favorites',
  },
};

export const IconSmall: Story = {
  args: {
    variant: 'primary',
    size: 'small',
    iconOnly: true,
    children: <StarIcon />,
    'aria-label': 'Add to favorites',
  },
};

export const IconNeutralSmall: Story = {
  args: {
    variant: 'neutral',
    size: 'small',
    iconOnly: true,
    children: <StarIcon />,
    'aria-label': 'Add to favorites',
  },
};

export const IconSubtleSmall: Story = {
  args: {
    variant: 'subtle',
    size: 'small',
    iconOnly: true,
    children: <StarIcon />,
    'aria-label': 'Add to favorites',
  },
};

export const IconDisabled: Story = {
  args: {
    variant: 'primary',
    iconOnly: true,
    children: <StarIcon />,
    'aria-label': 'Add to favorites',
    disabled: true,
  },
};

export const IconNeutralDisabled: Story = {
  args: {
    variant: 'neutral',
    iconOnly: true,
    children: <StarIcon />,
    'aria-label': 'Add to favorites',
    disabled: true,
  },
};

export const IconSubtleDisabled: Story = {
  args: {
    variant: 'subtle',
    iconOnly: true,
    children: <StarIcon />,
    'aria-label': 'Add to favorites',
    disabled: true,
  },
};
