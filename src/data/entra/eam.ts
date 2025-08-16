import { BlogPost } from '../blog-posts';

export const eam: BlogPost = {
  id: "eam",
  title: "Enterprise Access Model (EAM)",
  category: "entra",
  body: `
# Enterprise Access Model (EAM)

_Published: Aug 16, 2025_

The Microsoft Active Directory Administrative Tier Model (often referred to as the "legacy tiering model") and the Enterprise Access Model (EAM) are both frameworks for securing IT infrastructure, but the EAM represents an evolution that addresses the complexities of modern, often hybrid and multi-cloud, environments.

Here's a breakdown of the differences and the evolution:

## Legacy Tiering Model

The legacy tiering model focuses on protecting identity systems by creating buffer zones between full control of the environment (Tier 0) and high-risk workstation assets that attackers frequently compromise. This model typically divides all systems into three levels or tiers based on their sensitivity and administrative control.

- **Tier 0:** This is the most secure and highest-privileged layer. It includes administrative accounts and systems that have direct or indirect control over enterprise identities and all assets within the Active Directory forest, domains, or domain controllers. Examples include Active Directory Domain Controllers, PKI systems, and Privileged Administrative Workstations (PAWs).
- **Tier 1:** This tier covers administrative accounts that control enterprise servers and applications.
- **Tier 2:** This tier comprises administrative accounts that manage end users, workstations, and devices. Helpdesk staff often fall into this tier.

A core principle of this model is that credentials from a higher-privileged tier should never be exposed on lower-tier systems. Also, lower-tier credentials can use services provided by higher tiers, but not the other way around. Implementing this requires strict account separation, meaning an administrator might need a separate account for each tier (e.g., John Doe for regular use, T0-John.Doe, T1-John.Doe, T2-John.Doe).

## Enterprise Access Model (EAM)

The Enterprise Access Model (EAM) supersedes and replaces the legacy tier model. While the underlying principle of segregating administrative access remains the same, the EAM expands its scope to address the full access management requirements of modern enterprises, encompassing on-premises, multiple clouds, and various internal or external user and application access scenarios. Microsoft now refers to these as "levels of security" rather than "tiers".

The EAM organises the environment into four planes to reflect the evolving IT landscape:

1.  **Control Plane:** This expands on Tier 0, encompassing all aspects of access control, including networking and legacy operational technology (OT) options. It is based on centralized enterprise identity system(s).
2.  **Management Plane:** This splits from the old Tier 1, focusing on enterprise-wide IT management functions.
3.  **Data/Workload Plane:** Also split from the old Tier 1, this focuses on per-workload management, which can be performed by IT personnel or business units. This split better accommodates developers and DevOps models.
4.  **User Access:** This splits from the old Tier 2, covering all B2B, B2C, and public access scenarios.
5.  **App Access:** Also split from the old Tier 2, this accommodates API access pathways and the resulting attack surface.

## Key Differences and Evolution

- **Scope Expansion:** The legacy model primarily focused on on-premises Active Directory environments. The EAM expands to cover hybrid and multi-cloud environments, including Azure, third-party cloud providers, and various user and application access scenarios.
- **Terminology Shift:** Microsoft has moved from using "tiers" (Tier 0, Tier 1, Tier 2) to "levels of security" or "planes" (Control, Management, Data/Workload, User Access, App Access).
- **Granularity:** The EAM provides more granular categorisation by splitting the former Tier 1 into Management and Data/Workload planes, and Tier 2 into User Access and App Access. This is to increase clarity, actionability, and accommodate modern roles like developers and DevOps.
- **Zero Trust Alignment:** The EAM explicitly incorporates Zero Trust principles such as assuming breach, explicit validation of trust, and applying least privilege access across all components and access methods. This ensures pervasive security and consistent policy enforcement across internal and external access.
- **Protection Focus:** While both aim to prevent privilege escalation and lateral movement, the EAM specifically emphasizes protecting identity systems as the core of the control plane and addresses the inherent high business value of applications and data in the data/workload plane.
- **Implementation:** Implementing a tiering model, whether legacy or EAM, requires significant effort and perseverance, but it makes lateral movement by attackers very difficult, leading to a massive security gain. Despite the evolution, securing Active Directory through tiered administration is a critical prerequisite for implementing the enterprise access model in most organisations due to the dependencies between Azure, Entra ID, and Active Directory.

In essence, the EAM refines and extends the fundamental security principles of the legacy tiering model to better suit the complex, interconnected, and multi-faceted attack surfaces of contemporary IT infrastructures
`,
  headings: [
    { id: "legacy-tiering-model", text: "Legacy Tiering Model", level: 2 },
    { id: "enterprise-access-model-eam", text: "Enterprise Access Model (EAM)", level: 2 },
    { id: "key-differences-and-evolution", text: "Key Differences and Evolution", level: 2 },
  ]
};
