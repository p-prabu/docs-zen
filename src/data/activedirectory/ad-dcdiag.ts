import { BlogPost } from '../blog-posts';

export const dcdiagAdvancedCommands: BlogPost = {
  id: "dcdiag-advanced-commands",
  title: "dcdiag: AD Health Checks",
  category: "activedirectory",
  body: `
 
_Published: Sep 20, 2025_

dcdiag (Domain Controller Diagnostic) is a built-in Windows Server tool that performs targeted tests on Domain Controllers (DCs) to validate their health, configuration, and connectivity. Beyond the basic dcdiag command, advanced flags and combinations are essential for enterprise-grade troubleshooting and comprehensive health assessments.

---

## Why dcdiag Matters

dcdiag is critical for maintaining a healthy Active Directory environment because it:
* **Detects** replication failures and topology issues.
* **Validates** DNS registration and name resolution, which are critical for AD functionality.
* **Confirms** FSMO role availability and reachability.
* **Checks** essential services like KDC, Netlogon, W32Time, and DNS.
* **Surfaces** issues with sites, SYSVOL/Netlogon shares, and DC advertising.

**Tip:** You don't need PowerShell Remoting for \`dcdiag /s:<DC>\`; it uses RPC/LDAP/Netlogon. Ensure AD ports are open and you have sufficient permissions.

---

## Quick Reference (Cheat Sheet)


* **\`dcdiag /q\`**
    * **What it Does:** Runs default tests and shows **errors only**.
    * **When to Use:** Daily quick scan
* **\`dcdiag /e /v /c /d /f:C:\\Reports\\DCDiag_Full.txt\`**
    * **What it Does:** Forest-wide, verbose, and comprehensive with debug output, saving to file.
    * **When to Use:** Weekly/monthly deep health check
* **\`dcdiag /a\`**
    * **What it Does:** Tests **all DCs in the current domain**.
    * **When to Use:** Domain-only checks
* **\`dcdiag /s:DC1 /test:Replications /v\`**
    * **What it Does:** Checks replication health for **one specific DC**.
    * **When to Use:** Partner/failed link triage
* **\`dcdiag /test:FsmoCheck /v\`**
    * **What it Does:** Validates **FSMO role holders**.
    * **When to Use:** Role move or outage checks
* **\`dcdiag /s:DC2 /test:Advertising /v\`**
    * **What it Does:** Ensures a DC advertises its services (GC/KDC/LDAP/DNS).
    * **When to Use:** Logon or authentication issues
* **\`dcdiag /test:DNS /dnsall /v\`**
    * **What it Does:** Performs **deep DNS diagnostics** across all DNS servers.
    * **When to Use:** For SRV record, stale, or missing DNS entries
* **\`dcdiag /test:NetLogons /test:SysVolCheck /v\`**
    * **What it Does:** Verifies SYSVOL and Netlogon shares.
    * **When to Use:** Issues with Group Policy application
* **\`dcdiag /s:DC1 /site:EuropeSite /test:Connectivity /v\`**
    * **What it Does:** Validates site-scoped connectivity.
    * **When to Use:** WAN or site outages
* **\`dcdiag /v ^\| Select-String "Warning"\`**
    * **What it Does:** Displays **warnings only** (filtered via PowerShell).
    * **When to Use:** To quickly filter for non-critical issues

---

## Enterprise-Grade Workflows

### 1. Forest-wide Comprehensive Health (Recommended Baseline)
\`dcdiag /e /v /c /d /f:C:\\Reports\\DCDiag_Full.txt\`
* **/e**: Tests all DCs in the **forest**.
* **/v**: Provides verbose details. **/c**: Comprehensive. **/d**: Includes debug information.
* **/f**: Saves output to a file for auditing and historical trending.

### 2. Daily Quick Scan (Errors Only)
\`dcdiag /q\`
\`repadmin /replsummary\`

### 3. Targeted Deep Dives
* **Replication (one DC):** \`dcdiag /s:DC1 /test:Replications /v\`
* **FSMO Role Health:** \`dcdiag /test:FsmoCheck /v\`
* **DNS across all DNS servers:** \`dcdiag /test:DNS /dnsall /v\`
* **SYSVOL & Netlogon checks (GPO dependencies):** \`dcdiag /test:NetLogons /test:SysVolCheck /v\`

---

## Advanced Patterns & Combos

### Save Failures and Append Replication Summary
\`dcdiag /e /q > C:\\Reports\\AD_Failures.txt\`
\`repadmin /replsummary >> C:\\Reports\\AD_Failures.txt\`
\`repadmin /showrepl * /csv >> C:\\Reports\\AD_Failures.txt\`

### Focus on a Single Site (WAN-Aware)
\`dcdiag /s:DC1 /site:EuropeSite /test:Connectivity /v\`

### Get Warnings with Full Context (PowerShell Block Extraction)
\`\`\`powershell
$raw = dcdiag /v
$warnings = @()
$block = @()
$collect = $false
foreach ($line in $raw) {
  if ($line -match 'Warning') { $collect = $true }
  if ($collect) { $block += $line }
  if ($collect -and [string]::IsNullOrWhiteSpace($line)) {
    $warnings += ($block -join "\`r\`n")
    $block = @(); $collect = $false
  }
}
$warnings | Set-Content -Path C:\\Reports\\dcdiag_warnings.txt -Encoding UTF8
\`\`\`

---

## Interpreting Key Tests

* **Replications:** Looks for **Last Success/Failure** status. Failures often indicate **firewall, DNS, or permissions issues**.
* **Advertising:** A DC must properly advertise its roles (LDAP, KDC, GC). Warnings like “not advertising as a GC” can affect logon and token building.
* **DNS:** Validates SRV records, finds stale/missing registrations, and broken forwarders.
* **Services:** Checks running states of critical services like KDC, Netlogon, W32Time, and DNS.
* **FsmoCheck:** Confirms that FSMO role holders are reachable and flags seized or missing scenarios.
* **NetLogons / SysVolCheck:** Verifies the presence of the **\\\<DC>\\NETLOGON** and **\\\<DC>\\SYSVOL** shares. SYSVOL replication problems break **Group Policy**.

---

## Practical Workflows

### Daily (Operations)
\`dcdiag /q\`
\`repadmin /replsummary\`

### Weekly (Operations + SRE)
\`dcdiag /e /v /c /d /f:C:\\Reports\\AD_Weekly.txt\`
\`repadmin /showrepl * /csv > C:\\Reports\\AD_Repl.csv\`

### Change Window (Before/After)
**Pre-Change:**
\`dcdiag /a /v /c /f:C:\\Reports\\PreChange.txt\`

**Post-Change:**
\`dcdiag /a /v /c /f:C:\\Reports\\PostChange.txt\`

---

## Permissions & Network Prerequisites

* Run as a **Domain Admin** or an account with equivalent rights to query DCs.
* Ensure **AD ports** are open to DCs: TCP/135 (RPC), 389 (LDAP), 445 (SMB), 88 (Kerberos), and the dynamic RPC range (TCP 49152–65535 by default on modern Windows).
* No need for WinRM/PS Remoting to use the \`/s:<DCName>\` flag.

---

## Troubleshooting Hints

* If **many tests fail**, check **time sync (W32Time)** and **DNS client settings** on DCs.
* **Replication errors:** verify name resolution both ways, RPC reachability, and site/subnet mappings.
* **DNS test failures:** confirm SRV records exist under **_msdcs** and DCs register dynamically.
* **Advertising warnings:** check GC role, NTDS Settings, and that **Netlogon** has registered records.

---

## Appendices

### Common Tests (Quick List)
Advertising, Connectivity, Services, SystemLog, Replications, KnowsOfRoleHolders, FrsEvent / DFSREvent, MachineAccount, NCSecDesc, NetLogons, ObjectsReplicated, RidManager, Topology, VerifyReferences, VerifyEnterpriseReferences, KccEvent, DNS

### Useful One-Liners
* **Errors only (quiet):** \`dcdiag /q\`
* **Warnings only (filtered, PowerShell):** \`dcdiag /v \| Select-String -Pattern 'Warning'\`
* **One DC, all detail to file:** \`dcdiag /s:DC1 /v /c /f:C:\\Reports\\DC1.txt\`

---

## See Also
* Pair \`dcdiag\` with: \`repadmin /replsummary\`, \`repadmin /showrepl * /csv\`.
* For HTML/email automation, build a wrapper script that runs: \`dcdiag /e /q\`, \`dcdiag /test:dns /dnsall /v\`, \`repadmin /replsummary\`, parses warnings/errors, and composes an HTML dashboard/report.

**Author’s note:** This guide focuses on **advanced usage patterns** that map to real-world operations in multi-site, multi-domain forests. Adapt paths and scopes (/e, /a, /s) to your environment’s size and change control practices.
`,
  headings: [
    { id: "why-dcdiag-matters", text: "Why dcdiag Matters", level: 2 },
    { id: "quick-reference-cheat-sheet", text: "Quick Reference (Cheat Sheet)", level: 2 },
    { id: "enterprise-grade-workflows", text: "Enterprise-Grade Workflows", level: 2 },
    { id: "1-forest-wide-comprehensive-health-recommended-baseline", text: "1. Forest-wide Comprehensive Health (Recommended Baseline)", level: 3 },
    { id: "2-daily-quick-scan-errors-only", text: "2. Daily Quick Scan (Errors Only)", level: 3 },
    { id: "3-targeted-deep-dives", text: "3. Targeted Deep Dives", level: 3 },
    { id: "advanced-patterns-combos", text: "Advanced Patterns & Combos", level: 2 },
    { id: "save-failures-and-append-replication-summary", text: "Save Failures and Append Replication Summary", level: 3 },
    { id: "focus-on-a-single-site-wan-aware", text: "Focus on a Single Site (WAN-Aware)", level: 3 },
    { id: "get-warnings-with-full-context-powershell-block-extraction", text: "Get Warnings with Full Context (PowerShell Block Extraction)", level: 3 },
    { id: "interpreting-key-tests", text: "Interpreting Key Tests", level: 2 },
    { id: "practical-workflows", text: "Practical Workflows", level: 2 },
    { id: "daily-operations", text: "Daily (Operations)", level: 3 },
    { id: "weekly-operations-sre", text: "Weekly (Operations + SRE)", level: 3 },
    { id: "change-window-beforeafter", text: "Change Window (Before/After)", level: 3 },
    { id: "permissions-network-prerequisites", text: "Permissions & Network Prerequisites", level: 2 },
    { id: "troubleshooting-hints", text: "Troubleshooting Hints", level: 2 },
    { id: "appendices", text: "Appendices", level: 2 },
    { id: "common-tests-quick-list", text: "Common Tests (Quick List)", level: 3 },
    { id: "useful-one-liners", text: "Useful One-Liners", level: 3 },
    { id: "see-also", text: "See Also", level: 2 }
  ]
};