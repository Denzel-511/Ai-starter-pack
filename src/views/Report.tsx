import type { AuditReport, BusinessAnswers, ViewId } from '@/types';
import { Icon } from '@/components/ui';
import { getImpactColor, getDifficultyColor } from '@/lib/auditEngine';
import { XAVS } from '@/data/xavs';

interface ReportProps {
  report: AuditReport;
  answers: BusinessAnswers;
  onNavigate: (view: ViewId) => void;
}

export function Report({ report, answers, onNavigate }: ReportProps) {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-10 animate-fade-in">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-3">
          <span className="chip-accent">
            <Icon name="FileBarChart" size={14} /> AI Business Audit
          </span>
          <span className="chip-muted">
            {new Date(report.generatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight mb-2">
          {answers.businessName}
        </h1>
        <p className="text-ink-300">
          {answers.industry} · {answers.location} · {answers.teamSize}
        </p>
      </div>

      {/* Quick actions */}
      <div className="mb-10 flex flex-wrap gap-3">
        <button onClick={() => onNavigate('action-plan')} className="btn-primary">
          <Icon name="ListTodo" size={18} /> View Action Plan
        </button>
        <button onClick={() => onNavigate('export')} className="btn-secondary">
          <Icon name="Download" size={18} /> Download / Email
        </button>
        <button onClick={() => onNavigate('audit')} className="btn-ghost">
          <Icon name="RotateCcw" size={18} /> Redo Audit
        </button>
      </div>

      {/* Business Overview */}
      <Section title="Business Overview" icon="Building2">
        <p className="text-ink-100 leading-relaxed">{report.businessOverview}</p>
      </Section>

      {/* Current Situation */}
      <Section title="Current Situation" icon="ClipboardList">
        <p className="text-ink-100 leading-relaxed">{report.currentSituation}</p>
      </Section>

      {/* AI Opportunities */}
      <Section title="AI Opportunities" icon="Lightbulb">
        <div className="space-y-4">
          {report.opportunities.map((opp, i) => (
            <div key={opp.id} className="card p-5 card-hover">
              <div className="flex items-start justify-between gap-4 mb-3">
                <h3 className="text-base font-semibold text-white flex items-start gap-2">
                  <span className="text-accent-400 font-display text-lg">{i + 1}.</span>
                  {opp.title}
                </h3>
                {opp.priority && (
                  <span className="chip-accent flex-shrink-0">
                    <Icon name="Star" size={12} /> Priority
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="chip-muted">{opp.area}</span>
                <span className={`chip border ${getDifficultyColor(opp.difficulty)}`}>
                  <Icon name="Gauge" size={12} /> {opp.difficulty}
                </span>
                <span className={`chip border ${getImpactColor(opp.impact)}`}>
                  <Icon name="TrendingUp" size={12} /> {opp.impact} impact
                </span>
              </div>
              <div className="space-y-2.5 text-sm">
                <p className="text-ink-200">
                  <span className="text-ink-400 font-medium">Why it matters: </span>
                  {opp.whyItMatters}
                </p>
                <p className="text-ink-200">
                  <span className="text-ink-400 font-medium">Recommended approach: </span>
                  {opp.recommendedApproach}
                </p>
                <p className="text-ink-200">
                  <span className="text-ink-400 font-medium">Recommended tools: </span>
                  {opp.recommendedTools.join(', ')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Priority Opportunities */}
      {report.priorityOpportunities.length > 0 && (
        <Section title="Priority Opportunities" icon="Star">
          <p className="text-sm text-ink-300 mb-4">The most important opportunities to address first:</p>
          <div className="space-y-3">
            {report.priorityOpportunities.map((opp, i) => (
              <div key={opp.id} className="flex gap-4 p-4 rounded-xl bg-accent-500/5 border border-accent-500/15">
                <div className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-accent-500 text-white font-bold text-sm font-display">
                  {i + 1}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white mb-1">{opp.title}</h4>
                  <p className="text-sm text-ink-300">{opp.whyItMatters}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* CTA */}
      <div className="mt-12 rounded-2xl border border-accent-500/20 bg-gradient-to-br from-ink-850 to-accent-900/10 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-display text-lg font-bold text-white mb-1">Ready to take action?</h3>
            <p className="text-sm text-ink-300">View your 30-day action plan or download your full report.</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => onNavigate('action-plan')} className="btn-primary">
              <Icon name="ListTodo" size={18} /> Action Plan
            </button>
            <a href={XAVS.whatsappLink(XAVS.defaultWhatsappMessage)} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
              <Icon name="MessageCircle" size={18} /> Talk to XAVS
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <div className="flex items-center gap-2.5 mb-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-500/10 border border-accent-500/15">
          <Icon name={icon} size={16} className="text-accent-400" />
        </div>
        <h2 className="font-display text-xl font-bold text-white tracking-tight">{title}</h2>
      </div>
      {children}
    </section>
  );
}
