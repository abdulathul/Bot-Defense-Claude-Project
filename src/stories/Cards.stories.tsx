import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../components/Button/Button';
import { Card } from '../components/Card/Card';
import {
  CardSlot,
  ProductInfoCard,
  ReviewCard,
  StatsCard,
  TestimonialCard,
} from '../components/Card/CardVariations';

function InfoIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 11v5m0-8h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function ImagePlaceholder() {
  return (
    <svg viewBox="0 0 80 80" fill="none" aria-label="Image placeholder">
      <rect width="80" height="80" fill="#e6e6e6" />
      <rect x="12" y="12" width="56" height="56" rx="4" fill="#f1f1f1" />
      <circle cx="29" cy="31" r="5" fill="#e6e6e6" />
      <path d="m18 59 16-16 10 10 7-7 11 13H18Z" fill="#e6e6e6" />
    </svg>
  );
}

const description = 'Body text for whatever you’d like to say. Add main takeaway points, quotes, anecdotes, and a very short story.';
const meta = {
  title: 'Components/Cards',
  component: Card,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  args: {
    title: 'Title',
    children: description,
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CardVariations: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 16, maxWidth: 720 }}>
      <Card
        title="Title"
        variant="stroke"
        layout="horizontal"
        media={<InfoIcon />}
        action={<Button size="small" variant="neutral" fullWidth={false}>Button</Button>}
      >
        {description}
      </Card>
      <Card
        title="Title"
        variant="default"
        media={<InfoIcon />}
        action={<Button size="small" variant="neutral" fullWidth={false}>Button</Button>}
      >
        {description}
      </Card>
      <Card
        title="Title"
        variant="stroke"
        layout="horizontal"
        media={<ImagePlaceholder />}
        mediaType="image"
        action={<Button size="small" variant="neutral" fullWidth={false}>Button</Button>}
      >
        {description}
      </Card>
      <Card
        title="Title"
        variant="default"
        media={<ImagePlaceholder />}
        mediaType="image"
        action={<Button size="small" variant="neutral" fullWidth={false}>Button</Button>}
      >
        {description}
      </Card>
    </div>
  ),
};

export const AdditionalVariations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', gap: 24 }}>
      <ProductInfoCard />
      <ReviewCard />
      <StatsCard />
      <TestimonialCard />
      <CardSlot />
    </div>
  ),
};

export const ProductInfo: Story = {
  render: () => <ProductInfoCard />,
};

export const Review: Story = {
  render: () => <ReviewCard />,
};

export const Stats: Story = {
  render: () => <StatsCard />,
};

export const Testimonial: Story = {
  render: () => <TestimonialCard />,
};

export const Slot: Story = {
  render: () => <CardSlot />,
};
