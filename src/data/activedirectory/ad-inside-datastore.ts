/* eslint-disable no-useless-escape */
import { BlogPost } from '../blog-posts';

export const adDsDatastoreLayout: BlogPost = {
  id: "ad-ds-datastore-layout",
  title: "AD (ESE) Datastore Layout",
  category: "activedirectory",
  body: `

![ActiveDirectoryDatastoreLayout](/image/addatastore.png)

Active Directory Domain Services (AD DS) stores all its information within a robust, transactional database system based on the **Extensible Storage Engine (ESE)**, often referred to as "Jet Blue". This database is fundamental to AD's operation, ensuring the consistency and availability of directory data across all domain controllers. This information is crucial for understanding how Active Directory stores its data and maintains integrity.

The AD datastore consists of several critical files, typically located in \`%SystemRoot%\\NTDS\\\` (e.g., \`C:\\Windows\\NTDS\\\`), though it is recommended to place it on a separate partition or disk for better performance and data protection.

---

## The Core Database File: ntds.dit

The \`ntds.dit\` file is the central database that holds all the directory's objects and their attributes. It can store almost two billion objects and grow up to 16 terabytes. Internally, this file is organized into several key tables:

### Data Table (datatable)
This table contains one row for each object within the directory, such as users, groups, computers, Organizational Units (OUs), and Group Policy Object (GPO) containers.
* Most attributes for these objects reside in this table.
* It uses internal tags and indexes for fast searching.

### Link Table (link_table)
This table stores linked and multi-valued attributes, which represent relationships between objects.
* Examples include group memberships (\`member\`/\`memberOf\`), manager/direct reports relationships, and other linked values.
* Storing these relationships separately allows them to scale and replicate cleanly.

### SD Table (sd_table)
This table provides a single-instance store for Security Descriptors (ACLs). This means that identical Access Control Lists are stored only once and referenced by multiple objects, saving space. It is essentially where permissions are stored efficiently.

In essence, you can think of the **datatable** as storing the objects, the **link_table** as storing the relationships, and the **sd_table** as storing the permissions.

---

## Transactional Log Files

Active Directory is a transactional database system, employing **write-ahead logging** to ensure data integrity and enable crash recovery. This process records changes in log files before they are permanently written to the \`ntds.dit\` file.

* **\`EDB.LOG\`**: This is the current transaction log file, typically 10 MB in size. Every change to the directory is first appended to \`EDB.LOG\`. The change is then applied in memory, and later, the modified pages are pushed to \`ntds.dit\`. When \`EDB.LOG\` fills up, it is renamed to the next numbered log file, and a fresh \`EDB.LOG\` is created for new transactions.
* **\`EDBxxxx.LOG\`**: These are older generations of the 10 MB transaction logs (e.g., \`EDB00001.LOG\`). They are crucial for crash recovery, allowing the system to replay transactions that were not yet committed to \`ntds.dit\` during an unexpected shutdown. These log files are typically truncated only after a successful System State backup.
* **\`EDB.CHK\`**: This is the checkpoint file, which acts as a pointer within the transaction log sequence. It indicates the point up to which all transactions have been successfully written to the \`ntds.dit\` file.
* **\`TEMP.EDB\`**: This is a temporary ESE database file used during database operations.
* **\`RES1.LOG\` and \`RES2.LOG\`**: These are emergency reserve log files. They are kept to ensure that the Active Directory database can perform a clean shutdown even if disk space is critically low.

---

## Maintenance Tools

To manage and maintain the integrity of the AD DS datastore, specific command-line tools are used:

* **\`Esentutl.exe\`**: A utility for ESE database maintenance, including integrity checks, crash recovery, and offline defragmentation.
* **\`Ntdsutil.exe\`**: A powerful tool for managing various aspects of Active Directory, including database maintenance, semantic database analysis, and creating Install From Media (IFM) datasets.

Understanding these components provides a solid foundation for managing and troubleshooting Active Directory environments.
  `,
  headings: [
    { id: "the-core-database-file-ntds-dit", text: "The Core Database File: ntds.dit", level: 2 },
    { id: "transactional-log-files", text: "Transactional Log Files", level: 2 },
    { id: "maintenance-tools", text: "Maintenance Tools", level: 2 },
  ]
};