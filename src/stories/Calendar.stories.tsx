import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Calendar } from '../components/Calendar/Calendar';

const september2025 = new Date(2025, 8, 1);
const range = {
  start: new Date(2025, 8, 9),
  end: new Date(2025, 8, 13),
};

const meta = {
  title: 'Components/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    initialDate: { control: false },
    initialSelectedDate: { control: false },
    initialSelectedRange: { control: false },
    disabledDates: { control: false },
    onDateSelect: { action: 'date selected' },
    onRangeSelect: { action: 'range selected' },
  },
  args: {
    initialDate: september2025,
    selectionMode: 'range',
    initialSelectedRange: range,
    onDateSelect: fn(),
    onRangeSelect: fn(),
  },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SingleDate: Story = {
  args: {
    selectionMode: 'single',
    initialSelectedDate: new Date(2025, 8, 9),
    initialSelectedRange: { start: null, end: null },
  },
};

export const DayStates: Story = {
  args: {
    selectionMode: 'single',
    initialSelectedDate: new Date(2025, 8, 9),
    initialSelectedRange: { start: null, end: null },
    disabledDates: [new Date(2025, 8, 18)],
  },
};

export const HiddenAdjacentDays: Story = {
  args: {
    showAdjacentDays: false,
  },
};
