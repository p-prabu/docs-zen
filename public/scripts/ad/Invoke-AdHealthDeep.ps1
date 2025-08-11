<# 
.SYNOPSIS
  Deeper AD collectors -> CSV/TXT artifacts (read-only).
#>

[CmdletBinding()]
param(
  [string]$OutputFolder = ".\ad-health-deep_{0}" -f (Get-Date -Format "yyyyMMdd_HHmmss"),
  [string]$ConfigPath = ".\ad-health-settings.json",
  [int]$EventDays = 7
)

New-Item -ItemType Directory -Path $OutputFolder -Force | Out-Null

try { Import-Module ActiveDirectory -ErrorAction Stop } catch {}

# Context
Get-ADForest | Select * | Export-Csv "$OutputFolder\forest.csv" -NoTypeInformation
Get-ADDomain | Select * | Export-Csv "$OutputFolder\domain.csv" -NoTypeInformation
Get-ADDomainController -Filter * | Select HostName,Site,IPv4Address,OperatingSystem,IsGlobalCatalog |
  Export-Csv "$OutputFolder\dcs.csv" -NoTypeInformation

# Replication
try {
  (repadmin /replsum /bysrc /bydest) 2>&1 | Out-File "$OutputFolder\repadmin_replsum.txt" -Encoding utf8
  (repadmin /showrepl * /csv) 2>&1 | Out-File "$OutputFolder\repadmin_showrepl.csv" -Encoding utf8
} catch {}

Get-ADReplicationPartnerMetadata -Target * -Scope Forest -ErrorAction SilentlyContinue |
  Select Server,Partner,LastReplicationAttempt,LastReplicationResult,ConsecutiveFailureCount |
  Export-Csv "$OutputFolder\partner_metadata.csv" -NoTypeInformation

Get-ADReplicationFailure -Scope Forest -ErrorAction SilentlyContinue |
  Export-Csv "$OutputFolder\replication_failures.csv" -NoTypeInformation

# DNS
(dcdiag /test:DNS /e /v) 2>&1 | Out-File "$OutputFolder\dcdiag_dns.txt" -Encoding utf8

# SYSVOL / DFSR
(dfsrdiag replicationstate) 2>&1 | Out-File "$OutputFolder\dfsr_state.txt" -Encoding utf8

# GPO status (basic)
try {
  Import-Module GroupPolicy -ErrorAction Stop
  Get-GPO -All | Select DisplayName,Id,GpoStatus,CreationTime,ModificationTime |
    Export-Csv "$OutputFolder\gpo_status.csv" -NoTypeInformation
} catch {}

# Events (last N days)
$since = (Get-Date).AddDays(-[int]$EventDays)
$dcs = try { Get-ADDomainController -Filter * } catch { @() }
foreach($dc in $dcs){
  foreach($log in 'Directory Service','DFS Replication','System'){
    try{
      Get-WinEvent -ComputerName $dc.HostName -FilterHashtable @{LogName=$log; StartTime=$since} |
        Select MachineName,LogName,Id,LevelDisplayName,TimeCreated,ProviderName,Message |
        Export-Csv "$OutputFolder\events_$($dc.HostName)_$($log -replace ' ','').csv" -NoTypeInformation
    } catch {
      "Failed to read $log on $($dc.HostName): $($_.Exception.Message)" |
        Out-File "$OutputFolder\events_errors.txt" -Append -Encoding utf8
    }
  }
}

Write-Host "Deep artifacts saved to: $OutputFolder"
