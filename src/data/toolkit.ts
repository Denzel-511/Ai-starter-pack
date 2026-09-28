export interface ToolkitResource {
  id: string;
  category: 'Marketing' | 'Content' | 'Sales & Customer Service' | 'Operations';
  title: string;
  whatItDoes: string;
  whenToUse: string;
  instructions: string;
  steps: string[];
  prompt: string;
  example: string;
}

export const TOOLKIT_CATEGORIES = [
  'Marketing',
  'Content',
  'Sales & Customer Service',
  'Operations',
] as const;

export const TOOLKIT_RESOURCES: ToolkitResource[] = [
  // ── Marketing ──────────────────────────────────────────────
  {
    id: 'define-target-customer',
    category: 'Marketing',
    title: 'Define My Target Customer',
    whatItDoes: 'Turns what you know about your customers into a clear, usable customer profile.',
    whenToUse: 'Before any marketing campaign, content plan, or ad spend.',
    instructions: 'Fill in the bracketed info about your business. The AI will build a detailed customer profile you can reuse everywhere.',
    steps: [
      'Copy the prompt below.',
      'Replace every [bracketed] detail with your real info.',
      'Paste into ChatGPT or Claude.',
      'Save the output as your customer profile.',
    ],
    prompt: `You are a marketing strategist. Build a detailed target customer profile for my business.

Business: [your business name]
What we sell: [describe your product/service]
Price range: [e.g. $5-$50 / $500-$2000]
Current customers tend to be: [describe who buys from you today]
Location: [your city/country]

Create a customer profile covering:
1. Demographics (age, location, income, occupation)
2. Their main problems or desires
3. Where they spend time online and offline
4. What words they use to describe what they need
5. What would make them choose us over a competitor
6. One sentence: "Our ideal customer is someone who..."`,
    example: 'Our ideal customer is a busy professional aged 25-40 who wants healthy, ready-to-eat lunches delivered to their office and values time savings over price.',
  },
  {
    id: 'generate-marketing-ideas',
    category: 'Marketing',
    title: 'Generate Marketing Ideas',
    whatItDoes: 'Produces 10+ tailored marketing ideas based on your business and budget.',
    whenToUse: 'When you feel stuck or want fresh, practical promotion ideas.',
    instructions: 'Give the AI your business details and any constraints. It will return ideas ranked by effort and impact.',
    steps: [
      'Copy the prompt.',
      'Fill in your business details and budget.',
      'Paste into your AI assistant.',
      'Pick 2-3 ideas to try this month.',
    ],
    prompt: `You are a small-business marketing advisor. Generate 10 practical marketing ideas for my business.

Business: [name]
Industry: [industry]
What we sell: [product/service]
Budget per month: [e.g. $0 / $200 / $1000]
Current channels: [list what you use now]
Biggest goal right now: [e.g. more leads, more repeat customers]

For each idea include:
- The idea (one line)
- Why it works for my business
- Estimated cost
- Effort level (Low/Medium/High)
- First step to start this week`,
    example: 'Idea: Run a "tag a coworker" lunch giveaway on Instagram. Cost: $50 (two free lunches). Effort: Low. First step: Post today with a clear photo of the lunch box.',
  },
  {
    id: 'create-marketing-campaign',
    category: 'Marketing',
    title: 'Create a Marketing Campaign',
    whatItDoes: 'Builds a complete campaign plan — messaging, channels, timeline, and assets.',
    whenToUse: 'When you have a goal (launch, sale, seasonal push) and need a structured plan.',
    instructions: 'Describe your campaign goal and timeline. The AI gives you a week-by-week plan with messaging.',
    steps: [
      'Copy the prompt and fill in your campaign details.',
      'Paste into your AI assistant.',
      'Review the week-by-week plan.',
      'Assign tasks and start week 1.',
    ],
    prompt: `You are a campaign planner. Create a [number]-week marketing campaign for my business.

Business: [name]
Campaign goal: [e.g. launch new product / holiday sale / get 50 new leads]
Product/offer: [what you're promoting]
Target audience: [who you want to reach]
Budget: [amount]
Channels available: [Instagram, email, WhatsApp, in-store, etc.]

Provide:
1. Campaign theme and key message
2. Week-by-week schedule (what to post/send/do each week)
3. 3-5 post/caption ideas
4. How to measure success (specific metrics)
5. A backup plan if results are slow in week 1`,
    example: 'Campaign theme: "Lunch Sorted in 60 Seconds." Week 1: teaser posts + email. Week 2: launch with 15% off code. Week 3: customer testimonials. Week 4: final push + retarget.',
  },
  {
    id: 'create-promotion',
    category: 'Marketing',
    title: 'Create a Promotion',
    whatItDoes: 'Designs a promotion that drives sales without hurting your brand.',
    whenToUse: 'When you want to boost sales for a specific period or product.',
    instructions: 'Share your goal and constraints. The AI proposes the offer, terms, and messaging.',
    steps: [
      'Copy the prompt.',
      'Fill in your product and goal.',
      'Paste into your AI assistant.',
      'Review the offer and launch it.',
    ],
    prompt: `You are a promotions strategist. Design a promotion for my business.

Business: [name]
Product/service to promote: [describe it]
Goal: [e.g. clear old stock / get new customers / reward loyal customers]
Duration: [e.g. 3 days / 1 week]
Margins: [roughly how much discount you can afford]
Past promos that worked: [if any]

Create:
1. The offer (specific and clear)
2. Why it will work
3. Terms and conditions (simple)
4. 3 messages for social/email/WhatsApp
5. How to track if it worked`,
    example: 'Offer: Buy any 2 lunch boxes, get a free smoothie. Why: increases average order value. Track: count smoothies given vs. total orders.',
  },

  // ── Content ──────────────────────────────────────────────
  {
    id: 'generate-content-ideas',
    category: 'Content',
    title: 'Generate Content Ideas',
    whatItDoes: 'Gives you a month of content ideas tailored to your business and audience.',
    whenToUse: 'When you stare at a blank screen and don\'t know what to post.',
    instructions: 'Tell the AI about your business and audience. It returns categorized content ideas.',
    steps: [
      'Copy the prompt and fill in your details.',
      'Paste into your AI assistant.',
      'Pick your favorites and schedule them.',
      'Save the rest for later.',
    ],
    prompt: `You are a content strategist for small businesses. Give me 30 content ideas for the next month.

Business: [name]
Industry: [industry]
What we sell: [product/service]
Target audience: [who they are]
Platforms: [Instagram, TikTok, LinkedIn, etc.]
Tone: [professional / friendly / fun / educational]

Organize the 30 ideas into:
- Educational (teach something)
- Behind-the-scenes (show the work)
- Customer stories / social proof
- Product highlights
- Engagement (questions, polls)
For each idea, give a one-line caption starter.`,
    example: 'Educational: "3 signs your morning coffee is hurting your sleep — and what to drink instead."',
  },
  {
    id: 'create-social-post',
    category: 'Content',
    title: 'Create a Social Media Post',
    whatItDoes: 'Writes a ready-to-post caption with hashtags and a call-to-action.',
    whenToUse: 'Anytime you need a post for social media.',
    instructions: 'Give the AI the topic, platform, and tone. It writes a complete post you can copy.',
    steps: [
      'Copy the prompt.',
      'Fill in the topic and platform.',
      'Paste into your AI assistant.',
      'Copy the result and post it.',
    ],
    prompt: `You are a social media writer. Write a ready-to-post [platform] post for my business.

Business: [name]
Platform: [Instagram / Facebook / LinkedIn / TikTok]
Topic: [what the post is about]
Tone: [friendly / professional / playful]
Goal: [e.g. drive engagement / promote a product / educate]
Include: [image idea / video idea]

Write:
1. A scroll-stopping hook (first line)
2. The main message (2-4 lines)
3. A clear call-to-action
4. 5-10 relevant hashtags
5. A one-line image/visual suggestion`,
    example: 'Hook: "You\'ve been storing your coffee wrong this whole time." CTA: "Save this post and tag a coffee lover."',
  },
  {
    id: 'content-calendar',
    category: 'Content',
    title: 'Create a 30-Day Content Calendar',
    whatItDoes: 'Builds a day-by-day content calendar with topics, formats, and captions.',
    whenToUse: 'When you want to plan a month of content in one sitting.',
    instructions: 'Share your business and platforms. The AI creates a structured 30-day plan.',
    steps: [
      'Copy the prompt and fill in your details.',
      'Paste into your AI assistant.',
      'Review and adjust the calendar.',
      'Schedule posts in batches.',
    ],
    prompt: `You are a content calendar planner. Create a 30-day content calendar for my business.

Business: [name]
Industry: [industry]
Platforms: [list platforms]
Posting frequency: [e.g. 4x/week / daily]
Tone: [describe your brand voice]
Key dates this month: [holidays, launches, events]

Create a table with columns:
Day | Platform | Content type | Topic | Caption hook | Visual idea
Mix: educational, promotional, behind-the-scenes, engagement, and customer stories.
Ensure no more than 30% of posts are promotional.`,
    example: 'Day 3 | Instagram | Educational | "Why our bread lasts 5 days" | Hook: "Fresh isn\'t just a word for us" | Photo of baking process.',
  },
  {
    id: 'write-better-captions',
    category: 'Content',
    title: 'Write Better Captions',
    whatItDoes: 'Turns a rough idea into a polished, engaging caption.',
    whenToUse: 'When you have a photo or idea but can\'t find the right words.',
    instructions: 'Give the AI your rough notes and it returns 3 caption options.',
    steps: [
      'Copy the prompt.',
      'Write your rough idea or notes.',
      'Paste into your AI assistant.',
      'Pick your favorite and post.',
    ],
    prompt: `You are a caption writer. I have a rough idea for a post. Write 3 caption options.

Business: [name]
Platform: [platform]
My rough idea: [write your messy notes here]
Tone: [friendly / professional / playful]
Goal: [engagement / sales / education]

Write 3 different options:
1. Short and punchy
2. Story-driven
3. Question/engagement-focused
For each: include a hook, the message, a CTA, and 5 hashtags.`,
    example: 'Option 1 (short): "New flavor dropping Friday. Who\'s ready? 🔥 #bakerylife"',
  },
  {
    id: 'repurpose-content',
    category: 'Content',
    title: 'Repurpose Existing Content',
    whatItDoes: 'Turns one piece of content into multiple formats for different platforms.',
    whenToUse: 'When you have a blog, video, or post and want to stretch it across channels.',
    instructions: 'Paste your original content. The AI rewrites it for each platform.',
    steps: [
      'Copy the prompt.',
      'Paste your original content.',
      'Paste into your AI assistant.',
      'Use each version on its platform.',
    ],
    prompt: `You are a content repurposing expert. I have one piece of content. Turn it into multiple formats.

Original content:
[paste your blog post, video script, or long caption here]

Business: [name]
Platforms I use: [Instagram, LinkedIn, email, TikTok, etc.]

Create:
1. An Instagram carousel (5 slides with text)
2. A LinkedIn post (professional tone)
3. A short email (3-4 lines)
4. A TikTok/Reel script (30 seconds)
5. 3 tweet/X versions
Keep the core message but adapt the format and tone to each platform.`,
    example: 'Blog: "5 ways to brew better coffee" → IG carousel: "Save this coffee cheat sheet" → Email: "Your morning brew, upgraded."',
  },
  {
    id: 'whatsapp-marketing-message',
    category: 'Content',
    title: 'Create a WhatsApp Marketing Message',
    whatItDoes: 'Writes a short, effective WhatsApp broadcast that doesn\'t feel spammy.',
    whenToUse: 'When you want to reach customers directly on WhatsApp with an offer or update.',
    instructions: 'Share your offer and audience. The AI writes a short, compliant message.',
    steps: [
      'Copy the prompt and fill in your offer.',
      'Paste into your AI assistant.',
      'Review for length (keep it short!).',
      'Send to your broadcast list.',
    ],
    prompt: `You are a WhatsApp marketing copywriter. Write a short broadcast message for my business.

Business: [name]
Offer/update: [what you want to share]
Audience: [who you're sending to]
Goal: [e.g. announce a sale / share new product / say thank you]

Write a message that:
- Is under 150 characters (short!)
- Feels personal, not spammy
- Has a clear single call-to-action
- Includes a friendly sign-off
Also give me a follow-up message for people who don't respond in 2 days.`,
    example: 'Hi! 👋 New lunch menu drops Monday. First 20 orders get 15% off. Reply "LUNCH" to reserve yours. — Sunrise Bakery',
  },

  // ── Sales & Customer Service ──────────────────────────────
  {
    id: 'respond-to-enquiry',
    category: 'Sales & Customer Service',
    title: 'Respond to Customer Enquiry',
    whatItDoes: 'Turns a customer\'s message into a professional, helpful reply.',
    whenToUse: 'Every time a customer asks about your product or service.',
    instructions: 'Paste the customer\'s message. The AI writes a warm, complete response.',
    steps: [
      'Copy the prompt.',
      'Paste the customer\'s message.',
      'Paste into your AI assistant.',
      'Review, personalize, and send.',
    ],
    prompt: `You are a customer service professional. Write a reply to this customer enquiry.

Business: [name]
What we sell: [brief description]
Customer's message: [paste their message here]
Tone: [warm / professional / casual]

Write a reply that:
1. Acknowledges their question
2. Answers clearly and completely
3. Suggests a next step (call, visit, order)
4. Ends warmly
Keep it under 120 words. If I don't have enough info to answer, say what I need to ask them.`,
    example: 'Hi Sarah! Thanks for asking about our catering. We do platters from $8/person with a 48-hour notice. For 30 people, I\'d recommend our deluxe spread. Want me to send the menu?',
  },
  {
    id: 'follow-up-lead',
    category: 'Sales & Customer Service',
    title: 'Follow Up With a Lead',
    whatItDoes: 'Writes a follow-up message that moves a lead toward a sale without being pushy.',
    whenToUse: 'When a potential customer showed interest but didn\'t buy.',
    instructions: 'Tell the AI about the lead and last contact. It writes a natural follow-up.',
    steps: [
      'Copy the prompt.',
      'Fill in lead details.',
      'Paste into your AI assistant.',
      'Send within 24-48 hours of last contact.',
    ],
    prompt: `You are a sales coach. Write a follow-up message to a lead who didn't buy.

Business: [name]
Product/service: [what they were interested in]
How they contacted us: [Instagram / email / walk-in]
Their last interaction: [what they asked or said]
Days since last contact: [number]

Write a follow-up that:
1. References our last conversation
2. Adds value (a tip, resource, or answer)
3. Asks one clear question to move them forward
4. Doesn't pressure
Give me 2 versions: one for WhatsApp/SMS and one for email.`,
    example: 'Hi James! Following up on the garden design chat. I put together a quick sketch of what we discussed — want me to send it over? No pressure at all. — GreenSpace',
  },
  {
    id: 'handle-objection',
    category: 'Sales & Customer Service',
    title: 'Handle a Customer Objection',
    whatItDoes: 'Turns "it\'s too expensive" or "I need to think" into a constructive response.',
    whenToUse: 'When a customer hesitates or pushes back on price, timing, or fit.',
    instructions: 'Share the objection and context. The AI gives you a respectful, persuasive reply.',
    steps: [
      'Copy the prompt.',
      'Fill in the objection and context.',
      'Paste into your AI assistant.',
      'Adapt the tone and send.',
    ],
    prompt: `You are a sales expert. Help me respond to a customer objection.

Business: [name]
Product/service: [what you sell]
Price: [if relevant]
Customer's objection: [e.g. "It's too expensive" / "I need to think about it" / "I use a competitor"]
Context: [anything else you know about them]

Write a response that:
1. Validates their concern (don't dismiss it)
2. Reframes the value (not just price)
3. Offers a low-risk next step
4. Stays warm and professional
Give me 2 versions: short (for chat) and detailed (for email).`,
    example: '"I totally understand — price matters. Just to put it in context: our lunch box lasts 3 meals, so it\'s about $4 per meal. Would a sample pack help you decide?"',
  },
  {
    id: 'qualify-lead',
    category: 'Sales & Customer Service',
    title: 'Qualify a Lead',
    whatItDoes: 'Helps you decide if a lead is worth your time before you invest in it.',
    whenToUse: 'When you get a lot of enquiries and need to focus on the serious ones.',
    instructions: 'Share what you know about the lead. The AI gives you a quick qualification framework and a reply.',
    steps: [
      'Copy the prompt.',
      'Fill in what you know about the lead.',
      'Paste into your AI assistant.',
      'Use the questions to qualify, then send the reply.',
    ],
    prompt: `You are a sales strategist. Help me qualify this lead.

Business: [name]
Ideal customer: [who you serve best]
Lead info: [what they said, their budget if known, timeline if known]

Give me:
1. 5 qualifying questions to ask them (budget, timeline, need, decision-maker, authority)
2. A short message I can send to ask these questions naturally
3. Red flags that mean I should deprioritize this lead
4. Green flags that mean I should follow up fast`,
    example: 'Questions: "What\'s prompting this now?", "What\'s your budget range?", "Who else is involved in the decision?"',
  },
  {
    id: 'respond-angry-customer',
    category: 'Sales & Customer Service',
    title: 'Respond to an Angry Customer',
    whatItDoes: 'Writes a calm, professional reply that de-escalates and resolves.',
    whenToUse: 'When a customer is upset, angry, or complaining.',
    instructions: 'Paste the customer\'s complaint. The AI writes a de-escalating, solution-focused reply.',
    steps: [
      'Copy the prompt.',
      'Paste the customer\'s message.',
      'Paste into your AI assistant.',
      'Review, make sure it feels genuine, and send quickly.',
    ],
    prompt: `You are a customer service expert. Write a reply to an upset customer.

Business: [name]
Customer's message: [paste it here]
What happened: [brief context if you know]
What we can offer: [refund / replacement / apology / call]

Write a reply that:
1. Acknowledges their frustration without being defensive
2. Apologizes sincerely (even if it's not fully our fault)
3. Explains briefly (no excuses)
4. Offers a specific solution
5. Invites them to continue the conversation
Keep it under 150 words. Tone: calm, human, accountable.`,
    example: 'Hi, I\'m really sorry your order arrived late — that\'s on us, not you. I\'ve refunded your delivery fee and added a 20% code for your next order. Can I call you to make this right?',
  },
  {
    id: 'customer-faqs',
    category: 'Sales & Customer Service',
    title: 'Create Customer FAQs',
    whatItDoes: 'Generates a complete FAQ list based on your business and common questions.',
    whenToUse: 'When you keep answering the same questions over and over.',
    instructions: 'List the questions you get often. The AI writes clear answers and suggests where to post them.',
    steps: [
      'Copy the prompt.',
      'List your common questions.',
      'Paste into your AI assistant.',
      'Post the FAQs on your website, Instagram, or auto-reply.',
    ],
    prompt: `You are a customer service content writer. Create an FAQ section for my business.

Business: [name]
What we sell: [describe]
Common questions I get: [list them, or say "generate common ones for my industry"]
Hours: [your hours]
Location: [your location]
Policies: [returns, delivery, etc.]

Create:
1. 10-15 FAQ pairs (question + clear, short answer)
2. A short intro line for the FAQ section
3. A suggestion for where to display these (website, IG bio, WhatsApp auto-reply)
4. A 1-line auto-reply message for WhatsApp using these FAQs.`,
    example: 'Q: Do you deliver? A: Yes, within 5km of our bakery. Free over $30, $5 under. Order by 11am for same-day.',
  },

  // ── Operations ──────────────────────────────────────────────
  {
    id: 'create-sop',
    category: 'Operations',
    title: 'Create an SOP',
    whatItDoes: 'Turns a task you do into a clear, written standard operating procedure.',
    whenToUse: 'When you want to delegate or document how something gets done.',
    instructions: 'Describe the task in your own words. The AI structures it into a proper SOP.',
    steps: [
      'Copy the prompt.',
      'Describe the task roughly.',
      'Paste into your AI assistant.',
      'Review, test it with someone, and save it.',
    ],
    prompt: `You are an operations consultant. Turn my rough description into a clear SOP.

Business: [name]
Task name: [e.g. Opening the shop / Processing an order / Closing the till]
My rough description of how I do it: [write it messily, in your own words]
Who will follow this: [e.g. new staff / a virtual assistant]

Create a standard operating procedure with:
1. Purpose (one line)
2. What you need (tools, access, materials)
3. Step-by-step instructions (numbered, simple)
4. Common mistakes to avoid
5. What "done right" looks like
Keep language simple enough for someone new to follow.`,
    example: 'Opening SOP: 1) Unlock at 7:00am. 2) Turn on ovens (dial to 220°C). 3) Check proofing dough. 4) Set up display. 5) Open register. Done = doors open at 7:30.',
  },
  {
    id: 'business-checklist',
    category: 'Operations',
    title: 'Create a Business Checklist',
    whatItDoes: 'Generates a daily, weekly, or monthly checklist for any part of your business.',
    whenToUse: 'When tasks keep slipping through the cracks.',
    instructions: 'Tell the AI what area you want a checklist for. It builds a usable one.',
    steps: [
      'Copy the prompt.',
      'Fill in the area and frequency.',
      'Paste into your AI assistant.',
      'Print it or add it to your task app.',
    ],
    prompt: `You are an operations expert. Create a checklist for my business.

Business: [name]
Area: [e.g. daily opening / weekly social media / monthly bookkeeping / inventory]
Frequency: [daily / weekly / monthly]
Who uses it: [me / staff / virtual assistant]
Current problems: [what keeps getting missed]

Create:
1. A clear checklist (checkboxes)
2. Grouped by time or priority
3. With an estimated time for each item
4. A "sign-off" line at the bottom
Keep it practical — no fluff.`,
    example: 'Daily Social: ☐ Check DMs (10 min) ☐ Post 1 Reel (20 min) ☐ Reply to comments (10 min) ☐ Check insights (5 min) Sign-off: ___',
  },
  {
    id: 'notes-to-document',
    category: 'Operations',
    title: 'Turn Notes Into a Professional Document',
    whatItDoes: 'Transforms messy meeting or voice notes into a clean, structured document.',
    whenToUse: 'After a meeting, brainstorm, or voice note session.',
    instructions: 'Paste your raw notes. The AI organizes them into a proper document.',
    steps: [
      'Copy the prompt.',
      'Paste your raw notes.',
      'Paste into your AI assistant.',
      'Review and save or share.',
    ],
    prompt: `You are a professional writer. Turn my messy notes into a clean document.

Business: [name]
Document type: [meeting notes / proposal / summary / report]
My raw notes:
[paste your messy notes, voice memo transcript, or bullet points here]

Create a professional document with:
1. A clear title
2. Organized sections with headers
3. Key points and decisions highlighted
4. Action items with owners (if mentioned)
5. A short summary at the top
Keep my meaning but make it look professional and easy to read.`,
    example: 'Raw: "talked to sarah she wants catering for 40 ppl oct 15, budget 500, likes italian" → Doc: "Catering Enquiry — Sarah, Oct 15, 40 guests, $500 budget, Italian preference."',
  },
  {
    id: 'summarize-meeting',
    category: 'Operations',
    title: 'Summarize a Meeting',
    whatItDoes: 'Turns meeting notes or transcripts into a clear summary with action items.',
    whenToUse: 'After any meeting — client, team, or supplier.',
    instructions: 'Paste your notes or transcript. The AI extracts decisions and next steps.',
    steps: [
      'Copy the prompt.',
      'Paste your meeting notes or transcript.',
      'Paste into your AI assistant.',
      'Share the summary with attendees.',
    ],
    prompt: `You are a meeting summarizer. Turn my meeting notes into a clear summary.

Meeting topic: [what it was about]
Attendees: [who was there]
Date: [when]
My notes/transcript:
[paste here]

Create:
1. A 3-line summary at the top
2. Key decisions made
3. Action items (who, what, by when)
4. Open questions / things to follow up
5. Suggested next meeting agenda (if needed)
Keep it short and skimmable.`,
    example: 'Summary: Sarah confirmed catering for Oct 15, 40 guests, $500 budget. Action: Send menu by Friday (me), Confirm deposit (Sarah).',
  },
  {
    id: 'write-professional-email',
    category: 'Operations',
    title: 'Write a Professional Email',
    whatItDoes: 'Drafts a clear, professional email for any business situation.',
    whenToUse: 'When you need to write a supplier, partner, client, or official email.',
    instructions: 'Tell the AI who it\'s to and what you want to say. It writes a polished email.',
    steps: [
      'Copy the prompt.',
      'Fill in the recipient and purpose.',
      'Paste into your AI assistant.',
      'Review, add your signature, and send.',
    ],
    prompt: `You are a professional business writer. Draft an email for me.

From: [my name / business]
To: [recipient name and role]
Purpose: [what this email is about]
Key points I want to include: [list them]
Tone: [formal / friendly / firm]
Desired outcome: [what I want them to do]

Write a complete email with:
1. A clear subject line
2. A professional greeting
3. The message (short, clear, structured)
4. A specific call-to-action
5. A professional sign-off
Keep it under 200 words unless I say otherwise.`,
    example: 'Subject: Catering Proposal — Oct 15 Event. "Hi Sarah, Following up on our call, here\'s the proposed menu for 40 guests at $12/person..."',
  },
];
