'use client';
import { useEffect, useState } from 'react';
import { Check, Loader2, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input, Label } from '@/components/ui/input';
import { PageHeader } from '@/components/app/states';
import { useSession } from '@/components/app/session';
import { DemoBanner } from '@/components/ui/demo-badge';
import { useT } from '@/i18n/provider';
import { DEFAULT_PLANS } from '@/data/demo';
import { apiConfig } from '@/services/config';
import { plansService } from '@/services/plans';
import type { PlanConfig } from '@/services/types';

const FEATURE_KEYS = ['advancedAnalysis', 'pdfExport', 'history', 'teamAccess', 'api', 'onPremise'] as const;

export default function AdminPage() {
  const t = useT();
  const ad = t.app.admin;
  const { plans: current, refreshPlans } = useSession();
  const [plans, setPlans] = useState<PlanConfig[]>(current);
  const [state, setState] = useState<'idle' | 'saving' | 'saved'>('idle');
  useEffect(() => setPlans(current), [current]);

  const patch = (i: number, p: Partial<PlanConfig>) => setPlans((ps) => ps.map((x, j) => (j === i ? { ...x, ...p } : x)));
  const num = (v: string) => (v.trim() === '' ? null : Math.max(0, Number(v)));

  const save = async () => {
    setState('saving');
    await plansService.save(plans);
    await refreshPlans();
    setState('saved');
    setTimeout(() => setState('idle'), 1800);
  };

  return (
    <>
      <PageHeader title={ad.title} sub={ad.sub} actions={
        <div className="flex gap-2">
          <Button variant="ghost" onClick={() => { plansService.reset(); setPlans(DEFAULT_PLANS); refreshPlans(); }}><RotateCcw />{ad.reset}</Button>
          <Button onClick={save} disabled={state === 'saving'}>{state === 'saving' ? <Loader2 className="animate-spin" /> : state === 'saved' ? <Check /> : null}{state === 'saved' ? t.common.saved : t.common.save}</Button>
        </div>
      } />
      {apiConfig.demoMode && <div className="mb-5"><DemoBanner /></div>}
      <div className="grid gap-4 lg:grid-cols-3">
        {plans.map((p, i) => (
          <section key={p.id} className="glass flex flex-col gap-4 rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">{t.pricing.plans[p.id].name}</h2>
              <label className="flex cursor-pointer items-center gap-2 text-xs text-muted">
                <input type="radio" name="recommended" checked={!!p.recommended} onChange={() => setPlans((ps) => ps.map((x, j) => ({ ...x, recommended: j === i })))} className="accent-[#00F5A0]" />
                {ad.recommended}
              </label>
            </div>
            <NumField id={`price-${p.id}`} label={ad.price} value={p.priceUsd} hint={ad.emptyMeans} onChange={(v) => patch(i, { priceUsd: num(v) })} />
            <NumField id={`docs-${p.id}`} label={ad.docs} value={p.monthlyDocuments} hint={ad.emptyMeans} onChange={(v) => patch(i, { monthlyDocuments: num(v) })} />
            <NumField id={`mb-${p.id}`} label={ad.fileMb} value={p.maxFileMb} onChange={(v) => patch(i, { maxFileMb: num(v) ?? 1 })} />
            <div className="grid grid-cols-2 gap-2">
              {FEATURE_KEYS.map((k) => (
                <label key={k} className="flex cursor-pointer items-center gap-2 rounded-lg border border-line px-2.5 py-2 text-xs">
                  <input type="checkbox" checked={p.features[k]} onChange={(e) => patch(i, { features: { ...p.features, [k]: e.target.checked } })} className="accent-[#00F5A0]" />
                  {ad.features[k]}
                </label>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}

function NumField({ id, label, value, hint, onChange }: { id: string; label: string; value: number | null; hint?: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} type="number" min={0} inputMode="numeric" value={value ?? ''} onChange={(e) => onChange(e.target.value)} />
      {hint && <span className="text-xs text-subtle">{hint}</span>}
    </div>
  );
}
