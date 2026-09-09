import React from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-xl font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-50',
          {
            'bg-gray-900 text-white hover:bg-gray-800': variant === 'primary',
            'bg-secondary text-gray-900 hover:bg-gray-200': variant === 'secondary',
            'border border-gray-200 bg-transparent hover:bg-gray-50 text-gray-900': variant === 'outline',
            'hover:bg-gray-100 text-gray-900': variant === 'ghost',
            'bg-red-50 text-red-600 hover:bg-red-100': variant === 'danger',
            'h-9 px-4 text-sm': size === 'sm',
            'h-11 px-6 text-base': size === 'md',
            'h-14 px-8 text-lg rounded-2xl': size === 'lg',
            'h-11 w-11': size === 'icon',
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
