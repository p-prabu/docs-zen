// src/app/blog/activedirectory/ad-health-check.ts
import { BlogPost } from '../blog-posts';

export const adHealthCheck: BlogPost = {
  id: "ad-health-check",
  title: "AD Health Check",
  category: "activedirectory",
  content: `# AD Health Check

_Published: Aug 12, 2025_

This guide gives you two ready-to-run tools for assessing Active Directory health without stuffing the post with massive scripts.

- ✅ **Daily Snapshot** — quick HTML report  
  [Download Invoke-AdHealthSnapshot.ps1](/scripts/ad/Invoke-AdHealthSnapshot.ps1)

- 🔎 **Deep Check** — detailed collectors for monthly reviews  
  [Download Invoke-AdHealthDeep.ps1](/scripts/ad/Invoke-AdHealthDeep.ps1)

- ⚙️ Optional config  
  [Download ad-health-settings.json](/scripts/ad/ad-health-settings.json)

---

## How to run (safe defaults)
Run from an **elevated** PowerShell on a management workstation or DC with RSAT.

\`\`\`powershell
# 1) Daily snapshot (HTML report)
.\Invoke-AdHealthSnapshot.ps1 -ReportPath .\ad-health-report.html

# 2) Deep check (creates a folder of CSV/TXT artifacts)
.\Invoke-AdHealthDeep.ps1 -OutputFolder .\ad-health-deep
\`\`\`

> Tip: commit these outputs to a private repo or drop them into your ticket for traceability.

---

## What the Snapshot checks
- Replication summary & failures
- DNS sanity (dcdiag /test:DNS)
- SYSVOL (DFSR) state
- Time sync skew (w32tm /monitor)
- FSMO reachability
- Error/Warning event counts (last 24h)

Output: a single **HTML** file with a pass/fail summary and raw command sections.

---

## What the Deep Check collects
- repadmin summaries and partner metadata (CSV)
- DFSR replication state results
- GPO status deltas (basic)
- Event exports (last 7 days, key logs)
- Environment context (forest/domain levels, DC inventory)

Output: a folder of **CSV/TXT** you can diff over time or ingest into dashboards.

---

## Safety notes
- Read-only queries; no changes are made.
- Snapshot and Deep Check honor thresholds in \`ad-health-settings.json\` (optional).
- If DNS or replication are badly broken, some commands may time out—still safe, just noisy.

---

## Next steps
- Schedule the snapshot daily and email the HTML to your team.
- Baseline results and alert on deltas (e.g., new replication failures, DFSR backlog growth).
`,
  headings: [
    { id: "how-to-run-safe-defaults", text: "How to run (safe defaults)", level: 2 },
    { id: "what-the-snapshot-checks", text: "What the Snapshot checks", level: 2 },
    { id: "what-the-deep-check-collects", text: "What the Deep Check collects", level: 2 },
    { id: "safety-notes", text: "Safety notes", level: 2 },
    { id: "next-steps", text: "Next steps", level: 2 },
  ]
};
