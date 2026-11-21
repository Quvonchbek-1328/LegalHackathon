import { cn } from '@/lib/utils';

export function Card({ className, glow, ...props }: React.HTMLAttributes<HTMLDivElement> & { glow?: boolean }) {
  return <div className={cn('glass rounded-2xl', glow && 'glow-border', className)} {...props} />;
}
