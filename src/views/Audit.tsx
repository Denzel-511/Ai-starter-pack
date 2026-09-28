import { useState } from 'react';
import type { BusinessAnswers, ViewId } from '@/types';
import { QUESTIONNAIRE_SECTIONS } from '@/data/questionnaire';
import { Icon } from '@/components/ui';

interface AuditProps {
  answers: BusinessAnswers;
  onComplete: (answers: BusinessAnswers) => void;
  onNavigate: (view: ViewId) => void;
}

export function Audit({ answers, onComplete }: AuditProps) {
  const [sectionIndex, setSectionIndex] = useState(0);
  const [form, setForm] = useState<BusinessAnswers>(answers);
  const [generating, setGenerating] = useState(false);

  const section = QUESTIONNAIRE_SECTIONS[sectionIndex];
  const totalSections = QUESTIONNAIRE_SECTIONS.length;
  const progress = ((sectionIndex + 1) / totalSections) * 100;

  const updateField = (id: keyof BusinessAnswers, value: string | string[]) => {
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const toggleMulti = (id: keyof BusinessAnswers, option: string) => {
    setForm((prev) => {
      const current = prev[id] as string[];
      const exists = current.includes(option);
      return {
        ...prev,
        [id]: exists ? current.filter((o) => o !== option) : [...current, option],
      };
    });
  };

  const isSectionValid = () => {
    return section.fields.every((field) => {
      if (!field.required) return true;
      const val = form[field.id];
      if (field.type === 'multiselect') return (val as string[]).length > 0;
      return (val as string).trim().length > 0;
    });
  };

  const handleNext = () => {
    if (sectionIndex < totalSections - 1) {
      setSectionIndex(sectionIndex + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setGenerating(true);
      setTimeout(() => {
        onComplete(form);
      }, 1200);
    }
  };

  const handleBack = () => {
    if (sectionIndex > 0) {
      setSectionIndex(sectionIndex - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (generating) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="text-center max-w-md animate-scale-in">
          <div className="relative mx-auto mb-8 h-20 w-20">
            <div className="absolute inset-0 rounded-full bg-accent-500/20 animate-pulse-ring" />
            <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-accent-500/10 border border-accent-500/20">
              <Icon name="Sparkles" size={32} className="text-accent-400 animate-pulse" />
            </div>
          </div>
          <h2 className="font-display text-2xl font-bold text-white mb-3">
            Generating your AI Business Audit
          </h2>
          <p className="text-ink-300 mb-8">
            Analyzing your answers and identifying personalized opportunities for {form.businessName || 'your business'}...
          </p>
          <div className="space-y-2 text-left">
            {[
              'Reviewing business profile',
              'Identifying AI opportunities',
              'Building your action plan',
              'Matching tools and workflows',
            ].map((step, i) => (
              <div
                key={i}
                className="flex items-center gap-3 text-sm text-ink-200 animate-fade-in"
                style={{ animationDelay: `${i * 0.3}s` }}
              >
                <div className="h-2 w-2 rounded-full bg-accent-400 animate-pulse" />
                {step}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10 animate-fade-in">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <p className="section-eyebrow">
            Section {sectionIndex + 1} of {totalSections}
          </p>
          <span className="text-sm text-ink-300">{Math.round(progress)}% complete</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-accent-600 to-accent-400 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        {/* Section dots */}
        <div className="mt-4 flex gap-2">
          {QUESTIONNAIRE_SECTIONS.map((s, i) => (
            <button
              key={s.id}
              onClick={() => i < sectionIndex && setSectionIndex(i)}
              className={`flex-1 h-1.5 rounded-full transition-all ${
                i <= sectionIndex ? 'bg-accent-500' : 'bg-white/5'
              } ${i < sectionIndex ? 'cursor-pointer hover:bg-accent-400' : ''}`}
            />
          ))}
        </div>
      </div>

      {/* Section header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-500/10 border border-accent-500/15">
            <Icon name={section.icon} size={18} className="text-accent-400" />
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
            {section.title}
          </h1>
        </div>
        <p className="text-ink-300 ml-13">{section.description}</p>
      </div>

      {/* Fields */}
      <div className="space-y-6">
        {section.fields.map((field) => (
          <div key={field.id} className="animate-fade-in">
            <label className="label">{field.label}</label>
            {field.help && <p className="text-xs text-ink-400 mb-2 -mt-1">{field.help}</p>}

            {field.type === 'text' && (
              <input
                type="text"
                value={form[field.id] as string}
                onChange={(e) => updateField(field.id, e.target.value)}
                placeholder={field.placeholder}
                className="input"
              />
            )}

            {field.type === 'textarea' && (
              <textarea
                value={form[field.id] as string}
                onChange={(e) => updateField(field.id, e.target.value)}
                placeholder={field.placeholder}
                rows={3}
                className="input resize-none"
              />
            )}

            {field.type === 'select' && (
              <select
                value={form[field.id] as string}
                onChange={(e) => updateField(field.id, e.target.value)}
                className="input cursor-pointer"
              >
                <option value="">{field.placeholder || 'Select an option'}</option>
                {field.options?.map((opt) => (
                  <option key={opt} value={opt} className="bg-ink-800">
                    {opt}
                  </option>
                ))}
              </select>
            )}

            {field.type === 'multiselect' && (
              <div className="flex flex-wrap gap-2">
                {field.options?.map((opt) => {
                  const selected = (form[field.id] as string[]).includes(opt);
                  return (
                    <button
                      key={opt}
                      onClick={() => toggleMulti(field.id, opt)}
                      className={`rounded-xl border px-4 py-2.5 text-sm transition-all ${
                        selected
                          ? 'bg-accent-500/15 border-accent-500/30 text-accent-200'
                          : 'bg-ink-800/50 border-white/10 text-ink-200 hover:border-white/20 hover:text-white'
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="mt-10 flex items-center justify-between">
        <button
          onClick={handleBack}
          disabled={sectionIndex === 0}
          className="btn-ghost"
        >
          <Icon name="ArrowLeft" size={18} /> Back
        </button>
        <button
          onClick={handleNext}
          disabled={!isSectionValid()}
          className="btn-primary"
        >
          {sectionIndex === totalSections - 1 ? (
            <>
              <Icon name="Sparkles" size={18} /> Generate My AI Business Audit
            </>
          ) : (
            <>
              Continue <Icon name="ArrowRight" size={18} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
