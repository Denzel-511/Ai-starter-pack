import { useState } from 'react';
import type { AuditReport, BusinessAnswers, ViewId } from '@/types';
import { Icon, CopyButton } from '@/components/ui';
import { generateReportHtml, downloadReport, generateEmailBody } from '@/lib/reportGenerator';
import { XAVS } from '@/data/xavs';

interface ExportProps {
  report: AuditReport;
  answers: BusinessAnswers;
  onNavigate: (view: ViewId) => void;
}

export function Export({ report, answers, onNavigate }: ExportProps) {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [emailError, setEmailError] = useState('');

  const html = generateReportHtml(report, answers);
  const filename = `${answers.businessName.replace(/\s+/g, '-').toLowerCase()}-ai-audit-report.html`;

  const handleDownload = () => {
    downloadReport(html, filename);
  };

  const handleEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError('');

    if (!email.trim()) {
      setEmailError('Please enter your email address.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }

    // Use mailto as a lightweight delivery mechanism — no external service required.
    // The report body is pre-filled so the user's email client sends it.
    const body = generateEmailBody(report, answers);
    const subject = `AI Business Audit Report — ${answers.businessName}`;
    const mailtoLink = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;
    setEmailSent(true);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-10 animate-fade-in">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-3">
          <span className="chip-accent">
            <Icon name="Download" size={14} /> Export Report
          </span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight mb-2">
          Download or Email Your Report
        </h1>
        <p className="text-ink-300 max-w-2xl">
          Your AI Business Audit for {answers.businessName} is ready. Download a professional branded
          report or send it to your email.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Download */}
        <div className="card p-6 card-hover">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-500/10 border border-accent-500/15 mb-4">
            <Icon name="Download" size={24} className="text-accent-400" />
          </div>
          <h3 className="font-display text-lg font-semibold text-white mb-2">Download My Report</h3>
          <p className="text-sm text-ink-300 mb-4 leading-relaxed">
            Download a professionally formatted, branded HTML report. Opens in any browser and is ready
            to print or save as PDF.
          </p>
          <ul className="space-y-1.5 mb-5 text-sm text-ink-300">
            <li className="flex items-center gap-2"><Icon name="Check" size={14} className="text-success-400" /> Full audit and action plan</li>
            <li className="flex items-center gap-2"><Icon name="Check" size={14} className="text-success-400" /> XAVS branded layout</li>
            <li className="flex items-center gap-2"><Icon name="Check" size={14} className="text-success-400" /> Print-ready format</li>
          </ul>
          <button onClick={handleDownload} className="btn-primary w-full">
            <Icon name="Download" size={18} /> Download Report
          </button>
        </div>

        {/* Email */}
        <div className="card p-6 card-hover">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-500/10 border border-accent-500/15 mb-4">
            <Icon name="Mail" size={24} className="text-accent-400" />
          </div>
          <h3 className="font-display text-lg font-semibold text-white mb-2">Send My Report to Email</h3>
          <p className="text-sm text-ink-300 mb-4 leading-relaxed">
            Enter your email and we'll open your email client with the full report ready to send.
          </p>
          {emailSent ? (
            <div className="rounded-xl bg-success-500/10 border border-success-500/20 p-4 mb-4">
              <div className="flex items-center gap-2 mb-1">
                <Icon name="CheckCircle" size={18} className="text-success-400" />
                <h4 className="text-sm font-semibold text-success-400">Email ready to send</h4>
              </div>
              <p className="text-xs text-ink-300">
                Your email client should have opened with the report. Check your drafts or outbox. If it
                didn't open, try the download option.
              </p>
            </div>
          ) : (
            <form onSubmit={handleEmail} className="space-y-3">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError('');
                  }}
                  placeholder="your@email.com"
                  className="input"
                />
                {emailError && <p className="text-xs text-error-400 mt-1.5">{emailError}</p>}
              </div>
              <button type="submit" className="btn-primary w-full">
                <Icon name="Send" size={18} /> Send Report
              </button>
            </form>
          )}
          <p className="text-xs text-ink-400 mt-3">
            This opens your email client with the report pre-filled. For automated delivery, an email
            service can be connected later.
          </p>
        </div>
      </div>

      {/* Preview note */}
      <div className="mt-8 card p-5">
        <div className="flex items-start gap-3">
          <Icon name="Info" size={18} className="text-accent-400 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-white mb-1">What's in the report</h4>
            <p className="text-sm text-ink-300 leading-relaxed">
              Business profile, audit findings, AI opportunities, priority recommendations, recommended
              tools, recommended workflows, and the full 30-day action plan — all formatted as a
              professional XAVS report.
            </p>
          </div>
        </div>
      </div>

      {/* Copy text version */}
      <div className="mt-6 card p-5">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-semibold text-white">Plain-text version</h4>
          <CopyButton text={generateEmailBody(report, answers)} label="Copy full report" />
        </div>
        <p className="text-xs text-ink-400">
          Copy the full report as plain text to paste into any document, note, or message.
        </p>
      </div>

      {/* Next steps */}
      <div className="mt-10 flex flex-col sm:flex-row gap-3">
        <button onClick={() => onNavigate('action-plan')} className="btn-secondary">
          <Icon name="ListTodo" size={18} /> View Action Plan
        </button>
        <button onClick={() => onNavigate('toolkit')} className="btn-secondary">
          <Icon name="Wrench" size={18} /> Explore Toolkit
        </button>
        <a href={XAVS.whatsappLink(XAVS.defaultWhatsappMessage)} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
          <Icon name="MessageCircle" size={18} /> Talk to XAVS
        </a>
      </div>
    </div>
  );
}
