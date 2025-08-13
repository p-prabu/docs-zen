import { BlogPost } from '../blog-posts';

export const adTempGroups: BlogPost = {
  id: "ad-temp-groups",
  title: "Temporary AD Group and Membership",
  category: "activedirectory",
  body: `
# Temporary AD Group and Membership

Modern IT environments are dynamic. Administrators often need to grant privileges for a limited time—for example, to install software, perform a pilot test or allow a vendor to configure a system. Unfortunately, human nature means that temporary permissions are seldom revoked when the job is done. Forgotten accounts and unused groups are common vectors for lateral movement during an attack. Active Directory offers two solutions to this problem: **temporary (dynamic) groups** and **temporary group membership**.

## Dynamic objects: temporary groups with a time-to-live

Dynamic objects were introduced in Windows Server 2003. When you create an object and include the _dynamicObject_ class along with its base class (such as _group_), the object receives an _entryTTL_ attribute—a number of seconds that the object will live. As the TTL counts down, Active Directory decrements the value on each replication cycle; when it reaches zero, the object is removed by the garbage collector without leaving a tombstone. There is a default minimum TTL (15 minutes) and a default TTL of one day, but these values can be adjusted if needed.

Note: The maximum lifetime interval for a temporary (dynamic) group is 1 year.

Because dynamic objects cannot be converted back to regular objects, and because they do not survive past their TTL, they are best suited for tasks or projects with a clearly defined end date. Here's how you might use them in practice.

## Scenario 1: temporary installation team

Imagine you need to install an enterprise application that requires Domain-Admin rights to register service connection points or perform schema updates. Granting Domain-Admin rights permanently is risky, and remembering to remove those rights later is easy to forget. A better pattern is to create a dynamic group, make it a member of the "Domain Admins" group, and add your installers to the dynamic group. Once the TTL expires, the installation accounts no longer have elevated rights and the group itself vanishes.

Here is a sample PowerShell script that creates such a group with a 15-minute lifetime:

<span style="color:#1d4ed8;font-style:italic">

  _# How long should the group live?_
  _$TTLMinutes = 15_    
  _$TTLSeconds = [int](New-TimeSpan -Minutes $TTLMinutes).TotalSeconds_ 
  _# Bind to the destination OU_ 
  _$destinationOu = "OU=TempGroups,DC=contoso,DC=com"_ 
  _$destinationOuObject = [ADSI]("LDAP://$destinationOu")_ 
  _# Create the dynamic group_ 
  _$GroupName = "AppInstallTeam"_ 
  _$TempGroup = $destinationOuObject.Create("group", "CN=$GroupName")_ 
  _$TempGroup.PutEx(2, "objectClass", @("dynamicObject", "group"))_ 
  _$TempGroup.Put("entryTTL", $TTLSeconds)_ 
  _$TempGroup.Put("sAMAccountName", $GroupName)_
  _$TempGroup.Put("displayName", "Application Installation Team")_
  _$expiryTime = (Get-Date).AddSeconds($TTLSeconds)_
  _$TempGroup.Put("description", "Will be deleted at $expiryTime (UTC)")_
  _$TempGroup.SetInfo()_ 
  _# Add the installers to this dynamic group and nest it into Domain Admins_ 
  _Add-ADGroupMember -Identity $GroupName -Members "Alice","Bob"_ 
  _Add-ADGroupMember -Identity "Domain Admins" -Members $GroupName_ 

</span>

After 15 minutes (or the configured minimum), this group will be removed, and the installers will lose their elevated rights.

## Scenario 2: pilot testing or proof-of-concept

New applications or security features often require special access to test servers or an isolated organizational unit. Instead of making testers permanent members of powerful groups, you can use the **temporary group membership** feature introduced in Windows Server 2016. Unlike dynamic objects, temporary group membership leaves the group intact; only the membership expires. Microsoft describes this as a way to "temporarily grant a user some authority… After the specified time has elapsed, the user will be automatically removed from the security group". This makes it ideal for pilot projects where testers require access only for a few hours or days.

Prerequisites and considerations:
- Forest functional level must be Windows Server 2016, and all domain controllers in the forest should run Windows Server 2016 or later.
- You must enable Privileged Access Management (PAM) at the forest scope. This is a one-way, irreversible change—plan and test first.
- Applies to security groups; distribution groups are not supported.
- Access removal takes effect when Kerberos tickets refresh; users may need to re-authenticate or wait for ticket renewal to see access revoked.

Enable PAM:

  _Enable-ADOptionalFeature 'Privileged Access Management Feature' -Scope ForestOrConfigurationSet -Target contoso.com_

Once this feature is enabled, it cannot be disabled.

Here's how to temporarily add a user to a group using the _-MemberTimeToLive_ parameter:

  _# Set a TTL of 1 day for the test membership_
  _$ttl = New-TimeSpan -Days 1_

  _# Add the pilot tester to the group for one day_
  _Add-ADGroupMember -Identity "Test-App-Admins" -Members "PilotUser" -MemberTimeToLive $ttl_

  _# Verify the TTL_
  _Get-ADGroup "Test-App-Admins" -Property member -ShowMemberTimeToLive_

When the day ends, _PilotUser_ is automatically removed from the "Test-App-Admins" group. This approach avoids the 15-minute minimum TTL and does not require creating a separate group.

## Other practical use-cases

- **Short-term project teams:** A cross-functional team might need access to shared resources for a campaign or development sprint. Using a dynamic group with a TTL equal to the project's end date ensures that the permissions are cleaned up automatically when the team disbands.
- **Contractor or vendor access:** External consultants often need rights to a file share or VPN. Rather than manually removing them later, a dynamic group can be set to expire when the contract ends, automatically revoking access.
- **On-call administrative access or Weekend patching activity for Domain controller:** When an engineer is on call for a weekend, you can use _Add-ADGroupMember –MemberTimeToLive_ to add them to a privileged group for 72 hours. After the on-call period, the membership automatically disappears, reducing the risk of leaving accounts with high privilege.

## When to use which feature

Choose **dynamic (temporary) groups** when you need the group itself to disappear after a set time—for example, when you nest the group into a high-privilege role and want to ensure it cannot be reused. Dynamic groups require at least Windows Server 2003 functional level, and by default the TTL must be at least 15 minutes. They should not be used for permanent or long-lived data because once the TTL expires there is no tombstone or recycle bin recovery.

Use **temporary group membership** (PAM) when the group structure should remain but a user's membership should expire automatically. This feature requires Windows Server 2016 functional level and the Privileged Access Management feature to be enabled. It is well suited to granting short-term access without creating new groups and has no minimum TTL—memberships can last for minutes or days.

Both features help enforce the principle of least privilege and reduce the risk of lingering rights. By incorporating these techniques into your Active Directory management practices, you can make your environment both more secure and easier to audit.

## References

- [Temporary Group Membership in Active Directory](https://woshub.com/temporary-membership-in-active-directory-groups/#:~:text=To%20use%20the%20Temporary%20Group,after%20it%20has%20been%20enabled)
- [Temporary Permissions in Active Directory](https://activedirectoryfaq.com/2018/05/temporary-permissions-active-directory/#:~:text=Here%20is%20a%20summary%20of,important%20facts%20about%20temporary%20groups)
    `,
  headings: [
    { id: "dynamic-objects-temporary-groups-with-a-time-to-live", text: "Dynamic objects: temporary groups with a time-to-live", level: 2 },
    { id: "scenario-1-temporary-installation-team", text: "Scenario 1: temporary installation team", level: 2 },
    { id: "scenario-2-pilot-testing-or-proof-of-concept", text: "Scenario 2: pilot testing or proof-of-concept", level: 2 },
    { id: "other-practical-use-cases", text: "Other practical use-cases", level: 2 },
    { id: "when-to-use-which-feature", text: "When to use which feature", level: 2 },
  ]
};
