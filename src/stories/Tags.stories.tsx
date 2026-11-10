import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Tag,
  TagList,
  TagToggle,
  TagToggleGroup,
} from '../components/Tags';
import type { TagHierarchy, TagTone, TagVisualState } from '../components/Tags';

const tones: TagTone[] = ['brand', 'danger', 'positive', 'warning', 'neutral'];
const hierarchies: TagHierarchy[] = ['primary', 'secondary'];
const states: TagVisualState[] = ['default', 'hover'];

const toggleItems = [
  { id: 'label-1', label: 'Label' },
  { id: 'label-2', label: 'Label' },
  { id: 'label-3', label: 'Label' },
  { id: 'label-4', label: 'Label' },
  { id: 'label-5', label: 'Label' },
  { id: 'label-6', label: 'Label' },
];

const meta = {
  title: 'Components/Tags',
  component: Tag,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    tone: { control: 'inline-radio', options: tones },
    hierarchy: { control: 'inline-radio', options: hierarchies },
    state: { control: 'inline-radio', options: states },
    onRemove: { action: 'removed' },
    removeLabel: { control: 'text' },
    className: { control: false },
  },
  args: {
    label: 'Tag',
    tone: 'brand',
    hierarchy: 'primary',
    state: 'default',
    onRemove: () => undefined,
  },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const TagToneAndStateMatrix: Story = {
  render: () => (
    <div style={{ display: 'grid', maxWidth: 700, gap: 12 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '90px repeat(5, minmax(75px, 1fr))', gap: 10 }}>
        <span />
        {tones.map((tone) => <strong key={tone}>{tone}</strong>)}
      </div>
      {hierarchies.map((hierarchy) => (
        <div key={hierarchy} style={{ display: 'grid', gap: 8 }}>
          <strong>{hierarchy}</strong>
          {states.map((state) => (
            <div key={`${hierarchy}-${state}`} style={{ display: 'grid', gridTemplateColumns: '90px repeat(5, minmax(75px, 1fr))', alignItems: 'center', gap: 10 }}>
              <span>{state}</span>
              {tones.map((tone) => (
                <Tag
                  key={`${hierarchy}-${state}-${tone}`}
                  label="Tag"
                  tone={tone}
                  hierarchy={hierarchy}
                  state={state}
                  onRemove={() => undefined}
                />
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  ),
};

export const ToggleStates: Story = {
  render: () => (
    <div role="group" aria-label="Tag toggle states" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <TagToggle label="Label" selected />
      <TagToggle label="Label" />
      <TagToggle label="Disabled" disabled />
    </div>
  ),
};

export const TagToggleGroupStory: Story = {
  name: 'Tag Toggle Group',
  render: () => (
    <TagToggleGroup
      items={toggleItems}
      defaultSelectedIds={['label-1']}
      ariaLabel="Tag filters"
    />
  ),
};

function TagUsageExamples() {
  const [selectedIds, setSelectedIds] = useState(['status']);
  const [visibleTags, setVisibleTags] = useState(['design', 'urgent', 'approved']);

  const removeTag = (id: string) => {
    setVisibleTags((current) => current.filter((tagId) => tagId !== id));
  };

  return (
    <div style={{ display: 'grid', maxWidth: 720, gap: 24 }}>
      <TagToggleGroup
        items={[
          { id: 'status', label: 'Status' },
          { id: 'priority', label: 'Priority' },
          { id: 'owner', label: 'Owner' },
          { id: 'type', label: 'Type' },
          { id: 'date', label: 'Date' },
        ]}
        selectedIds={selectedIds}
        onChange={setSelectedIds}
        ariaLabel="Filter by"
      />
      <TagList ariaLabel="Applied filters">
        {visibleTags.includes('design') && <Tag label="Design" tone="brand" hierarchy="secondary" onRemove={() => removeTag('design')} />}
        {visibleTags.includes('urgent') && <Tag label="Urgent" tone="danger" hierarchy="primary" onRemove={() => removeTag('urgent')} />}
        {visibleTags.includes('approved') && <Tag label="Approved" tone="positive" hierarchy="secondary" onRemove={() => removeTag('approved')} />}
      </TagList>
    </div>
  );
}

export const UsageExamples: Story = {
  render: () => <TagUsageExamples />,
};

export const SecondaryStatusTags: Story = {
  render: () => (
    <TagList>
      <Tag label="Brand" tone="brand" hierarchy="secondary" />
      <Tag label="Danger" tone="danger" hierarchy="secondary" />
      <Tag label="Positive" tone="positive" hierarchy="secondary" />
      <Tag label="Warning" tone="warning" hierarchy="secondary" />
      <Tag label="Neutral" tone="neutral" hierarchy="secondary" />
    </TagList>
  ),
};
