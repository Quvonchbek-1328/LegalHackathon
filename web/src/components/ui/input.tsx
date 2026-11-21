import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export const Input = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      'h-11 w-full rounded-xl border border-line bg-ink/60 px-3.5 text-[15px] text-fg placeholder:text-subtle outline-none transition focus:border-emerald focus:ring-2 focus:ring-emerald/25 aria-[invalid=true]:border-risk-critical',
      className,
    )}
    {...props}
  />
));
Input.displayName = 'Input';

export function Label({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={cn('text-sm font-medium text-fg', className)} {...props} />;
}

export const Select = forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(({ className, ...props }, ref) => (
  <select
    ref={ref}
    className={cn('h-11 w-full rounded-xl border border-line bg-ink/60 px-3 text-[15px] text-fg outline-none focus:border-emerald focus:ring-2 focus:ring-emerald/25', className)}
    {...props}
  />
));
Select.displayName = 'Select';
