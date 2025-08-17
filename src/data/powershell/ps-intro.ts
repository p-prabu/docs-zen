import { BlogPost } from '../blog-posts';

export const psIntro: BlogPost = {
  id: "ps-intro",
  title: "Introduction to PowerShell",
  category: "powershell",
  body: `

  _Published: Aug 02, 2025_
PowerShell is a powerful command-line shell and scripting language designed for system administration and automation. This guide covers the fundamentals of PowerShell for IT professionals.

## What is PowerShell?

PowerShell is a task automation and configuration management framework from Microsoft, consisting of:

- **Command-line Shell**: Interactive command-line interface
- **Scripting Language**: Powerful scripting capabilities for automation
- **Object-oriented**: Works with .NET objects, not just text
- **Cross-platform**: Available on Windows, Linux, and macOS

### Key Features

- **Cmdlets**: Built-in commands that follow verb-noun syntax
- **Pipeline**: Chain commands together to process data
- **Modules**: Extend functionality with additional commands
- **Remote Management**: Execute commands on remote systems

## Getting Started

### Basic Commands
- Get-Help - Display help information
- Get-Command - List available commands
- Get-Process - List running processes
- Get-Service - List system services

### PowerShell ISE and VS Code
Integrated development environments for writing and testing PowerShell scripts.
    `,
  headings: [
    { id: "what-is-powershell", text: "What is PowerShell?", level: 2 },
    { id: "key-features", text: "Key Features", level: 3 },
    { id: "getting-started", text: "Getting Started", level: 2 },
  ]
};