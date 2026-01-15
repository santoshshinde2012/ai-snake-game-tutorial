# Example 02: With Ruler

This example demonstrates using Ruler for centralized rules management.

## Files Structure

```
02-with-ruler/
├── README.md (this file)
├── .ruler/
│   ├── AGENTS.md (shared rules)
│   └── ruler.toml (configuration)
```

## What's Included

- **Ruler Configuration**: `.ruler/ruler.toml`
- **Shared Rules**: `.ruler/AGENTS.md`
- Project-specific AGENTS.md references ruler rules
- Organization-wide consistency

## Purpose

This setup is ideal for:
- Multiple related projects
- Team development
- Organization standards
- Consistent practices

## Usage

Copy `.ruler/` directory to your project:

```bash
cp -r .ruler/ /your-project/.ruler/
```

Then create a minimal project AGENTS.md that references ruler:

```markdown
# My Project

## Rules
This project follows organization rules from `.ruler/AGENTS.md`.

## Project-Specific Rules
- Additional rules here
```

## Ruler Configuration

The `ruler.toml` file controls:
- Which rules apply
- Priority (local vs ruler)
- File patterns
- Quality thresholds

## Advantages

✅ Centralized rules  
✅ Consistent across projects  
✅ Easy updates  
✅ Project-specific overrides  

## Ruler Features

### Priority Control
```toml
[inheritance]
priority = "local"  # Local rules override
```

### File Patterns
```toml
[rules]
apply_to = ["**/*.js", "**/*.json"]
exclude = ["node_modules/**"]
```

### Quality Gates
```toml
[quality]
test_coverage_min = 80
lint_errors_max = 0
```

## Workflow

1. Define organization rules in `.ruler/AGENTS.md`
2. Configure `ruler.toml`
3. Reference ruler in project AGENTS.md
4. Add project-specific rules

## Migration from Basic Setup

1. Create `.ruler/` directory
2. Move common rules to `.ruler/AGENTS.md`
3. Create `ruler.toml`
4. Simplify project AGENTS.md
5. Reference ruler rules

## Multi-Project Example

```
org/
├── project-a/
│   ├── .ruler/
│   └── AGENTS.md (minimal, references ruler)
├── project-b/
│   ├── .ruler/
│   └── AGENTS.md (minimal, references ruler)
└── ruler-rules/
    └── .ruler/
        └── AGENTS.md (master rules)
```

## Advantages Over Basic Setup

| Feature | Basic | With Ruler |
|---------|-------|------------|
| Centralized rules | ❌ | ✅ |
| Easy updates | ❌ | ✅ |
| Consistency | Manual | Automatic |
| Duplication | High | Low |

## Next Steps

Add Skills for automation:
1. Try [Example 03: With Skills](../03-with-skills/)

## Related Documentation

- [Ruler Guide](../../docs/RULER_GUIDE.md)
- [AGENTS.md Guide](../../docs/AGENTS_MD_GUIDE.md)
- [Tutorial](../../docs/TUTORIAL.md)
