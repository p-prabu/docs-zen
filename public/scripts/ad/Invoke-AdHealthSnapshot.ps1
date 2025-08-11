<# 
.SYNOPSIS
  Fast AD health snapshot -> HTML (read-only).
#>

[CmdletBinding()]
param(
  [string]$ReportPath = ".\ad-health-report_{0}.html" -f (Get-Date -Format "yyyyMMdd_HHmmss"),
  [string]$ConfigPath = ".\ad-health-settings.json",
  [int]$EventHours = 24
)

# --------- Load thresholds (optional) ---------
$Thresholds = @{
  MaxReplicationFailures = 0
  MaxDfsrBacklog         = 100
  MaxTimeSkewSeconds     = 5
}
if (Test-Path $ConfigPath) {
  try {
    $cfg = Get-Content $ConfigPath -Raw | ConvertFrom-Json
    $cfg.psobject.Properties | ForEach-Object {
      if ($Thresholds.ContainsKey($_.Name)) { $Thresholds[$_.Name] = [int]$_.Value }
    }
  } catch { Write-Warning "Failed to parse $ConfigPath: $_" }
}

function New-Html {
@"
<!doctype html>
<html>
<head>
<meta charset="utf-8"/>
<title>AD Health Report</title>
<style>
body{font-family:system-ui,Segoe UI,Roboto,Arial,sans-serif;margin:24px;line-height:1.4}
h1,h2{margin:0 0 8px}
.section{margin:18px 0;padding:12px;border:1px solid #e5e7eb;border-radius:12px}
.badge{display:inline-block;padding:2px 8px;border-radius:999px;border:1px solid #e5e7eb}
.ok{background:#e8f5e9}
.warn{background:#fff8e1}
.err{background:#ffebee}
pre{white-space:pre-wrap;background:#f8fafc;padding:12px;border-radius:10px;overflow:auto}
table{border-collapse:collapse}
td,th{border:1px solid #e5e7eb;padding:6px 8px}
small{color:#6b7280}
</style>
</head><body>
<h1>AD Health Report</h1>
<small>Generated: $(Get-Date)</small>
"@
}

function Close-Html { "</body></html>" }

function Section([string]$title,[string]$status,[string]$body){
  $cls = switch($status){ "OK"{"ok"} "WARN"{"warn"} default{"err"} }
@"
<div class="section">
  <h2>$title <span class="badge $cls">$status</span></h2>
  $body
</div>
"@
}

# --------- Collect data ---------
try { Import-Module ActiveDirectory -ErrorAction Stop } catch {}

$dcs = try { Get-ADDomainController -Filter * -ErrorAction Stop } catch { @() }
$replFailures = try { Get-ADReplicationFailure -Scope Forest -ErrorAction Stop } catch { @() }
$dnsText  = (dcdiag /test:DNS /e /v) 2>&1 | Out-String
$dfsrText = (dfsrdiag replicationstate) 2>&1 | Out-String
$fsmoText = (netdom query fsmo) 2>&1 | Out-String
$timeText = (w32tm /monitor) 2>&1 | Out-String

$since = (Get-Date).AddHours(-[int]$EventHours)
$eventCounts = @()
foreach($dc in $dcs){
  foreach($log in 'Directory Service','DFS Replication','System'){
    try{
      $cnt = (Get-WinEvent -ComputerName $dc.HostName -FilterHashtable @{LogName=$log; StartTime=$since} -ErrorAction Stop |
        Where-Object { $_.LevelDisplayName -in 'Error','Warning' } | Measure-Object).Count
      $eventCounts += [pscustomobject]@{ DC=$dc.HostName; Log=$log; ErrorsWarnings=$cnt }
    } catch {
      $eventCounts += [pscustomobject]@{ DC=$dc.HostName; Log=$log; ErrorsWarnings="N/A ($($_.Exception.Message))" }
    }
  }
}

# --------- Evaluate ---------
$statusReplication = if(($replFailures|Measure-Object).Count -le $Thresholds.MaxReplicationFailures){"OK"}else{"ERR"}
$statusDns   = if($dnsText -match '(?i)(fail|error)'){"ERR"}elseif($dnsText -match '(?i)warn'){"WARN"}else{"OK"}
$statusDfsr  = if($dfsrText -match '(?i)normal'){"OK"}elseif($dfsrText -match '(?i)backlog|warn'){"WARN"}else{"ERR"}
# time skew heuristic only: flag if any offset > threshold
$skewExceeded = ($timeText -split "`r?`n" | Where-Object { $_ -match 'offset' } | ForEach-Object {
  if($_ -match 'offset\s+([+-]?\d+)\.(\d+)s'){ [int]$matches[1] } else { 0 }
} | Where-Object { $_ -gt $Thresholds.MaxTimeSkewSeconds }).Count -gt 0
$statusTime  = if($skewExceeded){"WARN"}else{"OK"}
$statusFsmo  = if($fsmoText -match '(?i)(failed|error|unavailable)'){"ERR"}else{"OK"}

# --------- Render HTML ---------
$sb = New-Object System.Text.StringBuilder
$null = $sb.Append((New-Html))

$null = $sb.Append( (Section "Replication" $statusReplication ("<pre>"+($replFailures | Format-Table -AutoSize | Out-String)+"</pre>")) )
$null = $sb.Append( (Section "DNS (dcdiag)" $statusDns ("<pre>"+$dnsText+"</pre>")) )
$null = $sb.Append( (Section "SYSVOL / DFSR" $statusDfsr ("<pre>"+$dfsrText+"</pre>")) )
$null = $sb.Append( (Section "Time Sync (w32tm)" $statusTime ("<pre>"+$timeText+"</pre>")) )
$null = $sb.Append( (Section "FSMO" $statusFsmo ("<pre>"+$fsmoText+"</pre>")) )

# Events table
$tbl = ($eventCounts | Sort-Object DC,Log | ConvertTo-Csv -NoTypeInformation | Out-String)
$null = $sb.Append( (Section "Event Counts (last $EventHours h)" "OK" ("<pre>"+$tbl+"</pre>")) )

$null = $sb.Append((Close-Html))
$sb.ToString() | Out-File -FilePath $ReportPath -Encoding UTF8
Write-Host "Saved: $ReportPath"
