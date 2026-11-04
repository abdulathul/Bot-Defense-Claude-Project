import type { ButtonHTMLAttributes } from 'react';
import { Button } from '../Button/Button';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' };

export function ConsoleButton({ variant = 'secondary', type = 'button', ...props }: Props) {
  return (
    <Button
      {...props}
      type={type}
      variant={variant === 'primary' ? 'primary' : 'neutral'}
      size="small"
      fullWidth={false}
    />
  );
}
