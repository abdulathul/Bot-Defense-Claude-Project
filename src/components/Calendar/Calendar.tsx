import { useState } from 'react';
import styles from './Calendar.module.css';

export interface CalendarRange {
  start: Date | null;
  end: Date | null;
}

export interface CalendarProps {
  initialDate?: Date;
  initialSelectedDate?: Date | null;
  initialSelectedRange?: CalendarRange;
  selectionMode?: 'single' | 'range';
  disabledDates?: Date[];
  showAdjacentDays?: boolean;
  onDateSelect?: (date: Date) => void;
  onRangeSelect?: (range: CalendarRange) => void;
}

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const yearOptions = Array.from({ length: 201 }, (_, index) => 1900 + index);

function dateOnly(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function sameDay(first: Date | null, second: Date) {
  return first !== null && dateOnly(first).getTime() === dateOnly(second).getTime();
}

function Chevron({ direction }: { direction: 'previous' | 'next' }) {
  return (
    <svg
      className={styles.chevron}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d={direction === 'previous' ? 'm15 18-6-6 6-6' : 'm9 18 6-6-6-6'}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Calendar({
  initialDate = new Date(),
  initialSelectedDate = null,
  initialSelectedRange = { start: null, end: null },
  selectionMode = 'single',
  disabledDates = [],
  showAdjacentDays = true,
  onDateSelect,
  onRangeSelect,
}: CalendarProps) {
  const [visibleMonth, setVisibleMonth] = useState(
    () => new Date(initialDate.getFullYear(), initialDate.getMonth(), 1),
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(initialSelectedDate);
  const [selectedRange, setSelectedRange] = useState<CalendarRange>(initialSelectedRange);
  const year = visibleMonth.getFullYear();
  const month = visibleMonth.getMonth();
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const dayCount = Math.ceil((firstWeekday + daysInMonth) / 7) * 7;
  const firstVisibleDate = new Date(year, month, 1 - firstWeekday);
  const days = Array.from(
    { length: dayCount },
    (_, index) =>
      new Date(
        firstVisibleDate.getFullYear(),
        firstVisibleDate.getMonth(),
        firstVisibleDate.getDate() + index,
      ),
  );
  const disabledDateKeys = new Set(disabledDates.map((date) => dateOnly(date).getTime()));

  function changeMonth(amount: number) {
    setVisibleMonth(new Date(year, month + amount, 1));
  }

  function selectDay(date: Date) {
    if (date.getMonth() !== month) {
      setVisibleMonth(new Date(date.getFullYear(), date.getMonth(), 1));
    }

    if (selectionMode === 'single') {
      setSelectedDate(date);
      onDateSelect?.(date);
      return;
    }

    const nextRange =
      selectedRange.start === null || selectedRange.end !== null
        ? { start: date, end: null }
        : dateOnly(date).getTime() < dateOnly(selectedRange.start).getTime()
          ? { start: date, end: selectedRange.start }
          : { start: selectedRange.start, end: date };

    setSelectedRange(nextRange);
    onRangeSelect?.(nextRange);
  }

  return (
    <section className={styles.calendar} aria-label="Calendar">
      <header className={styles.header}>
        <button
          className={styles.navigation}
          type="button"
          aria-label="Previous month"
          onClick={() => changeMonth(-1)}
        >
          <Chevron direction="previous" />
        </button>
        <div className={styles.selectors}>
          <select
            className={styles.monthSelect}
            aria-label="Month"
            value={month}
            onChange={(event) => setVisibleMonth(new Date(year, Number(event.target.value), 1))}
          >
            {monthNames.map((name, index) => (
              <option value={index} key={name}>
                {name.slice(0, 3)}
              </option>
            ))}
          </select>
          <select
            className={styles.yearSelect}
            aria-label="Year"
            value={year}
            onChange={(event) => setVisibleMonth(new Date(Number(event.target.value), month, 1))}
          >
            {yearOptions.map((option) => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <button
          className={styles.navigation}
          type="button"
          aria-label="Next month"
          onClick={() => changeMonth(1)}
        >
          <Chevron direction="next" />
        </button>
      </header>

      <div className={styles.grid} role="grid" aria-label={`${monthNames[month]} ${year}`}>
        <div className={styles.weekdays} role="row">
          {weekdays.map((weekday) => (
            <span className={styles.weekday} role="columnheader" key={weekday}>
              {weekday}
            </span>
          ))}
        </div>
        {Array.from({ length: dayCount / 7 }, (_, weekIndex) => (
          <div className={styles.week} role="row" key={weekIndex}>
            {days.slice(weekIndex * 7, weekIndex * 7 + 7).map((date) => {
              const isCurrentMonth = date.getMonth() === month;
              const isBeforeVisibleMonth = date.getTime() < new Date(year, month, 1).getTime();
              if (!isCurrentMonth && (!showAdjacentDays || isBeforeVisibleMonth)) {
                return (
                  <span
                    className={styles.day}
                    role="gridcell"
                    aria-hidden="true"
                    key={date.getTime()}
                  />
                );
              }

              const isDisabled = disabledDateKeys.has(dateOnly(date).getTime());
              const rangeStart = selectionMode === 'range' && sameDay(selectedRange.start, date);
              const rangeEnd = selectionMode === 'range' && sameDay(selectedRange.end, date);
              const dateInRange =
                selectionMode === 'range' &&
                selectedRange.start !== null &&
                dateOnly(date).getTime() >= dateOnly(selectedRange.start).getTime() &&
                (selectedRange.end === null ||
                  dateOnly(date).getTime() <= dateOnly(selectedRange.end).getTime());
              const selected =
                selectionMode === 'single' ? sameDay(selectedDate, date) : rangeStart || rangeEnd;
              const classes = [
                styles.day,
                !isCurrentMonth && styles.adjacent,
                dateInRange && styles.inRange,
                selected && styles.selected,
                isDisabled && styles.disabled,
              ]
                .filter(Boolean)
                .join(' ');

              return (
                <span
                  className={styles.dayCell}
                  role="gridcell"
                  aria-selected={selected}
                  key={date.getTime()}
                >
                  <button
                    className={classes}
                    type="button"
                    aria-label={date.toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                    aria-pressed={selected}
                    disabled={isDisabled}
                    onClick={() => selectDay(date)}
                  >
                    {date.getDate()}
                  </button>
                </span>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}
