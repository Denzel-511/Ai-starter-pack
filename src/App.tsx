import { useState, useEffect, useCallback } from 'react';
import type { ViewId, BusinessAnswers, AuditReport } from '@/types';
import { EMPTY_ANSWERS } from '@/data/questionnaire';
import { generateReport } from '@/lib/auditEngine';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Home } from '@/views/Home';
import { Audit } from '@/views/Audit';
import { Report } from '@/views/Report';
import { ActionPlan } from '@/views/ActionPlan';
import { Export } from '@/views/Export';
import { Toolkit } from '@/views/Toolkit';
import { Workflows } from '@/views/Workflows';
import { AiTools } from '@/views/AiTools';
import { Templates } from '@/views/Templates';
import { WhatsNew } from '@/views/WhatsNew';
import { Services } from '@/views/Services';
import { Icon } from '@/components/ui';

const STORAGE_KEYS = {
  answers: 'xavs-answers',
  report: 'xavs-report',
  view: 'xavs-view',
};

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function saveToStorage(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore quota errors
  }
}

function App() {
  const [view, setView] = useState<ViewId>(() =>
    loadFromStorage<ViewId>(STORAGE_KEYS.view, 'home')
  );
  const [answers, setAnswers] = useState<BusinessAnswers>(() =>
    loadFromStorage<BusinessAnswers>(STORAGE_KEYS.answers, EMPTY_ANSWERS)
  );
  const [report, setReport] = useState<AuditReport | null>(() =>
    loadFromStorage<AuditReport | null>(STORAGE_KEYS.report, null)
  );

  const hasReport = report !== null && answers.businessName.trim().length > 0;

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.view, view);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [view]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.answers, answers);
  }, [answers]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.report, report);
  }, [report]);

  const handleNavigate = useCallback((v: ViewId) => {
    setView(v);
  }, []);

  const handleAuditComplete = useCallback((completedAnswers: BusinessAnswers) => {
    setAnswers(completedAnswers);
    const generated = generateReport(completedAnswers);
    setReport(generated);
    setView('report');
  }, []);

  const renderView = () => {
    switch (view) {
      case 'home':
        return (
          <Home
            onNavigate={handleNavigate}
            hasReport={hasReport}
            businessName={answers.businessName}
          />
        );
      case 'audit':
        return <Audit answers={answers} onComplete={handleAuditComplete} onNavigate={handleNavigate} />;
      case 'report':
        if (!report) {
          return <NoReport onNavigate={handleNavigate} />;
        }
        return <Report report={report} answers={answers} onNavigate={handleNavigate} />;
      case 'action-plan':
        if (!report) {
          return <NoReport onNavigate={handleNavigate} />;
        }
        return <ActionPlan report={report} answers={answers} onNavigate={handleNavigate} />;
      case 'export':
        if (!report) {
          return <NoReport onNavigate={handleNavigate} />;
        }
        return <Export report={report} answers={answers} onNavigate={handleNavigate} />;
      case 'toolkit':
        return <Toolkit onNavigate={handleNavigate} />;
      case 'workflows':
        return <Workflows onNavigate={handleNavigate} />;
      case 'ai-tools':
        return <AiTools onNavigate={handleNavigate} />;
      case 'templates':
        return <Templates onNavigate={handleNavigate} />;
      case 'whats-new':
        return <WhatsNew onNavigate={handleNavigate} />;
      case 'services':
        return <Services onNavigate={handleNavigate} hasReport={hasReport} />;
      default:
        return <Home onNavigate={handleNavigate} hasReport={hasReport} businessName={answers.businessName} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Nav current={view} onNavigate={handleNavigate} hasReport={hasReport} />
      <main className="flex-1">{renderView()}</main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

function NoReport({ onNavigate }: { onNavigate: (v: ViewId) => void }) {
  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-20 text-center animate-fade-in">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-500/10 border border-accent-500/15 mx-auto mb-6">
        <Icon name="FileBarChart" size={28} className="text-accent-400" />
      </div>
      <h2 className="font-display text-2xl font-bold text-white mb-3">No report yet</h2>
      <p className="text-ink-300 mb-8 max-w-md mx-auto">
        You need to complete the AI Business Audit first to generate your personalized report and action
        plan.
      </p>
      <button onClick={() => onNavigate('audit')} className="btn-primary">
        <Icon name="Sparkles" size={18} />
        Start My AI Audit
      </button>
    </div>
  );
}

export default App;
