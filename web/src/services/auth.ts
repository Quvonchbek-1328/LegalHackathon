import { apiConfig } from './config';
import { delay, http, HttpError, setAuthToken } from './http';
import { storage } from './storage';
import type { PlanId, User } from './types';

// Kelajakdagi backend: POST /api/auth/login, POST /api/auth/register, GET /api/auth/me
interface AuthResponse { token: string; user: User }

export const authService = {
  async login(email: string, password: string): Promise<User> {
    if (apiConfig.demoMode) {
      await delay(700);
      if (!email.includes('@') || password.length < 6) throw new HttpError('E-pochta yoki parol noto‘g‘ri.', 401);
      const user: User = { id: 'u-demo', name: email.split('@')[0], email, plan: 'free' };
      storage.set('user', user);
      return user;
    }
    const r = await http<AuthResponse>('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
    setAuthToken(r.token);
    storage.set('token', r.token);
    return r.user;
  },

  async register(name: string, email: string, password: string, plan: PlanId = 'free'): Promise<User> {
    if (apiConfig.demoMode) {
      await delay(900);
      const user: User = { id: 'u-demo', name, email, plan };
      storage.set('user', user);
      return user;
    }
    const r = await http<AuthResponse>('/api/auth/register', { method: 'POST', body: JSON.stringify({ name, email, password, plan }) });
    setAuthToken(r.token);
    storage.set('token', r.token);
    return r.user;
  },

  current(): User | null {
    return storage.get<User | null>('user', null);
  },

  logout() {
    setAuthToken(null);
    storage.remove('token');
    storage.remove('user');
  },
};
