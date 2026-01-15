# Example 03: With Skills

This example demonstrates the complete AI Agent Ecosystem with Ruler and Skills.

## Files Structure

```
03-with-skills/
├── README.md (this file)
├── .ruler/
│   └── AGENTS.md (shared rules)
└── .skills/
    └── game-testing/
        ├── SKILL.md (skill documentation)
        └── scripts/
            └── run_tests.py (automation)
```

## What's Included

- **Ruler**: Centralized rules management
- **Skills**: Reusable automation capabilities
- **Complete Ecosystem**: Full AI agent support

## Purpose

This setup is ideal for:
- Large projects
- Team collaboration
- Automated workflows
- Professional development

## Usage

Copy both `.ruler/` and `.skills/` to your project:

```bash
cp -r .ruler/ /your-project/.ruler/
cp -r .skills/ /your-project/.skills/
```

Reference both in your AGENTS.md:

```markdown
# My Project

## Rules
Follows rules from `.ruler/AGENTS.md`.

## Available Skills
- **game-testing**: Automated testing with coverage
  Usage: "Use game-testing skill to run tests"
```

## Skills Available

### game-testing
- Automated test execution
- Coverage reporting
- Threshold validation
- CI/CD integration

Usage:
```
AI Agent: Use game-testing skill to run tests with 95% coverage
```

## Advantages

✅ Centralized rules (Ruler)  
✅ Reusable automation (Skills)  
✅ Consistent workflows  
✅ Team scalability  
✅ Professional setup  

## Complete Workflow

### 1. Agent Receives Task
"Add new feature to game"

### 2. Agent Checks Rules
Reads `.ruler/AGENTS.md` for:
- Coding standards
- Testing requirements
- Documentation needs

### 3. Agent Implements
Follows established patterns

### 4. Agent Uses Skill
"Use game-testing skill to validate"

### 5. Skill Executes
- Runs tests automatically
- Checks coverage
- Reports results

### 6. Agent Responds
"Feature implemented with 95% coverage"

## Creating Custom Skills

### Skill Structure
```
.skills/
└── my-skill/
    ├── SKILL.md          # Documentation
    ├── scripts/          # Automation
    │   └── run.py
    └── config/           # Configuration (optional)
```

### Skill Documentation
```markdown
# My Skill

## Description
What this skill does

## Usage
How to invoke it

## Requirements
What's needed

## Examples
Concrete usage examples
```

### Automation Script
```python
#!/usr/bin/env python3
import subprocess
import sys

def main():
    # Your automation logic
    result = subprocess.run(['command'], capture_output=True)
    sys.exit(result.returncode)

if __name__ == "__main__":
    main()
```

## Skill Composition

Combine multiple skills:

```markdown
## Development Workflow

1. Use game-testing skill
   - Validates tests pass
   
2. Use lint-code skill
   - Ensures style compliance
   
3. Use build-project skill
   - Creates production build
   
4. Use deploy-game skill
   - Deploys to hosting
```

## Benefits Over Previous Examples

| Feature | Basic | With Ruler | With Skills |
|---------|-------|------------|-------------|
| Centralized rules | ❌ | ✅ | ✅ |
| Automation | ❌ | ❌ | ✅ |
| Reusability | ❌ | Partial | ✅ |
| Team scale | Poor | Good | Excellent |
| Consistency | Manual | Semi-auto | Automatic |

## Integration with CI/CD

Skills can be used in CI pipelines:

```yaml
# .github/workflows/test.yml
- name: Run Tests
  run: python .skills/game-testing/scripts/run_tests.py
```

## Skill Discovery

AI agents can discover available skills:

```markdown
## Available Skills

List all skills:
- **game-testing**: `.skills/game-testing/`
- **lint-code**: `.skills/lint-code/`
- **generate-docs**: `.skills/generate-docs/`

Each skill has a SKILL.md with usage instructions.
```

## Best Practices

### 1. Single Responsibility
Each skill does one thing well

### 2. Clear Documentation
Every skill has comprehensive SKILL.md

### 3. Error Handling
Skills report errors clearly

### 4. Configurability
Skills accept parameters

### 5. Composability
Skills work together

## Migration Path

### From Basic Setup
1. Add `.ruler/` for centralized rules
2. Add `.skills/` for automation
3. Update AGENTS.md to reference both

### From Ruler Only
1. Identify repetitive tasks
2. Create skills for automation
3. Document in SKILL.md
4. Reference in AGENTS.md

## Real-World Example

```markdown
# AI Snake Game Tutorial

## Rules
Follows `.ruler/AGENTS.md` for organization standards.

## Project Rules
- Game logic must be pure functions
- 90% test coverage (higher than org minimum)

## Available Skills

### game-testing
Run comprehensive test suite
Usage: "Use game-testing skill"

### lint-code  
Check code style and quality
Usage: "Use lint-code skill"

## Workflow
1. Implement feature
2. Use game-testing skill to validate
3. Use lint-code skill to verify style
4. Commit changes
```

## Advanced Features

### Skill Parameters
```
Use game-testing skill with 95% coverage threshold
```

### Conditional Skills
```
If tests pass:
  Use deploy-game skill
Else:
  Report failures
```

### Skill Chaining
```
Use game-testing skill then lint-code skill then build-project skill
```

## Related Documentation

- [Skills Guide](../../docs/SKILLS_GUIDE.md)
- [Ruler Guide](../../docs/RULER_GUIDE.md)
- [AGENTS.md Guide](../../docs/AGENTS_MD_GUIDE.md)
- [Tutorial](../../docs/TUTORIAL.md)
- [Architecture](../../docs/ARCHITECTURE.md)

## Summary

This example shows the complete AI Agent Ecosystem:
- ✅ Centralized rules (Ruler)
- ✅ Reusable automation (Skills)
- ✅ Consistent workflows
- ✅ Professional development environment

Perfect for teams and production projects!
