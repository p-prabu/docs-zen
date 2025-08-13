// src/app/blog/activedirectory/ad-temp-groups.ts
import { BlogPost } from '../blog-posts';

export const adTempGroups: BlogPost = {
  id: "ad-temp-groups",
  title: "Temporary AD Group and Membership",
  category: "activedirectory",
  body: `# Temporary AD Group and Membership

_Published: Aug 13, 2025_

Modern IT environments are dynamic. Administrators often need to grant privileges for a limited time—for example, to install software, perform a pilot test or allow a vendor to configure a system. Unfortunately, human nature means that temporary permissions are seldom revoked when the job is done...

## Dynamic objects: temporary groups with a time-to-live

...

\`\`\`powershell
# How long should the group live?
$TTLMinutes = 15    
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

...

## Scenario 2: pilot testing or proof-of-concept

...

\`\`\`powershell
# Enable PAM
Enable-ADOptionalFeature 'Privileged Access Management Feature' -Scope ForestOrConfigurationSet -Target contoso.com

# Set a TTL of 1 day for the test membership
$ttl = New-TimeSpan -Days 1

# Add the pilot tester to the group for one day
Add-ADGroupMember -Identity "Test-App-Admins" -Members "PilotUser" -MemberTimeToLive $ttl

# Verify the TTL
Get-ADGroup "Test-App-Admins" -Property member -ShowMemberTimeToLive
\`\`\`

...

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