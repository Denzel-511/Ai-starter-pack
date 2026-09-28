import { useState } from 'react';
import type { ViewId } from '@/types';
import { Icon, CopyButton } from '@/components/ui';
import { TEMPLATES, type Template } from '@/data/templates';
import { XAVS } from '@/data/xavs';

interface TemplatesProps {
  onNavigate: (view: ViewId) => void;
}

export function Templates({ onNavigate }: TemplatesProps) {
  const [selected, setSelected] = useState<Template | null>(null);

  const categories = [...new Set(TEMPLATES.map((t) => t.category))];

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 animate-fade-in">
      <div className="mb-8">
        <p className="section-eyebrow mb-2">Templates</p>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
          Ready-to-use business templates
        </h1>
        <p className="text-ink-300 max-w-2xl">
          Copy, fill in, and use. These templates work alongside the toolkit and workflows to keep your
          business organized.
        </p>
      </div>

      {categories.map((category) => (
        <div key={category} className="mb-8">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-accent-300/80 mb-4">{category}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TEMPLATES.filter((t) => t.category === category).map((template, i) => (
              <button
                key={template.id}
                onClick={() => setSelected(template)}
                className="card card-hover p-5 text-left group animate-scale-in"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-500/10 border border-accent-500/15">
                    <Icon name="FileText" size={16} className="text-accent-400" />
                  </div>
                </div>
                <h3 className="text-sm font-semibold text-white mb-2 group-hover:text-accent-200 transition-colors">
                  {template.title}
                </h3>
                <p className="text-xs text-ink-300 leading-relaxed line-clamp-2">{template.description}</p>
                <div className="mt-3 flex items-center gap-1 text-xs text-accent-300">
                  <Icon name="ArrowRight" size={14} /> View template
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}

      {selected && <TemplateModal template={selected} onClose={() => setSelected(null)} onNavigate={onNavigate} />}
    </div>
  );
}

function TemplateModal({
  template,
  onClose,
  onNavigate,
}: {
  template: Template;
  onClose: () => void;
  onNavigate: (view: ViewId) => void;
}) {
  const download = () => {
    const blob = new Blob([template.content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${template.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

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

        <p className="section-eyebrow mb-2">{template.category}</p>
        <h2 className="font-display text-2xl font-bold text-white tracking-tight mb-2">
          {template.title}
        </h2>
        <p className="text-sm text-ink-300 mb-5">{template.description}</p>

        <div className="flex items-center gap-2 mb-4">
          <CopyButton text={template.content} label="Copy template" />
          <button onClick={download} className="btn text-sm px-3 py-1.5 bg-white/5 text-ink-200 border border-white/10 hover:bg-white/10 hover:text-white">
            <Icon name="Download" size={14} /> Download
          </button>
        </div>

        <pre className="rounded-xl bg-ink-950 border border-white/10 p-4 text-xs text-ink-100 whitespace-pre-wrap font-mono leading-relaxed overflow-x-auto">
          {template.content}
        </pre>

        <div className="mt-6 pt-5 border-t border-white/5">
          <a
            href={XAVS.whatsappLink(XAVS.defaultWhatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp text-sm"
          >
            <Icon name="MessageCircle" size={16} /> Need help? Talk to XAVS
          </a>
        </div>
      </div>
    </div>
  );
}
