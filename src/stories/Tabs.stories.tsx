import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tab, Tabs } from '../components/Tabs';
import type { TabItem, TabState } from '../components/Tabs';

const states: TabState[] = ['inactive', 'hover', 'active'];

const tabItems: TabItem[] = [
  { id: 'overview', label: 'Label', content: 'Overview content for this section.' },
  { id: 'activity', label: 'Label', content: 'Recent activity for this section.' },
  { id: 'settings', label: 'Label', content: 'Settings for this section.' },
  { id: 'members', label: 'Label', content: 'Members of this section.' },
  { id: 'billing', label: 'Label', content: 'Billing information for this section.' },
  { id: 'integrations', label: 'Label', content: 'Connected integrations for this section.' },
];

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    items: { control: false },
    activeTabId: { control: 'text' },
    defaultActiveTabId: { control: 'text' },
    onChange: { action: 'tab changed' },
    ariaLabel: { control: 'text' },
    className: { control: false },
  },
  args: {
    items: tabItems,
    defaultActiveTabId: 'overview',
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const TabStates: Story = {
  render: () => (
    <div role="tablist" aria-label="Tab state examples" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, max-content)', alignItems: 'center', gap: 20 }}>
      {states.map((state) => (
        <div key={state} style={{ display: 'grid', justifyItems: 'center', gap: 8 }}>
          <strong>{state}</strong>
          <Tab label="Label" state={state} />
        </div>
      ))}
    </div>
  ),
};

function InteractiveTabs() {
  const [activeTabId, setActiveTabId] = useState('overview');

  return (
    <div style={{ maxWidth: 720 }}>
      <Tabs
        items={tabItems}
        activeTabId={activeTabId}
        onChange={setActiveTabId}
        ariaLabel="Account sections"
      />
    </div>
  );
}

export const TabsList: Story = {
  render: () => <InteractiveTabs />,
};

export const UsageExamples: Story = {
  render: () => (
    <div style={{ display: 'grid', maxWidth: 720, gap: 24 }}>
      <Tabs
        items={[
          { id: 'all', label: 'All', content: 'Showing all projects.' },
          { id: 'active', label: 'Active', content: 'Showing active projects.' },
          { id: 'archived', label: 'Archived', content: 'Showing archived projects.' },
        ]}
        defaultActiveTabId="active"
        ariaLabel="Project filters"
      />
      <Tabs
        items={[
          { id: 'profile', label: 'Profile', content: 'Manage your personal information.' },
          { id: 'security', label: 'Security', content: 'Manage your security preferences.' },
          { id: 'notifications', label: 'Notifications', content: 'Manage your notification preferences.' },
        ]}
        defaultActiveTabId="profile"
        ariaLabel="Settings sections"
      />
    </div>
  ),
};

export const WithDisabledTab: Story = {
  args: {
    items: [
      { id: 'available', label: 'Available', content: 'This section is ready to use.' },
      { id: 'unavailable', label: 'Unavailable', content: 'This section is not currently available.', disabled: true },
      { id: 'another', label: 'Another', content: 'Another available section.' },
    ],
    defaultActiveTabId: 'available',
  },
};
