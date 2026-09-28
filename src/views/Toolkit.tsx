import { useState } from 'react';
import type { ViewId } from '@/types';
import { Icon, CopyButton } from '@/components/ui';
import { TOOLKIT_RESOURCES, TOOLKIT_CATEGORIES, type ToolkitResource } from '@/data/toolkit';
import { XAVS } from '@/data/xavs';

interface ToolkitProps {
  onNavigate: (view: ViewId) => void;
}

export function Toolkit({ onNavigate }: ToolkitProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selected, setSelected] = useState<ToolkitResource | null>(null);

  const categories = ['All', ...TOOLKIT_CATEGORIES];
  const filtered =
    activeCategory === 'All'
      ? TOOLKIT_RESOURCES
      : TOOLKIT_RESOURCES.filter((r) => r.category === activeCategory);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 animate-fade-in">
      <div className="mb-8">
        <p className="section-eyebrow mb-2">AI Toolkit</p>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
          Practical AI tools for everyday business tasks
        </h1>
        <p className="text-ink-300 max-w-2xl">
          Each resource includes a ready-to-use AI prompt, instructions, and an example. Copy the prompt,
          fill in your details, and paste into ChatGPT, Claude, or any AI assistant.
        </p>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition-all ${
              activeCategory === cat
                ? 'bg-accent-500/15 border border-accent-500/30 text-accent-200'
                : 'bg-ink-800/50 border border-white/10 text-ink-200 hover:border-white/20 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Resource grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((resource, i) => (
          <button
            key={resource.id}
            onClick={() => setSelected(resource)}
            className="card card-hover p-5 text-left group animate-scale-in"
            style={{ animationDelay: `${i * 0.04}s` }}
          >
            <div className="flex items-center gap-2 mb-3">
              <CategoryIcon category={resource.category} />
              <span className="text-2xs uppercase tracking-wider text-ink-400 font-medium">
                {resource.category}
              </span>
            </div>
            <h3 className="text-sm font-semibold text-white mb-2 group-hover:text-accent-200 transition-colors">
              {resource.title}
            </h3>
            <p className="text-xs text-ink-300 leading-relaxed line-clamp-3">{resource.whatItDoes}</p>
            <div className="mt-3 flex items-center gap-1 text-xs text-accent-300">
              <Icon name="ArrowRight" size={14} /> Use this
            </div>
          </button>
        ))}
      </div>

      {/* Detail modal */}
      {selected && (
        <ResourceModal resource={selected} onClose={() => setSelected(null)} onNavigate={onNavigate} />
      )}
    </div>
  );
}

function CategoryIcon({ category }: { category: string }) {
  const iconMap: Record<string, string> = {
    Marketing: 'Megaphone',
    Content: 'PenLine',
    'Sales & Customer Service': 'Headset',
    Operations: 'Settings',
  };
  return (
    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent-500/10 border border-accent-500/15">
      <Icon name={iconMap[category] || 'Wrench'} size={14} className="text-accent-400" />
    </div>
  );
}

function ResourceModal({
  resource,
  onClose,
  onNavigate,
}: {
  resource: ToolkitResource;
  onClose: () => void;
  onNavigate: (view: ViewId) => void;
}) {
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

        <div className="flex items-center gap-2 mb-3">
          <CategoryIcon category={resource.category} />
          <span className="text-2xs uppercase tracking-wider text-ink-400 font-medium">
            {resource.category}
          </span>
        </div>
        <h2 className="font-display text-2xl font-bold text-white tracking-tight mb-4">
          {resource.title}
        </h2>

        <div className="space-y-5">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-accent-300 mb-1">What it does</h4>
            <p className="text-sm text-ink-100 leading-relaxed">{resource.whatItDoes}</p>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-accent-300 mb-1">When to use it</h4>
            <p className="text-sm text-ink-100 leading-relaxed">{resource.whenToUse}</p>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-accent-300 mb-1">Instructions</h4>
            <p className="text-sm text-ink-100 leading-relaxed">{resource.instructions}</p>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-accent-300 mb-2">Steps</h4>
            <ol className="space-y-2">
              {resource.steps.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm text-ink-100">
                  <span className="flex-shrink-0 flex h-5 w-5 items-center justify-center rounded-full bg-accent-500/10 border border-accent-500/15 text-accent-300 text-xs font-bold">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          {/* Prompt */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-accent-300">Ready-to-use AI prompt</h4>
              <CopyButton text={resource.prompt} />
            </div>
            <pre className="rounded-xl bg-ink-950 border border-white/10 p-4 text-xs text-ink-100 whitespace-pre-wrap font-mono leading-relaxed overflow-x-auto">
              {resource.prompt}
            </pre>
          </div>

          {/* Example */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-accent-300 mb-1">Example output</h4>
            <div className="rounded-xl bg-ink-800/50 border border-white/10 p-4 text-sm text-ink-200 leading-relaxed italic">
              {resource.example}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-5 border-t border-white/5 flex flex-col sm:flex-row gap-3">
          <a
            href={XAVS.whatsappLink(XAVS.defaultWhatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp text-sm"
          >
            <Icon name="MessageCircle" size={16} /> Need help? WhatsApp XAVS
          </a>
          <button onClick={() => onNavigate('services')} className="btn-secondary text-sm">
            <Icon name="Handshake" size={16} /> XAVS Services
          </button>
        </div>
      </div>
    </div>
  );
}
