import { BlogPost } from '../blog-posts';

export const adDomainJoinPermissions: BlogPost = {
  id: "ad-domain-join-permissions",
  title: "Understanding Domain Join Permissions in Active Directory",
  category: "activedirectory",
  body: `
# 🧩 Understanding Domain Join Permissions in Active Directory

### 1️⃣ My Experience and Explanation

As an Active Directory administrator, I often need to tidy up OU permissions—especially the domain join rights that quietly pile up over time.

In my own environments I’ve seen users who can join a computer just fine, but when they try to **rejoin with the same AD object**, the behavior is hit or miss.

If the user or group has **full permissions** on the computer object delegation, rejoin attempts usually succeed.  
When we get strict and grant only “Create Computer Object,” the rejoin fails because AD has no “recreate” right; it really expects “Delete Computer Object” plus the right kind of write permissions.  
So we still aim for **least privilege**, but we have to pick the writes that make sense for the scenario.

I run into this a lot during automated provisioning jobs (**SCCM**, **Ansible**, or similar) where the task sequence first joins the template name to the domain and later renames the machine. That rename must sync right back to Active Directory or the automation loop gets stuck.

Recently, Microsoft published an article that spells out **what permissions are required** for secure join/rejoin operations, and I validated the guidance in my **lab environment** while building out \`dsacls\`.

The script below addresses the exact pain I had, but every environment is different—treat it as guidance and always lab-test before rolling it into production.

### 2️⃣ Script and Technical Explanation

#### Disclaimer
> **For knowledge-purposes only.**  
> This script and information are shared based on my own testing and experience.  
> It should **NOT be implemented directly in production**.  
> **Use at your own risk** — there is **no warranty** or guarantee.  
> Always test this thoroughly in your **LAB environment** and verify that it works properly before applying in a production setup.

Below is the script I used in my lab testing.  
It provides the required domain join, rejoin, and rename permissions for a delegated group without giving full control.

\`\`\`CMD
dsacls "OU=Testing" /I:S /G "Test\\ADGroupDomainJoin:RPWP;displayname;computer"
dsacls "OU=Testing" /I:S /G "Test\\ADGroupDomainJoin:RPWP;samaccountname;computer"
dsacls "OU=Testing" /I:S /G "Test\\ADGroupDomainJoin:CA;change password;computer"
dsacls "OU=Testing" /I:S /G "Test\\ADGroupDomainJoin:CA;reset password;computer"
dsacls "OU=Testing" /I:S /G "Test\\ADGroupDomainJoin:CA;allowed to authenticate;computer"
dsacls "OU=Testing" /I:S /G "Test\\ADGroupDomainJoin:WS;validated write to dns host name;computer"
dsacls "OU=Testing" /I:S /G "Test\\ADGroupDomainJoin:RP;attributecertificateattribute;computer"
dsacls "OU=Testing" /I:S /G "Test\\ADGroupDomainJoin:WP;description;computer"
dsacls "OU=Testing" /I:S /G "Test\\ADGroupDomainJoin:WP;samaccountname;computer"
dsacls "OU=Testing" /I:S /G "Test\\ADGroupDomainJoin:RPWP;account restrictions;computer"
dsacls "OU=Testing" /I:T /G "Test\\ADGroupDomainJoin:CCDC;computer"
dsacls "OU=Testing" /I:T /G "Test\\ADGroupDomainJoin:LC"
dsacls "OU=Testing" /I:S /G "Test\\ADGroupDomainJoin:RP"
\`\`\`

#### Explanation of Key Flags & Permissions

| Flag | Meaning | Description |
|------|----------|-------------|
| \`/I:S\` | Inherit to this object and all descendant objects | Applies to all computer objects under the OU |
| \`/I:T\` | Apply to this object only | Applies to the OU itself |
| \`:RP\` | Read Properties | Allows reading attributes |
| \`:WP\` | Write Properties | Allows editing specific attributes |
| \`:RPWP\` | Read + Write Properties | Combined |
| \`:CA\` | Control Access | Used for Change/Reset Password permissions |
| \`:WS\` | Validated Write | Grants safe write access to DNS Host Name or SPN |
| \`:CCDC\` | Create Child / Delete Child | Allows creating and deleting computer objects |
| \`:LC\` | List Contents | Allows viewing objects inside the OU |

#### What This Script Does
✅ Allows the delegated group (\`Test\\ADGroupDomainJoin\`) to:
- Join **new computers** to the domain  
- **Rejoin** existing computers using the same AD object  
- **Rename** the computer from the local machine and reflect it in AD  
- **Reset and change** machine passwords if needed  
- Keep **DNS and SPN values consistent**  
- Maintain **least privilege** access (no Full Control granted)  

---

### 3️⃣ Microsoft Reference Articles and Disclaimer
Below, I’ve left some **Microsoft reference documents** to understand the background, domain join process, and troubleshooting steps.

---

#### Microsoft References
- [Active Directory domain join permissions – Microsoft Docs (Updated Aug 26, 2025)](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/active-directory-domain-join-permissions)  
- [Access is denied when non-administrator users who have been delegated control try to join computers to a domain](https://learn.microsoft.com/en-us/troubleshoot/windows-server/active-directory/access-denied-when-joining-computers)  
- [Domain Join Log Analysis](https://learn.microsoft.com/en-us/troubleshoot/windows-server/active-directory/domain-join-log-analysis)  
- [Active Directory Domain Join Troubleshooting Guidance](https://learn.microsoft.com/en-us/troubleshoot/windows-server/active-directory/active-directory-domain-join-troubleshooting-guidance)

---

*Written by Prabu Ponnan — Active Directory Specialist*
  `,
  headings: [
    { id: "understanding-domain-join-permissions-in-active-directory", text: "🧩 Understanding Domain Join Permissions in Active Directory", level: 1 },
    { id: "my-experience-and-explanation", text: "1️⃣ My Experience and Explanation", level: 3 },
    { id: "script-and-technical-explanation", text: "2️⃣ Script and Technical Explanation", level: 3 },
    { id: "disclaimer", text: "Disclaimer", level: 4 },
    { id: "explanation-of-key-flags-and-permissions", text: "Explanation of Key Flags & Permissions", level: 4 },
    { id: "what-this-script-does", text: "What This Script Does", level: 4 },
    { id: "microsoft-reference-articles-and-disclaimer", text: "3️⃣ Microsoft Reference Articles and Disclaimer", level: 3 },
    { id: "microsoft-references", text: "Microsoft References", level: 4 },
  ]
};
