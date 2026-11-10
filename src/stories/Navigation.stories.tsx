import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  NavigationButton,
  NavigationButtonList,
  NavigationPill,
  NavigationPillList,
} from '../components/Navigation';
import type { NavigationItem, NavigationState } from '../components/Navigation';

const states: NavigationState[] = ['default', 'hover', 'active'];
const links: NavigationItem[] = [
  { label: 'Link', href: '#overview' },
  { label: 'Link', href: '#activity' },
  { label: 'Link', href: '#settings' },
];

function StarIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="m8 1.8 1.8 3.7 4.1.6-3 2.9.7 4.1L8 11.2l-3.6 1.9.7-4.1-3-2.9 4.1-.6L8 1.8Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}

const buttonItems: NavigationItem[] = [
  { label: 'Label', href: '#one', icon: <StarIcon /> },
  { label: 'Label', href: '#two', icon: <StarIcon /> },
  { label: 'Label', href: '#three', icon: <StarIcon /> },
  { label: 'Label', href: '#four', icon: <StarIcon /> },
  { label: 'Label', href: '#five', icon: <StarIcon /> },
];

const meta = {
  title: 'Components/Navigation',
  component: NavigationButton,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    size: { control: 'inline-radio', options: ['small', 'medium'] },
    orientation: { control: 'inline-radio', options: ['row', 'column'] },
    state: { control: 'inline-radio', options: states },
    icon: { control: false },
    href: { control: 'text' },
  },
  args: {
    label: 'Label',
    href: '#',
    icon: <StarIcon />,
    size: 'medium',
    orientation: 'column',
    state: 'default',
  },
} satisfies Meta<typeof NavigationButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NavigationButtonStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {(['small', 'medium'] as const).map((size) => (
        <div key={size} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <strong>{size}</strong>
          {(['row', 'column'] as const).map((orientation) => (
            <div key={orientation} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <span style={{ width: 64 }}>{orientation}</span>
              <div style={{ display: 'flex', gap: 8 }}>
                {states.map((state) => (
                  <NavigationButton
                    key={`${size}-${orientation}-${state}`}
                    label="Label"
                    href="#"
                    icon={<StarIcon />}
                    size={size}
                    orientation={orientation}
                    state={state}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  ),
};

export const NavigationButtonLists: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <NavigationButtonList items={buttonItems} orientation="row" ariaLabel="Horizontal navigation buttons" />
      <NavigationButtonList items={buttonItems} orientation="column" ariaLabel="Vertical navigation buttons" />
    </div>
  ),
};

export const NavigationPillStates: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8 }}>
      {states.map((state) => (
        <NavigationPill key={state} label="Link" href={`#${state}`} state={state} />
      ))}
    </div>
  ),
};

export const NavigationPillLists: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <NavigationPillList items={links} orientation="row" ariaLabel="Horizontal navigation links" />
      <NavigationPillList items={links} orientation="column" ariaLabel="Vertical navigation links" />
    </div>
  ),
};
