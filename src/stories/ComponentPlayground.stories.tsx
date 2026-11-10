import type { Meta, StoryObj } from '@storybook/react-vite';
import { ComponentPlaygroundPage, ThemeSample } from '../pages/ComponentPlaygroundPage';

const meta = {
  title: 'Example/Page/Component Playground',
  component: ComponentPlaygroundPage,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ComponentPlaygroundPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LightAndDark: Story = {};

export const LightMode: Story = {
  render: () => <ThemeSample theme="light" />,
};

export const DarkMode: Story = {
  render: () => <ThemeSample theme="dark" />,
};
