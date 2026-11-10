import type { Meta, StoryObj } from '@storybook/react-vite';
import { Text, TextList } from '../components/Text';
import type { TextAlign, TextVariant } from '../components/Text';

const variants: TextVariant[] = [
  'title-hero',
  'title-page',
  'title',
  'subtitle',
  'heading',
  'subheading',
  'body',
  'emphasis',
  'strong',
  'link',
  'code',
];

const alignments: TextAlign[] = ['start', 'center', 'end'];

const meta = {
  title: 'Components/Text',
  component: Text,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: variants },
    as: { control: 'select', options: ['h1', 'h2', 'h3', 'h4', 'p', 'span', 'a', 'strong', 'em', 'code', 'div'] },
    align: { control: 'inline-radio', options: alignments },
    children: { control: 'text' },
    className: { control: false },
  },
  args: {
    variant: 'body',
    children: 'Text components establish a clear, readable hierarchy.',
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const TextStyles: Story = {
  render: () => (
    <div style={{ display: 'grid', maxWidth: 720, gap: 20 }}>
      <Text variant="title-hero">Text Title Hero</Text>
      <Text variant="title-page">Text Title Page</Text>
      <Text variant="title">Text Title</Text>
      <Text variant="subtitle">Text Subtitle</Text>
      <Text variant="heading">Text Heading</Text>
      <Text variant="subheading">Text Subheading</Text>
      <Text variant="body">Text body for comfortable reading across a range of interfaces.</Text>
      <Text variant="emphasis">Text Emphasis</Text>
      <Text variant="strong">Text Strong</Text>
      <Text variant="link" href="https://example.com">Text Link</Text>
      <Text variant="code">Text Code</Text>
    </div>
  ),
};

export const AlignmentVariations: Story = {
  render: () => (
    <div style={{ display: 'grid', maxWidth: 720, gap: 20 }}>
      {alignments.map((align) => (
        <div key={align} style={{ display: 'grid', gap: 6 }}>
          <Text variant="subheading">{align[0].toUpperCase() + align.slice(1)}</Text>
          <Text variant="title" align={align}>Title</Text>
          <Text variant="subtitle" align={align}>Subtitle</Text>
        </div>
      ))}
    </div>
  ),
};

export const ListStyles: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 32, maxWidth: 720 }}>
      <div style={{ display: 'grid', gap: 12 }}>
        <Text variant="strong">Unordered list</Text>
        <TextList items={['First list item', 'Second list item', 'Third list item']} />
      </div>
      <div style={{ display: 'grid', gap: 12 }}>
        <Text variant="strong">Ordered list</Text>
        <TextList ordered items={['First list item', 'Second list item', 'Third list item']} />
      </div>
    </div>
  ),
};

export const UsageExamples: Story = {
  render: () => (
    <article style={{ display: 'grid', maxWidth: 680, gap: 16 }}>
      <Text variant="title-page">A thoughtful title for your page</Text>
      <Text variant="subtitle">A short subtitle gives readers a helpful introduction.</Text>
      <Text variant="heading">Readable content starts with hierarchy</Text>
      <Text>
        Use body text for supporting details, with <Text variant="strong" as="strong">strong emphasis</Text> or{' '}
        <Text variant="emphasis" as="em">emphasis</Text> where it helps the reader.
      </Text>
      <Text>
        Explore the <Text variant="link" href="https://example.com">design system guide</Text> or use the{' '}
        <Text variant="code">Text</Text> component in your next page.
      </Text>
      <TextList items={['Keep content clear and concise', 'Use headings to organize sections', 'Choose lists for related items']} />
    </article>
  ),
};
