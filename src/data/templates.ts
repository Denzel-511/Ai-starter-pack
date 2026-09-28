export interface Template {
  id: string;
  category: string;
  title: string;
  description: string;
  content: string;
}

export const TEMPLATES: Template[] = [
  {
    id: 'business-info-sheet',
    category: 'Business',
    title: 'Business Information Sheet',
    description: 'A one-page summary of your business — who you are, what you sell, and who you serve.',
    content: `BUSINESS INFORMATION SHEET

Business Name: ___________________________
Industry: ___________________________
Location: ___________________________
Founded: ___________________________

WHAT WE SELL
Main products/services:
1. ___________________________
2. ___________________________
3. ___________________________
Price range: ___________________________

OUR CUSTOMERS
Target customer: ___________________________
Average customer age/profile: ___________________________
How customers find us: ___________________________

OUR TEAM
Team size: ___________________________
Key roles:
1. ___________________________
2. ___________________________

CONTACT
Phone: ___________________________
Email: ___________________________
Website: ___________________________
Social media: ___________________________

NOTES
___________________________
___________________________`,
  },
  {
    id: 'marketing-brief',
    category: 'Marketing',
    title: 'Marketing Brief',
    description: 'Use this before any campaign to stay focused and measurable.',
    content: `MARKETING BRIEF

Campaign name: ___________________________
Date: ___________________________

OBJECTIVE
What do we want to achieve? (one goal only)
___________________________

TARGET AUDIENCE
Who are we reaching?
___________________________

KEY MESSAGE
What is the one thing they should remember?
___________________________

OFFER
What are we promoting? (if anything)
___________________________

CHANNELS
Where will this run? (Instagram, email, WhatsApp, in-store...)
___________________________

BUDGET
___________________________

TIMELINE
Start: ____________ End: ____________

SUCCESS METRIC
How will we know it worked? (one number)
___________________________

APPROVAL
Prepared by: ___________________________
Approved by: ___________________________`,
  },
  {
    id: 'customer-profile',
    category: 'Marketing',
    title: 'Customer Profile',
    description: 'A detailed picture of your ideal customer to guide all your marketing.',
    content: `CUSTOMER PROFILE

DEMOGRAPHICS
Age range: ___________________________
Location: ___________________________
Occupation: ___________________________
Income range: ___________________________

THEIR LIFE
What does a typical day look like?
___________________________
___________________________

PROBLEMS & DESIRES
Top 3 problems they have:
1. ___________________________
2. ___________________________
3. ___________________________
What do they secretly want?
___________________________

WHERE THEY ARE
Online: ___________________________
Offline: ___________________________

HOW THEY TALK
Words they use to describe their need:
___________________________

WHY THEY CHOOSE US
___________________________
___________________________

ONE-LINE SUMMARY
"My ideal customer is someone who..."
___________________________`,
  },
  {
    id: 'content-calendar',
    category: 'Content',
    title: 'Content Calendar',
    description: 'A simple weekly calendar to plan and track your content.',
    content: `CONTENT CALENDAR — WEEK OF ___________

MONDAY
Platform: __________
Topic: __________
Format: __________
Status: ☐ Planned  ☐ Created  ☐ Posted

TUESDAY
Platform: __________
Topic: __________
Format: __________
Status: ☐ Planned  ☐ Created  ☐ Posted

WEDNESDAY
Platform: __________
Topic: __________
Format: __________
Status: ☐ Planned  ☐ Created  ☐ Posted

THURSDAY
Platform: __________
Topic: __________
Format: __________
Status: ☐ Planned  ☐ Created  ☐ Posted

FRIDAY
Platform: __________
Topic: __________
Format: __________
Status: ☐ Planned  ☐ Created  ☐ Posted

SATURDAY
Platform: __________
Topic: __________
Format: __________
Status: ☐ Planned  ☐ Created  ☐ Posted

SUNDAY
Platform: __________
Topic: __________
Format: __________
Status: ☐ Planned  ☐ Created  ☐ Posted

NOTES
___________________________
___________________________`,
  },
  {
    id: 'lead-follow-up',
    category: 'Sales',
    title: 'Lead Follow-Up Template',
    description: 'Track every lead and make sure no one falls through the cracks.',
    content: `LEAD FOLLOW-UP TRACKER

LEAD INFO
Name: ___________________________
Contact: ___________________________
Source: ☐ Instagram  ☐ Website  ☐ Walk-in  ☐ Referral  ☐ Other
Date of first contact: ___________________________

WHAT THEY ASKED
___________________________
___________________________

QUALIFICATION
Budget: ___________________________
Timeline: ___________________________
Decision-maker: ___________________________
Need: ___________________________

FOLLOW-UPS
1st follow-up — Date: ______  Method: ______  Result: ______
2nd follow-up — Date: ______  Method: ______  Result: ______
3rd follow-up — Date: ______  Method: ______  Result: ______

STATUS
☐ Hot (ready to buy)
☐ Warm (interested, needs time)
☐ Cold (not responsive)
☐ Won
☐ Lost

NEXT STEP
___________________________
___________________________`,
  },
  {
    id: 'customer-response',
    category: 'Customer Service',
    title: 'Customer Response Template',
    description: 'A framework for responding to any customer message consistently.',
    content: `CUSTOMER RESPONSE TEMPLATE

CUSTOMER MESSAGE
[paste their message here]

OUR RESPONSE

1. ACKNOWLEDGE
"Hi [name], thanks for reaching out about [topic]."

2. ANSWER
[Clear, direct answer to their question]

3. ADD VALUE
[One extra thing they'd find useful — a tip, option, or resource]

4. NEXT STEP
"What would you like to do next?" / "Shall I send you the menu?"

5. SIGN-OFF
"Thanks, [your name] from [business]"

NOTES
- Keep under 120 words
- Reply within 4 hours if possible
- Always use their name
- Never copy-paste the exact same reply twice in a row`,
  },
  {
    id: 'sop-template',
    category: 'Operations',
    title: 'SOP Template',
    description: 'A standard format for documenting any repeatable task.',
    content: `STANDARD OPERATING PROCEDURE

Task name: ___________________________
Department: ___________________________
Last updated: ___________________________
Owner: ___________________________

PURPOSE
Why does this task exist? (one line)
___________________________

WHAT YOU NEED
Tools, access, materials:
- ___________________________
- ___________________________
- ___________________________

STEP-BY-STEP
1. ___________________________
2. ___________________________
3. ___________________________
4. ___________________________
5. ___________________________
6. ___________________________
7. ___________________________
8. ___________________________

COMMON MISTAKES TO AVOID
- ___________________________
- ___________________________

WHAT "DONE RIGHT" LOOKS LIKE
___________________________

APPROVED BY
___________________________`,
  },
  {
    id: 'meeting-notes',
    category: 'Operations',
    title: 'Meeting Notes Template',
    description: 'Capture decisions and actions from every meeting.',
    content: `MEETING NOTES

Meeting topic: ___________________________
Date: ___________________________
Time: ___________________________
Attendees: ___________________________

AGENDA
1. ___________________________
2. ___________________________
3. ___________________________

KEY DISCUSSION POINTS
- ___________________________
- ___________________________
- ___________________________

DECISIONS MADE
- ___________________________
- ___________________________

ACTION ITEMS
| Task | Owner | Due date | Status |
|------|-------|----------|--------|
|      |       |          | ☐ Done |
|      |       |          | ☐ Done |
|      |       |          | ☐ Done |

OPEN QUESTIONS
- ___________________________
- ___________________________

NEXT MEETING
Date: ___________________________
Agenda: ___________________________`,
  },
];
