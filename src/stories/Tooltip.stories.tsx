import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tooltip } from '../components/Tooltip';
import type { TooltipPlacement } from '../components/Tooltip';

const placements: TooltipPlacement[] = ['top', 'bottom', 'left', 'right'];

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    content: { control: 'text' },
    placement: { control: 'inline-radio', options: placements },
    children: { control: false },
    className: { control: false },
    tooltipClassName: { control: false },
  },
  args: {
    title: 'Title',
    content: 'Body text',
    placement: 'top',
    children: <button type="button">Hover or focus me</button>,
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const PlacementVariations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 48, padding: 64 }}>
      {placements.map((placement) => (
        <Tooltip key={placement} title="Title" content="Body text" placement={placement}>
          <button type="button" style={{ padding: '8px 12px', border: '1px solid #d9d9d9', borderRadius: 6, background: '#f5f5f5', color: '#1e1e1e' }}>
            {placement[0].toUpperCase() + placement.slice(1)}
          </button>
        </Tooltip>
      ))}
    </div>
  ),
};

export const TooltipContentVariations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, padding: 48 }}>
      <Tooltip title="Title" content="Body text" placement="top">
        <button type="button">Short description</button>
      </Tooltip>
      <Tooltip title="Account settings" content="Manage your profile, security, and notification preferences." placement="top">
        <button type="button">Long description</button>
      </Tooltip>
      <Tooltip title="Save changes" content="Your edits will be saved to this workspace." placement="right">
        <button type="button">Additional context</button>
      </Tooltip>
    </div>
  ),
};

export const UsageExamples: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 24, padding: 56 }}>
      <Tooltip title="Create project" content="Start a new project in your workspace." placement="top">
        <button type="button" aria-label="Create project" style={{ width: 40, height: 40, border: '1px solid #d9d9d9', borderRadius: 8, background: '#fff', color: '#1e1e1e', fontSize: 20 }}>
          +
        </button>
      </Tooltip>
      <Tooltip title="Search" content="Search projects and files." placement="bottom">
        <button type="button" aria-label="Search" style={{ width: 40, height: 40, border: '1px solid #d9d9d9', borderRadius: 8, background: '#fff', color: '#1e1e1e', fontSize: 18 }}>
          ⌕
        </button>
      </Tooltip>
      <Tooltip title="Help" content="Open help and support resources." placement="right">
        <button type="button" aria-label="Help" style={{ width: 40, height: 40, border: '1px solid #d9d9d9', borderRadius: 8, background: '#fff', color: '#1e1e1e', fontWeight: 600 }}>
          ?
        </button>
      </Tooltip>
    </div>
  ),
};
