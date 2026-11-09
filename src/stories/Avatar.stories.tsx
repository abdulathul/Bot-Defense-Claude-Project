import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Avatar,
  AvatarBlock as AvatarBlockComponent,
  AvatarGroup,
  type AvatarProps,
} from '../components/Avatar/Avatar';

const groupAvatars: AvatarProps[] = [
  { initials: 'A', alt: 'Ava', backgroundColor: '#d58a48' },
  { initials: 'B', alt: 'Ben', backgroundColor: '#5b7f9b' },
  { initials: 'C', alt: 'Casey', backgroundColor: '#a3cf75' },
  { initials: 'D', alt: 'Devon', backgroundColor: '#9a82be' },
];

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'inline-radio', options: ['large', 'medium', 'small'] },
    shape: { control: 'inline-radio', options: ['circle', 'square'] },
    backgroundColor: { control: 'color' },
  },
  args: {
    initials: 'F',
    size: 'large',
    shape: 'circle',
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SizesAndShapes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {(['large', 'medium', 'small'] as const).map((size) => (
        <div key={size} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ width: 64 }}>{size}</span>
          <Avatar size={size} shape="circle" initials="F" />
          <Avatar size={size} shape="square" initials="F" />
        </div>
      ))}
    </div>
  ),
};

export const AvatarGroupSpaced: Story = {
  render: () => <AvatarGroup avatars={groupAvatars} layout="spaced" totalCount={4} />,
};

export const AvatarGroupOverlap: Story = {
  render: () => <AvatarGroup avatars={groupAvatars} layout="overlap" totalCount={4} />,
};

export const AvatarBlock: Story = {
  render: () => <AvatarBlockComponent title="Title" description="Description" />,
};
