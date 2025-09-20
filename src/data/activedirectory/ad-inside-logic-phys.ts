import { BlogPost } from '../blog-posts';

export const adlogicalPhysical: BlogPost = {
  id: "ad-inside-logic-phys",
  title: "Logical vs Physical Components",
  category: "activedirectory",
  body: `

  ![ActiveDirectoryDatastoreLayout](/image/Login-Physical-components.png)

   _Published: Sep 20, 2025_
   
Active Directory is a powerful directory service, and its structure is built on a combination of **logical** and **physical** components. The logical components define the organizational hierarchy and relationships, while the physical components are the actual servers and network elements that make the directory service run. Understanding the difference between these is key to managing an AD environment effectively.


---

## Logical Components

These components represent the conceptual structure of the directory.

### Schema
The **rules of the directory**. It defines the types of objects (like User, Computer, Group) that can exist and their attributes, data types, and constraints. A forest has only **one** schema, which is shared by all domains within it.

### Forest
The **top-level container** of the entire Active Directory instance. A forest consists of one or more domains and is the ultimate security and trust boundary. All domains within a forest share the same schema and configuration.

### Domain
A **security boundary** that groups objects. A domain has its own security policies and a unique name (e.g., \`corp.example.com\`). Authentication and policies are managed at this level.

### Domain Tree
A collection of one or more domains that share a **contiguous DNS namespace**. For instance, \`sales.example.com\` would be part of the \`example.com\` tree.

### Organizational Units (OUs)
Containers within a domain used for **delegation of administrative rights** and **linking Group Policies**. OUs are not a security boundary.

### Trusts
These allow users in one domain or forest to access resources in another. Trusts can be **directional** (one-way) and **transitive** (they "flow through" to other trusted domains).

### Objects
The actual **items stored** in the directory. Examples include:
* **Users**: Human or service identities.
* **Computers**: Accounts for machines joined to the domain.
* **Groups**: Collections of users or computers used for permissions.
* **Contacts**: Address book entries that cannot log on.

---

## Physical Components

These are the tangible components where the directory services are hosted.

### Domain Controller (DC)
A **Windows Server** that runs the Active Directory Domain Services (AD DS). It hosts the database and handles user authentication, authorization, and other directory-related requests.

### AD DS Data Store
The database files on each DC, typically located in \`%SystemRoot%\\NTDS\\\`.
* \`NTDS.dit\`: The main **database file** containing all objects and their attributes.
* \`ESE/Jet logs\`: Transactional log files that ensure data integrity and allow for recovery.

### Sites
A **physical grouping of IP subnets**. Sites are used to optimize network traffic by controlling Active Directory replication and helping clients connect to the nearest DC.

### Replication
The process of **copying changes** from one DC to others to ensure data consistency across all DCs.

---

## Key Takeaways

* **Forest** is the biggest security and trust boundary.
* **Domain** is the core security and policy boundary.
* **OUs** are for delegation and Group Policy, not security.
* **Trusts** can be directional and transitive.
* **DCs** store data in the \`NTDS.dit\` file and provide directory services.
    `,
  headings: [
    { id: "logical-components", text: "Logical Components", level: 2 },
    { id: "schema", text: "Schema", level: 3 },
    { id: "forest", text: "Forest", level: 3 },
    { id: "domain", text: "Domain", level: 3 },
    { id: "domain-tree", text: "Domain Tree", level: 3 },
    { id: "organizational-units", text: "Organizational Units (OUs)", level: 3 },
    { id: "trusts", text: "Trusts", level: 3 },
    { id: "objects", text: "Objects", level: 3 },
    { id: "physical-components", text: "Physical Components", level: 2 },
    { id: "domain-controller", text: "Domain Controller (DC)", level: 3 },
    { id: "ad-ds-data-store", text: "AD DS Data Store", level: 3 },
    { id: "sites", text: "Sites", level: 3 },
    { id: "replication", text: "Replication", level: 3 },
    { id: "key-takeaways", text: "Key Takeaways", level: 2 },
  ]
};
