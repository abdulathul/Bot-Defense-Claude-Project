import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Annotation,
  Note,
  Slot,
  UtilitiesPage,
} from '../pages/UtilitiesPage';
import type { AnnotationVariant } from '../pages/UtilitiesPage';

const annotationVariants: AnnotationVariant[] = ['outlined', 'filled', 'subtle'];

const meta = {
  title: 'Example/Page/Utilities',
  component: UtilitiesPage,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof UtilitiesPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const UtilityExamples: Story = {};

export const AnnotationVariations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12 }}>
      {annotationVariants.map((variant) => (
        <Annotation key={variant} variant={variant}>Label</Annotation>
      ))}
    </div>
  ),
};

export const NoteVariations: Story = {
  render: () => (
    <div style={{ display: 'grid', maxWidth: 360, gap: 16 }}>
      <Note title="Title" author="Luis Ouriach" date="20 February 2026">
        Body content has been wrapped in a new slot auto layout frame.
      </Note>
      <Note title="Title" variant="compact" />
    </div>
  ),
};

export const SlotVariations: Story = {
  render: () => (
    <div style={{ display: 'grid', maxWidth: 360, gap: 16 }}>
      <Slot />
      <Slot>Custom content</Slot>
    </div>
  ),
};
