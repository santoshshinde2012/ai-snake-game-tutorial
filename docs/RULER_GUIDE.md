# Ruler Guide

A comprehensive guide to setting up and using Ruler for context synchronization across AI tools.

## Table of Contents

1. [What is Ruler?](#what-is-ruler)
2. [Why Use Ruler?](#why-use-ruler)
3. [The Tool Fragmentation Problem](#the-tool-fragmentation-problem)
4. [How Ruler Solves Tool Fragmentation](#how-ruler-solves-tool-fragmentation)
5. [Installation and Setup](#installation-and-setup)
6. [Configuration Explained](#configuration-explained)
7. [Sync Targets](#sync-targets)
8. [Validation Features](#validation-features)
9. [Usage Workflow](#usage-workflow)
10. [Best Practices](#best-practices)
11. [Troubleshooting](#troubleshooting)
12. [Advanced Usage](#advanced-usage)

## What is Ruler?

**Ruler** is a command-line tool that **synchronizes context files** (like AGENTS.md, documentation, and configuration) across multiple AI coding assistants.

Think of it as **"context version control for AI tools"** - ensuring that GitHub Copilot, ChatGPT, Claude, Cursor, and other AI assistants all have the same understanding of your project.

### Core Concept

```
┌──────────────────────────────────────────────┐
│           Your Project Files                 │
│  ┌────────────┐  ┌────────────┐             │
│  │ AGENTS.md  │  │   docs/    │             │
│  └────────────┘  └────────────┘             │
└──────────────┬───────────────────────────────┘
               │
               │ Ruler Sync
               │
       ┌───────┴────────┐
       │                │
   ┌───▼────┐      ┌────▼────┐      ┌────▼────┐
   │Copilot │      │ ChatGPT │      │ Claude  │
   └────────┘      └─────────┘      └─────────┘
     Same            Same              Same
    Context         Context          Context
```

### Key Features

1. **Multi-Target Sync**: Push context to multiple AI tools simultaneously
2. **Validation**: Check context files for completeness and correctness
3. **Watch Mode**: Auto-sync when files change
4. **Selective Sync**: Choose which files to sync to which tools
5. **Dry Run**: Preview changes before syncing
6. **Version Tracking**: Track what's been synced where

## Why Use Ruler?

### The Manual Approach (Without Ruler)

```
Developer's Daily Workflow Without Ruler:

1. Update AGENTS.md
2. Copy-paste to Copilot settings
3. Copy-paste to ChatGPT conversation
4. Copy-paste to Claude conversation
5. Copy-paste to Cursor settings
6. Update docs
7. Repeat steps 2-5 for docs
8. Make a change to AGENTS.md
9. Repeat all steps again...
```

**Time per sync**: 5-10 minutes
**Times per day**: 3-5
**Time wasted per day**: 15-50 minutes
**Errors**: High (forgetting a tool, outdated copies)

### The Ruler Approach

```
Developer's Workflow With Ruler:

1. Update AGENTS.md
2. Run: ruler sync
3. Done! ✓

Time per sync: 5 seconds
Errors: Zero (automated)
Consistency: Perfect
```

### Benefits

#### 1. Time Savings

```
Manual Sync (per update):
├─ Copilot: 2 minutes
├─ ChatGPT: 2 minutes
├─ Claude: 2 minutes
├─ Cursor: 2 minutes
└─ Total: 8 minutes

Ruler Sync (per update):
└─ All tools: 5 seconds

Time saved: 7 min 55 sec per sync
Daily savings (5 syncs): ~40 minutes
Monthly savings: ~13 hours
```

#### 2. Consistency

All tools get **exactly the same context**, eliminating:
- Version drift between tools
- Outdated information in some tools
- Copy-paste errors
- Forgotten updates

#### 3. Confidence

```
Before Ruler:
"Did I update ChatGPT? Was that the latest version?
Let me check... oh, I forgot Copilot."

After Ruler:
"ruler sync → Done. All tools up-to-date."
```

#### 4. Workflow Integration

```bash
# Git pre-commit hook
if git diff --cached AGENTS.md; then
  ruler sync --auto
fi
```

Automatically keep tools in sync with your code changes.

## The Tool Fragmentation Problem

### Multiple AI Tools

Modern developers use **multiple AI coding assistants**:

```
Your AI Toolbox:

┌─────────────────────────────────────────┐
│ GitHub Copilot                          │
│ • Inline suggestions                    │
│ • Code completion                       │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ ChatGPT / GPT-4                         │
│ • Complex problem solving               │
│ • Architecture discussions              │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ Claude                                  │
│ • Long-form code generation             │
│ • Documentation writing                 │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ Cursor / Windsurf                       │
│ • AI-powered IDE                        │
│ • Multi-file editing                    │
└─────────────────────────────────────────┘
```

Each tool excels at different tasks, so you use them all.

### Context Fragmentation

**Problem**: Each tool has **separate context**:

```
┌────────────────┐     ┌────────────────┐     ┌────────────────┐
│   Copilot      │     │    ChatGPT     │     │    Claude      │
│                │     │                │     │                │
│  Context:      │     │  Context:      │     │  Context:      │
│  • Version 1.0 │     │  • Version 1.2 │     │  • Version 0.9 │
│  • Updated     │     │  • Updated     │     │  • Updated     │
│    Jan 5       │     │    Jan 10      │     │    Dec 28      │
└────────────────┘     └────────────────┘     └────────────────┘
     Different             Different             Different
```

**Consequences**:

1. **Inconsistent Suggestions**: Each tool gives different advice
2. **Conflicting Patterns**: Tool A says use classes, Tool B says use functions
3. **Outdated Context**: Some tools have old conventions
4. **Wasted Time**: Manually updating each tool
5. **Confusion**: "Why did Copilot suggest X but ChatGPT suggest Y?"

### Real-World Example

```
Scenario: You change your testing convention

Old convention: tests/[name].test.js
New convention: __tests__/[name].spec.js

Update AGENTS.md → Sync to all tools?

Without Ruler:
├─ Update Copilot settings (manual)
├─ Tell ChatGPT in conversation (manual)
├─ Tell Claude in conversation (manual)
├─ Update Cursor settings (manual)
└─ Time: 10 minutes, Error-prone

With Ruler:
├─ Run: ruler sync
└─ Time: 5 seconds, Automatic, Reliable
```

### Context Drift Over Time

```
Day 1:  All tools synced ✓
Day 5:  Updated AGENTS.md, forgot to sync Claude ✗
Day 10: Updated docs, only synced ChatGPT ✗
Day 15: Added new patterns, synced manually (errors) ✗
Day 20: Context chaos - tools disagree on everything ✗

With Ruler:
Every day: ruler sync ✓
Result: Perfect consistency ✓
```

## How Ruler Solves Tool Fragmentation

### 1. Single Source of Truth

```
Traditional Approach:
Context in multiple places, manually maintained

┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐
│Tool 1   │  │Tool 2   │  │Tool 3   │  │Tool 4   │
│Context  │  │Context  │  │Context  │  │Context  │
└─────────┘  └─────────┘  └─────────┘  └─────────┘
   v1.0         v1.1         v0.9         ???

Ruler Approach:
One source, automatically distributed

     ┌─────────────────┐
     │  AGENTS.md      │
     │  (Source)       │
     └────────┬────────┘
              │
              │ Ruler Sync
              │
    ┌─────────┼─────────┬─────────┐
    ▼         ▼         ▼         ▼
┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐
│Tool 1   │ │Tool 2   │ │Tool 3   │ │Tool 4   │
│v1.0     │ │v1.0     │ │v1.0     │ │v1.0     │
└─────────┘ └─────────┘ └─────────┘ └─────────┘
  All identical, always current
```

### 2. Automated Distribution

```bash
# One command updates all tools
$ ruler sync

Syncing context...
✓ GitHub Copilot updated
✓ ChatGPT profile updated
✓ Claude profile updated
✓ Cursor settings updated

All tools synced successfully!
```

### 3. Validation

```bash
# Check context quality before syncing
$ ruler validate

Validating AGENTS.md...
✓ Has project overview
✓ Has file structure
✓ Has conventions
⚠ Missing: Common tasks section
⚠ TODO: Add testing examples

Score: 8/10 (Good)
```

### 4. Selective Syncing

```toml
# ruler.toml
[[sync]]
source = "AGENTS.md"
targets = ["copilot", "chatgpt", "claude"]

[[sync]]
source = "docs/API.md"
targets = ["chatgpt", "claude"]  # Only for detailed work

[[sync]]
source = "docs/QUICKSTART.md"
targets = ["copilot"]  # For quick inline help
```

Different content for different tools based on their strengths.

### 5. Version Tracking

```bash
$ ruler status

Context Status:
┌──────────────┬─────────────┬────────────────┐
│ Tool         │ Last Synced │ Version        │
├──────────────┼─────────────┼────────────────┤
│ Copilot      │ 2 hours ago │ v1.0 (current) │
│ ChatGPT      │ 5 min ago   │ v1.0 (current) │
│ Claude       │ 1 day ago   │ v0.9 (outdated)│
│ Cursor       │ 2 hours ago │ v1.0 (current) │
└──────────────┴─────────────┴────────────────┘

⚠ Claude needs sync!
Run: ruler sync claude
```

## Installation and Setup

### Prerequisites

```bash
# Check Node.js version
node --version  # Should be 16+

# Check npm version
npm --version   # Should be 8+
```

### Installation

#### Option 1: Global Install (Recommended)

```bash
npm install -g ruler-sync
```

Verify installation:
```bash
ruler --version
```

#### Option 2: Project-Local Install

```bash
# In your project
npm install --save-dev ruler-sync
```

Use with npx:
```bash
npx ruler sync
```

#### Option 3: From Source

```bash
git clone https://github.com/ruler-tool/ruler.git
cd ruler
npm install
npm link
```

### Initial Setup

#### 1. Initialize Configuration

```bash
cd your-project
ruler init
```

This creates `ruler.toml` with defaults:

```toml
# ruler.toml
version = "1.0"
project = "my-project"

[[sync]]
source = "AGENTS.md"
targets = ["copilot"]

[validation]
require_overview = true
require_structure = true
require_conventions = true
```

#### 2. Configure Targets

Edit `ruler.toml` to add your AI tools:

```toml
[[sync]]
source = "AGENTS.md"
targets = [
  "copilot",
  "chatgpt",
  "claude",
  "cursor"
]
```

#### 3. First Sync

```bash
ruler sync --dry-run  # Preview
ruler sync            # Actually sync
```

### Project Structure

```
your-project/
├── AGENTS.md         # Context file
├── ruler.toml        # Ruler configuration
├── .ruler/           # Ruler state (auto-created)
│   ├── sync-log.json
│   └── version.json
├── src/
└── docs/
```

Add to `.gitignore`:
```
.ruler/sync-log.json  # Optional: Sync history
```

Keep in git:
```
ruler.toml            # Configuration
AGENTS.md             # Context
```

## Configuration Explained

### Complete Example

```toml
# ruler.toml

# Project metadata
version = "1.0"
project = "ai-snake-game"
description = "Snake game with AI-assisted development"

# ==================
# Sync Configuration
# ==================

# Primary context (all tools)
[[sync]]
source = "AGENTS.md"
targets = ["copilot", "chatgpt", "claude", "cursor"]
priority = 1

# Detailed architecture (for deep work)
[[sync]]
source = "docs/ARCHITECTURE.md"
targets = ["chatgpt", "claude"]
priority = 2

# Quick reference (for inline help)
[[sync]]
source = "docs/QUICKSTART.md"
targets = ["copilot", "cursor"]
priority = 3

# API documentation (for API work)
[[sync]]
source = "docs/API.md"
targets = ["chatgpt", "claude"]
when = "api/**/*.js"  # Only when working on API

# ==================
# Validation Rules
# ==================

[validation]
require_overview = true
require_structure = true
require_conventions = true
require_commands = true
min_length = 100          # Min 100 lines
max_length = 2000         # Max 2000 lines
check_todos = true        # Warn on TODOs
check_outdated = true     # Warn on old dates

# ==================
# Watch Mode
# ==================

[watch]
enabled = false
files = ["AGENTS.md", "docs/**/*.md"]
debounce = 500  # ms

# ==================
# Output Settings
# ==================

[output]
format = "pretty"  # "pretty" | "json" | "quiet"
color = true
timestamps = true
```

### Configuration Sections

#### Project Metadata

```toml
version = "1.0"        # Config version
project = "my-app"     # Project name
description = "..."    # Optional description
```

#### Sync Blocks

Each `[[sync]]` block defines a source-to-targets mapping:

```toml
[[sync]]
source = "AGENTS.md"                    # File to sync
targets = ["copilot", "chatgpt"]        # Where to sync
priority = 1                            # Sync order (1 = first)
when = "src/**/*.js"                    # Conditional (optional)
```

**Parameters**:

- `source`: Path to file (relative to project root)
- `targets`: Array of tool identifiers
- `priority`: Integer (lower = higher priority)
- `when`: Glob pattern (sync only when matching files change)

#### Validation Configuration

```toml
[validation]
require_overview = true      # Must have overview section
require_structure = true     # Must have structure section
require_conventions = true   # Must have conventions section
require_commands = true      # Must have commands section
min_length = 100            # Minimum lines
max_length = 2000           # Maximum lines
check_todos = true          # Warn on TODO markers
check_outdated = true       # Warn on old dates
fail_on_warnings = false    # Fail sync if warnings
```

#### Watch Mode

```toml
[watch]
enabled = true                      # Auto-sync on file changes
files = ["AGENTS.md", "docs/**"]    # Files to watch
debounce = 500                      # Wait 500ms before sync
auto_commit = false                 # Auto-git-commit on sync
```

#### Output Settings

```toml
[output]
format = "pretty"      # "pretty" | "json" | "quiet"
color = true           # Use colors in terminal
timestamps = true      # Show timestamps
verbose = false        # Extra logging
```

### Environment Variables

Override config with environment variables:

```bash
# Override target
RULER_TARGETS="copilot,chatgpt" ruler sync

# Override format
RULER_FORMAT="json" ruler sync

# Dry run
RULER_DRY_RUN=true ruler sync
```

## Sync Targets

### Supported Targets

#### GitHub Copilot

```toml
targets = ["copilot"]
```

Syncs to:
- `~/.config/github-copilot/context/` (Linux/Mac)
- `%APPDATA%\GitHub Copilot\context\` (Windows)

Copilot reads context from these files for inline suggestions.

#### ChatGPT

```toml
targets = ["chatgpt"]
```

Syncs to:
- OpenAI Custom Instructions (via API)
- Local clipboard (for manual paste)

Requires API key:
```bash
export OPENAI_API_KEY="sk-..."
ruler sync chatgpt
```

#### Claude

```toml
targets = ["claude"]
```

Syncs to:
- Anthropic Project Context (via API)
- Local clipboard (for manual paste)

Requires API key:
```bash
export ANTHROPIC_API_KEY="sk-ant-..."
ruler sync claude
```

#### Cursor

```toml
targets = ["cursor"]
```

Syncs to:
- `~/.cursor/context/` (Cursor's context directory)

Cursor automatically reads from this location.

#### Windsurf

```toml
targets = ["windsurf"]
```

Syncs to:
- `~/.windsurf/context/`

#### Custom Targets

Define your own target:

```toml
[[sync]]
source = "AGENTS.md"
targets = ["my-custom-tool"]

[targets.my-custom-tool]
type = "file"
path = "~/.my-tool/context.md"
```

### Target-Specific Configuration

```toml
# Copilot: Short context for inline help
[[sync]]
source = "AGENTS.md"
targets = ["copilot"]
transform = "summarize"    # Use summarized version
max_length = 500          # Limit to 500 lines

# ChatGPT: Full context for problem-solving
[[sync]]
source = "AGENTS.md"
targets = ["chatgpt"]
transform = "full"         # Full content
include_examples = true    # Include all examples

# Claude: Focus on architecture
[[sync]]
source = ["AGENTS.md", "docs/ARCHITECTURE.md"]
targets = ["claude"]
merge = true              # Merge into one context
```

### API Authentication

#### Setup API Keys

```bash
# OpenAI (ChatGPT)
export OPENAI_API_KEY="sk-..."

# Anthropic (Claude)
export ANTHROPIC_API_KEY="sk-ant-..."

# Or in .env file
echo "OPENAI_API_KEY=sk-..." >> .env
echo "ANTHROPIC_API_KEY=sk-ant-..." >> .env
```

#### Verify Authentication

```bash
ruler auth check

✓ GitHub Copilot: Configured (file-based)
✓ ChatGPT: Authenticated (API key valid)
✓ Claude: Authenticated (API key valid)
✗ Cursor: Not configured
```

## Validation Features

### Basic Validation

```bash
ruler validate
```

Checks:
- ✓ File exists
- ✓ Not empty
- ✓ Valid markdown
- ✓ Has required sections
- ✓ Length within bounds

Output:
```
Validating AGENTS.md...

✓ File exists
✓ Valid markdown syntax
✓ Has project overview
✓ Has file structure
✓ Has conventions
✓ Has commands
⚠ Missing: Common tasks section
✓ Length: 450 lines (within bounds)
✓ No TODOs found

Score: 9/10 (Excellent)
```

### Strict Validation

```bash
ruler validate --strict
```

Fails on warnings:
```
Validating AGENTS.md...

✓ File exists
✓ Valid markdown
⚠ TODO found on line 42
✗ Outdated date reference: "Updated Jan 2023"

Validation failed! Fix warnings before syncing.
```

### Custom Rules

```toml
[validation.custom]
require_sections = [
  "Project Overview",
  "File Structure",
  "Conventions",
  "For AI Assistants"
]

forbidden_words = [
  "TODO",
  "FIXME",
  "HACK"
]

required_keywords = [
  "architecture",
  "testing",
  "conventions"
]
```

### Validation in CI

```yaml
# .github/workflows/validate-context.yml
name: Validate Context

on: [push, pull_request]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install -g ruler-sync
      - run: ruler validate --strict
```

Fails PR if AGENTS.md is invalid.

## Usage Workflow

### Daily Development Workflow

```bash
# Morning: Start work
cd project
ruler status          # Check sync status

# During day: Make changes
vim AGENTS.md         # Edit context
ruler validate        # Check changes
ruler sync --dry-run  # Preview sync
ruler sync            # Actually sync

# Before commit
ruler validate --strict
git add AGENTS.md ruler.toml
git commit -m "Update context"
```

### Watch Mode Workflow

```bash
# Terminal 1: Watch and auto-sync
ruler watch

# Terminal 2: Edit files
vim AGENTS.md
# ... save ...
# → Ruler automatically syncs!

# Terminal 1 shows:
File changed: AGENTS.md
Syncing...
✓ All tools updated
```

### Team Workflow

```bash
# Developer A
git pull
ruler sync            # Get team's latest context

# ... do work ...

# Developer B
git pull
ruler sync            # Same context as A

# Result: Team has consistent AI context
```

### Multi-Project Workflow

```bash
# Project 1
cd ~/projects/app1
ruler sync

# Project 2
cd ~/projects/app2
ruler sync

# Both projects have proper context in their tools
```

### CI/CD Integration

```yaml
# .github/workflows/sync-context.yml
name: Sync AI Context

on:
  push:
    branches: [main]
    paths:
      - 'AGENTS.md'
      - 'docs/**'

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm install -g ruler-sync
      - run: ruler validate --strict
      - run: ruler sync --all
        env:
          OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
```

Automatically syncs when context files change.

## Best Practices

### 1. Sync Frequently

```bash
# Good: Sync after every AGENTS.md change
vim AGENTS.md
ruler sync

# Better: Use watch mode
ruler watch  # Auto-syncs on changes
```

### 2. Validate Before Syncing

```bash
# Always validate first
ruler validate && ruler sync
```

Prevent syncing broken context.

### 3. Use Git Hooks

```bash
# .git/hooks/pre-commit
#!/bin/bash

if git diff --cached --name-only | grep -q "AGENTS.md"; then
  echo "AGENTS.md changed, validating..."
  ruler validate --strict || exit 1
  
  echo "Syncing context..."
  ruler sync
fi
```

### 4. Document Sync Strategy

```markdown
# README.md

## AI Context

This project uses Ruler for AI context sync.

After updating AGENTS.md:
\`\`\`bash
ruler sync
\`\`\`

See [RULER_GUIDE.md](docs/RULER_GUIDE.md) for details.
```

### 5. Version Your Config

```bash
git add ruler.toml
git commit -m "Add Ruler configuration"
```

Team shares the same sync setup.

### 6. Selective Syncing

```bash
# Sync only specific tool
ruler sync copilot

# Sync only specific file
ruler sync --source=AGENTS.md

# Sync only high-priority items
ruler sync --priority=1
```

### 7. Test After Syncing

```bash
# Sync
ruler sync

# Verify with AI tool
copilot suggest "add a new feature"
# → Check if suggestion follows conventions
```

### 8. Keep Logs

```toml
[output]
log_file = ".ruler/sync-log.txt"
keep_history = true
max_history = 100
```

Track what was synced when.

### 9. Team Conventions

```markdown
# CONTRIBUTING.md

## Updating AI Context

1. Edit AGENTS.md
2. Run `ruler validate`
3. Fix any warnings
4. Run `ruler sync`
5. Commit AGENTS.md and ruler.toml together
```

### 10. Monitor Sync Status

```bash
# Add to shell prompt
# .bashrc / .zshrc

function ruler_status() {
  if [ -f "ruler.toml" ]; then
    ruler status --quiet || echo "⚠"
  fi
}

PS1='$(ruler_status) $ '
```

Shows warning if context out of sync.

## Troubleshooting

### Issue: Sync Fails

```
Error: Failed to sync to copilot
```

**Solution**:
```bash
# Check config
ruler validate-config

# Check target accessibility
ruler auth check copilot

# Try dry run
ruler sync --dry-run --verbose
```

### Issue: API Authentication Fails

```
Error: Invalid API key for chatgpt
```

**Solution**:
```bash
# Check API key
echo $OPENAI_API_KEY

# Set API key
export OPENAI_API_KEY="sk-..."

# Verify
ruler auth check chatgpt
```

### Issue: File Not Found

```
Error: Source file not found: AGENTS.md
```

**Solution**:
```bash
# Check path (relative to project root)
ls AGENTS.md

# Or use absolute path
ruler sync --source=/full/path/to/AGENTS.md
```

### Issue: Validation Fails

```
⚠ Missing required section: Conventions
```

**Solution**:
Add missing section to AGENTS.md:
```markdown
## Conventions

- Use ES6 modules
- Follow PascalCase for classes
- Use Jest for testing
```

### Issue: Context Too Large

```
Warning: Context exceeds 2000 lines
```

**Solution**:
```toml
# Option 1: Increase limit
[validation]
max_length = 5000

# Option 2: Split context
[[sync]]
source = "AGENTS.md"
targets = ["copilot"]

[[sync]]
source = "docs/ARCHITECTURE.md"
targets = ["chatgpt", "claude"]
```

### Issue: Watch Mode Not Working

```
ruler watch
# No auto-sync happening
```

**Solution**:
```bash
# Check watch config
grep -A 5 "\[watch\]" ruler.toml

# Enable if disabled
[watch]
enabled = true
files = ["AGENTS.md"]
```

### Issue: Outdated Tool Context

```bash
ruler status
# Shows: Copilot (2 days ago)
```

**Solution**:
```bash
# Force sync specific tool
ruler sync copilot --force

# Or sync all
ruler sync --all
```

### Issue: Merge Conflicts

```
CONFLICT in ruler.toml
```

**Solution**:
```bash
# Accept team's version
git checkout --theirs ruler.toml

# Re-sync
ruler sync
```

## Advanced Usage

### Transformations

Apply transformations before syncing:

```toml
[[sync]]
source = "AGENTS.md"
targets = ["copilot"]
transform = "summarize"

[transforms.summarize]
type = "script"
command = "scripts/summarize.js"
```

```javascript
// scripts/summarize.js
const content = process.stdin.read();
const summary = extractMainPoints(content);
console.log(summary);
```

### Conditional Syncing

```toml
[[sync]]
source = "docs/API.md"
targets = ["chatgpt"]
when = "src/api/**/*.js"  # Only when API files change
```

### Multi-Source Merging

```toml
[[sync]]
sources = [
  "AGENTS.md",
  "docs/ARCHITECTURE.md",
  "docs/CONVENTIONS.md"
]
targets = ["claude"]
merge = true
separator = "\n\n---\n\n"
```

### Template Variables

```markdown
# AGENTS.md

Project: {{project.name}}
Version: {{project.version}}
Last Updated: {{date.now}}
```

```toml
[variables]
project.name = "My App"
project.version = "1.0.0"
```

### Custom Validators

```javascript
// .ruler/validators/custom.js
module.exports = {
  validate(content) {
    if (!content.includes('## Testing')) {
      return {
        valid: false,
        message: 'Missing Testing section'
      };
    }
    return { valid: true };
  }
};
```

```toml
[validation.custom]
validators = [".ruler/validators/custom.js"]
```

### Distributed Teams

```toml
# ruler.toml

[[sync]]
source = "AGENTS.md"
targets = ["team-shared"]

[targets.team-shared]
type = "s3"
bucket = "team-ai-context"
prefix = "projects/my-app/"
```

Team members sync from shared S3 bucket.

### Metrics and Analytics

```bash
ruler metrics

Sync Statistics (Last 30 Days):
┌──────────────┬───────────┬──────────────┐
│ Tool         │ Syncs     │ Avg Duration │
├──────────────┼───────────┼──────────────┤
│ Copilot      │ 47        │ 0.2s         │
│ ChatGPT      │ 35        │ 1.5s         │
│ Claude       │ 28        │ 1.8s         │
└──────────────┴───────────┴──────────────┘

Total syncs: 110
Success rate: 99.1%
```

---

## Summary

**Ruler** solves the AI tool fragmentation problem by:

✅ **Automating** context synchronization
✅ **Ensuring** consistency across tools
✅ **Validating** context quality
✅ **Tracking** sync status
✅ **Saving** time and reducing errors

### Quick Start

```bash
# 1. Install
npm install -g ruler-sync

# 2. Initialize
ruler init

# 3. Configure targets
vim ruler.toml

# 4. Sync
ruler sync
```

### Key Commands

```bash
ruler init          # Initialize configuration
ruler sync          # Sync context to all tools
ruler validate      # Validate context files
ruler status        # Check sync status
ruler watch         # Auto-sync on changes
ruler auth check    # Verify authentication
```

### Integration Checklist

- [ ] Install Ruler
- [ ] Create ruler.toml
- [ ] Configure targets
- [ ] Set up API keys (if needed)
- [ ] Test sync: `ruler sync --dry-run`
- [ ] Actual sync: `ruler sync`
- [ ] Add to git hooks
- [ ] Document for team

**With Ruler, your AI tools always have consistent, up-to-date context - making them more effective teammates.**
