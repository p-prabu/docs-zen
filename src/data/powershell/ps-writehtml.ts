import { BlogPost } from '../blog-posts';

export const psWriteHTML: BlogPost = {
  id: "ps-writehtml",
  title: "PSWriteHTML Interactive Dashboards",
  category: "powershell",
  body: `

_Published: Aug 01, 2025_

In the world of IT automation, reporting is as important as the scripts that gather the data. Clear, well-designed reports not only make your work look professional, they help decision-makers understand complex data at a glance. **PSWriteHTML** is a PowerShell module that makes this possible—without requiring you to learn HTML, CSS, or JavaScript.

Whether you're building a quick one-page server report or a full-fledged interactive dashboard, PSWriteHTML gives you the tools to create beautiful, responsive HTML content straight from PowerShell.

![PSWriteHTML](/image/pswriteHtml.png)

## A Quick Background

PSWriteHTML is the successor to the older **ReportHTML** module. Its author, Przemysław Kłys (a.k.a. *MadBoyEvo*), rebuilt it from the ground up to address performance limitations and bring in modern features.

The improvements were significant:

- **Speed boost** – reducing report generation from 20+ seconds to as little as 0–2 seconds.
- **Modern UI components** – updated libraries for charts, panels, and responsive layouts.
- **Broader functionality** – from basic tables to calendars, InfoCards, markdown integration, and more.

The module has been actively maintained with over 2,600 commits and frequent updates, showing a strong commitment from the developer and the community.

## Core Features

### 1. Rich Command Set
With more than 100 cmdlets, you can create tables, charts, panels, markdown sections, calendars, and even fully styled HTML emails.

### 2. Markdown Integration
The \`New-HTMLMarkdown\` cmdlet lets you embed markdown directly in your reports—whether typed inline, passed as an array of strings, or loaded from a \`.md\` file. This bridges the gap between technical documentation and live data.

### 3. Responsive UI Components
Create layouts that adapt to any screen size with the \`-Density\` parameter. Add InfoCards, navigation panels, tabs, and other UI elements without touching a single line of raw HTML.

### 4. Bundled Dependencies
While the module uses helper modules like **PSSharedGoods** and **PSWriteColor** during development, the version you install from the PowerShell Gallery includes everything—no need to manually install dependencies.

### 5. Performance & Flexibility
Optimized for speed, the module can handle both small ad-hoc scripts and large enterprise dashboards.

## Installation

Getting started is simple:

\`\`\`powershell
Install-Module PSWriteHTML -Scope CurrentUser
Import-Module PSWriteHTML
\`\`\`

Once imported, you can immediately begin creating HTML reports by combining \`New-HTML\`, \`New-HTMLTable\`, \`New-HTMLChart\`, and other building blocks.

## Popular Use Cases

- **IT Dashboards** – Track Active Directory health, backup status, or server performance.
- **Compliance Reports** – Present security scans or audit logs in an easy-to-read layout.
- **Automated Email Reports** – Send daily system summaries with embedded charts and tables.
- **Documentation with Live Data** – Blend markdown content with real-time script output.

## Community Feedback

The PowerShell community has responded enthusiastically to PSWriteHTML:

> "I can't quantify the amount of money that PSWriteHTML has made me… thank you."
> — *u/MadBoyEvo* (Reddit)

> "If all you are after is a simple table then… PSWriteHTML is not for you."
> — *u/MadBoyEvo*, reminding users that the module shines when you need rich, interactive HTML.

## Pro Tips for Getting the Most Out of PSWriteHTML

- **Start Small** – Experiment with one table or chart before building complex dashboards.
- **Combine with Data Sources** – Pull data from CSVs, APIs, or AD queries to create dynamic content.
- **Leverage Markdown** – Great for adding explanations, notes, and formatted documentation to reports.
- **Test in a Browser** – Your PowerShell output is just the start—always check how it renders in Chrome, Edge, or Firefox.

## Conclusion

PSWriteHTML takes the heavy lifting out of HTML report creation. By giving PowerShell scripters the ability to produce polished, interactive dashboards without learning web development, it bridges the gap between raw data and professional presentation.

If you're ready to take your PowerShell reports to the next level, install PSWriteHTML today and explore its possibilities—you might be surprised how quickly you can turn plain text output into a tool your colleagues actually *want* to read.

**🔗 PowerShell Report:** [https://evotec.xyz/advanced-html-reporting-using-powershell/] (https://evotec.xyz/advanced-html-reporting-using-powershell/)

**🔗 GitHub:** [https://github.com/EvotecIT/PSWriteHTML](https://github.com/EvotecIT/PSWriteHTML)

**📦 PowerShell Gallery:** [https://www.powershellgallery.com/packages/PSWriteHTML](https://www.powershellgallery.com/packages/PSWriteHTML)
    `,
  headings: [
    { id: "a-quick-background", text: "A Quick Background", level: 2 },
    { id: "core-features", text: "Core Features", level: 2 },
    { id: "installation", text: "Installation", level: 2 },
    { id: "popular-use-cases", text: "Popular Use Cases", level: 2 },
    { id: "community-feedback", text: "Community Feedback", level: 2 },
    { id: "pro-tips-for-getting-the-most-out-of-pswritehtml", text: "Pro Tips for Getting the Most Out of PSWriteHTML", level: 2 },
    { id: "conclusion", text: "Conclusion", level: 2 },
  ]
};