# Ruler Guide

## What is Ruler?

Ruler is a system for managing centralized rules and conventions across multiple projects. Instead of duplicating AGENTS.md in every repository, Ruler allows you to define shared rules once and reference them everywhere.

## The Problem Ruler Solves

### Without Ruler
```
Project A/
  AGENTS.md (200 lines, 80% duplicated)

Project B/
  AGENTS.md (200 lines, 80% duplicated)

Project C/
  AGENTS.md (200 lines, 80% duplicated)
```

**Issues**:
- Rule duplication
- Inconsistent updates
- Maintenance nightmare
- Rules drift over time

### With Ruler
```
.ruler/
  AGENTS.md (shared rules)
  ruler.toml (configuration)

Project A/
  AGENTS.md (20 lines, project-specific)

Project B/
  AGENTS.md (20 lines, project-specific)

Project C/
  AGENTS.md (20 lines, project-specific)
```

**Benefits**:
- Single source of truth
- Consistent across projects
- Easy to update
- Project-specific overrides

## Installation

### 1. Create Ruler Directory
```bash
mkdir .ruler
```

### 2. Create Configuration
Create `.ruler/ruler.toml`:

```toml
[ruler]
version = "1.0.0"
enabled = true

[rules]
apply_to = ["javascript", "python", "markdown"]

[inheritance]
priority = "local"  # local rules override ruler rules
```

### 3. Create Shared Rules
Create `.ruler/AGENTS.md`:

```markdown
# Organization-Wide Development Rules

## Code Quality Standards
- All code must have tests
- Minimum 80% code coverage
- No compiler/linter warnings

## Documentation
- README.md required
- API documentation for public functions
- Changelog for releases

## Git Practices
- Conventional commits
- Feature branches
- Pull request required
```

## Usage

### Project-Specific AGENTS.md

In each project's root AGENTS.md:

```markdown
# Project Name

## Ruler Rules
This project follows organization-wide rules from `.ruler/AGENTS.md`.

## Project-Specific Rules

### Architecture
- src/game.js - Game logic
- src/renderer.js - Canvas rendering

### Testing
- Jest for unit tests
- 90%+ coverage (stricter than org default)
```

## Configuration Options

### ruler.toml Reference

```toml
[ruler]
version = "1.0.0"          # Ruler version
enabled = true             # Enable/disable ruler
auto_update = false        # Auto-sync from central repo

[rules]
apply_to = ["*"]          # File patterns to apply rules
exclude = ["*.test.js"]   # Patterns to exclude

[inheritance]
priority = "local"        # "local" or "ruler"
merge_strategy = "override" # "override" or "merge"

[sources]
# Optional: Pull rules from remote
central_repo = "https://github.com/org/ruler-rules"
branch = "main"
path = ".ruler/AGENTS.md"
```

## Inheritance Strategies

### Priority: Local

```markdown
Ruler Rule: "80% coverage required"
Local Rule: "90% coverage required"

Result: 90% coverage (local overrides)
```

### Priority: Ruler

```markdown
Ruler Rule: "80% coverage required"
Local Rule: "90% coverage required"

Result: 80% coverage (ruler wins)
```

### Merge Strategy

```markdown
Ruler Rule: "Use ESLint"
Local Rule: "Use Prettier"

Merge: Both ESLint and Prettier apply
Override: Only one applies based on priority
```

## Real-World Example

### Organization Setup

`.ruler/AGENTS.md` (Organization-wide):
```markdown
# Acme Corp Development Standards

## All Projects

### Testing
- Minimum 80% code coverage
- Tests required for all features
- CI must pass before merge

### Code Style
- ESLint for JavaScript
- Prettier for formatting
- No TODO comments in main branch

### Security
- No secrets in code
- Dependency scanning required
- Security updates within 7 days

### Documentation
- README with setup instructions
- API documentation
- Architecture diagrams for complex systems
```

### Project-Specific Rules

`ai-snake-game-tutorial/AGENTS.md`:
```markdown
# AI Snake Game Tutorial

## Ruler Rules
Follows Acme Corp standards from `.ruler/AGENTS.md`.

## Game-Specific Rules

### Architecture
- Pure functions for game logic
- Immutable state updates
- Canvas for rendering

### Testing
- 90% coverage (exceeds org minimum)
- Jest with canvas mocking
- Test all game states

### Code Organization
- src/game.js - Game logic only
- src/renderer.js - Rendering only
- src/input.js - Input handling only
```

## Benefits

### 1. Consistency
All projects follow the same base standards.

### 2. Maintainability
Update once, applies everywhere.

### 3. Flexibility
Projects can override or extend rules.

### 4. Onboarding
New developers learn one set of standards.

### 5. Governance
Enforce organization-wide policies.

## Best Practices

### 1. Keep Ruler Rules General
```markdown
✅ Good: "All code must have tests"
❌ Bad: "Use Jest version 29.7.0"
```

### 2. Document Overrides
```markdown
## Deviations from Ruler

- Coverage: 90% (org standard: 80%)
  Reason: Game logic is critical

- Framework: React (org standard: Vue)
  Reason: Team expertise
```

### 3. Version Your Rules
```markdown
# AGENTS.md v2.0.0

## Changelog
- v2.0.0: Increased coverage to 90%
- v1.5.0: Added security scanning
- v1.0.0: Initial ruleset
```

### 4. Regular Reviews
- Review ruler rules quarterly
- Gather feedback from teams
- Update based on lessons learned

## Common Patterns

### Pattern 1: Technology Standards

`.ruler/AGENTS.md`:
```markdown
## JavaScript Standards
- ES6+ syntax required
- No var keyword
- Async/await over promises.then()
```

### Pattern 2: Quality Gates

`.ruler/AGENTS.md`:
```markdown
## Definition of Done
- [ ] Tests pass
- [ ] Coverage threshold met
- [ ] Linting passes
- [ ] Documentation updated
- [ ] Code reviewed
- [ ] Security scan clean
```

### Pattern 3: Development Workflow

`.ruler/AGENTS.md`:
```markdown
## Workflow
1. Create feature branch
2. Write tests first (TDD)
3. Implement feature
4. Run full test suite
5. Create pull request
6. Address review comments
7. Merge when approved
```

## Integration with CI/CD

### GitHub Actions Example

```yaml
name: Ruler Compliance

on: [push, pull_request]

jobs:
  check-ruler:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Validate Ruler Rules
        run: |
          # Check if .ruler/AGENTS.md exists
          if [ ! -f .ruler/AGENTS.md ]; then
            echo "Missing .ruler/AGENTS.md"
            exit 1
          fi
          
          # Validate ruler.toml
          if [ ! -f .ruler/ruler.toml ]; then
            echo "Missing .ruler/ruler.toml"
            exit 1
          fi
          
          echo "Ruler configuration valid"
```

## Multi-Repository Ruler

For organizations with many repos:

### Central Ruler Repository

```
org-ruler-rules/
├── .ruler/
│   ├── AGENTS.md          (shared rules)
│   ├── javascript.md      (JS-specific)
│   ├── python.md          (Python-specific)
│   └── security.md        (Security rules)
└── ruler.toml
```

### Project Configuration

`ruler.toml`:
```toml
[ruler]
version = "1.0.0"
enabled = true

[sources]
central_repo = "https://github.com/org/ruler-rules"
branch = "main"

[rules.javascript]
enabled = true
source = ".ruler/javascript.md"

[rules.security]
enabled = true
source = ".ruler/security.md"
```

## Troubleshooting

### Rules Not Applied?
1. Check ruler.toml is valid TOML
2. Verify .ruler/AGENTS.md exists
3. Check file paths are correct
4. Verify apply_to patterns match

### Conflicting Rules?
1. Check priority setting
2. Review merge_strategy
3. Document intentional overrides
4. Consider creating exception

### Too Many Rules?
1. Split into multiple files
2. Use categories
3. Make rules more general
4. Archive outdated rules

## Migration Strategy

### Step 1: Audit Current AGENTS.md Files
Identify common patterns across projects.

### Step 2: Create Ruler Rules
Extract common rules to .ruler/AGENTS.md.

### Step 3: Update Projects
Modify project AGENTS.md to reference ruler.

### Step 4: Validate
Ensure AI agents still work correctly.

### Step 5: Monitor
Track consistency across projects.

## Advanced Features

### Conditional Rules

```toml
[rules.testing]
apply_when = "has_tests_directory"
require_coverage = 90

[rules.frontend]
apply_when = "has_package_json"
frameworks = ["react", "vue"]
```

### Rule Templates

```markdown
## Rule Template: Testing

For all projects with a `tests/` directory:
- Minimum {{ coverage_threshold }}% coverage
- Tests run in CI
- {{ test_framework }} preferred
```

## Metrics & Compliance

Track ruler compliance:

```markdown
## Compliance Dashboard

Project A: ✅ 100% compliant
Project B: ⚠️  85% compliant (missing docs)
Project C: ✅ 100% compliant
Project D: ❌ 60% compliant (no tests)
```

## Resources

- [Example Ruler Setup](../examples/02-with-ruler/)
- [AGENTS.md Guide](AGENTS_MD_GUIDE.md)
- [Skills Guide](SKILLS_GUIDE.md)

## Summary

Ruler enables:
- ✅ Centralized rule management
- ✅ Consistent standards
- ✅ Easy maintenance
- ✅ Project flexibility
- ✅ Organization governance

Use Ruler to scale your AI agent ecosystem across multiple projects while maintaining consistency and flexibility.
