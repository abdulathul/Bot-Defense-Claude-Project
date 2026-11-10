import type { Meta, StoryObj } from '@storybook/react-vite';
import { Breadcrumbs } from '../components/Breadcrumbs/Breadcrumbs';

const items = [
  { label: 'Home', href: '#home' },
  { label: 'Products', href: '#products' },
  { label: 'Category', href: '#category' },
  { label: 'Current page' },
];

const meta = {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    items: { control: false },
    separator: { control: 'inline-radio', options: ['chevron', 'slash'] },
    showHomeIcon: { control: 'boolean' },
    ariaLabel: { control: 'text' },
    className: { control: false },
  },
  args: {
    items,
    separator: 'chevron',
    showHomeIcon: false,
    ariaLabel: 'Breadcrumb',
  },
} satisfies Meta<typeof Breadcrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithHomeIcon: Story = {
  args: {
    showHomeIcon: true,
  },
};

export const SlashSeparator: Story = {
  args: {
    separator: 'slash',
  },
};

export const ShortTrail: Story = {
  args: {
    items: [
      { label: 'Home', href: '#home' },
      { label: 'Current page' },
    ],
  },
};

export const UsageExamples: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <Breadcrumbs items={items} showHomeIcon />
      <Breadcrumbs items={items} separator="slash" />
      <Breadcrumbs
        items={[
          { label: 'Home', href: '#home' },
          { label: 'Products', href: '#products' },
          { label: 'Current page' },
        ]}
      />
      <Breadcrumbs
        items={[
          { label: 'Home', href: '#home' },
          { label: 'Current page' },
        ]}
        showHomeIcon
      />
    </div>
  ),
};
