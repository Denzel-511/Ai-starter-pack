import { useState } from 'react';
import type { ViewId } from '@/types';
import { Icon } from '@/components/ui';
import { WORKFLOWS, type Workflow } from '@/data/workflows';
import { TOOLKIT_RESOURCES } from '@/data/toolkit';
import { XAVS } from '@/data/xavs';

interface WorkflowsProps {
  onNavigate: (view: ViewId) => void;
}

export function Workflows({ onNavigate }: WorkflowsProps) {
  const [selected, setSelected] = useState<Workflow | null>(null);

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-10 animate-fade-in">
      <div className="mb-8">
        <p className="section-eyebrow mb-2">Workflows</p>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
          Practical workflows that connect the pieces
        </h1>
        <p className="text-ink-300 max-w-2xl">
          Visual, step-by-step processes for common business situations. Each workflow links to the
          relevant toolkit resources so you can execute immediately.
        </p>
      </div>

      {/* Workflow cards */}
      <div className="grid gap-4 md:grid-cols-2">
        {WORKFLOWS.map((wf, i) => (
          <button
            key={wf.id}
            onClick={() => setSelected(wf)}
            className="card card-hover p-6 text-left group animate-scale-in"
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-500/10 border border-accent-500/15 group-hover:bg-accent-500/20 transition-colors">
                <Icon name="Workflow" size={20} className="text-accent-400" />
              </div>
              <span className="chip-muted">{wf.steps.length} steps</span>
            </div>
            <h3 className="font-display text-lg font-semibold text-white mb-1 group-hover:text-accent-200 transition-colors">
              {wf.name}
            </h3>
            <p className="text-sm text-accent-300/80 mb-2">{wf.tagline}</p>
            <p className="text-sm text-ink-300 leading-relaxed">{wf.description}</p>
            <div className="mt-4 flex items-center gap-1 text-xs text-accent-300">
              <Icon name="ArrowRight" size={14} /> View workflow
            </div>
          </button>
        ))}
      </div>

      {/* Detail modal */}
      {selected && (
        <WorkflowModal workflow={selected} onClose={() => setSelected(null)} onNavigate={onNavigate} />
      )}
    </div>
  );
}

function WorkflowModal({
  workflow,
  onClose,
  onNavigate,
}: {
  workflow: Workflow;
  onClose: () => void;
  onNavigate: (view: ViewId) => void;
}) {
  const toolkitMap = new Map(TOOLKIT_RESOURCES.map((r) => [r.id, r]));

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-fade-in-fast"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-ink-950/80 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto card p-6 sm:p-8 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute right-4 top-4 btn-ghost p-2" aria-label="Close">
          <Icon name="X" size={20} />
        </button>

        <p className="section-eyebrow mb-2">{workflow.tagline}</p>
        <h2 className="font-display text-2xl font-bold text-white tracking-tight mb-3">
          {workflow.name}
        </h2>
        <p className="text-sm text-ink-300 leading-relaxed mb-6">{workflow.description}</p>

        {/* Visual flow */}
        <div className="space-y-1 mb-6">
          {workflow.steps.map((step, i) => {
            const linkedResource = step.toolkitLink ? toolkitMap.get(step.toolkitLink) : null;
            return (
              <div key={i} className="relative">
                <div className="flex gap-4 items-start">
                  <div className="flex flex-col items-center">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-500/10 border border-accent-500/20 font-display font-bold text-accent-300 text-sm">
                      {i + 1}
                    </div>
                    {i < workflow.steps.length - 1 && (
                      <div className="w-px h-8 bg-gradient-to-b from-accent-500/30 to-transparent mt-1" />
                    )}
                  </div>
                  <div className="flex-1 pb-2">
                    <h4 className="text-sm font-semibold text-white mb-1">{step.title}</h4>
                    <p className="text-sm text-ink-300 leading-relaxed mb-2">{step.description}</p>
                    {linkedResource && (
                      <button
                        onClick={() => {
                          onClose();
                          onNavigate('toolkit');
                        }}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-accent-500/10 border border-accent-500/20 px-3 py-1.5 text-xs text-accent-200 hover:bg-accent-500/20 transition-colors"
                      >
                        <Icon name="Wrench" size={12} />
                        Use: {linkedResource.title}
                        <Icon name="ArrowRight" size={12} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Benefit */}
        <div className="rounded-xl bg-success-500/5 border border-success-500/15 p-4">
          <div className="flex items-start gap-2">
            <Icon name="CheckCircle" size={18} className="text-success-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-success-400 mb-1">Why this matters</h4>
              <p className="text-sm text-ink-100 leading-relaxed">{workflow.benefit}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-5 border-t border-white/5 flex flex-col sm:flex-row gap-3">
          <button onClick={() => { onClose(); onNavigate('toolkit'); }} className="btn-secondary text-sm">
            <Icon name="Wrench" size={16} /> Open Toolkit
          </button>
          <a href={XAVS.whatsappLink(XAVS.defaultWhatsappMessage)} target="_blank" rel="noopener noreferrer" className="btn-whatsapp text-sm">
            <Icon name="MessageCircle" size={16} /> Talk to XAVS
          </a>
        </div>
      </div>
    </div>
  );
}
