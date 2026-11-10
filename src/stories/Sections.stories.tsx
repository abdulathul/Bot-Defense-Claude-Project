import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  CardGridSection,
  FooterSection,
  HeroSection,
  PageSection,
  PanelSection,
  SectionsPage,
} from '../pages/SectionsPage';

const meta = {
  title: 'Example/Page/Sections',
  component: SectionsPage,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SectionsPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SectionExamples: Story = {};

export const HeroSectionVariations: Story = {
  render: () => (
    <div style={{ display: 'grid', maxWidth: 1000, gap: 16 }}>
      <HeroSection variation="centered" />
      <HeroSection variation="split" />
      <HeroSection variation="compact" />
    </div>
  ),
};

export const PanelSectionVariations: Story = {
  render: () => (
    <div style={{ display: 'grid', maxWidth: 1000, gap: 16 }}>
      <PanelSection />
      <PanelSection reverse />
      <PanelSection reverse tinted />
    </div>
  ),
};

export const CardGridVariations: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      <CardGridSection columns={2} />
      <CardGridSection columns={3} />
      <CardGridSection columns={4} />
    </div>
  ),
};

export const PageComposition: Story = {
  render: () => <PageSection />,
};

export const FooterVariations: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      <FooterSection />
      <FooterSection variation="expanded" />
    </div>
  ),
};
