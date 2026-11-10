import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Chip, type ChipProps, type ChipState, type ChipType } from '../components/Chip/Chip';

const types: ChipType[] = ['assist', 'filter', 'input', 'suggestion'];
const states: ChipState[] = ['default', 'hover', 'selected', 'disabled'];

const meta = {
  title: 'Components/Chip',
  component: Chip,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'inline-radio', options: types },
    state: { control: 'inline-radio', options: states },
    label: { control: 'text' },
    hasIconStart: { control: 'boolean' },
    iconStart: { control: false },
    hasIconEnd: { control: 'boolean' },
    iconEnd: { control: false },
    onRemove: { action: 'removed' },
  },
  args: {
    type: 'assist',
    state: 'default',
    label: 'Chip',
    hasIconStart: false,
    hasIconEnd: false,
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const TypeAndStateMatrix: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 12, maxWidth: 720 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '100px repeat(4, minmax(100px, 1fr))', gap: 12 }}>
        <span />
        {states.map((state) => <strong key={state}>{state}</strong>)}
      </div>
      {types.map((type) => (
        <div
          key={type}
          style={{ display: 'grid', gridTemplateColumns: '100px repeat(4, minmax(100px, 1fr))', gap: 12, alignItems: 'center' }}
        >
          <strong>{type}</strong>
          {states.map((state) => (
            <Chip
              key={`${type}-${state}`}
              type={type}
              state={state}
              label="Chip"
              hasIconStart={type === 'assist' || (type === 'filter' && state === 'selected')}
            />
          ))}
        </div>
      ))}
    </div>
  ),
};

function ChipUsageExamples() {
  const [selected, setSelected] = useState(true);
  const [inputVisible, setInputVisible] = useState(true);
  const [suggestionVisible, setSuggestionVisible] = useState(true);

  const example = (props: ChipProps) => <Chip {...props} />;

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12 }}>
      {example({
        type: 'assist',
        label: 'Add to calendar',
        hasIconStart: true,
        onClick: () => undefined,
      })}
      <Chip
        type="filter"
        state={selected ? 'selected' : 'default'}
        label="Design"
        hasIconStart={selected}
        aria-pressed={selected}
        onClick={() => setSelected((value) => !value)}
      />
      {example({ type: 'filter', label: 'Engineering' })}
      {inputVisible && (
        <Chip
          type="input"
          label="jane@example.com"
          hasIconEnd
          onRemove={() => setInputVisible(false)}
        />
      )}
      {suggestionVisible && (
        <Chip
          type="suggestion"
          label="Summarize this page"
          onClick={() => setSuggestionVisible(false)}
        />
      )}
      {example({ type: 'suggestion', state: 'disabled', label: 'Unavailable' })}
    </div>
  );
}

export const UsageExamples: Story = {
  render: () => <ChipUsageExamples />,
};

export const AssistWithLeadingIcon: Story = {
  args: {
    type: 'assist',
    label: 'Add to calendar',
    hasIconStart: true,
  },
};

export const SelectedFilter: Story = {
  args: {
    type: 'filter',
    state: 'selected',
    label: 'Design',
    hasIconStart: true,
  },
};

export const RemovableInput: Story = {
  args: {
    type: 'input',
    label: 'jane@example.com',
    hasIconEnd: true,
  },
};

export const Suggestion: Story = {
  args: {
    type: 'suggestion',
    label: 'Summarize this page',
  },
};
