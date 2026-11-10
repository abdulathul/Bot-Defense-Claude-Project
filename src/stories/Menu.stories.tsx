import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Menu, MenuHeading, MenuItem, MenuSeparator } from '../components/Menu';
import type { MenuItemData } from '../components/Menu';

function StarIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="m8 1.8 1.8 3.7 4.1.6-3 2.9.7 4.1L8 11.2l-3.6 1.9.7-4.1-3-2.9 4.1-.6L8 1.8Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}

function Shortcut() {
  return <span aria-label="keyboard shortcut">⇧A</span>;
}

const items: MenuItemData[] = [
  { label: 'Menu Label', description: 'Menu description.', icon: <StarIcon />, trailing: <Shortcut />, onSelect: fn() },
  { label: 'Menu Label', description: 'Menu description.', icon: <StarIcon />, trailing: <Shortcut />, onSelect: fn() },
  { label: 'Menu Label', description: 'Menu description.', icon: <StarIcon />, trailing: <Shortcut />, onSelect: fn() },
  { label: 'Menu Label', description: 'Menu description.', icon: <StarIcon />, trailing: <Shortcut />, onSelect: fn() },
  { label: 'Menu Label', description: 'Menu description.', icon: <StarIcon />, trailing: <Shortcut />, onSelect: fn() },
];

const meta = {
  title: 'Components/Menu',
  component: Menu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    items: { control: false },
    header: { control: false },
    ariaLabel: { control: 'text' },
    onSelect: { action: 'selected' },
  },
  args: {
    items,
    header: <MenuHeading>Heading</MenuHeading>,
    separatorAfter: [2],
    ariaLabel: 'Example menu',
    onSelect: fn(),
  },
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const MenuItemStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 280 }}>
      <MenuItem label="Menu Label" description="Menu description." icon={<StarIcon />} trailing={<Shortcut />} />
      <MenuItem label="Menu Label" description="Menu description." icon={<StarIcon />} trailing={<Shortcut />} active />
      <MenuItem label="Menu Label" description="Menu description." icon={<StarIcon />} trailing={<Shortcut />} disabled />
    </div>
  ),
};

export const Primitives: Story = {
  render: () => (
    <div style={{ width: 280, padding: 8, border: '1px solid #d9d9d9', borderRadius: 8, background: '#fff' }}>
      <MenuHeading>Heading</MenuHeading>
      <MenuItem label="Menu Label" description="Menu description." icon={<StarIcon />} trailing={<Shortcut />} />
      <MenuSeparator />
      <MenuItem label="Another menu item" description="Menu description." icon={<StarIcon />} trailing={<Shortcut />} />
    </div>
  ),
};

export const ComposedMenu: Story = {
  args: {
    header: (
      <>
        <MenuHeading>Heading</MenuHeading>
        <MenuSeparator />
      </>
    ),
  },
};
