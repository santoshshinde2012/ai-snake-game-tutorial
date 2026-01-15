# Example 03: Complete Ecosystem with Skills

## What This Example Demonstrates

This is the complete AI Agent Ecosystem setup, including:
- **AGENTS.md** - Core project documentation
- **Ruler** - Automated consistency across tools
- **Skills** - Reusable, composable AI agent capabilities

This represents a production-ready configuration for AI-assisted development.

## Files Included

```
.ruler/
├── AGENTS.md          # Core documentation
└── ruler.toml         # Ruler sync configuration

.skills/
└── game-testing/      # Reusable testing skill
    ├── SKILL.md       # Skill documentation
    └── scripts/
        └── run_tests.py
```

## Complete AI Agent Ecosystem

The three components work together:

1. **AGENTS.md** - Provides project context and conventions
2. **Ruler** - Ensures consistency across all AI tools
3. **Skills** - Adds reusable capabilities that agents can invoke

## How to Use All Components Together

### Initial Setup

```bash
# 1. Copy all files to your project
cp -r .ruler/ .skills/ /your/project/

# 2. Install Ruler
cargo install ruler

# 3. Sync documentation to all tools
ruler sync

# 4. Verify everything is working
ruler validate
```

### Daily Workflow

When working with AI agents:

1. **AI reads AGENTS.md** for project context
2. **AI discovers Skills** in `.skills/` directory
3. **AI invokes Skills** when needed (e.g., "run the game-testing skill")
4. **Skills execute** with full project context from AGENTS.md

### Example Interaction

```
Developer: "Add a new collision detection feature"

AI Agent:
1. Reads AGENTS.md to understand project structure
2. Implements the feature following coding standards
3. Discovers game-testing Skill
4. Invokes: "Let me run the game-testing skill to verify"
5. Skill executes tests and reports results
6. AI ensures code coverage remains above 80%
```

## Real-World Workflow Example

### Scenario: Adding a New Feature

1. **Developer prompt**: "Add a pause feature to the game"

2. **AI uses AGENTS.md** to understand:
   - File structure (where to add code)
   - Coding standards (how to write it)
   - Testing requirements (coverage goals)

3. **AI implements the feature**:
   ```javascript
   // In src/game.js
   togglePause() {
     this.isPaused = !this.isPaused;
   }
   ```

4. **AI writes tests**:
   ```javascript
   // In tests/game.test.js
   test('should pause game when togglePause called', () => {
     // Test implementation
   });
   ```

5. **AI invokes game-testing Skill**:
   - Runs all tests
   - Checks coverage
   - Reports results

6. **Ruler ensures consistency**:
   - If AGENTS.md was updated, sync to all tools
   - Validate everything remains in sync

### Scenario: Using a Skill Across Projects

The `game-testing` skill can be reused in other game projects:

```bash
# Copy skill to another project
cp -r .skills/game-testing /other/game/project/.skills/

# Customize if needed
vim /other/game/project/.skills/game-testing/SKILL.md

# AI agents in the new project can now use it
```

## Benefits of the Complete Setup

1. **Context-Aware AI**: Agents understand your project deeply
2. **Consistent Behavior**: Same experience across all AI tools
3. **Reusable Capabilities**: Skills work across projects
4. **Automated Maintenance**: Ruler keeps everything in sync
5. **Team Alignment**: Everyone's AI agents follow the same rules

## Adding More Skills

Create new skills for common tasks:

```bash
# Create a new skill
mkdir -p .skills/deployment
touch .skills/deployment/SKILL.md
touch .skills/deployment/scripts/deploy.sh

# Document the skill
vim .skills/deployment/SKILL.md

# AI agents will automatically discover and use it
```

## CI/CD Integration

Add to your pipeline:

```yaml
- name: Validate Ruler sync
  run: ruler validate

- name: Run Skills validation
  run: |
    for skill in .skills/*/scripts/*.py; do
      python "$skill" --validate
    done
```

## Next Steps

- Adapt this setup to your project's needs
- Create project-specific Skills
- Share Skills across your organization
- Read the [comprehensive guide](../../README.md) for advanced topics
