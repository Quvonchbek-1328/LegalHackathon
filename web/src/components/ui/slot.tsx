import { cloneElement, isValidElement, forwardRef } from 'react';
import { cn } from '@/lib/utils';

// Minimal Radix Slot: props’ni yagona bola elementga o‘tkazadi (asChild uchun).
export const Slot = forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement> & { children?: React.ReactNode }>(
  ({ children, className, ...props }, ref) => {
    if (!isValidElement<{ className?: string }>(children)) return null;
    return cloneElement(children, { ...props, ref, className: cn(className, children.props.className) } as never);
  },
);
Slot.displayName = 'Slot';
