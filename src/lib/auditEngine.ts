import type {
  AiOpportunity,
  AuditReport,
  BusinessAnswers,
  RecommendedWorkflow,
  ActionItem,
} from '@/types';
import { WORKFLOWS } from '@/data/workflows';

const has = (s: string) => s.trim().length > 0;
const lower = (s: string) => s.toLowerCase();

function mentions(text: string, keywords: string[]): boolean {
  const t = lower(text);
  return keywords.some((k) => t.includes(k));
}

export function generateReport(answers: BusinessAnswers): AuditReport {
  const opportunities = buildOpportunities(answers);
  const priorityOpportunities = opportunities.filter((o) => o.priority).slice(0, 4);

  return {
    businessOverview: buildBusinessOverview(answers),
    currentSituation: buildCurrentSituation(answers),
    opportunities,
    priorityOpportunities,
    actionPlan: buildActionPlan(answers, priorityOpportunities),
    generatedAt: new Date().toISOString(),
  };
}

function buildBusinessOverview(a: BusinessAnswers): string {
  const team =
    a.teamSize === 'Just me (solo)'
      ? 'a solo operator'
      : `a team of ${a.teamSize.toLowerCase()}`;
  const channels = a.marketingChannels.length
    ? `reaching customers through ${a.marketingChannels.slice(0, 3).join(', ').toLowerCase()}`
    : 'still establishing its marketing channels';

  return `${a.businessName} is a ${a.industry.toLowerCase()} business based in ${a.location}, operating as ${team}. The business offers ${a.whatTheySell || 'its products and services'}, serving ${a.targetCustomers || 'its target market'}. It is currently ${channels}.`;
}

function buildCurrentSituation(a: BusinessAnswers): string {
  const parts: string[] = [];

  parts.push(
    `${a.businessName} currently acquires most customers through ${a.acquisitionMethods || 'a mix of channels'}.`
  );
  parts.push(
    `The sales process works as follows: ${a.salesProcess || 'this has not been formally documented yet'}.`
  );
  parts.push(
    `Customer service is handled by ${a.customerServiceProcess || 'an informal process that has not been standardized'}.`
  );

  if (has(a.repetitiveTasks)) {
    parts.push(`Repetitive tasks include ${a.repetitiveTasks}.`);
  }
  if (has(a.currentTools)) {
    parts.push(`The business currently uses ${a.currentTools}.`);
  } else {
    parts.push('The business does not yet have a formal toolset in place.');
  }

  if (has(a.currentAiUse)) {
    parts.push(`Regarding AI, ${a.currentAiUse}.`);
  } else {
    parts.push('The business has not yet adopted AI in any meaningful way.');
  }

  if (has(a.biggestChallenges)) {
    parts.push(`The biggest challenges right now are ${a.biggestChallenges}.`);
  }
  if (has(a.timeConsumingActivities)) {
    parts.push(`The most time-consuming activities are ${a.timeConsumingActivities}.`);
  }
  if (has(a.businessGoals)) {
    parts.push(`Looking ahead, the goals are ${a.businessGoals}.`);
  }
  if (has(a.whatAiShouldImprove)) {
    parts.push(`The owner wants AI to help with ${a.whatAiShouldImprove}.`);
  }

  return parts.join(' ');
}

function buildOpportunities(a: BusinessAnswers): AiOpportunity[] {
  const opps: AiOpportunity[] = [];
  const allText = [
    a.whatTheySell,
    a.targetCustomers,
    a.acquisitionMethods,
    a.salesProcess,
    a.customerServiceProcess,
    a.repetitiveTasks,
    a.currentTools,
    a.currentAiUse,
    a.biggestChallenges,
    a.timeConsumingActivities,
    a.businessGoals,
    a.whatAiShouldImprove,
  ].join(' ');

  // ── Marketing ──
  const lowMarketing =
    a.marketingChannels.length <= 2 ||
    a.marketingChannels.includes('None yet');
  if (lowMarketing || mentions(allText, ['marketing', 'lead', 'customer', 'reach', 'grow'])) {
    opps.push({
      id: 'mkt-strategy',
      area: 'Marketing',
      title: 'Build a structured marketing plan with AI-assisted targeting',
      whyItMatters:
        a.marketingChannels.includes('None yet')
          ? `${a.businessName} has no formal marketing channels yet, so every new customer depends on luck or word of mouth. A structured plan turns marketing from random into repeatable.`
          : `With only ${a.marketingChannels.length} active channel(s), ${a.businessName} is over-reliant on a single source of customers. Diversifying reduces risk and unlocks growth.`,
      recommendedApproach:
        'Use AI to define your ideal customer profile, then generate a 30-day marketing plan with 2-3 channels matched to where your customers already spend time. Start with one new channel before adding more.',
      recommendedTools: ['ChatGPT', 'Perplexity', 'Canva'],
      difficulty: 'Low',
      impact: 'High',
      priority: lowMarketing,
    });
  }

  // ── Content ──
  const contentPain = mentions(allText, ['content', 'post', 'social', 'instagram', 'caption', 'feed']);
  if (contentPain || a.marketingChannels.some((c) => lower(c).includes('social'))) {
    opps.push({
      id: 'content-system',
      area: 'Content',
      title: 'Create a repeatable content system with AI-generated posts',
      whyItMatters:
        'Consistent content is the cheapest way to stay visible, but most small businesses post irregularly because content creation is time-consuming. AI removes the blank-page problem.',
      recommendedApproach:
        'Use AI to generate a 30-day content calendar in one sitting, batch-write captions, and repurpose each post across platforms. Aim for 3-4 posts per week rather than daily — consistency beats volume.',
      recommendedTools: ['ChatGPT', 'Canva', 'CapCut'],
      difficulty: 'Low',
      impact: 'High',
      priority: contentPain || mentions(a.timeConsumingActivities, ['content', 'post', 'social']),
    });
  }

  // ── Sales ──
  const salesPain =
    mentions(allText, ['sale', 'lead', 'follow up', 'convert', 'close', 'enquiry', 'inquiry']);
  if (salesPain || has(a.salesProcess)) {
    opps.push({
      id: 'sales-followup',
      area: 'Sales',
      title: 'Standardize lead response and follow-up with AI templates',
      whyItMatters:
        mentions(a.biggestChallenges, ['lead', 'convert', 'sale'])
          ? `Slow or inconsistent follow-up is likely losing ${a.businessName} customers right now. Most leads go cold within 24 hours.`
          : 'Most small businesses lose leads not because the product is bad, but because follow-up is inconsistent. A templated, fast response system fixes this.',
      recommendedApproach:
        'Create AI-generated response templates for common enquiries, a simple lead tracker, and a one-touch follow-up message. Target a response time under 4 hours. Use the Lead Follow-Up template from the toolkit.',
      recommendedTools: ['ChatGPT', 'Claude'],
      difficulty: 'Low',
      impact: 'High',
      priority: salesPain,
    });
  }

  // ── Customer Service ──
  const servicePain = mentions(allText, ['support', 'complaint', 'angry', 'reply', 'response time', 'faq']);
  if (servicePain || has(a.customerServiceProcess)) {
    const noFormal = mentions(a.customerServiceProcess, ['no formal', 'informal', 'ad hoc', 'just', 'manually']);
    opps.push({
      id: 'cs-faqs',
      area: 'Customer Service',
      title: 'Reduce repetitive questions with an AI-generated FAQ and auto-reply',
      whyItMatters:
        noFormal
          ? `Customer service at ${a.businessName} is handled informally, which means the owner or team answers the same questions repeatedly. An FAQ frees up hours every week.`
          : 'Answering the same questions repeatedly drains time. A well-written FAQ and auto-reply handles 60-80% of routine enquiries automatically.',
      recommendedApproach:
        'Collect the 10-15 most common questions, use AI to write clear answers, and post them on your website, Instagram bio link, and WhatsApp auto-reply. For anything not covered, use a response template.',
      recommendedTools: ['ChatGPT', 'WhatsApp Business'],
      difficulty: 'Low',
      impact: 'Medium',
      priority: servicePain && mentions(a.repetitiveTasks, ['question', 'reply', 'respond', 'answer']),
    });
  }

  // ── Operations / Automation ──
  const opsPain = mentions(allText, ['repetitive', 'manual', 'sop', 'process', 'spreadsheet', 'copy', 'data entry']);
  if (opsPain || has(a.repetitiveTasks)) {
    const automationReady =
      mentions(allText, ['email', 'form', 'sheet', 'crm', 'invoice', 'order']) &&
      a.teamSize !== 'Just me (solo)';
    opps.push({
      id: 'ops-automation',
      area: 'Automation',
      title: automationReady
        ? 'Automate handoffs between your tools with no-code workflows'
        : 'Document and standardize repetitive tasks with AI-written SOPs',
      whyItMatters:
        automationReady
          ? `${a.businessName} already uses several tools, which means data is likely being copy-pasted between them. No-code automation eliminates that manual work and the errors that come with it.`
          : `Repetitive tasks at ${a.businessName} are done from memory each time, which is slow and error-prone. Documenting them as SOPs means anyone can do them consistently — including future hires.`,
      recommendedApproach: automationReady
        ? 'Map the steps where data moves between tools (e.g. new lead → CRM → welcome email). Use a no-code platform to connect them so each handoff happens automatically. Start with one workflow.'
        : 'List the top 5 repetitive tasks, use AI to turn each into a clear SOP, and test each one with someone unfamiliar with the task. Refine based on their feedback.',
      recommendedTools: automationReady ? ['Zapier', 'Notion AI'] : ['ChatGPT', 'Notion AI'],
      difficulty: automationReady ? 'Medium' : 'Low',
      impact: 'High',
      priority: opsPain,
    });
  }

  // ── Meeting / Notes ──
  if (mentions(allText, ['meeting', 'notes', 'document', 'summary', 'report'])) {
    opps.push({
      id: 'ops-meetings',
      area: 'Operations',
      title: 'Turn meetings and notes into action plans with AI summarization',
      whyItMatters:
        'Meetings and notes lose their value the moment they\'re over if nothing is captured. AI summarization ensures every meeting produces owned, trackable actions.',
      recommendedApproach:
        'After each meeting, paste rough notes into an AI summarizer to extract decisions and action items. Share the summary within 24 hours. Build the habit into your calendar.',
      recommendedTools: ['Claude', 'NotebookLM'],
      difficulty: 'Low',
      impact: 'Medium',
      priority: false,
    });
  }

  // ── AI Adoption ──
  const aiBeginner = !has(a.currentAiUse) || mentions(a.currentAiUse, ['no', 'not', 'sometimes', 'rarely', 'little']);
  if (aiBeginner) {
    opps.push({
      id: 'ai-adoption',
      area: 'AI Adoption',
      title: 'Establish a daily AI habit starting with one tool',
      whyItMatters:
        a.teamSize === 'Just me (solo)'
          ? `As a solo operator, ${a.businessName}'s biggest leverage point is your time. AI can give you back 5-10 hours per week — but only if it becomes a habit, not an experiment.`
          : `The team at ${a.businessName} isn't using AI yet, which means competitors who do are moving faster for less effort. Adoption doesn't require technical skill — it requires a starting point.`,
      recommendedApproach:
        'Pick one AI assistant (ChatGPT or Claude) and use it for one task every day for two weeks — writing a caption, drafting an email, or summarizing notes. Once it\'s a habit, expand to other tasks. Use the XAVS toolkit prompts to get started immediately.',
      recommendedTools: ['ChatGPT', 'Claude'],
      difficulty: 'Low',
      impact: 'High',
      priority: aiBeginner && opps.filter((o) => o.priority).length < 3,
    });
  }

  // ── Research ──
  if (mentions(allText, ['competitor', 'market', 'research', 'trend', 'industry'])) {
    opps.push({
      id: 'research',
      area: 'AI Adoption',
      title: 'Use AI research tools to understand your market and competitors',
      whyItMatters:
        'Most small businesses make decisions on gut feeling because research feels expensive. AI research tools make it free and fast.',
      recommendedApproach:
        'Use an AI search tool to research competitors, pricing, and customer trends in your area. Run a 30-minute research session once a month and save the findings.',
      recommendedTools: ['Perplexity', 'NotebookLM'],
      difficulty: 'Low',
      impact: 'Medium',
      priority: false,
    });
  }

  // Fallback: ensure at least 3 opportunities
  if (opps.length < 3) {
    opps.push({
      id: 'general-content',
      area: 'Content',
      title: 'Start a basic content presence with AI-assisted posts',
      whyItMatters:
        'Even a minimal, consistent content presence helps customers find and trust your business. AI makes it achievable for any schedule.',
      recommendedApproach:
        'Use AI to generate 3 post ideas per week, write the captions, and schedule them. Focus on one platform to start.',
      recommendedTools: ['ChatGPT', 'Canva'],
      difficulty: 'Low',
      impact: 'Medium',
      priority: false,
    });
  }

  return opps;
}

function buildActionPlan(
  a: BusinessAnswers,
  priorities: AiOpportunity[]
) {
  const immediate: ActionItem[] = [];
  const weekly: { week: number; items: ActionItem[] }[] = [
    { week: 1, items: [] },
    { week: 2, items: [] },
    { week: 3, items: [] },
    { week: 4, items: [] },
  ];

  // Immediate actions — derived from top priorities
  priorities.slice(0, 3).forEach((o, i) => {
    immediate.push({
      id: `imm-${i}`,
      title: `Start: ${o.title}`,
      description: o.recommendedApproach,
      category: o.area,
    });
  });

  // Always: set up a free AI account if none
  if (!has(a.currentAiUse) || mentions(a.currentAiUse, ['no', 'not', 'rarely'])) {
    immediate.push({
      id: 'imm-ai-account',
      title: 'Create a free ChatGPT or Claude account',
      description:
        'Sign up for a free account at chat.openai.com or claude.ai. Try one prompt from the XAVS toolkit today. This is the foundation for everything else.',
      category: 'AI Adoption',
    });
  }

  // Week 1 — foundation
  weekly[0].items.push({
    id: 'w1-1',
    title: 'Define your ideal customer',
    description: 'Use the "Define My Target Customer" toolkit resource to create a clear customer profile. Save it — you\'ll reuse it everywhere.',
    category: 'Marketing',
    week: 1,
  });
  weekly[0].items.push({
    id: 'w1-2',
    title: 'Generate 30 content ideas',
    description: 'Use the "Generate Content Ideas" toolkit resource to get a month of post ideas in 5 minutes.',
    category: 'Content',
    week: 1,
  });
  if (priorities.some((o) => o.area === 'Sales')) {
    weekly[0].items.push({
      id: 'w1-3',
      title: 'Create response templates for common enquiries',
      description: 'Use the "Respond to Customer Enquiry" toolkit resource to draft 3-5 templates. Save them where you can copy-paste fast.',
      category: 'Sales',
      week: 1,
    });
  }

  // Week 2 — systems
  weekly[1].items.push({
    id: 'w2-1',
    title: 'Build a 30-day content calendar',
    description: 'Use the "Create a 30-Day Content Calendar" toolkit resource to plan the month. Schedule the first week of posts.',
    category: 'Content',
    week: 2,
  });
  weekly[1].items.push({
    id: 'w2-2',
    title: 'Set up a simple lead tracker',
    description: 'Use the "Lead Follow-Up Template" to start tracking every enquiry. A simple spreadsheet or notes app is enough.',
    category: 'Sales',
    week: 2,
  });
  if (priorities.some((o) => o.area === 'Customer Service')) {
    weekly[1].items.push({
      id: 'w2-3',
      title: 'Create an FAQ and post it everywhere',
      description: 'Use the "Create Customer FAQs" toolkit resource. Put the FAQ on your website, Instagram bio link, and WhatsApp auto-reply.',
      category: 'Customer Service',
      week: 2,
    });
  }

  // Week 3 — automation / operations
  if (priorities.some((o) => o.area === 'Automation')) {
    weekly[2].items.push({
      id: 'w3-1',
      title: 'Document your top 3 repetitive tasks as SOPs',
      description: 'Use the "Create an SOP" toolkit resource. Write one SOP per task. Test each with someone unfamiliar.',
      category: 'Operations',
      week: 3,
    });
  } else {
    weekly[2].items.push({
      id: 'w3-1',
      title: 'Document one key process as an SOP',
      description: 'Pick the task you do most often and turn it into a written SOP using the toolkit. This is the foundation for delegation.',
      category: 'Operations',
      week: 3,
    });
  }
  weekly[2].items.push({
    id: 'w3-2',
    title: 'Repurpose your best content across platforms',
    description: 'Use the "Repurpose Existing Content" toolkit resource to turn your top-performing post into 4 other formats.',
    category: 'Content',
    week: 3,
  });
  weekly[2].items.push({
    id: 'w3-3',
    title: 'Run a follow-up campaign to old leads',
    description: 'Use the "Follow Up With a Lead" toolkit resource to message 5-10 past enquiries with a value-adding follow-up.',
    category: 'Sales',
    week: 3,
  });

  // Week 4 — review & refine
  weekly[3].items.push({
    id: 'w4-1',
    title: 'Review what worked and what didn\'t',
    description: 'Look at your content, leads, and sales from the past 3 weeks. What got engagement? What led to sales? Do more of that.',
    category: 'Operations',
    week: 4,
  });
  weekly[3].items.push({
    id: 'w4-2',
    title: 'Collect and act on customer feedback',
    description: 'Ask 5 customers for one thing you could improve. Use the Customer Feedback → Improvement workflow to act on the top theme.',
    category: 'Customer Service',
    week: 4,
  });
  weekly[3].items.push({
    id: 'w4-3',
    title: 'Plan next month using what you learned',
    description: 'Use AI to generate next month\'s content calendar and marketing plan based on what worked. Repeat the loop.',
    category: 'Marketing',
    week: 4,
  });

  // Recommended tools — dedup from priorities
  const toolReasons = new Map<string, string>();
  priorities.forEach((o) => {
    o.recommendedTools.forEach((t) => {
      if (!toolReasons.has(t)) {
        toolReasons.set(t, `Recommended for: ${o.area} — ${o.title.toLowerCase()}`);
      }
    });
  });
  const recommendedTools = Array.from(toolReasons.entries()).map(([name, reason]) => ({
    name,
    reason,
  }));

  // Workflows — pick relevant ones
  const workflows: RecommendedWorkflow[] = [];
  const wfIds = new Set<string>();
  if (priorities.some((o) => o.area === 'Sales')) wfIds.add('enquiry-to-sale');
  if (priorities.some((o) => o.area === 'Content' || o.area === 'Marketing')) wfIds.add('product-to-content');
  if (priorities.some((o) => o.area === 'Operations')) wfIds.add('meeting-to-action');
  wfIds.add('feedback-to-improvement');
  WORKFLOWS.filter((w) => wfIds.has(w.id)).forEach((w) => {
    workflows.push({
      id: w.id,
      name: w.name,
      steps: w.steps.map((s) => s.title),
      benefit: w.benefit,
      toolkitLinks: w.steps.filter((s) => s.toolkitLink).map((s) => s.toolkitLink!) as string[],
    });
  });

  // Expected benefits
  const expectedBenefits: string[] = [];
  if (priorities.some((o) => o.area === 'Marketing')) {
    expectedBenefits.push('More consistent leads from a structured marketing plan instead of relying on word of mouth.');
  }
  if (priorities.some((o) => o.area === 'Content')) {
    expectedBenefits.push('Hours saved every week on content creation through AI-assisted writing and scheduling.');
  }
  if (priorities.some((o) => o.area === 'Sales')) {
    expectedBenefits.push('Higher conversion from faster, more consistent lead follow-up.');
  }
  if (priorities.some((o) => o.area === 'Customer Service')) {
    expectedBenefits.push('Fewer repetitive questions to answer manually thanks to a clear FAQ and auto-reply.');
  }
  if (priorities.some((o) => o.area === 'Automation' || o.area === 'Operations')) {
    expectedBenefits.push('Less time lost to manual, repetitive tasks — and a business that runs without everything living in your head.');
  }
  if (priorities.some((o) => o.area === 'AI Adoption')) {
    expectedBenefits.push('A daily AI habit that compounds — saving 5-10 hours per week within the first month.');
  }
  if (expectedBenefits.length === 0) {
    expectedBenefits.push('A clearer, more repeatable business that depends less on memory and more on systems.');
  }

  return { immediate, weekly, recommendedTools, workflows, expectedBenefits };
}

export function getImpactColor(impact: string): string {
  switch (impact) {
    case 'High+':
    case 'High':
      return 'text-success-400 bg-success-500/10 border-success-500/20';
    case 'Medium':
      return 'text-warning-400 bg-warning-500/10 border-warning-500/20';
    default:
      return 'text-ink-200 bg-white/5 border-white/10';
  }
}

export function getDifficultyColor(difficulty: string): string {
  switch (difficulty) {
    case 'Low':
      return 'text-success-400 bg-success-500/10 border-success-500/20';
    case 'Medium':
      return 'text-warning-400 bg-warning-500/10 border-warning-500/20';
    case 'High':
      return 'text-error-400 bg-error-500/10 border-error-500/20';
    default:
      return 'text-ink-200 bg-white/5 border-white/10';
  }
}
