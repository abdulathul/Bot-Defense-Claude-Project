import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Button } from '../components/Button/Button';
import { Dialog, DialogBody, type DialogTheme } from '../components/Dialog/Dialog';

const message = (
  <>
    <p>We just released version 3.0 of the Simple Design System. Would you like to update?</p>
    <p>If you prefer to wait, automatic updates are scheduled for 23:00 on the last Wednesday of every month.</p>
  </>
);

const meta = {
  title: 'Components/Dialog',
  component: Dialog,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    open: { control: false },
    onClose: { control: false },
    closeOnBackdropClick: { control: 'boolean' },
    title: { control: 'text' },
    description: { control: false },
    actions: { control: false },
    theme: { control: 'inline-radio', options: ['light', 'dark'] },
    className: { control: false },
    titleId: { table: { disable: true } },
  },
  args: {
    open: false,
    onClose: fn(),
    title: 'Would you like to upgrade?',
    description: message,
    theme: 'light',
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

function DialogExample({ theme = 'light', initiallyOpen = true }: { theme?: DialogTheme; initiallyOpen?: boolean }) {
  const [open, setOpen] = useState(initiallyOpen);
  const dark = theme === 'dark';

  return (
    <main
      style={{
        display: 'grid',
        minHeight: 560,
        placeItems: 'center',
        padding: 24,
        background: dark ? '#2c2c2c' : '#f5f5f5',
      }}
    >
      <Button variant={dark ? 'neutral' : 'primary'} fullWidth={false} onClick={() => setOpen(true)}>
        Open dialog
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        theme={theme}
        title="Would you like to upgrade?"
        description={message}
        actions={
          <>
            <Button variant="neutral" fullWidth={false} onClick={() => setOpen(false)}>
              View planned updates
            </Button>
            <Button variant="primary" fullWidth={false} onClick={() => setOpen(false)}>
              Update to version 3.0
            </Button>
          </>
        }
      />
    </main>
  );
}

export const LightDesktop: Story = {
  render: () => <DialogExample />,
};

export const LightMobile: Story = {
  render: () => <DialogExample />,
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
};

export const DarkDesktop: Story = {
  render: () => <DialogExample theme="dark" />,
};

export const DarkMobile: Story = {
  render: () => <DialogExample theme="dark" />,
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
};

export const DialogBodyVariations: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))', gap: 24, padding: 24, background: '#f5f5f5' }}>
      {(['light', 'dark'] as const).map((theme) => (
        <div
          key={theme}
          style={{
            display: 'grid',
            minHeight: 360,
            placeItems: 'center',
            padding: 24,
            background: theme === 'dark' ? '#2c2c2c' : '#ffffff',
          }}
        >
          <DialogBody
            theme={theme}
            title="Would you like to upgrade?"
            description={message}
            actions={
              <>
                <Button variant="neutral" fullWidth={false}>View planned updates</Button>
                <Button variant="primary" fullWidth={false}>Update to version 3.0</Button>
              </>
            }
          />
        </div>
      ))}
    </div>
  ),
};
