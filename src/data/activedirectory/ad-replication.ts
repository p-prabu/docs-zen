import { BlogPost } from '../blog-posts';

export const adReplication: BlogPost = {
  id: "ad-replication",
  title: "Active Directory Replication",
  category: "activedirectory",
  body: `

    ![ActiveDirectoryDatastoreLayout](/image/replication.png)

_Published: Aug 11, 2025_

Here are the key components that take part in replication:

*   **Domain Controllers (DCs)**
*   **NTDS.DIT (AD Database)**
*   **USN (Update Sequence Number)**
*   **High-Watermark Vector Table**
*   **Up-to-dateness Vector Table**
*   **Replication Metadata (Attribute versioning)**
*   **Connection Objects**
*   **Knowledge Consistency Checker (KCC)**
*   **Replication Topology (Intra-site and Inter-site)**
*   **Replication Queues**
*   **Repadmin tool / Event logs / DCDiag (for diagnostics)**

### 1. Domain Controllers (DCs)

Think of each **Domain Controller** like a librarian in a giant library chain. Every DC stores a **copy** of the same book (Active Directory database — `NTDS.DIT`).

When one librarian updates a book (say, adds a user), the other librarians need to be notified and update *their copies*. That’s what **replication** ensures — **consistency across all DCs**.

Each DC acts as both:

*   **Source DC** (sends changes)
*   **Destination DC** (receives changes)

Replication happens between DCs through **replication partners**, like a controlled telephone tree where updates are passed along.

### 2. NTDS.DIT (Active Directory Database)

Think of `NTDS.DIT` as the **master book** each librarian (Domain Controller) maintains.

It holds:

*   All user, group, computer accounts
*   OUs, GPO links, and schema objects
*   Metadata like `whenCreated`, `whenChanged`, `versionNumber`

Every **change** made — whether it's adding a user or modifying a group — is **written to this database**.

Important:

*   Changes aren’t replicated as entire records.
*   Only the **changed attributes** (like `DisplayName`, `memberOf`) are replicated — that’s where **replication metadata** plays a key role.

Located here: `%SystemRoot%\NTDS\ntds.dit` — usually `C:\Windows\NTDS\ntds.dit`

### 3. USN (Update Sequence Number)

Think of the USN as a **serial number** that **only goes up**. Every Domain Controller maintains its own USN counter — like a running total of changes it knows about.

#### When does the USN change?

*   Every time an object is **created**, **modified**, or **deleted** on a DC.
*   Example: You reset a password on DC1 → its USN increases by 1.

So instead of saying “John’s password was changed,” AD says: “My latest USN is 412567 — I’ve done 412567 operations so far.”

#### How is USN used in replication?

Imagine this:

*   DC1: USN is now at 1000
*   DC2: Last time it synced with DC1, it noted: “I saw changes up to USN 950 from DC1”
*   So when DC2 next connects to DC1, it says: “Hey DC1, give me everything after 950.”

DC1 checks and replies: “Sure. From 951 to 1000, here’s what changed.”

That’s **delta replication** — only what changed since the last sync.

Key Points:

*   Every DC tracks what changes it has **originated** (its own USNs)
*   Other DCs track what USNs they’ve **already received** (via **High-Watermark** and **Up-To-Dateness** tables).

### 4. Replication Metadata & Attribute Versioning

Every attribute in Active Directory (like `DisplayName`, `Description`, etc.) has **versioning metadata** behind the scenes.

This metadata includes:

| Metadata Field      | Description                                  |
| ------------------- | -------------------------------------------- |
| **Version Number**  | Increases every time the attribute is modified |
| **Originating USN** | The USN on the DC where the change was first made |
| **Originating DC GUID** | Identifies which DC made the change        |
| **Timestamp**       | When the change occurred                     |

#### Why is this important?

Imagine two DCs receive conflicting updates. AD uses this metadata to:

*   **Compare timestamps**
*   **Compare version numbers**
*   Resolve **conflicts intelligently** (last-writer-wins)

This is called **multi-master replication**, and it’s safe because of this built-in version tracking.

Think of each attribute as having a **hidden change log tag**: “I was changed on DC1, at 2025-08-25 10:42, with USN 10345, version 5”. Every other DC uses this tag to decide if they should accept the change.

### 5. High-Watermark Vector Table

This table is **per replication partner**. It tells a Domain Controller: “For this specific partner, I’ve already received all changes up to USN **X**.”

Think of it like a **bookmark** — each DC keeps track of where it left off with every other DC.

#### Example:

*   DC1 makes 10 changes, its USN goes from 100 to 110.
*   DC2’s High-Watermark for DC1 = 100 (meaning: “I have changes up to 100”)
*   During next replication:
    *   DC2 asks DC1: “Give me changes since 100”
    *   DC1 responds with 101–110
    *   DC2 updates the High-Watermark to 110

This keeps replication efficient and **avoids sending the full database**.

### 6. Up-To-Dateness Vector Table (UTD Vector)

Where **High-Watermark** tracks *what DC2 got from DC1*, **UTD Vector** tracks *everything DC2 has received from **everyone*** — no matter **who sent it**.

#### Mental Picture:

Let’s say:

*   DC1 made a change (USN 101)
*   DC2 already received it **from DC3** (not directly from DC1)

If DC2 then talks to DC1 and says: “Hey, give me your changes since USN 95”, DC1 would have sent USN 101 again. But DC2 checks its **UTD vector** and says: “Actually, I already got 101 via DC3. No need to send it again.”

This avoids **duplicate replication** of the same change from different partners.

#### Table Looks Like This (simplified):

| DC GUID    | Highest Originating USN Seen |
| ---------- | ---------------------------- |
| DC1-GUID   | 105                          |
| DC3-GUID   | 210                          |

This is how Active Directory ensures **efficiency** and **non-redundant replication**.

### 7. Connection Objects

A **Connection Object** is a one-way "link" that tells a Destination DC: “Pull replication changes **from this Source DC**.”

It’s like saying:

*   “DC2 → replicate from DC1”
*   “DC3 → replicate from DC1 and DC2”

These objects are created **automatically** by the **KCC** (Knowledge Consistency Checker) or manually by admins.

#### One-Way Only:

For **two-way sync**, you need two connection objects (DC1 → DC2 and DC2 → DC1).

Stored in: `CN=NTDS Settings,CN=<DCName>,CN=Servers,CN=<Site>,CN=Sites,CN=Configuration,...`

View via:

*   `Active Directory Sites and Services` GUI
*   Or PowerShell/repadmin

### 8. KCC (Knowledge Consistency Checker)

The **KCC** is a built-in process that **automatically creates and maintains** the **replication topology**. Think of it as the **network planner** for Domain Controllers.

#### What does KCC do?

*   Scans the site topology (site links, costs, schedules)
*   Creates **Connection Objects** between DCs
*   Tries to form a **minimum-hop ring**
*   Updates topology every **15 minutes** by default

It considers:

*   Site boundaries
*   Costs and schedules of **site links**
*   Which DCs hold which naming contexts (partitions)

#### Intra-site vs Inter-site

*   **Intra-site**: Fast and frequent (RPC over TCP), almost real-time
*   **Inter-site**: Scheduled, compressed, slower (RPC or SMTP)

### 9. Replication Topology: Intra-site vs Inter-site

This is how **Domain Controllers talk to each other**.

#### Intra-site Replication (Same AD Site)

*   **Protocol**: RPC over TCP
*   **Frequency**: Every **15 seconds** (plus random 1–3 sec delay)
*   **Compression**: No compression (fast LAN assumed)
*   **Trigger**: Change notification — near real-time

#### Inter-site Replication (Different AD Sites)

*   **Protocol**: RPC over TCP (or SMTP for special cases)
*   **Frequency**: Default is **every 180 minutes (3 hours)** — configurable
*   **Compression**: Yes (to save WAN bandwidth)
*   **Trigger**: Based on **schedule**, not instant

### 10. Replication Queues

When a change occurs on a Domain Controller, it first enters the **outbound replication queue**.

#### There are two key queues:

1.  **Outbound Replication Queue**: Stores changes **this DC will send** to its partners.
2.  **Inbound Replication Queue**: Temporary, stores incoming changes that are being **received** from a partner.

#### Tools to view the queue:

*   `repadmin /queue` — shows what’s waiting to replicate

#### Example:

*   DC1 makes 20 updates
*   DC2 is offline
*   Those 20 changes are **queued in DC1’s outbound queue** for DC2

When DC2 comes back online, DC1 sends all 20 changes from its queue.

### 11. When Does Replication Happen?

Replication is triggered under specific rules.

#### Intra-site Replication (within same site)

*   **Triggered by change notification**
*   Default delay: **15 seconds**
*   If multiple changes occur, they're batched within a **3-second random window**

#### Inter-site Replication (across sites)

*   **No change notification**
*   Runs based on a **fixed schedule**
*   Default: **Every 180 minutes (3 hours)**
*   **Changes are compressed** to save WAN bandwidth

#### Other replication triggers:

*   Manual commands like `repadmin /syncall`
*   DC reboot
*   KCC topology updates
*   Connection object changes

## Active Directory Replication Recap

Here’s a simple mental map of how everything fits together:

| Concept                  | Description                                          |
| ------------------------ | ---------------------------------------------------- |
| **Domain Controllers**   | Each holds a writable copy of AD data (NTDS.DIT)     |
| **NTDS.DIT**             | The AD database that stores all objects and changes  |
| **USN**                  | A per-DC counter that tracks local changes           |
| **Replication Metadata** | Tracks version, origin, and timestamp of each attribute |
| **High-Watermark Vector**| Tracks last USN received from **each partner**       |
| **Up-To-Dateness Vector**| Tracks all changes received from **all DCs**         |
| **Connection Objects**   | Define one-way replication paths between DCs         |
| **KCC**                  | Auto-generates and maintains replication topology    |
| **Topology**             | Intra-site = fast, Inter-site = scheduled and compressed |
| **Replication Queues**   | Temporary storage for outbound/inbound replication   |
| **Trigger Events**       | Change notifications, schedules, or manual syncs     |

## Monitoring Replication: Tools

Here are the top tools used to **check, test, and troubleshoot** replication:

| Tool                             | Usage                                                        |
| -------------------------------- | ------------------------------------------------------------ |
| `repadmin`                       | Most powerful tool for AD replication (e.g., `/replsummary`, `/showrepl`, `/queue`, `/syncall`) |
| `dcdiag`                         | Domain Controller diagnostics, checks for replication and service health |
| `Event Viewer`                   | Look under `Directory Service` and `File Replication Service` logs |
| `Active Directory Sites and Services` | Visual GUI to inspect connection objects, force replication |
| PowerShell                       | `Get-ADReplication*` cmdlets in `ActiveDirectory` module |
`,
  headings: [
    { id: "domain-controllers", text: "1. Domain Controllers (DCs)", level: 3 },
    { id: "ntds-dit", text: "2. NTDS.DIT (Active Directory Database)", level: 3 },
    { id: "usn", text: "3. USN (Update Sequence Number)", level: 3 },
    { id: "replication-metadata", text: "4. Replication Metadata & Attribute Versioning", level: 3 },
    { id: "high-watermark-vector-table", text: "5. High-Watermark Vector Table", level: 3 },
    { id: "up-to-dateness-vector-table", text: "6. Up-To-Dateness Vector Table (UTD Vector)", level: 3 },
    { id: "connection-objects", text: "7. Connection Objects", level: 3 },
    { id: "kcc", text: "8. KCC (Knowledge Consistency Checker)", level: 3 },
    { id: "replication-topology", text: "9. Replication Topology: Intra-site vs Inter-site", level: 3 },
    { id: "replication-queues", text: "10. Replication Queues", level: 3 },
    { id: "when-does-replication-happen", text: "11. When Does Replication Happen?", level: 3 },
    { id: "active-directory-replication-recap", text: "Active Directory Replication Recap", level: 2 },
    { id: "monitoring-replication-tools", text: "Monitoring Replication: Tools", level: 2 }
  ]
};