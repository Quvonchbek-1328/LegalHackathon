'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, Camera, CheckCircle2, FileText, Loader2, RefreshCw, ShieldCheck, UploadCloud, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label, Select } from '@/components/ui/input';
import { DemoBanner } from '@/components/ui/demo-badge';
import { useSession } from '@/components/app/session';
import { useT } from '@/i18n/provider';
import { cn, formatBytes } from '@/lib/utils';
import { apiConfig } from '@/services/config';
import { ACCEPT_ATTR, documentsService, isAcceptedFile } from '@/services/documents';
import { analysisService, countByLevel, STAGES, type AnalysisStage } from '@/services/analysis';
import type { DocumentKind } from '@/services/types';

const KINDS: DocumentKind[] = ['contract', 'notarial', 'application', 'property', 'corporate', 'policy', 'other'];

type Phase = 'idle' | 'ready' | 'running' | 'error';

export default function NewAnalysisPage() {
  const t = useT();
  const u = t.app.upload;
  const router = useRouter();
  const { plan } = useSession();
  const [file, setFile] = useState<File | null>(null);
  const [kind, setKind] = useState<DocumentKind>('contract');
  const [handwritten, setHandwritten] = useState(false);
  const [drag, setDrag] = useState(false);
  const [phase, setPhase] = useState<Phase>('idle');
  const [stage, setStage] = useState<AnalysisStage>('upload');
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<HTMLInputElement>(null);

  const pick = (f: File | undefined | null) => {
    setError('');
    if (!f) return;
    if (!isAcceptedFile(f)) return setError(u.errors.type);
    if (f.size > plan.maxFileMb * 1024 * 1024) return setError(u.errors.size(plan.maxFileMb));
    setFile(f);
    setPhase('ready');
  };

  const reset = () => { setFile(null); setPhase('idle'); setError(''); };

  const start = async () => {
    if (!file) return;
    setPhase('running');
    setError('');
    try {
      const doc = await documentsService.upload(file, kind);
      const res = await analysisService.run(doc, setStage);
      documentsService.markCompleted(doc.id, res.id, countByLevel(res));
      router.push(`/app/analysis/${res.id}`);
    } catch (e) {
      setError((e as Error).message || u.errors.generic);
      setPhase('error');
    }
  };

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">{u.title}</h1>
        <p className="mt-1 text-muted">{u.sub}</p>
      </div>
      {apiConfig.demoMode && <DemoBanner />}

      <AnimatePresence mode="wait">
        {phase === 'running' ? (
          <motion.div key="run" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <Progress stage={stage} fileName={file?.name || ''} />
          </motion.div>
        ) : !file ? (
          <motion.div key="drop" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <div
              onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
              onDragLeave={() => setDrag(false)}
              onDrop={(e) => { e.preventDefault(); setDrag(false); pick(e.dataTransfer.files?.[0]); }}
              className={cn('glass relative flex flex-col items-center gap-5 rounded-3xl border-2 border-dashed px-6 py-16 text-center transition md:py-24',
                drag ? 'border-neon bg-neon/[0.05]' : 'border-line-strong')}
            >
              <span className={cn('grid size-16 place-items-center rounded-2xl border transition', drag ? 'border-neon/60 bg-neon/15 text-neon' : 'border-emerald/30 bg-emerald/10 text-emerald')}>
                <UploadCloud className="size-7" />
              </span>
              <div>
                <p className="text-lg font-semibold">{u.drop}</p>
                <p className="mt-1 text-sm text-muted">{u.formats(plan.maxFileMb)}</p>
              </div>
              <div className="flex w-full flex-col items-center gap-2 sm:w-auto sm:flex-row">
                <Button size="lg" className="w-full sm:w-auto" onClick={() => inputRef.current?.click()}><FileText />{u.browse}</Button>
                <Button size="lg" variant="secondary" className="w-full sm:hidden" onClick={() => cameraRef.current?.click()}><Camera />{u.camera}</Button>
              </div>
              <input ref={inputRef} type="file" accept={ACCEPT_ATTR} className="sr-only" onChange={(e) => pick(e.target.files?.[0])} />
              <input ref={cameraRef} type="file" accept="image/*" capture="environment" className="sr-only" onChange={(e) => pick(e.target.files?.[0])} />
              <p className="flex items-center gap-1.5 text-xs text-subtle"><ShieldCheck className="size-3.5 text-emerald" />{u.privacy}</p>
            </div>
            {error && <ErrorNote message={error} />}
          </motion.div>
        ) : (
          <motion.div key="ready" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
            <div className="glass flex min-w-0 flex-col overflow-hidden rounded-2xl">
              <div className="flex items-center gap-3 border-b border-line px-4 py-3">
                <FileText className="size-4 shrink-0 text-emerald" />
                <span className="min-w-0 flex-1 truncate text-sm font-medium">{file.name}</span>
                <span className="shrink-0 font-mono text-xs text-subtle">{formatBytes(file.size)}</span>
                <button type="button" onClick={reset} className="grid size-8 place-items-center rounded-lg text-muted hover:bg-white/5 hover:text-fg cursor-pointer" aria-label={u.change}><X className="size-4" /></button>
              </div>
              <FilePreview file={file} />
            </div>
            <div className="glass flex flex-col gap-5 rounded-2xl p-5">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="kind">{u.kind}</Label>
                <Select id="kind" value={kind} onChange={(e) => setKind(e.target.value as DocumentKind)}>
                  {KINDS.map((k) => <option key={k} value={k}>{t.app.kinds[k]}</option>)}
                </Select>
              </div>
              <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-line p-3.5 text-sm">
                <input type="checkbox" checked={handwritten} onChange={(e) => setHandwritten(e.target.checked)} className="mt-0.5 size-4 accent-[#00F5A0]" />
                {u.handwritten}
              </label>
              <p className="flex gap-2 text-xs leading-relaxed text-subtle"><ShieldCheck className="size-4 shrink-0 text-emerald" />{u.privacy}</p>
              {phase === 'error' && <ErrorNote message={error} />}
              <div className="mt-auto flex flex-col gap-2">
                <Button size="lg" onClick={start}>{phase === 'error' ? <><RefreshCw />{t.common.retry}</> : u.start}</Button>
                <Button variant="ghost" onClick={reset}>{u.change}</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ErrorNote({ message }: { message: string }) {
  return (
    <p role="alert" className="mt-3 flex items-center gap-2 rounded-xl border border-risk-critical/30 bg-risk-critical/10 px-3.5 py-2.5 text-sm text-risk-critical">
      <AlertCircle className="size-4 shrink-0" />{message}
    </p>
  );
}

function FilePreview({ file }: { file: File }) {
  const t = useT();
  const [url, setUrl] = useState<string | null>(null);
  const [html, setHtml] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);
  const ext = file.name.split('.').pop()?.toLowerCase();

  useEffect(() => {
    setHtml(null); setFailed(false);
    if (ext === 'docx') {
      let alive = true;
      (async () => {
        try {
          const mammoth = await import('mammoth');
          const r = await mammoth.convertToHtml({ arrayBuffer: await file.arrayBuffer() });
          if (alive) setHtml(r.value.replace(/\s(href|src)="\s*javascript:[^"]*"/gi, ""));
        } catch {
          if (alive) setFailed(true);
        }
      })();
      return () => { alive = false; };
    }
    const u = URL.createObjectURL(file);
    setUrl(u);
    return () => URL.revokeObjectURL(u);
  }, [file, ext]);

  if (failed) return <p className="p-10 text-center text-sm text-muted">{t.app.upload.previewUnavailable}</p>;
  if (ext === 'pdf' && url) return <iframe src={url} title={file.name} className="h-[60vh] w-full bg-white" />;
  if ((ext === 'jpg' || ext === 'jpeg' || ext === 'png') && url) {
    // eslint-disable-next-line @next/next/no-img-element
    return <div className="grid max-h-[60vh] place-items-center overflow-auto bg-black/30 p-4"><img src={url} alt={file.name} className="max-w-full rounded-md" /></div>;
  }
  if (ext === 'docx') {
    if (html === null) return <div className="flex h-60 items-center justify-center"><Loader2 className="size-5 animate-spin text-muted" /></div>;
    return (
      <div className="max-h-[60vh] overflow-auto bg-black/20 p-4">
        <article className="mx-auto max-w-[640px] rounded-md bg-[#f6f8f7] px-8 py-8 text-[13px] leading-relaxed text-[#0f1c17] shadow-xl [&_h1]:mb-3 [&_h1]:text-lg [&_h1]:font-bold [&_h2]:mb-2 [&_h2]:font-semibold [&_p]:mb-2 [&_table]:w-full [&_td]:border [&_td]:border-black/10 [&_td]:p-1"
          dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    );
  }
  return <p className="p-10 text-center text-sm text-muted">{t.app.upload.previewUnavailable}</p>;
}

function Progress({ stage, fileName }: { stage: AnalysisStage; fileName: string }) {
  const t = useT();
  const idx = STAGES.indexOf(stage);
  return (
    <div className="glass glow-border mx-auto flex max-w-xl flex-col gap-6 rounded-3xl p-6 md:p-8">
      <div className="flex items-center gap-3">
        <span className="relative grid size-12 place-items-center rounded-2xl border border-neon/40 bg-neon/10">
          <Loader2 className="size-5 animate-spin text-neon" />
        </span>
        <div className="min-w-0">
          <p className="font-semibold">{t.app.stages[stage]}…</p>
          <p className="truncate font-mono text-xs text-subtle">{fileName}</p>
        </div>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
        <motion.div className="h-full rounded-full bg-gradient-to-r from-emerald via-neon to-cyan" animate={{ width: `${((idx + 1) / STAGES.length) * 100}%` }} transition={{ duration: 0.6 }} />
      </div>
      <ol className="flex flex-col gap-2.5">
        {STAGES.map((s, i) => (
          <li key={s} className={cn('flex items-center gap-3 text-sm transition-colors', i < idx ? 'text-fg' : i === idx ? 'text-neon' : 'text-subtle')}>
            {i < idx ? <CheckCircle2 className="size-4 text-emerald" /> : i === idx ? <Loader2 className="size-4 animate-spin" /> : <span className="grid size-4 place-items-center"><span className="size-1.5 rounded-full bg-subtle" /></span>}
            {t.app.stages[s]}
          </li>
        ))}
      </ol>
    </div>
  );
}
