export type ViewId =
  | 'home'
  | 'audit'
  | 'report'
  | 'action-plan'
  | 'export'
  | 'toolkit'
  | 'workflows'
  | 'ai-tools'
  | 'templates'
  | 'whats-new'
  | 'services';

export interface BusinessAnswers {
  businessName: string;
  industry: string;
  location: string;
  whatTheySell: string;
  targetCustomers: string;
  teamSize: string;
  marketingChannels: string[];
  acquisitionMethods: string;
  salesProcess: string;
  customerServiceProcess: string;
  repetitiveTasks: string;
  currentTools: string;
  currentAiUse: string;
  biggestChallenges: string;
  timeConsumingActivities: string;
  businessGoals: string;
  whatAiShouldImprove: string;
}

export type Difficulty = 'Low' | 'Medium' | 'High';
export type Impact = 'Low' | 'Medium' | 'High' | 'High+';

export interface AiOpportunity {
  id: string;
  area: 'Marketing' | 'Content' | 'Sales' | 'Customer Service' | 'Operations' | 'Automation' | 'AI Adoption';
  title: string;
  whyItMatters: string;
  recommendedApproach: string;
  recommendedTools: string[];
  difficulty: Difficulty;
  impact: Impact;
  priority: boolean;
}

export interface ActionItem {
  id: string;
  title: string;
  description: string;
  category: string;
  week?: 1 | 2 | 3 | 4;
}

export interface RecommendedWorkflow {
  id: string;
  name: string;
  steps: string[];
  benefit: string;
  toolkitLinks: string[];
}

export interface AuditReport {
  businessOverview: string;
  currentSituation: string;
  opportunities: AiOpportunity[];
  priorityOpportunities: AiOpportunity[];
  actionPlan: {
    immediate: ActionItem[];
    weekly: { week: number; items: ActionItem[] }[];
    recommendedTools: { name: string; reason: string }[];
    workflows: RecommendedWorkflow[];
    expectedBenefits: string[];
  };
  generatedAt: string;
}

export interface QuestionnaireSection {
  id: string;
  title: string;
  description: string;
  icon: string;
  fields: QuestionnaireField[];
}

export interface QuestionnaireField {
  id: keyof BusinessAnswers;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'multiselect';
  placeholder?: string;
  help?: string;
  options?: string[];
  required?: boolean;
}
