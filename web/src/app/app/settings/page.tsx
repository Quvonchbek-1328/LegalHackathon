'use client';
import { useState } from 'react';
import { Check, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input, Label, Select } from '@/components/ui/input';
import { PageHeader } from '@/components/app/states';
import { useSession } from '@/components/app/session';
import { LOCALES, dictFor, useI18n, type Locale } from '@/i18n/provider';
import { storage } from '@/services/storage';

export default function SettingsPage() {
  const { t, locale, setLocale } = useI18n();
  const s = t.app.settings;
  const { user } = useSession();
  const [retention, setRetention] = useState(() => storage.get<number>('retention', 1));
  const [saved, setSaved] = useState(false);
  const save = () => { storage.set('retention', retention); setSaved(true); setTimeout(() => setSaved(false), 1800); };

  return (
    <div className="max-w-2xl">
      <PageHeader title={s.title} />
      <div className="flex flex-col gap-4">
        <section className="glass flex flex-col gap-4 rounded-2xl p-5">
          <h2 className="font-semibold">{s.profile}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5"><Label htmlFor="n">{t.auth.name}</Label><Input id="n" defaultValue={user?.name || ''} /></div>
            <div className="flex flex-col gap-1.5"><Label htmlFor="e">{t.auth.email}</Label><Input id="e" type="email" defaultValue={user?.email || ''} /></div>
          </div>
        </section>
        <section className="glass flex flex-col gap-4 rounded-2xl p-5">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="lang">{s.language}</Label>
            <Select id="lang" value={locale} onChange={(e) => setLocale(e.target.value as Locale)}>
              {LOCALES.map((l) => <option key={l} value={l}>{dictFor(l).meta.lang}</option>)}
            </Select>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="ret">{s.retention}</Label>
            <Select id="ret" value={retention} onChange={(e) => setRetention(Number(e.target.value))}>
              {s.retentionOptions.map((o, i) => <option key={o} value={i}>{o}</option>)}
            </Select>
          </div>
          <Button className="self-start" onClick={save}>{saved ? <><Check />{t.common.saved}</> : t.common.save}</Button>
        </section>
        <section className="glass rounded-2xl border-risk-critical/20 p-5">
          <Button variant="danger" onClick={() => { storage.remove('documents'); storage.remove('analyses'); }}><Trash2 />{s.danger}</Button>
        </section>
      </div>
    </div>
  );
}
