import { XAVS } from '@/data/xavs';
import { Icon } from './ui';
import type { ViewId } from '@/types';

interface FooterProps {
  onNavigate: (view: ViewId) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="mt-24 border-t border-white/5 bg-ink-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-500/10 border border-accent-500/20">
                <Icon name="ChevronDown" size={18} className="text-accent-400" />
              </div>
              <div>
                <div className="font-display text-base font-bold text-white">XAVS</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-ink-300">AI Starter Kit</div>
              </div>
            </div>
            <p className="text-sm text-ink-300 max-w-sm leading-relaxed">
              Practical AI tools, audits, and workflows built for real small businesses. Put AI to
              work without the overwhelm.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-ink-300">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-accent-300 transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('toolkit')} className="hover:text-accent-300 transition-colors">
                  Toolkit
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('workflows')} className="hover:text-accent-300 transition-colors">
                  Workflows
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('ai-tools')} className="hover:text-accent-300 transition-colors">
                  AI Tools
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('templates')} className="hover:text-accent-300 transition-colors">
                  Templates
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">XAVS</h4>
            <ul className="space-y-2 text-sm text-ink-300">
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-accent-300 transition-colors">
                  Services
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('whats-new')} className="hover:text-accent-300 transition-colors">
                  What's New
                </button>
              </li>
              <li>
                <a
                  href={XAVS.whatsappLink(XAVS.defaultWhatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent-300 transition-colors"
                >
                  WhatsApp Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between gap-4 text-xs text-ink-400">
          <p>&copy; {new Date().getFullYear()} XAVS. All rights reserved.</p>
          <p>Put AI to work in your business.</p>
        </div>
      </div>
    </footer>
  );
}
