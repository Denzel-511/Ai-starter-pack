export const XAVS = {
  name: 'XAVS',
  whatsappNumber: '15555555555', // placeholder — replace with real XAVS number
  whatsappLink: (message?: string) => {
    const base = `https://wa.me/${XAVS.whatsappNumber}`;
    return message ? `${base}?text=${encodeURIComponent(message)}` : base;
  },
  defaultWhatsappMessage:
    "Hi XAVS, I completed my AI Business Audit and I'd like help implementing my action plan.",
  email: 'hello@xavs.com', // placeholder
};

export const NAV_ITEMS: { id: import('@/types').ViewId; label: string; icon: string }[] = [
  { id: 'home', label: 'Home', icon: 'Home' },
  { id: 'toolkit', label: 'Toolkit', icon: 'Wrench' },
  { id: 'workflows', label: 'Workflows', icon: 'Workflow' },
  { id: 'ai-tools', label: 'AI Tools', icon: 'Cpu' },
  { id: 'templates', label: 'Templates', icon: 'FileText' },
  { id: 'whats-new', label: "What's New", icon: 'Sparkles' },
  { id: 'services', label: 'XAVS Services', icon: 'Handshake' },
];
