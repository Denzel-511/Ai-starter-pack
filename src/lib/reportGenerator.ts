import type { AuditReport, BusinessAnswers } from '@/types';

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function generateReportHtml(report: AuditReport, answers: BusinessAnswers): string {
  const date = new Date(report.generatedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const opportunitiesHtml = report.opportunities
    .map(
      (o, i) => `
    <div class="opportunity">
      <div class="opp-header">
        <h3>${i + 1}. ${escapeHtml(o.title)}</h3>
        <div class="badges">
          <span class="badge badge-area">${escapeHtml(o.area)}</span>
          <span class="badge badge-difficulty">Difficulty: ${escapeHtml(o.difficulty)}</span>
          <span class="badge badge-impact">Impact: ${escapeHtml(o.impact)}</span>
        </div>
      </div>
      <p class="opp-why"><strong>Why it matters:</strong> ${escapeHtml(o.whyItMatters)}</p>
      <p><strong>Recommended approach:</strong> ${escapeHtml(o.recommendedApproach)}</p>
      <p><strong>Recommended tools:</strong> ${escapeHtml(o.recommendedTools.join(', '))}</p>
    </div>`
    )
    .join('');

  const priorityHtml = report.priorityOpportunities
    .map(
      (o, i) => `
    <div class="priority-item">
      <div class="priority-num">${i + 1}</div>
      <div>
        <h4>${escapeHtml(o.title)}</h4>
        <p>${escapeHtml(o.whyItMatters)}</p>
      </div>
    </div>`
    )
    .join('');

  const immediateHtml = report.actionPlan.immediate
    .map(
      (a) => `
    <div class="action-item">
      <div class="action-check"></div>
      <div>
        <strong>${escapeHtml(a.title)}</strong>
        <p>${escapeHtml(a.description)}</p>
      </div>
    </div>`
    )
    .join('');

  const weeklyHtml = report.actionPlan.weekly
    .map(
      (w) => `
    <div class="week-block">
      <h4>Week ${w.week}</h4>
      ${w.items
        .map(
          (item) => `
        <div class="action-item">
          <div class="action-check"></div>
          <div>
            <strong>${escapeHtml(item.title)}</strong>
            <p>${escapeHtml(item.description)}</p>
          </div>
        </div>`
        )
        .join('')}
    </div>`
    )
    .join('');

  const toolsHtml = report.actionPlan.recommendedTools
    .map(
      (t) => `
    <div class="tool-item">
      <strong>${escapeHtml(t.name)}</strong>
      <p>${escapeHtml(t.reason)}</p>
    </div>`
    )
    .join('');

  const workflowsHtml = report.actionPlan.workflows
    .map(
      (w) => `
    <div class="workflow-item">
      <h4>${escapeHtml(w.name)}</h4>
      <ol>
        ${w.steps.map((s) => `<li>${escapeHtml(s)}</li>`).join('')}
      </ol>
      <p class="benefit"><strong>Benefit:</strong> ${escapeHtml(w.benefit)}</p>
    </div>`
    )
    .join('');

  const benefitsHtml = report.actionPlan.expectedBenefits
    .map((b) => `<li>${escapeHtml(b)}</li>`)
    .join('');

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>AI Business Audit Report — ${escapeHtml(answers.businessName)}</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Georgia', 'Times New Roman', serif; color: #1a1a1a; background: #f5f5f5; line-height: 1.6; padding: 40px 20px; }
  .report { max-width: 800px; margin: 0 auto; background: #fff; padding: 60px 50px; box-shadow: 0 4px 30px rgba(0,0,0,0.1); }
  .cover { text-align: center; padding: 40px 0 60px; border-bottom: 3px solid #2B6FFF; margin-bottom: 40px; }
  .cover-logo { font-size: 14px; font-weight: 700; letter-spacing: 0.3em; color: #2B6FFF; margin-bottom: 30px; }
  .cover h1 { font-size: 32px; color: #0A0F1A; margin-bottom: 10px; }
  .cover-sub { font-size: 16px; color: #666; margin-bottom: 30px; }
  .cover-meta { font-size: 14px; color: #999; }
  h2 { font-size: 22px; color: #0A0F1A; margin: 40px 0 16px; padding-bottom: 8px; border-bottom: 2px solid #e5e5e5; }
  h3 { font-size: 17px; color: #0A0F1A; margin-bottom: 8px; }
  h4 { font-size: 15px; color: #0A0F1A; margin-bottom: 6px; }
  p { margin-bottom: 12px; color: #333; }
  .section { margin-bottom: 36px; }
  .opportunity { padding: 20px; margin-bottom: 16px; background: #f9f9f9; border-left: 3px solid #2B6FFF; border-radius: 4px; }
  .opp-header { margin-bottom: 10px; }
  .badges { margin-top: 6px; }
  .badge { display: inline-block; font-size: 11px; padding: 3px 10px; border-radius: 12px; margin-right: 6px; font-family: Arial, sans-serif; }
  .badge-area { background: #EBF4FF; color: #1444B8; }
  .badge-difficulty { background: #f0f0f0; color: #555; }
  .badge-impact { background: #e8f8ef; color: #047857; }
  .opp-why { color: #555; font-style: italic; }
  .priority-item { display: flex; gap: 16px; margin-bottom: 16px; padding: 16px; background: #f0f6ff; border-radius: 8px; }
  .priority-num { flex-shrink: 0; width: 36px; height: 36px; background: #2B6FFF; color: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-family: Arial, sans-serif; }
  .action-item { display: flex; gap: 12px; margin-bottom: 14px; align-items: flex-start; }
  .action-check { flex-shrink: 0; width: 18px; height: 18px; border: 2px solid #2B6FFF; border-radius: 4px; margin-top: 3px; }
  .week-block { margin-bottom: 24px; padding: 20px; background: #f9f9f9; border-radius: 8px; }
  .week-block h4 { color: #2B6FFF; margin-bottom: 12px; font-size: 16px; }
  .tool-item { padding: 12px 16px; margin-bottom: 8px; background: #f9f9f9; border-radius: 6px; }
  .tool-item p { font-size: 13px; color: #666; margin: 4px 0 0; }
  .workflow-item { margin-bottom: 20px; padding: 16px; background: #f9f9f9; border-radius: 8px; }
  .workflow-item ol { margin: 8px 0 8px 20px; color: #444; }
  .workflow-item ol li { margin-bottom: 4px; }
  .benefit { font-size: 13px; color: #047857; margin-top: 8px; }
  ul.benefits { list-style: none; }
  ul.benefits li { padding: 10px 0 10px 28px; position: relative; border-bottom: 1px solid #f0f0f0; }
  ul.benefits li:before { content: "✓"; position: absolute; left: 0; color: #2B6FFF; font-weight: 700; }
  .footer { text-align: center; margin-top: 60px; padding-top: 30px; border-top: 2px solid #e5e5e5; color: #999; font-size: 13px; }
  .footer a { color: #2B6FFF; text-decoration: none; }
  .cta { text-align: center; margin: 40px 0; padding: 30px; background: #0A0F1A; color: #fff; border-radius: 12px; }
  .cta h3 { color: #fff; margin-bottom: 8px; }
  .cta p { color: #ccc; font-size: 14px; }
  .cta a { display: inline-block; margin-top: 16px; padding: 12px 28px; background: #2B6FFF; color: #fff; text-decoration: none; border-radius: 8px; font-weight: 600; font-family: Arial, sans-serif; }
  @media print { body { padding: 0; background: #fff; } .report { box-shadow: none; padding: 40px; } }
</style>
</head>
<body>
<div class="report">
  <div class="cover">
    <div class="cover-logo">X A V S</div>
    <h1>AI Business Audit Report</h1>
    <div class="cover-sub">Prepared for ${escapeHtml(answers.businessName)}</div>
    <div class="cover-meta">${escapeHtml(answers.industry)} · ${escapeHtml(answers.location)}<br/>Generated on ${date}</div>
  </div>

  <div class="cta">
    <h3>Don't want to do it yourself?</h3>
    <p>Let XAVS implement your AI action plan for you — or manage your social media presence.</p>
    <a href="https://wa.me/15555555555?text=Hi%20XAVS%2C%20I%20completed%20my%20AI%20Business%20Audit%20and%20I%27d%20like%20help%20implementing%20my%20action%20plan.">Talk to XAVS on WhatsApp</a>
  </div>

  <div class="section">
    <h2>1. Business Overview</h2>
    <p>${escapeHtml(report.businessOverview)}</p>
  </div>

  <div class="section">
    <h2>2. Current Situation</h2>
    <p>${escapeHtml(report.currentSituation)}</p>
  </div>

  <div class="section">
    <h2>3. AI Opportunities</h2>
    ${opportunitiesHtml}
  </div>

  <div class="section">
    <h2>4. Priority Opportunities</h2>
    <p style="color:#666; margin-bottom:16px;">The most important opportunities to address first:</p>
    ${priorityHtml}
  </div>

  <div class="section">
    <h2>5. AI Action Plan</h2>

    <h3>Immediate Actions</h3>
    ${immediateHtml}

    <h3 style="margin-top:30px;">30-Day Plan</h3>
    ${weeklyHtml}
  </div>

  <div class="section">
    <h2>6. Recommended Tools</h2>
    ${toolsHtml}
  </div>

  <div class="section">
    <h2>7. Recommended Workflows</h2>
    ${workflowsHtml}
  </div>

  <div class="section">
    <h2>8. Expected Benefits</h2>
    <ul class="benefits">
      ${benefitsHtml}
    </ul>
  </div>

  <div class="footer">
    <p>This report was generated by the <strong>XAVS AI Business Starter Kit</strong>.</p>
    <p>For implementation support, social media management, or AI strategy, contact XAVS.</p>
    <p>&copy; ${new Date().getFullYear()} XAVS. All rights reserved.</p>
  </div>
</div>
</body>
</html>`;
}

export function downloadReport(html: string, filename: string) {
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function generateEmailBody(report: AuditReport, answers: BusinessAnswers): string {
  const lines: string[] = [];
  lines.push(`XAVS AI BUSINESS AUDIT REPORT`);
  lines.push(`Prepared for: ${answers.businessName}`);
  lines.push(`Industry: ${answers.industry} | Location: ${answers.location}`);
  lines.push(`Generated: ${new Date(report.generatedAt).toLocaleDateString()}`);
  lines.push('');
  lines.push('═══════════════════════════════════════');
  lines.push('');
  lines.push('1. BUSINESS OVERVIEW');
  lines.push('───────────────────────────────────────');
  lines.push(report.businessOverview);
  lines.push('');
  lines.push('2. CURRENT SITUATION');
  lines.push('───────────────────────────────────────');
  lines.push(report.currentSituation);
  lines.push('');
  lines.push('3. AI OPPORTUNITIES');
  lines.push('───────────────────────────────────────');
  report.opportunities.forEach((o, i) => {
    lines.push(`${i + 1}. ${o.title} [${o.area}]`);
    lines.push(`   Why it matters: ${o.whyItMatters}`);
    lines.push(`   Approach: ${o.recommendedApproach}`);
    lines.push(`   Tools: ${o.recommendedTools.join(', ')}`);
    lines.push(`   Difficulty: ${o.difficulty} | Impact: ${o.impact}`);
    lines.push('');
  });
  lines.push('4. PRIORITY OPPORTUNITIES');
  lines.push('───────────────────────────────────────');
  report.priorityOpportunities.forEach((o, i) => {
    lines.push(`${i + 1}. ${o.title}`);
    lines.push(`   ${o.whyItMatters}`);
    lines.push('');
  });
  lines.push('5. ACTION PLAN');
  lines.push('───────────────────────────────────────');
  lines.push('IMMEDIATE ACTIONS:');
  report.actionPlan.immediate.forEach((a) => {
    lines.push(`  • ${a.title}`);
    lines.push(`    ${a.description}`);
  });
  lines.push('');
  report.actionPlan.weekly.forEach((w) => {
    lines.push(`WEEK ${w.week}:`);
    w.items.forEach((item) => {
      lines.push(`  • ${item.title}`);
      lines.push(`    ${item.description}`);
    });
    lines.push('');
  });
  lines.push('6. RECOMMENDED TOOLS');
  lines.push('───────────────────────────────────────');
  report.actionPlan.recommendedTools.forEach((t) => {
    lines.push(`  • ${t.name} — ${t.reason}`);
  });
  lines.push('');
  lines.push('7. RECOMMENDED WORKFLOWS');
  lines.push('───────────────────────────────────────');
  report.actionPlan.workflows.forEach((w) => {
    lines.push(`${w.name}`);
    w.steps.forEach((s, i) => lines.push(`  ${i + 1}. ${s}`));
    lines.push(`  Benefit: ${w.benefit}`);
    lines.push('');
  });
  lines.push('8. EXPECTED BENEFITS');
  lines.push('───────────────────────────────────────');
  report.actionPlan.expectedBenefits.forEach((b) => lines.push(`  ✓ ${b}`));
  lines.push('');
  lines.push('═══════════════════════════════════════');
  lines.push('');
  lines.push('Need help implementing this plan?');
  lines.push('Contact XAVS for AI implementation or social media management.');
  lines.push('');
  lines.push('© XAVS. All rights reserved.');

  return lines.join('\n');
}
