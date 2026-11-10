import type { Meta, StoryObj } from '@storybook/react-vite';
import { CustomerReviewers } from '../components/CustomerReviewers/CustomerReviewers';

const meta = {
  title: 'Components/Customer Reviewers',
  component: CustomerReviewers,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CustomerReviewers>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
