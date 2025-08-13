/* eslint-disable no-useless-escape */
import { BlogPost } from '../blog-posts';

export const adDsrmPassword: BlogPost = {
  id: "ad-dsrm-password",
  title: "Getting DSRM Password Under Control",
  category: "activedirectory",
  body: `# **Getting DSRM Password Control**

  _Published: Aug 11, 2025_

There will come a day in almost every AD admin’s career when you have to boot a Domain Controller into **Directory Services Restore Mode (DSRM)** — maybe for an authoritative restore, repairing the AD database, or performing offline maintenance.

When that day comes, you’ll need the **local DSRM Administrator password**. And here’s the reality: too often, teams get stuck because no one remembers it.

* It was set by an admin who’s long gone.
* It was configured during DC promotion years ago and never documented.
* It was never updated, and the vault entry (if one exists) is empty.

To make matters worse, the DSRM password can **only** be reset while the DC is running normally. If AD DS won’t start and you don’t have the password, you’ve got yourself a classic **chicken-and-egg problem**.

Let’s make sure that never happens to you.

---

## **1. Choosing the Right DSRM Management Approach**

The right approach depends on how many DCs you manage.

### **Small to Medium Environments (up to ~20–30 DCs)**

* Assign **unique DSRM passwords per DC**.
* Store each in a **secure, audited password vault**.
* Strongest isolation — compromise of one DC’s password doesn’t affect others.

### **Large Environments (50–100+ DCs)**

* Use **Sync-from-Domain-Account** for easier maintenance.
* Sets each DC’s DSRM password to match a dedicated, non-privileged domain account.
* Rotate that one password, then re-sync to all DCs in bulk.
* Remember: this is a one-time sync — you must re-run after each change.

---

## **2. Resetting the DSRM Password**

### **Option A – Manual Per DC**
\`\`\`cmd
ntdsutil "set dsrm password" "reset password on server null" "quit" "quit"
\`\`\`
(_server null_ = the DC you are on)

### **Option B – Sync From Domain Account**
\`\`\`cmd
ntdsutil "set dsrm password" "sync from domain account CONTOSO\DSRM-Sync-User" "quit" "quit"
\`\`\`

* This requires a **dedicated domain account** with no elevated privileges.
* The DSRM password will match this account’s password across all DCs.
* Use this method if you have many DCs and want to avoid managing unique passwords.

### **Example PowerShell Script for Sync Method**

Here’s a quick PowerShell script to set the DSRM password across all DCs using the sync method:

\`\`\`powershell
$domainAccount = "CONTOSO\DSRM-Sync-User"
$dcList = Get-ADDomainController -Filter *

foreach ($dc in $dcList) {
    Invoke-Command -ComputerName $dc.HostName -ScriptBlock {
        ntdsutil "set dsrm password" "sync from domain account $using:domainAccount"
    }
}
\`\`\`

* This script retrieves all domain controllers and runs the DSRM sync command on each.
* Ensure you run this with appropriate permissions.

### **Important Notes**

- **Run as Administrator**: You must run these commands with elevated privileges.
- **Backup First**: Always ensure you have a backup of your AD before making changes.
- **Test in a Lab**: If possible, test the DSRM password reset process in a lab environment first.

---

## **3. Testing the DSRM Password**

It’s not enough to set the password — you need to confirm it works **before** a disaster.

### **A. Offline Test (Most Reliable)**

1. Set the DC to boot into DSRM:
   \`\`\`cmd
   bcdedit /set safeboot dsrepair  
   shutdown /r /f /t 5
   \`\`\`
2. At logon, sign in as:

   _.\Administrator_

   with your DSRM password.

3. **Revert safeboot afterward** to normal boot:
   \`\`\`cmd
   bcdedit /deletevalue safeboot  
   shutdown /r /f /t 5
   \`\`\`

### **B. Online Test (Quick Check)**

_(Less secure — use only briefly, then revert.)_

1. Temporarily allow DSRM login in normal mode:
   \`\`\`powershell
   reg add HKLM\\SYSTEM\\CurrentControlSet\\Control\\Lsa /v DsrmAdminLogonBehavior /t REG_DWORD /d 2 /f
   \`\`\`
2. Log off and sign in as:
   \`\`\`cmd
   .\Administrator
   \`\`\`
3. **Revert registry to default (0) after testing**:
   \`\`\`powershell
   reg add HKLM\\SYSTEM\\CurrentControlSet\\Control\\Lsa /v DsrmAdminLogonBehavior /t REG_DWORD /d 0 /f
   \`\`\`

---

## **4. Best Practices**

* Store DSRM credentials in a **secure vault**.
* Test the password **at least twice a year**.
* Never leave _DsrmAdminLogonBehavior_ at _2_.
* If using **sync method**:
  * Keep the sync account non-privileged.
  * Rotate and re-sync regularly.
* If using **unique passwords**:
  * Use a vault with expiry and auditing features.

---

## **Final Word**

Whether you go with **unique-per-DC** or **sync-from-domain-account**, the goal is the same — a **known, tested, and recoverable DSRM password** for every Domain Controller you manage.
It’s one of those admin tasks you won’t think about — until you desperately need it. And when that day comes, you’ll be glad you planned ahead.
`,
  headings: [
    { id: "choosing-the-right-dsrm-management-approach", text: "1. Choosing the Right DSRM Management Approach", level: 2 },
    { id: "small-to-medium-environments", text: "Small to Medium Environments (up to ~20–30 DCs)", level: 3 },
    { id: "large-environments", text: "Large Environments (50–100+ DCs)", level: 3 },
    { id: "resetting-the-dsrm-password", text: "2. Resetting the DSRM Password", level: 2 },
    { id: "option-a-manual-per-dc", text: "Option A – Manual Per DC", level: 3 },
    { id: "option-b-sync-from-domain-account", text: "Option B – Sync From Domain Account", level: 3 },
    { id: "testing-the-dsrm-password", text: "3. Testing the DSRM Password", level: 2 },
    { id: "offline-test-most-reliable", text: "A. Offline Test (Most Reliable)", level: 3 },
    { id: "online-test-quick-check", text: "B. Online Test (Quick Check)", level: 3 },
    { id: "best-practices", text: "4. Best Practices", level: 2 },
    { id: "final-word", text: "Final Word", level: 2 },
  ]
};
