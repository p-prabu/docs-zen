// src/app/blog/powershell/powershell-out-file.ts
import { BlogPost } from '../blog-posts';

export const psOutFile: BlogPost = {
  id: "ps-outfile",
  title: "Save PS Output Locally",
  category: "powershell",
  body: `# 💾 Saving PowerShell Output Locally – Why Out-File is My Go-To

_Published: Aug 14, 2025_

Have you ever run a PowerShell command, seen hundreds of lines fly by… and then realised you forgot to save it?
I have.
And if it’s a command that took minutes to run (or worse, needed a weekend change window to execute), that’s a mistake you don’t want to repeat.

That’s where \`Out-File\` comes in.
It’s a small cmdlet, but it has saved me countless hours in my day-to-day work — especially when I need proof of what was run, or a file to share with the team.

---

## Why I Save Output Locally

For me, saving output is not just about archiving. It’s about:
- **Keeping a permanent record** — I can always go back and check.
- **Working offline** — I don’t need to reconnect to the server just to re-run a report.
- **Sharing with others** — drop it in Teams, attach it to a Jira ticket, email it.
- **Comparing over time** — yesterday’s vs today’s output for changes.
- **Automation** — logs for scripts that run on a schedule.

---

## My Go-To Examples

### 1. Save a process list

\`\`\`powershell
Get-Process | Out-File -FilePath "C:\Temp\processes.txt"
\`\`\`

✔ Creates a \`processes.txt\` file locally with the current process list.

---

### 2. Append logs instead of overwriting

\`\`\`powershell
Get-Date | Out-File -FilePath "C:\Temp\app.log" -Append
\`\`\`

✔ Each run adds a timestamp to the log — no data lost.

---

### 3. Save with specific encoding

\`\`\`powershell
"Hello World" | Out-File "C:\Temp\hello.txt" -Encoding UTF8
\`\`\`

✔ Ensures no weird characters when sharing with others.

---

### 4. Prevent accidental overwrites

\`\`\`powershell
"Critical Data" | Out-File "C:\Temp\data.txt" -NoClobber
\`\`\`

✔ If the file already exists, this throws an error instead of replacing it.

---

### 💡 Pro Tip: Prefer CSV for tabular data

If the output is tabular or structured, I prefer **CSV** for easier Excel filtering:

\`\`\`powershell
Get-ADUser -Filter * -Property DisplayName, Department |
  Select DisplayName, Department |
  Export-Csv "C:\Reports\ADUserList.csv" -NoTypeInformation
\`\`\`

---

## Takeaway

\`Out-File\` is one of those commands that seems basic, but it’s a habit that pays off.
If you start saving your outputs locally — even for small things — you’ll save yourself from those “oh no, I lost it” moments.

And yes, my \`C:\Reports\` folder is my little treasure chest. 😄

---

If you’ve got a favourite trick for saving PowerShell output, drop it in the comments. We all learn faster when we share. 🚀
`,
  headings: [
    { id: "why-i-save-output-locally", text: "Why I Save Output Locally", level: 2 },
    { id: "my-go-to-examples", text: "My Go-To Examples", level: 2 },
    { id: "1-save-a-process-list", text: "1. Save a process list", level: 3 },
    { id: "2-append-logs-instead-of-overwriting", text: "2. Append logs instead of overwriting", level: 3 },
    { id: "3-save-with-specific-encoding", text: "3. Save with specific encoding", level: 3 },
    { id: "4-prevent-accidental-overwrites", text: "4. Prevent accidental overwrites", level: 3 },
    { id: "💡-pro-tip-prefer-csv-for-tabular-data", text: "💡 Pro Tip: Prefer CSV for tabular data", level: 3 },
    { id: "takeaway", text: "Takeaway", level: 2 },
  ],
};