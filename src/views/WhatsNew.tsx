import type { ViewId } from '@/types';
import { Icon } from '@/components/ui';
import { WHATS_NEW, type WhatsNewItem } from '@/data/whatsNew';
import { XAVS } from '@/data/xavs';

interface WhatsNewProps {
  onNavigate: (view: ViewId) => void;
}

const TYPE_STYLES: Record<string, string> = {
  'New Resource': 'text-accent-200 bg-accent-500/10 border-accent-500/20',
  'New Workflow': 'text-success-400 bg-success-500/10 border-success-500/20',
  'New Tool': 'text-warning-400 bg-warning-500/10 border-warning-500/20',
  'New Template': 'text-ink-100 bg-white/5 border-white/10',
  Improvement: 'text-accent-200 bg-accent-500/5 border-accent-500/15',
};

export function WhatsNew({ onNavigate }: WhatsNewProps) {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10 animate-fade-in">
      <div className="mb-8">
        <p className="section-eyebrow mb-2">What's New</p>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
          Latest updates and improvements
        </h1>
        <p className="text-ink-300 max-w-2xl">
          New resources, workflows, tools, and improvements as we continue to build out the XAVS AI
          Business Starter Kit.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative">
        <div className="absolute left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-accent-500/30 via-white/10 to-transparent" />
        <div className="space-y-6">
          {WHATS_NEW.map((item, i) => (
            <div key={item.id} className="relative flex gap-4 animate-fade-in" style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-xl bg-ink-850 border border-white/10 z-10">
                <Icon name={getTypeIcon(item.type)} size={16} className="text-accent-400" />
              </div>
              <div className="flex-1 card p-5 card-hover">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`chip border text-2xs ${TYPE_STYLES[item.type] || TYPE_STYLES.Improvement}`}>
                    {item.type}
                  </span>
                  <span className="text-xs text-ink-400">
                    {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-white mb-1">{item.title}</h3>
                <p className="text-sm text-ink-300 leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-10 rounded-2xl border border-white/5 bg-ink-850 p-6 text-center">
        <p className="text-sm text-ink-300 mb-4">Want to see more resources added? Let XAVS know what you need.</p>
        <a href={XAVS.whatsappLink(XAVS.defaultWhatsappMessage)} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
          <Icon name="MessageCircle" size={18} /> Suggest a resource
        </a>
      </div>
    </div>
  );
}

function getTypeIcon(type: string): string {
  switch (type) {
    case 'New Resource':
      return 'Wrench';
    case 'New Workflow':
      return 'Workflow';
    case 'New Tool':
      return 'Cpu';
    case 'New Template':
      return 'FileText';
    default:
      return 'Sparkles';
  }
}
