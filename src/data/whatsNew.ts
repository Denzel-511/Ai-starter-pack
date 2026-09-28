export interface WhatsNewItem {
  id: string;
  date: string;
  type: 'New Resource' | 'New Workflow' | 'New Tool' | 'New Template' | 'Improvement';
  title: string;
  description: string;
}

export const WHATS_NEW: WhatsNewItem[] = [
  {
    id: '1',
    date: '2026-09-28',
    type: 'New Resource',
    title: 'WhatsApp Marketing Message generator',
    description: 'A new toolkit resource for writing short, effective WhatsApp broadcasts that don\'t feel spammy — with a built-in follow-up message.',
  },
  {
    id: '2',
    date: '2026-09-28',
    type: 'New Workflow',
    title: 'Customer Feedback → Improvement workflow',
    description: 'A new visual workflow showing how to collect, sort, and act on customer feedback so every complaint becomes a concrete improvement.',
  },
  {
    id: '3',
    date: '2026-09-20',
    type: 'New Tool',
    title: 'NotebookLM added to AI Tools directory',
    description: 'Google\'s NotebookLM is now featured — perfect for uploading your own documents and getting grounded summaries and audio overviews.',
  },
  {
    id: '4',
    date: '2026-09-15',
    type: 'New Template',
    title: 'Lead Follow-Up Tracker template',
    description: 'A printable template to track every lead from first contact to close — so no potential customer ever slips through the cracks.',
  },
  {
    id: '5',
    date: '2026-09-10',
    type: 'Improvement',
    title: 'Smarter audit recommendations',
    description: 'The AI Business Audit now generates more specific, context-aware recommendations based on your industry, team size, and current tools.',
  },
  {
    id: '6',
    date: '2026-09-01',
    type: 'New Resource',
    title: 'Handle a Customer Objection toolkit resource',
    description: 'A new sales resource that helps you respond to "it\'s too expensive" and other common objections with two ready-to-use reply options.',
  },
];
