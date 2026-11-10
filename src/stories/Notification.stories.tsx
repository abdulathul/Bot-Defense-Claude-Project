import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Notification,
  Toast,
  type NotificationVariant,
} from '../components/Notification';

const variants: NotificationVariant[] = ['success', 'warning', 'error', 'info'];

const meta = {
  title: 'Components/Notification',
  component: Notification,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'inline-radio', options: variants },
    title: { control: 'text' },
    message: { control: 'text' },
    actionLabel: { control: 'text' },
    onAction: { action: 'action' },
    onClose: { action: 'closed' },
    className: { control: false },
  },
  args: {
    variant: 'success',
    title: 'Changes saved',
    message: 'Your profile has been updated.',
    actionLabel: 'Undo',
  },
} satisfies Meta<typeof Notification>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NotificationVariants: Story = {
  render: () => (
    <div style={{ display: 'grid', maxWidth: 460, gap: 12 }}>
      <Notification
        variant="success"
        title="Changes saved"
        message="Your profile has been updated."
        actionLabel="Undo"
        onClose={() => undefined}
      />
      <Notification
        variant="warning"
        title="Storage almost full"
        message="You have used 90% of your space."
        actionLabel="Upgrade"
        onClose={() => undefined}
      />
      <Notification
        variant="error"
        title="Payment failed"
        message="Check your card details and try again."
        actionLabel="Retry"
        onClose={() => undefined}
      />
      <Notification
        variant="info"
        title="New version available"
        message="Refresh to get the latest features."
        onClose={() => undefined}
      />
    </div>
  ),
};

export const ToastVariants: Story = {
  render: () => (
    <div style={{ display: 'grid', maxWidth: 460, gap: 12 }}>
      {variants.map((variant) => (
        <Toast
          key={variant}
          variant={variant}
          title={variant === 'success' ? 'Changes saved' : `${variant[0].toUpperCase()}${variant.slice(1)} notification`}
          message="Your changes have been updated."
          actionLabel={variant === 'error' ? 'Retry' : 'Action'}
          onClose={() => undefined}
          progress={variant === 'success' ? 68 : undefined}
        />
      ))}
    </div>
  ),
};

function NotificationUsageExamples() {
  const [visible, setVisible] = useState([true, true, true, true]);
  const dismiss = (index: number) => {
    setVisible((items) => items.map((item, itemIndex) => itemIndex === index ? false : item));
  };

  const examples = [
    {
      variant: 'success' as const,
      title: 'Changes saved',
      message: 'Your profile has been updated.',
      actionLabel: 'Undo',
    },
    {
      variant: 'error' as const,
      title: 'Payment failed',
      message: 'Check your card details and try again.',
      actionLabel: 'Retry',
    },
    {
      variant: 'warning' as const,
      title: 'Storage almost full',
      message: 'You have used 90% of your space.',
      actionLabel: 'Upgrade',
    },
    {
      variant: 'info' as const,
      title: 'New version available',
      message: 'Refresh to get the latest features.',
    },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))', gap: 12, maxWidth: 760 }}>
      {examples.map((example, index) => visible[index] && (
        <Toast
          key={example.variant}
          {...example}
          onClose={() => dismiss(index)}
          progress={index === 0 ? 68 : undefined}
        />
      ))}
    </div>
  );
}

export const UsageExamples: Story = {
  render: () => <NotificationUsageExamples />,
};

export const ToastWithProgress: Story = {
  render: () => (
    <Toast
      variant="success"
      title="Changes saved"
      message="Your profile has been updated."
      actionLabel="Undo"
      onClose={() => undefined}
      progress={68}
    />
  ),
};
