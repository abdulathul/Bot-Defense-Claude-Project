import type { Meta, StoryObj } from '@storybook/react-vite';
import { Accordion } from '../components/Accordion/Accordion';

const items = [
  {
    title: 'Title',
    content: 'Answer the frequently asked question in a simple sentence, a longish paragraph, or even in a list.',
  },
  { title: 'Title', content: 'Add a clear and concise answer to the question.' },
  { title: 'Title', content: 'Add a clear and concise answer to the question.' },
  { title: 'Title', content: 'Add a clear and concise answer to the question.' },
  { title: 'Title', content: 'Add a clear and concise answer to the question.' },
];

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    items: { control: false },
    defaultOpenIndex: { control: 'number' },
  },
  args: {
    items,
    defaultOpenIndex: 0,
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AllCollapsed: Story = {
  args: {
    defaultOpenIndex: null,
  },
};
