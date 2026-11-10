import type { Meta, StoryObj } from '@storybook/react-vite';
import { FormsPage } from '../pages/FormsPage';

const meta = {
  title: 'Example/Page/Forms',
  component: FormsPage,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FormsPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FormExamples: Story = {};
