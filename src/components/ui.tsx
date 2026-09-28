import { useEffect, useState } from 'react';
import {
  ArrowLeft, ArrowRight, Building2, CalendarDays, Check, CheckCircle,
  ChevronDown, ClipboardList, Copy, Cpu, Download, ExternalLink,
  FileBarChart, FileText, Gauge, Handshake, Headset, Home, Info, Lightbulb,
  ListTodo, Mail, Megaphone, Menu, MessageCircle, PenLine, RotateCcw, Send,
  Settings, Share2, Sparkles, Star, TrendingUp, Workflow, Wrench, Zap,
  type LucideProps,
} from 'lucide-react';

const ICON_MAP: Record<string, React.ComponentType<LucideProps>> = {
  ArrowLeft, ArrowRight, Building2, CalendarDays, Check, CheckCircle,
  ChevronDown, ClipboardList, Copy, Cpu, Download, ExternalLink,
  FileBarChart, FileText, Gauge, Handshake, Headset, Home, Info, Lightbulb,
  ListTodo, Mail, Megaphone, Menu, MessageCircle, PenLine, RotateCcw, Send,
  Settings, Share2, Sparkles, Star, TrendingUp, Workflow, Wrench, Zap,
};

interface IconProps {
  name: string;
  className?: string;
  size?: number;
  strokeWidth?: number;
}

export function Icon({ name, className, size = 20, strokeWidth = 2 }: IconProps) {
  const LucideIcon = ICON_MAP[name];
  if (!LucideIcon) return null;
  return <LucideIcon className={className} size={size} strokeWidth={strokeWidth} />;
}

export function CopyButton({ text, label = 'Copy' }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
    }
  };

  return (
    <button
      onClick={copy}
      className={`btn text-sm px-3 py-1.5 ${
        copied
          ? 'bg-success-500/15 text-success-400 border border-success-500/20'
          : 'bg-white/5 text-ink-200 border border-white/10 hover:bg-white/10 hover:text-white'
      }`}
    >
      {copied ? (
        <>
          <Icon name="Check" size={14} /> Copied
        </>
      ) : (
        <>
          <Icon name="Copy" size={14} /> {label}
        </>
      )}
    </button>
  );
}
