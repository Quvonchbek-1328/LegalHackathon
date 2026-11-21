'use client';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { DEFAULT_PLANS } from '@/data/demo';
import { authService } from '@/services/auth';
import { plansService } from '@/services/plans';
import type { PlanConfig, User } from '@/services/types';

interface Session {
  user: User | null;
  plan: PlanConfig;
  plans: PlanConfig[];
  ready: boolean;
  refreshPlans: () => Promise<void>;
  logout: () => void;
}

const SessionContext = createContext<Session | null>(null);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [plans, setPlans] = useState<PlanConfig[]>(DEFAULT_PLANS);
  const [ready, setReady] = useState(false);

  const refreshPlans = useCallback(async () => {
    setPlans(await plansService.list());
  }, []);

  useEffect(() => {
    setUser(authService.current());
    refreshPlans().finally(() => setReady(true));
  }, [refreshPlans]);

  const plan = plans.find((p) => p.id === (user?.plan || 'free')) || plans[0];
  const logout = () => { authService.logout(); setUser(null); };

  return <SessionContext.Provider value={{ user, plan, plans, ready, refreshPlans, logout }}>{children}</SessionContext.Provider>;
}

export function useSession() {
  const s = useContext(SessionContext);
  if (!s) throw new Error('useSession SessionProvider ichida ishlatilishi kerak');
  return s;
}
