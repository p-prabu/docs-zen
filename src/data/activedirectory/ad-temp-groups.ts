// src/app/blog/activedirectory/ad-temp-groups.ts
import { BlogPost } from '../blog-posts';

export const adTempGroups: BlogPost = {
  id: "ad-temp-groups",
  title: "Temporary Group Membership",
  category: "activedirectory",
  body: `# Temporary Groups and Group Membership in Active Directory

_Published: Aug 13, 2025_

Modern IT environments are dynamic.  Administrators often need to grant privileges for a limited time—for example, to install software, perform a pilot test or allow a vendor to configure a system.  Unfortunately, human nature means that temporary permissions are seldom revoked when the job is done.  Forgotten accounts and unused groups are common vectors for lateral movement during an attack.  Active Directory offers two solutions to this problem: temporary (dynamic) groups and temporary group membership.

## Dynamic objects: temporary groups with a time‑to‑live

Dynamic objects were introduced in Windows Server 2003.  When you create an object and include the dynamicObject class along with its base class (such as group), the object receives an entryTTL attribute—a number of seconds that the object will live.  As the TTL counts down, Active Directory decrements the value on each replication cycle; when it reaches zero, the object is removed by the garbage collector without leaving a tombstone.  There is a default minimum TTL (15 minutes) and a default TTL of one day, but these values can be adjusted if needed.

Because dynamic objects cannot be converted back to regular objects, and because they do not survive past their TTL, they are best suited for tasks or projects with a clearly defined end date.  Here’s how you might use them in practice.

## Scenario 1: temporary installation team

Imagine you need to install an enterprise application that requires Domain‑Admin rights to register service connection points or perform schema updates.  Granting Domain‑Admin rights permanently is risky, and remembering to remove those rights later is easy to forget.  A better pattern is to create a dynamic group, make it a member of the “Domain Admins” group, and add your installers to the dynamic group.  The Active‑Directory FAQ describes this approach: “the accounts through which the application is installed become members of this temporary group… After the TTL has expired the group is automatically deleted and the user accounts lose their domain admin rights”.  Once the TTL expires, the installation accounts no longer have elevated rights and the group itself vanishes.

Here is a sample PowerShell script that creates such a group with a five‑minute lifetime.  Note that if your forest has not lowered the minimum TTL (15 minutes), Active Directory will round up the TTL automatically.

\`\`\`powershell
# How long should the group live?
$TTLMinutes = 5
$TTLSeconds = [int](New-TimeSpan -Minutes $TTLMinutes).TotalSeconds

# Bind to the destination OU
$destinationOu = "OU=TempGroups,DC=contoso,DC=com"
$destinationOuObject = [ADSI]("LDAP://$destinationOu")

# Create the dynamic group
$GroupName = "AppInstallTeam"
$TempGroup = $destinationOuObject.Create("group", "CN=$GroupName")
$TempGroup.PutEx(2, "objectClass", @("dynamicObject", "group"))
$TempGroup.Put("entryTTL", $TTLSeconds)
$TempGroup.Put("sAMAccountName", $GroupName)
$TempGroup.Put("displayName", "Application Installation Team")
$expiryTime = (Get-Date).AddSeconds($TTLSeconds)
$TempGroup.Put("description", "Will be deleted at $expiryTime (UTC)")
$TempGroup.SetInfo()

# Add the installers to this dynamic group and nest it into Domain Admins
Add-ADGroupMember -Identity $GroupName -Members "Alice","Bob"
Add-ADGroupMember -Identity "Domain Admins" -Members $GroupName
\`\`\`

After five minutes (or the configured minimum), this group will be removed, and the installers will lose their elevated rights.

## Scenario 2: pilot testing or proof‑of‑concept

New applications or security features often require special access to test servers or an isolated organizational unit.  Instead of making testers permanent members of powerful groups, you can use the temporary group membership feature introduced in Windows Server 2016.  Unlike dynamic objects, temporary group membership leaves the group intact; only the membership expires.  Microsoft describes this as a way to “temporarily grant a user some authority… After the specified time has elapsed, the user will be automatically removed from the security group”.  This makes it ideal for pilot projects where testers require access only for a few hours or days.

Here’s how to temporarily add a user to a group using the -MemberTimeToLive parameter:

\`\`\`powershell
# Set a TTL of 1 day for the test membership
$ttl = New-TimeSpan -Days 1

# Add the pilot tester to the group for one day
Add-ADGroupMember -Identity "Test-App-Admins" -Members "PilotUser" -MemberTimeToLive $ttl

# Verify the TTL
Get-ADGroup "Test-App-Admins" -Property member -ShowMemberTimeToLive
\`\`\`

When the day ends, PilotUser is automatically removed from the “Test-App-Admins” group.  This approach avoids the 15‑minute minimum TTL and does not require creating a separate group.

## Other practical use‑cases

- **Short‑term project teams:**  A cross‑functional team might need access to shared resources for a campaign or development sprint. Using a dynamic group with a TTL equal to the project’s end date ensures that the permissions are cleaned up automatically when the team disbands.
- **Contractor or vendor access:**  External consultants often need rights to a file share or VPN. A dynamic group can be set to expire when the contract ends, automatically revoking access.
- **On‑call administrative access:**  Add engineers temporarily to a privileged group for 72 hours. After the on-call period, membership disappears automatically.

## When to use which feature

Choose **dynamic (temporary) groups** when the group itself should be deleted after a set TTL. Use **temporary group membership** when the group persists but member access should expire.

Both help enforce least privilege and reduce risk from lingering rights.
`,
  headings: [
    { id: "dynamic-objects-temporary-groups-with-a-time-to-live", text: "Dynamic objects: temporary groups with a time‑to‑live", level: 2 },
    { id: "scenario-1-temporary-installation-team", text: "Scenario 1: temporary installation team", level: 2 },
    { id: "scenario-2-pilot-testing-or-proof-of-concept", text: "Scenario 2: pilot testing or proof‑of‑concept", level: 2 },
    { id: "other-practical-use-cases", text: "Other practical use‑cases", level: 2 },
    { id: "when-to-use-which-feature", text: "When to use which feature", level: 2 },
  ]
};