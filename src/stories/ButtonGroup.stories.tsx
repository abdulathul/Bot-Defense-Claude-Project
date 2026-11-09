import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import { Button } from '../components/Button/Button';
import { ButtonGroup } from '../components/ButtonGroup/ButtonGroup';

const meta = {
  title: 'Components/Button Group',
  component: ButtonGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    alignment: { control: 'inline-radio' },
  },
  args: {
    'aria-label': 'Button group',
  },
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

function GroupButtons() {
  return (
    <>
      <Button fullWidth={false} variant="subtle" onClick={fn()}>Button</Button>
      <Button fullWidth={false} variant="primary" onClick={fn()}>Button</Button>
    </>
  );
}

export const Justify: Story = {
  render: (args) => <ButtonGroup {...args}><GroupButtons /></ButtonGroup>,
  args: { alignment: 'justify' },
};

export const Start: Story = {
  render: (args) => <ButtonGroup {...args}><GroupButtons /></ButtonGroup>,
  args: { alignment: 'start' },
};

export const End: Story = {
  render: (args) => <ButtonGroup {...args}><GroupButtons /></ButtonGroup>,
  args: { alignment: 'end' },
};

export const Center: Story = {
  render: (args) => <ButtonGroup {...args}><GroupButtons /></ButtonGroup>,
  args: { alignment: 'center' },
};

export const Stack: Story = {
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="subtle" onClick={fn()}>Button</Button>
      <Button variant="primary" onClick={fn()}>Button</Button>
    </ButtonGroup>
  ),
  args: { alignment: 'stack' },
};
