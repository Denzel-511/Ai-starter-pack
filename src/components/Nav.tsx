import { useState } from 'react';
import type { ViewId } from '@/types';
import { NAV_ITEMS, XAVS } from '@/data/xavs';
import { Icon } from './ui';

interface NavProps {
  current: ViewId;
  onNavigate: (view: ViewId) => void;
  hasReport: boolean;
}

export function Nav({ current, onNavigate, hasReport }: NavProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (view: ViewId) => {
    onNavigate(view);
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-ink-950/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-2.5 group"
          >
            <div className="relative">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-500/10 border border-accent-500/20 group-hover:bg-accent-500/20 transition-colors">
                <Icon name="ChevronDown" size={18} className="text-accent-400" />
              </div>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display text-base font-bold tracking-tight text-white">
                XAVS
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-ink-300">
                AI Starter Kit
              </span>
            </div>
          </button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  current === item.id
                    ? 'bg-white/10 text-white'
                    : 'text-ink-200 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon name={item.icon} size={16} />
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {hasReport && (
              <button
                onClick={() => handleNav('report')}
                className={`hidden sm:flex btn text-sm px-3 py-2 ${
                  current === 'report' || current === 'action-plan' || current === 'export'
                    ? 'bg-accent-500/15 text-accent-200 border border-accent-500/20'
                    : 'bg-white/5 text-ink-100 border border-white/10 hover:bg-white/10'
                }`}
              >
                <Icon name="FileBarChart" size={16} /> My Report
              </button>
            )}
            <a
              href={XAVS.whatsappLink(XAVS.defaultWhatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp text-sm px-3 py-2"
            >
              <Icon name="MessageCircle" size={16} />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden btn-ghost p-2"
              aria-label="Menu"
            >
              <Icon name={mobileOpen ? 'X' : 'Menu'} size={22} />
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <nav className="lg:hidden pb-4 pt-2 space-y-1 animate-fade-in-fast">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  current === item.id
                    ? 'bg-white/10 text-white'
                    : 'text-ink-200 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon name={item.icon} size={18} />
                {item.label}
              </button>
            ))}
            {hasReport && (
              <button
                onClick={() => handleNav('report')}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-accent-200 hover:bg-accent-500/10"
              >
                <Icon name="FileBarChart" size={18} /> My Report
              </button>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
