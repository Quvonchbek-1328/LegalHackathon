import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from './slot';
import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer',
  {
    variants: {
      variant: {
        primary: 'bg-neon text-ink shadow-[0_0_0_1px_rgb(0_245_160/0.4),0_8px_30px_-8px_rgb(0_245_160/0.55)] hover:bg-[#3dffb8] hover:shadow-[0_0_0_1px_rgb(0_245_160/0.6),0_10px_36px_-6px_rgb(0_245_160/0.65)]',
        secondary: 'glass text-fg hover:border-line-strong hover:bg-moss',
        ghost: 'text-muted hover:text-fg hover:bg-white/5',
        outline: 'border border-line-strong text-fg hover:bg-white/5',
        danger: 'border border-risk-critical/40 text-risk-critical hover:bg-risk-critical/10',
      },
      size: {
        sm: 'h-9 px-3',
        md: 'h-11 px-5',
        lg: 'h-13 px-6 text-[15px]',
        icon: 'size-10',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button';
  return <Comp ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />;
});
Button.displayName = 'Button';

export { buttonVariants };
