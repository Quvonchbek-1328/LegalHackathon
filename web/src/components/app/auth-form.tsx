'use client';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { AlertCircle, Eye, EyeOff, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input, Label } from '@/components/ui/input';
import { useT } from '@/i18n/provider';
import { authService } from '@/services/auth';
import { apiConfig } from '@/services/config';
import type { PlanId } from '@/services/types';

export function AuthForm({ mode }: { mode: 'login' | 'register' }) {
  const t = useT();
  const a = t.auth;
  const router = useRouter();
  const params = useSearchParams();
  const plan = (['free', 'pro', 'enterprise'].includes(params.get('plan') || '') ? params.get('plan') : 'free') as PlanId;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (mode === 'register' && !name.trim()) e.name = a.errors.name;
    if (!/^\S+@\S+\.\S+$/.test(email)) e.email = a.errors.email;
    if (password.length < 6) e.password = a.errors.password;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setServerError('');
    if (!validate()) return;
    setLoading(true);
    try {
      if (mode === 'login') await authService.login(email, password);
      else await authService.register(name.trim(), email, password, plan);
      router.push(params.get('next') || '/app');
    } catch (e) {
      setServerError((e as Error).message);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">{mode === 'login' ? a.loginTitle : a.registerTitle}</h1>
        <p className="text-sm text-muted">{mode === 'login' ? a.loginSub : a.registerSub}</p>
      </div>
      {mode === 'register' && plan !== 'free' && (
        <div className="flex items-center justify-between rounded-xl border border-emerald/30 bg-emerald/10 px-3.5 py-2.5 text-sm">
          <span className="text-muted">{a.selectedPlan}</span>
          <span className="font-semibold text-neon">{t.pricing.plans[plan].name}</span>
        </div>
      )}
      {apiConfig.demoMode && <p className="rounded-xl border border-cyan/25 bg-cyan/[0.06] px-3.5 py-2.5 text-xs text-cyan">{a.demoHint}</p>}
      {serverError && (
        <p role="alert" className="flex items-center gap-2 rounded-xl border border-risk-critical/30 bg-risk-critical/10 px-3.5 py-2.5 text-sm text-risk-critical">
          <AlertCircle className="size-4 shrink-0" />{serverError}
        </p>
      )}
      {mode === 'register' && (
        <Field id="name" label={a.name} error={errors.name}>
          <Input id="name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} aria-invalid={!!errors.name} />
        </Field>
      )}
      <Field id="email" label={a.email} error={errors.email}>
        <Input id="email" type="email" autoComplete="email" inputMode="email" value={email} onChange={(e) => setEmail(e.target.value)} aria-invalid={!!errors.email} placeholder="siz@misol.uz" />
      </Field>
      <Field id="password" label={a.password} error={errors.password} hint={mode === 'register' ? a.passwordHint : undefined}>
        <div className="relative">
          <Input id="password" type={show ? 'text' : 'password'} autoComplete={mode === 'login' ? 'current-password' : 'new-password'} value={password} onChange={(e) => setPassword(e.target.value)} aria-invalid={!!errors.password} className="pr-11" />
          <button type="button" onClick={() => setShow((s) => !s)} className="absolute right-1.5 top-1.5 grid size-8 place-items-center rounded-lg text-muted hover:text-fg cursor-pointer" aria-label={show ? 'Hide' : 'Show'}>
            {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
      </Field>
      <Button type="submit" size="lg" disabled={loading} className="mt-1 w-full">
        {loading && <Loader2 className="animate-spin" />}
        {mode === 'login' ? a.submitLogin : a.submitRegister}
      </Button>
      {mode === 'register' && <p className="text-center text-xs leading-relaxed text-subtle">{a.agree}</p>}
      <p className="text-center text-sm text-muted">
        {mode === 'login' ? a.noAccount : a.haveAccount}{' '}
        <Link href={mode === 'login' ? '/register' : '/login'} className="font-semibold text-neon hover:underline">
          {mode === 'login' ? t.nav.register : t.nav.login}
        </Link>
      </p>
    </form>
  );
}

function Field({ id, label, error, hint, children }: { id: string; label: string; error?: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error ? <span className="text-xs text-risk-critical">{error}</span> : hint ? <span className="text-xs text-subtle">{hint}</span> : null}
    </div>
  );
}
