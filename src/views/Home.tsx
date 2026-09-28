import type { ViewId } from '@/types';
import { Icon } from '@/components/ui';
import { XAVS } from '@/data/xavs';

interface HomeProps {
  onNavigate: (view: ViewId) => void;
  hasReport: boolean;
  businessName?: string;
}

export function Home({ onNavigate, hasReport, businessName }: HomeProps) {
  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute inset-0 bg-radial-accent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 pt-20 pb-24 sm:pt-28 sm:pb-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent-500/20 bg-accent-500/5 px-4 py-1.5 mb-8 animate-fade-in">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-accent-400 animate-pulse-ring" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-400" />
              </span>
              <span className="text-xs font-medium text-accent-200">
                AI Business Starter Kit
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tightest text-white leading-[1.05] text-balance animate-slide-up">
              Put AI to Work in Your Business
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-ink-200 leading-relaxed max-w-2xl animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Practical AI tools, recommendations, and workflows designed around your business. Get a
              personalized AI audit, a clear action plan, and the toolkit to actually execute it.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <button
                onClick={() => onNavigate(hasReport ? 'report' : 'audit')}
                className="btn-primary text-base px-7 py-4 group"
              >
                <Icon name="Sparkles" size={20} />
                {hasReport ? `View ${businessName ? businessName + "'s" : 'My'} Audit` : 'Start My AI Audit'}
                <Icon name="ArrowRight" size={18} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
              <button
                onClick={() => onNavigate('toolkit')}
                className="btn-secondary text-base px-7 py-4"
              >
                <Icon name="Wrench" size={20} />
                Explore the Toolkit
              </button>
            </div>

            {hasReport && (
              <div className="mt-6 flex flex-wrap gap-3 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <button onClick={() => onNavigate('action-plan')} className="chip-accent">
                  <Icon name="ListTodo" size={14} /> View Action Plan
                </button>
                <button onClick={() => onNavigate('export')} className="chip-muted">
                  <Icon name="Download" size={14} /> Download Report
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
        <div className="text-center mb-14">
          <p className="section-eyebrow mb-3">How it works</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            From questions to action in four steps
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: 'ClipboardList',
              title: 'Tell us about your business',
              desc: 'A guided questionnaire about how your business actually runs today.',
              step: '01',
            },
            {
              icon: 'FileBarChart',
              title: 'Get your AI Business Audit',
              desc: 'A personalized report identifying real opportunities across your business.',
              step: '02',
            },
            {
              icon: 'ListTodo',
              title: 'Follow your Action Plan',
              desc: 'A practical 30-day plan with immediate actions and weekly milestones.',
              step: '03',
            },
            {
              icon: 'Wrench',
              title: 'Use the toolkit to execute',
              desc: 'Ready-to-use AI prompts, workflows, and templates for every task.',
              step: '04',
            },
          ].map((item, i) => (
            <div
              key={i}
              className="card card-hover p-6 group animate-scale-in"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-500/10 border border-accent-500/15 group-hover:bg-accent-500/20 transition-colors">
                  <Icon name={item.icon} size={20} className="text-accent-400" />
                </div>
                <span className="font-display text-2xl font-bold text-white/10">{item.step}</span>
              </div>
              <h3 className="text-base font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-sm text-ink-300 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What the product does */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <p className="section-eyebrow mb-3">What's inside</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
              Everything you need to put AI to work
            </h2>
            <p className="text-ink-300 leading-relaxed">
              Not theory. Not generic advice. A complete kit built for small-business owners who want
              practical results.
            </p>
          </div>

          <div className="lg:col-span-2 grid gap-4 sm:grid-cols-2">
            {[
              { icon: 'FileBarChart', title: 'Personalized AI Audit', desc: 'A report tailored to your business, not a template.' },
              { icon: 'ListTodo', title: '30-Day Action Plan', desc: 'Week-by-week steps so you always know what to do next.' },
              { icon: 'Wrench', title: 'AI Toolkit', desc: '20+ ready-to-use prompts for marketing, sales, content, and ops.' },
              { icon: 'Workflow', title: 'Visual Workflows', desc: 'Practical processes from enquiry to sale, product to content.' },
              { icon: 'Cpu', title: 'AI Tools Directory', desc: 'Curated tools with clear guidance on when to use each.' },
              { icon: 'FileText', title: 'Templates', desc: 'Business, marketing, and operations templates ready to copy.' },
            ].map((item, i) => (
              <button
                key={i}
                onClick={() => {
                  if (item.title === 'Personalized AI Audit') onNavigate(hasReport ? 'report' : 'audit');
                  else if (item.title === '30-Day Action Plan') onNavigate('action-plan');
                  else if (item.title === 'AI Toolkit') onNavigate('toolkit');
                  else if (item.title === 'Visual Workflows') onNavigate('workflows');
                  else if (item.title === 'AI Tools Directory') onNavigate('ai-tools');
                  else if (item.title === 'Templates') onNavigate('templates');
                }}
                className="card card-hover p-5 text-left group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 border border-white/10 group-hover:bg-accent-500/10 group-hover:border-accent-500/20 transition-colors">
                    <Icon name={item.icon} size={18} className="text-accent-400" />
                  </div>
                  <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                </div>
                <p className="text-sm text-ink-300 leading-relaxed">{item.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
        <div className="relative overflow-hidden rounded-3xl border border-accent-500/20 bg-gradient-to-br from-ink-850 via-ink-850 to-accent-900/20 p-8 sm:p-12">
          <div className="absolute inset-0 bg-grid opacity-30" />
          <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-xl">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight mb-3">
                Don't want to do it yourself?
              </h2>
              <p className="text-ink-200 leading-relaxed">
                Let XAVS implement your AI action plan for you — or manage your social media presence
                so you can focus on running your business.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button onClick={() => onNavigate('services')} className="btn-primary">
                <Icon name="Handshake" size={18} /> Talk to XAVS
              </button>
              <a
                href={XAVS.whatsappLink(XAVS.defaultWhatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
              >
                <Icon name="MessageCircle" size={18} /> WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
