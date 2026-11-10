import { createElement, type ComponentPropsWithoutRef, type ElementType, type HTMLAttributes, type ReactNode } from 'react';
import styles from './Text.module.css';

export type TextVariant =
  | 'title-hero'
  | 'title-page'
  | 'title'
  | 'subtitle'
  | 'heading'
  | 'subheading'
  | 'body'
  | 'emphasis'
  | 'strong'
  | 'link'
  | 'code';

export type TextElement = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'a' | 'strong' | 'em' | 'code' | 'div';
export type TextAlign = 'start' | 'center' | 'end';

const defaultElements: Record<TextVariant, TextElement> = {
  'title-hero': 'h1',
  'title-page': 'h1',
  title: 'h2',
  subtitle: 'p',
  heading: 'h2',
  subheading: 'h3',
  body: 'p',
  emphasis: 'em',
  strong: 'strong',
  link: 'a',
  code: 'code',
};

export type TextProps<T extends TextElement = 'p'> = {
  as?: T;
  variant?: TextVariant;
  align?: TextAlign;
  className?: string;
  href?: string;
  children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'className' | 'children' | 'href'>;

export function Text<T extends TextElement = 'p'>({
  as,
  variant = 'body',
  align = 'start',
  className = '',
  children,
  ...elementProps
}: TextProps<T>) {
  const element = as ?? defaultElements[variant];
  const classes = [styles.text, styles[variant], styles[align], className].filter(Boolean).join(' ');

  return createElement(element, { ...elementProps, className: classes }, children);
}

export interface TextListProps extends Omit<HTMLAttributes<HTMLOListElement>, 'children'> {
  items: string[];
  ordered?: boolean;
}

export function TextList({ items, ordered = false, className = '', ...listProps }: TextListProps) {
  const element = ordered ? 'ol' : 'ul';
  const classes = [styles.list, ordered ? styles.ordered : styles.unordered, className].filter(Boolean).join(' ');

  return createElement(
    element,
    { ...listProps, className: classes },
    items.map((item, index) => createElement('li', { key: `${index}-${item}`, className: styles.listItem }, item)),
  );
}
