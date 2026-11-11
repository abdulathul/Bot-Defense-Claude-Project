import type { Meta, StoryObj } from '@storybook/react-vite';
import { LoginPage } from '../pages/LoginPage';

const meta = {
  title: 'Pages/Login',
  component: LoginPage,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LoginPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
