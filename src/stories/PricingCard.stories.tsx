import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../components/Button/Button';
import { PricingCard } from '../components/Card/PricingCard';

const features = ['List item', 'List item', 'List item', 'List item'];

const meta = {
  title: 'Components/Cards/Pricing Card',
  component: PricingCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    title: 'Title',
    price: '$50',
    period: '/mo',
    features,
    action: <Button size="small" variant="primary">Button</Button>,
  },
} satisfies Meta<typeof PricingCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const PricingCardVariations: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 220px)', gap: 16 }}>
      <PricingCard
        title="Title"
        price="$50"
        features={features}
        action={<Button size="small" variant="primary">Button</Button>}
      />
      <PricingCard
        title="Title"
        price="$50"
        variant="brand"
        features={features}
        action={<Button size="small" variant="neutral">Button</Button>}
      />
      <PricingCard
        title="Title"
        price="$50"
        layout="compact"
        features={features}
        action={<Button size="small" variant="primary">Button</Button>}
      />
      <PricingCard
        title="Title"
        price="$50"
        variant="brand"
        layout="compact"
        features={features}
        action={<Button size="small" variant="neutral">Button</Button>}
      />
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};
