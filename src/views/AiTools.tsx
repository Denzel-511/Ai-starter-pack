import { useState } from 'react';
import type { ViewId } from '@/types';
import { Icon } from '@/components/ui';
import { AI_TOOLS, AI_TOOL_CATEGORIES, type AiTool } from '@/data/aiTools';
import { XAVS } from '@/data/xavs';

interface AiToolsProps {
  onNavigate: (view: ViewId) => void;
}

const DIFFICULTY_COLORS: Record<string, string> = {
  Beginner: 'text-success-400 bg-success-500/10 border-success-500/20',
  Intermediate: 'text-warning-400 bg-warning-500/10 border-warning-500/20',
  Advanced: 'text-error-400 bg-error-500/10 border-error-500/20',
};

export function AiTools({ onNavigate }: AiToolsProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selected, setSelected] = useState<AiTool | null>(null);

  const categories = ['All', ...AI_TOOL_CATEGORIES];
  const filtered =
    activeCategory === 'All' ? AI_TOOLS : AI_TOOLS.filter((t) => t.category === activeCategory);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 animate-fade-in">
      <div className="mb-8">
        <p className="section-eyebrow mb-2">AI Tools Directory</p>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
          The AI tools worth knowing about
        </h1>
        <p className="text-ink-300 max-w-2xl">
          A curated list of genuinely useful AI tools for small businesses. Each one explains what it's
          good for and when you should reach for it.
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

      {/* Tool grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((tool, i) => (
          <button
            key={tool.id}
            onClick={() => setSelected(tool)}
            className="card card-hover p-5 text-left group animate-scale-in"
            style={{ animationDelay: `${i * 0.04}s` }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent-500/15 to-accent-700/10 border border-accent-500/15">
                <Icon name="Cpu" size={18} className="text-accent-400" />
              </div>
              <span className={`chip border text-2xs ${DIFFICULTY_COLORS[tool.difficulty]}`}>
                {tool.difficulty}
              </span>
            </div>
            <h3 className="text-base font-semibold text-white mb-1 group-hover:text-accent-200 transition-colors">
              {tool.name}
            </h3>
            <p className="text-xs text-accent-300/70 mb-2">{tool.tagline}</p>
            <p className="text-xs text-ink-300 leading-relaxed line-clamp-2">{tool.bestFor}</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs text-ink-400">{tool.pricing}</span>
              <span className="text-xs text-ink-400">{tool.category}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Detail modal */}
      {selected && <ToolModal tool={selected} onClose={() => setSelected(null)} onNavigate={onNavigate} />}
    </div>
  );
}

function ToolModal({ tool, onClose, onNavigate }: { tool: AiTool; onClose: () => void; onNavigate: (view: ViewId) => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-fade-in-fast"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-ink-950/80 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-lg card p-6 sm:p-8 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute right-4 top-4 btn-ghost p-2" aria-label="Close">
          <Icon name="X" size={20} />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent-500/15 to-accent-700/10 border border-accent-500/20">
            <Icon name="Cpu" size={24} className="text-accent-400" />
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-white">{tool.name}</h2>
            <p className="text-sm text-accent-300/80">{tool.tagline}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-5">
          <span className="chip-muted">{tool.category}</span>
          <span className={`chip border ${DIFFICULTY_COLORS[tool.difficulty]}`}>{tool.difficulty}</span>
          <span className="chip-muted">{tool.pricing}</span>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-accent-300 mb-1">Best for</h4>
            <p className="text-sm text-ink-100 leading-relaxed">{tool.bestFor}</p>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-accent-300 mb-1">When to use it</h4>
            <p className="text-sm text-ink-100 leading-relaxed">{tool.whenToUse}</p>
          </div>
        </div>

        <div className="mt-6 pt-5 border-t border-white/5 flex flex-col sm:flex-row gap-3">
          <a href={tool.url} target="_blank" rel="noopener noreferrer" className="btn-primary text-sm">
            <Icon name="ExternalLink" size={16} /> Visit {tool.name}
          </a>
          <a href={XAVS.whatsappLink(XAVS.defaultWhatsappMessage)} target="_blank" rel="noopener noreferrer" className="btn-whatsapp text-sm">
            <Icon name="MessageCircle" size={16} /> Talk to XAVS
          </a>
        </div>
      </div>
    </div>
  );
}
