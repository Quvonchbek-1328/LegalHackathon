import { AlertOctagon, AlertTriangle, Info, ShieldAlert, CircleAlert, type LucideIcon } from 'lucide-react';
import type { RiskLevel } from '@/services/types';

export const RISK_ORDER: RiskLevel[] = ['critical', 'high', 'medium', 'low', 'info'];

export const RISK_STYLE: Record<RiskLevel, { icon: LucideIcon; text: string; bg: string; border: string; dot: string; code: string }> = {
  critical: { icon: AlertOctagon, text: 'text-risk-critical', bg: 'bg-risk-critical/10', border: 'border-risk-critical/30', dot: 'bg-risk-critical', code: 'CRITICAL' },
  high: { icon: ShieldAlert, text: 'text-risk-high', bg: 'bg-risk-high/10', border: 'border-risk-high/30', dot: 'bg-risk-high', code: 'HIGH' },
  medium: { icon: AlertTriangle, text: 'text-risk-medium', bg: 'bg-risk-medium/10', border: 'border-risk-medium/30', dot: 'bg-risk-medium', code: 'MEDIUM' },
  low: { icon: CircleAlert, text: 'text-risk-low', bg: 'bg-risk-low/10', border: 'border-risk-low/30', dot: 'bg-risk-low', code: 'LOW' },
  info: { icon: Info, text: 'text-risk-info', bg: 'bg-risk-info/10', border: 'border-risk-info/25', dot: 'bg-risk-info', code: 'INFO' },
};
