import type { AuditReport, BusinessAnswers, ViewId } from '@/types';
import { Icon } from '@/components/ui';
import { XAVS } from '@/data/xavs';

interface ActionPlanProps {
  report: AuditReport;
  answers: BusinessAnswers;
  onNavigate: (view: ViewId) => void;
}

export function ActionPlan({ report, answers, onNavigate }: ActionPlanProps) {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-10 animate-fade-in">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-3">
          <span className="chip-accent">
            <Icon name="ListTodo" size={14} /> Action Plan
          </span>
          <span className="chip-muted">{answers.businessName}</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight mb-2">
          Your 30-Day AI Action Plan
        </h1>
        <p className="text-ink-300 max-w-2xl">
          A practical, week-by-week plan to put AI to work in {answers.businessName}. Start with the
          immediate actions, then follow the weekly plan.
        </p>
      </div>

      <div className="mb-6 flex flex-wrap gap-3">
        <button onClick={() => onNavigate('report')} className="btn-secondary">
          <Icon name="FileBarChart" size={18} /> Back to Report
        </button>
        <button onClick={() => onNavigate('export')} className="btn-secondary">
          <Icon name="Download" size={18} /> Download / Email
        </button>
      </div>

      {/* Immediate Actions */}
      <Section title="Immediate Actions" icon="Zap" subtitle="Start these today">
        <div className="space-y-3">
          {report.actionPlan.immediate.map((item) => (
            <div key={item.id} className="card p-4 flex gap-4 items-start card-hover">
              <div className="flex-shrink-0 mt-0.5 flex h-6 w-6 items-center justify-center rounded-md bg-warning-500/10 border border-warning-500/20">
                <Icon name="Zap" size={14} className="text-warning-400" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                  <span className="chip-muted text-2xs py-0.5">{item.category}</span>
                </div>
                <p className="text-sm text-ink-300 leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 30-Day Plan */}
      <Section title="30-Day AI Action Plan" icon="CalendarDays" subtitle="Week by week">
        <div className="space-y-6">
          {report.actionPlan.weekly.map((week) => (
            <div key={week.week} className="card p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-500/10 border border-accent-500/15 font-display font-bold text-accent-300">
                  {week.week}
                </div>
                <h4 className="font-display text-lg font-semibold text-white">Week {week.week}</h4>
              </div>
              <div className="space-y-3">
                {week.items.map((item) => (
                  <div key={item.id} className="flex gap-3 items-start">
                    <div className="flex-shrink-0 mt-1 h-4 w-4 rounded border-2 border-accent-500/40" />
                    <div>
                      <h5 className="text-sm font-medium text-white">{item.title}</h5>
                      <p className="text-sm text-ink-300 mt-0.5 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Recommended Tools */}
      {report.actionPlan.recommendedTools.length > 0 && (
        <Section title="Recommended Tools" icon="Cpu" subtitle="Matched to your priorities">
          <div className="grid gap-3 sm:grid-cols-2">
            {report.actionPlan.recommendedTools.map((tool, i) => (
              <div key={i} className="card p-4 card-hover">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 border border-white/10">
                    <Icon name="Cpu" size={16} className="text-accent-400" />
                  </div>
                  <h4 className="text-sm font-semibold text-white">{tool.name}</h4>
                </div>
                <p className="text-xs text-ink-300">{tool.reason}</p>
              </div>
            ))}
          </div>
          <button onClick={() => onNavigate('ai-tools')} className="mt-4 btn-ghost text-sm">
            <Icon name="ArrowRight" size={16} /> Browse all AI tools
          </button>
        </Section>
      )}

      {/* Recommended Workflows */}
      {report.actionPlan.workflows.length > 0 && (
        <Section title="Recommended Workflows" icon="Workflow" subtitle="Practical processes for your business">
          <div className="space-y-4">
            {report.actionPlan.workflows.map((wf) => (
              <div key={wf.id} className="card p-5">
                <h4 className="text-sm font-semibold text-white mb-3">{wf.name}</h4>
                <div className="space-y-2 mb-3">
                  {wf.steps.map((step, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm">
                      <div className="flex-shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-accent-500/10 border border-accent-500/15 text-accent-300 text-xs font-bold">
                        {i + 1}
                      </div>
                      <span className="text-ink-200">{step}</span>
                      {i < wf.steps.length - 1 && (
                        <Icon name="ChevronDown" size={14} className="text-ink-500 -ml-1" />
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                  <Icon name="CheckCircle" size={14} className="text-success-400" />
                  <p className="text-xs text-ink-300">{wf.benefit}</p>
                </div>
                <button onClick={() => onNavigate('workflows')} className="mt-3 text-xs text-accent-300 hover:text-accent-200 flex items-center gap-1">
                  View full workflow <Icon name="ArrowRight" size={12} />
                </button>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Expected Benefits */}
      <Section title="Expected Benefits" icon="TrendingUp" subtitle="What this plan will do for your business">
        <div className="space-y-2">
          {report.actionPlan.expectedBenefits.map((benefit, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-success-500/5 border border-success-500/10">
              <Icon name="CheckCircle" size={18} className="text-success-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-ink-100">{benefit}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <div className="mt-12 rounded-2xl border border-accent-500/20 bg-gradient-to-br from-ink-850 to-accent-900/10 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-display text-lg font-bold text-white mb-1">Need help implementing this?</h3>
            <p className="text-sm text-ink-300">XAVS can implement your AI action plan for you.</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => onNavigate('services')} className="btn-primary">
              <Icon name="Handshake" size={18} /> Talk to XAVS
            </button>
            <a href={XAVS.whatsappLink(XAVS.defaultWhatsappMessage)} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
              <Icon name="MessageCircle" size={18} /> WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ title, icon, subtitle, children }: { title: string; icon: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <div className="flex items-center gap-2.5 mb-1">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-500/10 border border-accent-500/15">
          <Icon name={icon} size={16} className="text-accent-400" />
        </div>
        <h2 className="font-display text-xl font-bold text-white tracking-tight">{title}</h2>
      </div>
      {subtitle && <p className="text-sm text-ink-400 mb-4 ml-10">{subtitle}</p>}
      {!subtitle && <div className="mb-4" />}
      {children}
    </section>
  );
}
