export interface WorkflowStep {
  title: string;
  description: string;
  toolkitLink?: string;
}

export interface Workflow {
  id: string;
  name: string;
  tagline: string;
  description: string;
  steps: WorkflowStep[];
  benefit: string;
}

export const WORKFLOWS: Workflow[] = [
  {
    id: 'enquiry-to-sale',
    name: 'Customer Enquiry → Sale',
    tagline: 'Turn questions into customers',
    description: 'A simple, repeatable path from the moment a customer asks a question to the moment they buy.',
    steps: [
      {
        title: '1. Capture the enquiry',
        description: 'Customer reaches out via Instagram, WhatsApp, email, or phone. Log it immediately so nothing slips through.',
      },
      {
        title: '2. Respond fast with a template',
        description: 'Reply within hours using a professional, warm response. Speed and tone win the sale.',
        toolkitLink: 'respond-to-enquiry',
      },
      {
        title: '3. Qualify the lead',
        description: 'Ask 2-3 quick questions to understand their need, budget, and timeline before investing time.',
        toolkitLink: 'qualify-lead',
      },
      {
        title: '4. Send a tailored offer',
        description: 'Based on their answers, send a clear, specific proposal — not a generic menu.',
      },
      {
        title: '5. Follow up (once)',
        description: 'If they don\'t reply in 24-48 hours, send one value-adding follow-up. No nagging.',
        toolkitLink: 'follow-up-lead',
      },
      {
        title: '6. Close and confirm',
        description: 'When they say yes, confirm the details in writing and set clear next steps.',
      },
      {
        title: '7. Ask for a review',
        description: 'After delivery, ask for a review or testimonial. This fuels your next enquiry.',
      },
    ],
    benefit: 'A clear enquiry-to-sale path means fewer lost customers, faster responses, and a sales process that works even when you\'re busy.',
  },
  {
    id: 'product-to-content',
    name: 'One Product → One Week of Content',
    tagline: 'Stretch one product into a week of posts',
    description: 'Turn a single product or service into 5-7 pieces of content without feeling repetitive.',
    steps: [
      {
        title: '1. Pick your product',
        description: 'Choose one product or service to feature this week.',
      },
      {
        title: '2. Generate content ideas',
        description: 'Use AI to brainstorm 7 different angles on the same product.',
        toolkitLink: 'generate-content-ideas',
      },
      {
        title: '3. Write the captions',
        description: 'Draft all 7 captions in one sitting using the caption tool.',
        toolkitLink: 'write-better-captions',
      },
      {
        title: '4. Plan the visuals',
        description: 'Match each post to a visual: product photo, behind-the-scenes, customer photo, or tutorial.',
      },
      {
        title: '5. Schedule the week',
        description: 'Use the content calendar tool to assign each post to a day and time.',
        toolkitLink: 'content-calendar',
      },
      {
        title: '6. Repurpose across platforms',
        description: 'Turn your best post into a WhatsApp message, email, and story.',
        toolkitLink: 'repurpose-content',
      },
    ],
    benefit: 'One product becomes a full week of content — saving hours and keeping your feed consistent without burnout.',
  },
  {
    id: 'meeting-to-action',
    name: 'Meeting → Action Plan',
    tagline: 'Never lose a meeting outcome again',
    description: 'Turn any meeting — client, team, or supplier — into clear, owned, trackable actions.',
    steps: [
      {
        title: '1. Take rough notes',
        description: 'During the meeting, jot down anything important — messy is fine.',
      },
      {
        title: '2. Summarize with AI',
        description: 'Paste your notes into the meeting summarizer to extract decisions and actions.',
        toolkitLink: 'summarize-meeting',
      },
      {
        title: '3. Turn notes into a document',
        description: 'Clean it up into a professional summary you can share.',
        toolkitLink: 'notes-to-document',
      },
      {
        title: '4. Assign owners and dates',
        description: 'Each action item gets one owner and one deadline. No exceptions.',
      },
      {
        title: '5. Send the summary',
        description: 'Share the summary with attendees within 24 hours while it\'s fresh.',
        toolkitLink: 'write-professional-email',
      },
      {
        title: '6. Track and follow up',
        description: 'Review the action items before the next meeting. Close what\'s done.',
      },
    ],
    benefit: 'Meetings stop being talk and start producing outcomes. Nothing gets forgotten, and everyone knows what they own.',
  },
  {
    id: 'feedback-to-improvement',
    name: 'Customer Feedback → Improvement',
    tagline: 'Turn complaints and compliments into changes',
    description: 'A simple loop for collecting, understanding, and acting on what customers tell you.',
    steps: [
      {
        title: '1. Collect feedback in one place',
        description: 'Gather reviews, DMs, surveys, and verbal feedback into a single document or sheet.',
      },
      {
        title: '2. Summarize the patterns',
        description: 'Paste all feedback into AI to find recurring themes and priorities.',
        toolkitLink: 'notes-to-document',
      },
      {
        title: '3. Sort by frequency and impact',
        description: 'Rank issues by how often they come up and how much they affect the business.',
      },
      {
        title: '4. Pick one to fix this month',
        description: 'Don\'t try to fix everything. Choose the one change with the biggest payoff.',
      },
      {
        title: '5. Create an SOP for the fix',
        description: 'Document the new way of doing things so the fix sticks.',
        toolkitLink: 'create-sop',
      },
      {
        title: '6. Tell customers you listened',
        description: 'Reply to the customers who gave feedback and tell them what changed. This builds loyalty.',
        toolkitLink: 'respond-to-enquiry',
      },
    ],
    benefit: 'Feedback stops being noise and becomes a roadmap. Customers feel heard, and your business gets better every month.',
  },
];
