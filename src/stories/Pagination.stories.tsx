import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Pagination,
  PaginationDirectionButton,
  PaginationList,
  PaginationPageButton,
} from '../components/Pagination';
import type { PaginationControlState, PaginationPageState } from '../components/Pagination';

const pageStates: PaginationPageState[] = ['default', 'hover', 'current', 'currentHover'];
const controlStates: PaginationControlState[] = ['default', 'hover', 'disabled'];

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    currentPage: { control: { type: 'number', min: 1 } },
    totalPages: { control: { type: 'number', min: 1 } },
    onPageChange: { action: 'page changed' },
    ariaLabel: { control: 'text' },
    previousLabel: { control: 'text' },
    nextLabel: { control: 'text' },
    className: { control: false },
  },
  args: {
    currentPage: 1,
    totalPages: 68,
    previousLabel: 'Previous',
    nextLabel: 'Next',
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const PaginationPageButtonStates: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      {pageStates.map((state) => (
        <div key={state} style={{ display: 'grid', justifyItems: 'center', gap: 8 }}>
          <strong>{state}</strong>
          <PaginationPageButton
            page={1}
            state={state}
            aria-label={`${state} page button example`}
          />
        </div>
      ))}
    </div>
  ),
};

export const DirectionButtonStates: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
      {(['previous', 'next'] as const).map((direction) => (
        <div key={direction} style={{ display: 'grid', gap: 8 }}>
          <strong>{direction}</strong>
          <div style={{ display: 'flex', gap: 12 }}>
            {controlStates.map((state) => (
              <PaginationDirectionButton
                key={`${direction}-${state}`}
                direction={direction}
                state={state}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

export const PaginationListVariations: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 20 }}>
      <PaginationList currentPage={1} totalPages={68} />
      <PaginationList currentPage={20} totalPages={68} />
      <PaginationList currentPage={68} totalPages={68} />
    </div>
  ),
};

function InteractivePagination() {
  const [page, setPage] = useState(1);

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <Pagination currentPage={page} totalPages={68} onPageChange={setPage} />
      <p style={{ margin: 0, fontSize: 14 }}>Current page: {page}</p>
    </div>
  );
}

export const UsageExamples: Story = {
  render: () => <InteractivePagination />,
};
