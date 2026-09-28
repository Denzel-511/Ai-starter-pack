import type { ViewId } from '@/types';
import { Icon } from '@/components/ui';
import { XAVS } from '@/data/xavs';

interface ServicesProps {
  onNavigate: (view: ViewId) => void;
  hasReport: boolean;
}

export function Services({ onNavigate, hasReport }: ServicesProps) {
  const aiImplMessage = hasReport
    ? "Hi XAVS, I completed my AI Business Audit and I'd like help implementing my action plan."
    : 'Hi XAVS, I\'d like to learn more about your AI implementation services.';
  const socialMessage = 'Hi XAVS, I\'d like to learn more about your social media management services.';

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-10 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-12 max-w-2xl mx-auto">
        <p className="section-eyebrow mb-3">XAVS Services</p>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
          Don't want to do it yourself?
        </h1>
        <p className="text-lg text-ink-200 leading-relaxed">
          Let XAVS implement it for you. We turn your AI audit and action plan into done-for-you systems
          — so you get the benefits without the learning curve.
        </p>
      </div>

      {/* Service cards */}
      <div className="grid gap-6 md:grid-cols-2 mb-12">
        {/* AI Implementation */}
        <div className="card p-7 card-hover group">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-500/15 to-accent-700/10 border border-accent-500/20 mb-5 group-hover:scale-105 transition-transform">
            <Icon name="Cpu" size={28} className="text-accent-400" />
          </div>
          <h2 className="font-display text-xl font-bold text-white mb-2">AI Implementation</h2>
          <p className="text-sm text-ink-300 leading-relaxed mb-5">
            XAVS helps businesses implement practical AI workflows and systems based on their audit and
            action plan. We set up the tools, build the workflows, and train your team — so AI starts
            saving you time immediately.
          </p>
          <ul className="space-y-2 mb-6">
            {[
              'Custom AI workflow setup',
              'Tool selection and configuration',
              'Team training and handover',
              'Ongoing support and optimization',
            ].map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-ink-200">
                <Icon name="Check" size={16} className="text-success-400 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          <a
            href={XAVS.whatsappLink(aiImplMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full"
          >
            <Icon name="MessageCircle" size={18} /> Talk to XAVS
          </a>
        </div>

        {/* Social Media Management */}
        <div className="card p-7 card-hover group">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-500/15 to-accent-700/10 border border-accent-500/20 mb-5 group-hover:scale-105 transition-transform">
            <Icon name="Share2" size={28} className="text-accent-400" />
          </div>
          <h2 className="font-display text-xl font-bold text-white mb-2">Social Media Management</h2>
          <p className="text-sm text-ink-300 leading-relaxed mb-5">
            XAVS helps businesses manage their social media content and maintain a consistent online
            presence. From content calendars to daily posts, we keep your brand visible so you can focus
            on running your business.
          </p>
          <ul className="space-y-2 mb-6">
            {[
              'Content strategy and planning',
              'Daily/weekly post creation',
              'Community management',
              'Performance tracking and reporting',
            ].map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-ink-200">
                <Icon name="Check" size={16} className="text-success-400 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          <a
            href={XAVS.whatsappLink(socialMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full"
          >
            <Icon name="MessageCircle" size={18} /> Talk to XAVS
          </a>
        </div>
      </div>

      {/* WhatsApp direct */}
      <div className="rounded-2xl border border-[#25D366]/20 bg-[#25D366]/5 p-6 sm:p-8 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#25D366]/10 border border-[#25D366]/20 mx-auto mb-4">
          <Icon name="MessageCircle" size={24} className="text-[#25D366]" />
        </div>
        <h3 className="font-display text-lg font-bold text-white mb-2">Prefer to chat directly?</h3>
        <p className="text-sm text-ink-300 mb-5 max-w-md mx-auto">
          Message us on WhatsApp and we'll get back to you. Whether it's about your audit, implementation,
          or social media — we're here to help.
        </p>
        <a
          href={XAVS.whatsappLink(XAVS.defaultWhatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-whatsapp"
        >
          <Icon name="MessageCircle" size={18} /> Message XAVS on WhatsApp
        </a>
      </div>

      {/* Next steps */}
      {!hasReport && (
        <div className="mt-12 text-center">
          <p className="text-sm text-ink-300 mb-4">Haven't completed your AI Business Audit yet?</p>
          <button onClick={() => onNavigate('audit')} className="btn-secondary">
            <Icon name="Sparkles" size={18} /> Start My AI Audit
          </button>
        </div>
      )}
    </div>
  );
}
