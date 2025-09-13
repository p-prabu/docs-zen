/* eslint-disable no-useless-escape */
import { BlogPost } from '../blog-posts';

export const adPartitions: BlogPost = {
  id: "ad-naming-contexts-partitions",
  title: "Understanding Active Directory Partitions",
  category: "activedirectory",
  body: `
  _Published: Sep 13, 2025_

![ActiveDirectoryDatastoreLayout](/image/ad-partions.png)

Active Directory stores its data in a structured way across four logical sections, or **Naming Contexts (NCs)**, also known as partitions. Each partition has a distinct role, scope of replication, and a typical management tool. Understanding these partitions is fundamental to managing and troubleshooting Active Directory.

---

## 1. Domain Partition

This is the most common and widely used partition. It contains the majority of the day-to-day objects in Active Directory.

* **Scope/Replication:** Replicates only to other Domain Controllers (DCs) within the same domain.
* **Contents:** Almost all daily objects, including **Users**, **Groups**, **Computers**, **Organizational Units (OUs)**, and **Group Policy Objects (GPOs)**.
* **DN Example:** \`DC=corp,DC=example,DC=com\`
* **Tools:** **Active Directory Users and Computers (ADUC)** is the primary tool. **ADSI Edit** can also be used, specifically with the "Default naming context."
* **Global Catalog (GC) Note:** The Global Catalog holds a partial attribute set of objects from every domain partition, enabling forest-wide searches.

---

## 2. Configuration Partition

This partition defines the overall topology and structure of the entire AD forest.

* **Scope/Replication:** Replicates to every single DC in the entire forest.
* **Contents:** Forest-wide configuration data, such as **Sites**, **Subnets**, **Site Links**, and Service Connection Points. It's the "wiring" of how DCs find each other and replicate.
* **DN Example:** \`CN=Configuration,DC=example,DC=com\`
* **Tools:** **Active Directory Sites and Services** is the main management tool.

---

## 3. Schema Partition

The schema is the "rule book" for your AD forest. It defines the types of objects and attributes that can exist in the directory.

* **Scope/Replication:** Replicates to every DC in the forest.
* **Contents:** **classSchema** (defining object types like **user**, **computer**, and **group**) and **attributeSchema** (defining attributes like **sAMAccountName** and **member**).
* **DN Example:** \`CN=Schema,CN=Configuration,DC=example,DC=com\`
* **Tools:** **Active Directory Schema snap-in**, and **ADSI Edit**.
* **Governance:** Changes require special permissions and can only be made on the **Schema Master** Flexible Single Master Operation (FSMO) role holder.

---

## 4. Application Partition (a.k.a. NDNC)

These partitions are for application-specific data and offer flexible replication.

* **Scope/Replication:** You can choose which specific DCs in the forest will host and replicate this data. It is not tied to a single domain.
* **Contents:** Application-specific data. The most common use is for **Active Directory-integrated DNS zones**.
* **Default Examples:**
    * \`DC=ForestDnsZones,DC=example,DC=com\` (for forest-wide DNS data)
    * \`DC=DomainDnsZones,DC=corp,DC=example,DC=com\` (for domain-scoped DNS data)
* **Tools:** **DNS Manager** (for DNS partitions), **NTDSUTIL**, and **ADSI Edit**.
* **GC Note:** Data in application partitions is not included in the Global Catalog by default.

---

### Quick Admin Cheat Sheet

* **List all partitions on a DC (PowerShell):**
    \`(Get-ADRootDSE).namingContexts\`

* **Replication Health:**
    \`repadmin /showrepl\` (shows replication status for all NCs)

* **10-Second Memory Hook:**
    * **Domain:** Daily objects (per-domain)
    * **Configuration:** Forest "wiring"
    * **Schema:** Forest "rule book"
    * **Application:** Application-specific data (custom scope)
  `,
  headings: [
    { id: "1-domain-partition", text: "1. Domain Partition", level: 2 },
    { id: "2-configuration-partition", text: "2. Configuration Partition", level: 2 },
    { id: "3-schema-partition", text: "3. Schema Partition", level: 2 },
    { id: "4-application-partition-a-k-a-ndnc", text: "4. Application Partition (a.k.a. NDNC)", level: 2 },
    { id: "quick-admin-cheat-sheet", text: "Quick Admin Cheat Sheet", level: 3 }
  ]
};