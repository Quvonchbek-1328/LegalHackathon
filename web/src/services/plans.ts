import { DEFAULT_PLANS } from '@/data/demo';
import { apiConfig } from './config';
import { delay, http } from './http';
import { storage } from './storage';
import type { PlanConfig } from './types';

// Tarif limitlari admin paneldan boshqariladi. Backend: GET /api/plans, PUT /api/admin/plans
export const plansService = {
  async list(): Promise<PlanConfig[]> {
    if (apiConfig.demoMode) return storage.get<PlanConfig[]>('plans', DEFAULT_PLANS);
    return http<PlanConfig[]>('/api/plans');
  },
  async save(plans: PlanConfig[]): Promise<void> {
    if (apiConfig.demoMode) {
      await delay(400);
      storage.set('plans', plans);
      return;
    }
    await http('/api/admin/plans', { method: 'PUT', body: JSON.stringify(plans) });
  },
  reset() {
    storage.remove('plans');
  },
};
