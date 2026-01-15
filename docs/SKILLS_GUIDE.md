# Agent Skills Guide

A comprehensive guide to understanding, creating, and using Agent Skills for AI-assisted development.

## Table of Contents

1. [What are Agent Skills?](#what-are-agent-skills)
2. [Why Use Agent Skills?](#why-use-agent-skills)
3. [The Limited Capabilities Problem](#the-limited-capabilities-problem)
4. [How Agent Skills Solve Limited Capabilities](#how-agent-skills-solve-limited-capabilities)
5. [Skill Structure](#skill-structure)
6. [Creating Custom Skills](#creating-custom-skills)
7. [The game-testing Skill Walkthrough](#the-game-testing-skill-walkthrough)
8. [Skill Discovery and Usage](#skill-discovery-and-usage)
9. [Best Practices](#best-practices)
10. [Advanced Patterns](#advanced-patterns)
11. [Skill Library Organization](#skill-library-organization)
12. [Testing Skills](#testing-skills)

## What are Agent Skills?

**Agent Skills** are **reusable capability modules** that extend what AI coding assistants can do. Think of them as **"plugins for AI agents"** - packaged knowledge and procedures that teach AI assistants how to perform complex, project-specific tasks.

### Core Concept

```
Standard AI Assistant:
┌─────────────────────────────────────┐
│ General Knowledge                   │
│ • Write code                        │
│ • Explain concepts                  │
│ • Debug errors                      │
└─────────────────────────────────────┘
       ↓ Limited to general tasks

AI Assistant + Skills:
┌─────────────────────────────────────┐
│ General Knowledge                   │
│ + Custom Skills                     │
│   ├─ Test game mechanics           │
│   ├─ Validate architecture         │
│   ├─ Generate documentation        │
│   ├─ Analyze performance           │
│   └─ Deploy to production          │
└─────────────────────────────────────┘
       ↓ Project-specific capabilities
```

### What Makes a Skill?

A skill contains:

1. **YAML Frontmatter**: Metadata about the skill
2. **Instructions**: Step-by-step procedures
3. **Examples**: How to use the skill
4. **Context**: Project-specific knowledge
5. **Validation**: Success criteria

```
┌────────────────────────────────────┐
│        Agent Skill File            │
│    (e.g., game-testing.md)         │
├────────────────────────────────────┤
│ ---                                │  ← YAML Frontmatter
│ name: game-testing                 │
│ description: Test game mechanics   │
│ version: 1.0                       │
│ ---                                │
│                                    │
│ # Game Testing Skill               │  ← Markdown Content
│                                    │
│ ## Purpose                         │
│ Test snake game mechanics...       │
│                                    │
│ ## Steps                           │
│ 1. Run tests                       │
│ 2. Open game in browser            │
│ 3. Verify visually                 │
│                                    │
│ ## Success Criteria                │
│ - All tests pass                   │
│ - No console errors                │
└────────────────────────────────────┘
```

## Why Use Agent Skills?

### The Problem: Repetitive Complex Tasks

Without skills, you repeatedly explain the same complex procedures:

```
Developer: "Test the game"

AI: "How do you test it?"

Developer: "Run npm test, then open index.html, 
check for errors, verify snake movement works,
check collision detection, verify scoring..."

Next day:

Developer: "Test the game"

AI: "How do you test it?"  ← Asks again!

Developer: *sigh* "Run npm test..."  ← Repeat explanation
```

### With Skills

```
Developer: "Use game-testing skill"

AI: *reads skill*
    "Running tests with npm test...
     ✓ All tests pass
     Opening index.html...
     ✓ No console errors
     Testing snake movement...
     ✓ Movement works
     Testing collision detection...
     ✓ Collisions work
     Testing scoring...
     ✓ Scoring works
     
     All checks passed!"
```

### Benefits

#### 1. **Consistency**

Same procedure, every time:
```
Without skills: Manual, error-prone
With skills: Automated, consistent
```

#### 2. **Knowledge Preservation**

Complex procedures documented once:
```
Senior dev knowledge → Skill → Available to AI → Available to everyone
```

#### 3. **Productivity**

```
Time per complex task:
- Without skills: 5-15 minutes (explaining + doing)
- With skills: 30 seconds (invoke skill)

Daily savings: 30-60 minutes
```

#### 4. **Onboarding**

New team members (human or AI) get instant access to best practices.

#### 5. **Quality**

Skills enforce best practices:
- Checklists ensure nothing is forgotten
- Validation steps catch errors
- Success criteria define "done"

## The Limited Capabilities Problem

### AI Limitations

AI assistants are powerful but have limitations:

#### 1. **No Memory of Past Procedures**

```
Session 1:
Developer: "Here's how to test: [long explanation]"
AI: "Got it!" 
*performs task*

Session 2 (new chat):
Developer: "Test the game"
AI: "How should I test it?"  ← Forgot!
```

#### 2. **No Project-Specific Knowledge**

```
AI knows: How to write tests (general)
AI doesn't know: How to test YOUR game (specific)
```

#### 3. **No Complex Workflows**

```
Task: "Deploy to production"

Requires:
1. Run tests
2. Build assets
3. Update version
4. Create git tag
5. Push to registry
6. Deploy to server
7. Verify deployment
8. Rollback if issues

AI: "Um... I'll try step 1?"
```

#### 4. **No Validation**

```
AI: "I did the thing!"
Developer: "Did you check X?"
AI: "Oh... no, let me do that..."
Developer: "What about Y and Z?"
AI: "Oh... those too..."
```

### Real-World Impact

```
Typical Development Day Without Skills:

┌─────────────────────┬──────────────────┐
│ Task                │ Time Explaining  │
├─────────────────────┼──────────────────┤
│ Test feature        │ 5 min            │
│ Deploy to staging   │ 10 min           │
│ Generate docs       │ 5 min            │
│ Validate PR         │ 8 min            │
│ Performance check   │ 7 min            │
│ Update dependencies │ 5 min            │
└─────────────────────┴──────────────────┘
Total explaining: 40 minutes/day
                  3.3 hours/week
                  14 hours/month
```

## How Agent Skills Solve Limited Capabilities

### 1. Persistent Procedures

Skills are files that persist across sessions:

```
┌──────────────────────────────────────┐
│  Session 1    Session 2    Session 3│
│      ↓            ↓            ↓     │
│   ┌──────────────────────────────┐  │
│   │     game-testing.md          │  │
│   │  (Always available)          │  │
│   └──────────────────────────────┘  │
└──────────────────────────────────────┘

AI always has access to the procedure.
```

### 2. Project-Specific Knowledge

Skills encode your project's unique requirements:

```markdown
# game-testing.md

## Snake Game Specifics

- Grid is 20x20
- Snake starts at (10, 10)
- Food spawns randomly
- Game loop: 10 FPS
- Tests use Jest + jsdom

## Known Issues to Check

- Food rarely spawns under snake (issue #42)
- Performance degrades >100 segments
```

AI now knows YOUR project's details.

### 3. Complex Multi-Step Workflows

Skills break down complex tasks:

```markdown
# deploy.md

## Deployment Workflow

### Pre-deployment
1. [ ] Run full test suite
2. [ ] Check test coverage >80%
3. [ ] Verify no console errors
4. [ ] Update CHANGELOG.md

### Build
5. [ ] Run production build
6. [ ] Verify build output
7. [ ] Check bundle size

### Deploy
8. [ ] Deploy to staging
9. [ ] Run smoke tests
10. [ ] Deploy to production
11. [ ] Verify production
12. [ ] Monitor for errors

### Post-deployment
13. [ ] Update version tag
14. [ ] Notify team
15. [ ] Update documentation
```

AI can execute complex workflows step-by-step.

### 4. Built-in Validation

Skills include success criteria:

```markdown
## Success Criteria

All of these must be true:
- [ ] `npm test` exits with code 0
- [ ] Browser console shows no errors
- [ ] Snake moves in all 4 directions
- [ ] Collision detection triggers game over
- [ ] Score increments when eating food
- [ ] Game resets properly on restart
```

AI validates its own work.

### 5. Reusability

One skill, many uses:

```
game-testing skill used by:
├─ Developer A (daily testing)
├─ Developer B (feature validation)
├─ CI/CD pipeline (automated testing)
├─ Code review process
└─ New team member onboarding
```

## Skill Structure

### Anatomy of a Skill File

```markdown
---
name: skill-name
description: Brief description
version: 1.0.0
author: team-name
tags: [testing, automation]
requires: [npm, browser]
difficulty: beginner
estimated_time: 5min
---

# Skill Name

## Purpose

What this skill accomplishes and when to use it.

## Prerequisites

What needs to be set up before using this skill:
- Tool installations
- Configuration
- Access permissions

## Steps

Detailed step-by-step procedure:

### Step 1: Preparation
Do X, Y, Z...

### Step 2: Execution
Run A, B, C...

### Step 3: Validation
Check 1, 2, 3...

## Examples

Concrete usage examples with expected outputs.

## Success Criteria

Checklist of what indicates success:
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

## Troubleshooting

Common issues and solutions:

### Issue: X happens
**Solution**: Do Y

## Related Skills

- skill-a: For related task A
- skill-b: For related task B

## Notes

Additional context, caveats, or tips.
```

### YAML Frontmatter Fields

#### Required Fields

```yaml
---
name: game-testing           # Unique identifier (kebab-case)
description: Test game logic # Brief summary
version: 1.0.0              # Semantic versioning
---
```

#### Optional Fields

```yaml
---
author: dev-team             # Who created it
tags: [testing, game]        # Categorization
requires: [npm, jest]        # Dependencies
difficulty: intermediate     # beginner|intermediate|advanced
estimated_time: 10min        # How long it takes
category: testing            # Primary category
updated: 2024-01-15         # Last update date
deprecated: false            # Is this skill outdated?
replaces: old-test-skill    # Skill this replaces
---
```

### Markdown Sections

#### Essential Sections

1. **Purpose**: Why this skill exists
2. **Steps**: How to perform the task
3. **Success Criteria**: How to know you succeeded

#### Recommended Sections

4. **Prerequisites**: What's needed first
5. **Examples**: Concrete usage examples
6. **Troubleshooting**: Common problems & solutions

#### Optional Sections

7. **Related Skills**: Connections to other skills
8. **Notes**: Additional context
9. **References**: External resources

## Creating Custom Skills

### Step-by-Step Guide

#### Step 1: Identify a Repeated Task

Look for tasks you explain to AI repeatedly:
- Testing procedures
- Deployment workflows
- Code generation patterns
- Validation checklists
- Documentation updates

#### Step 2: Create Skill File

```bash
# Create skills directory
mkdir -p .github/skills

# Create skill file
touch .github/skills/my-skill.md
```

Location options:
- `.github/skills/` - Standard location
- `docs/skills/` - With documentation
- `.ai/skills/` - AI-specific folder

#### Step 3: Write Frontmatter

```markdown
---
name: my-skill
description: Brief description of what this skill does
version: 1.0.0
author: your-name
tags: [category1, category2]
difficulty: beginner
estimated_time: 5min
---
```

#### Step 4: Document Purpose

```markdown
# My Skill

## Purpose

This skill helps AI assistants [accomplish X] by [doing Y].

Use this skill when you need to:
- Scenario 1
- Scenario 2
- Scenario 3
```

#### Step 5: Break Down Steps

```markdown
## Steps

### Step 1: Preparation

Before starting:
1. Ensure X is installed
2. Verify Y is configured
3. Check Z is accessible

### Step 2: Execution

Execute the main task:

```bash
# Run this command
npm run my-task

# Expected output:
# ✓ Task completed successfully
```

### Step 3: Validation

Verify the result:
1. Check that file X exists
2. Verify Y contains expected content
3. Confirm Z is updated
```

#### Step 6: Add Examples

```markdown
## Examples

### Example 1: Basic Usage

Invoke the skill:
```
User: "Use my-skill to process data"
AI: *follows skill steps*
    "Completed successfully!"
```

### Example 2: With Parameters

With custom parameters:
```
User: "Use my-skill with option X"
AI: "Processing with option X..."
```
```

#### Step 7: Define Success

```markdown
## Success Criteria

The skill execution is successful when ALL of these are true:

- [ ] Command exits with code 0
- [ ] Output file exists
- [ ] No error messages appear
- [ ] Result matches expected format
- [ ] Validation checks pass
```

#### Step 8: Add Troubleshooting

```markdown
## Troubleshooting

### Issue: Command fails with "Error X"

**Cause**: Y is not configured

**Solution**:
```bash
# Fix the configuration
npm run configure
```

### Issue: Output is empty

**Cause**: Input file not found

**Solution**: Verify input file exists at `data/input.json`
```

#### Step 9: Test the Skill

```bash
# Have AI use the skill
ai use-skill my-skill

# Verify it works as expected
# Iterate if needed
```

#### Step 10: Document in AGENTS.md

```markdown
# AGENTS.md

## Available Skills

### my-skill
Location: `.github/skills/my-skill.md`
Purpose: [brief description]
Usage: "Use my-skill to [task]"
```

## The game-testing Skill Walkthrough

Let's create a complete, real-world skill for testing the snake game.

### Complete Skill File

```markdown
---
name: game-testing
description: Comprehensive testing procedure for the snake game
version: 1.0.0
author: snake-game-team
tags: [testing, validation, quality-assurance]
requires: [node, npm, browser]
difficulty: beginner
estimated_time: 5min
category: testing
---

# Game Testing Skill

## Purpose

This skill provides a comprehensive testing procedure for the AI Snake Game. It ensures that both automated tests and manual browser testing are performed correctly.

Use this skill when you need to:
- Validate a new feature
- Verify a bug fix
- Perform pre-release testing
- Onboard a new developer
- Demonstrate the game works correctly

## Prerequisites

Before using this skill, ensure:

- [ ] Node.js 18+ is installed
- [ ] Dependencies are installed (`npm install`)
- [ ] You have a modern web browser (Chrome, Firefox, Safari, Edge)
- [ ] No existing game instance is running

## Steps

### Step 1: Automated Testing

Run the full test suite:

```bash
npm test
```

**Expected Output**:
```
PASS tests/game.test.js
  Game
    ✓ initializes with correct size (5ms)
    ✓ snake starts in center (2ms)
    ✓ moves snake correctly (3ms)
    ✓ detects wall collision (2ms)
    ✓ detects self collision (3ms)
    ✓ grows when eating food (4ms)

PASS tests/renderer.test.js
  Renderer
    ✓ creates canvas context (2ms)
    ✓ renders snake (3ms)
    ✓ renders food (2ms)

PASS tests/input.test.js
  InputHandler
    ✓ captures keyboard input (3ms)
    ✓ prevents invalid directions (2ms)

Test Suites: 3 passed, 3 total
Tests:       11 passed, 11 total
```

**Validation**:
- [ ] All tests pass (green checkmarks)
- [ ] No test failures or errors
- [ ] Test count matches expected (11 tests)

### Step 2: Check Test Coverage

```bash
npm test -- --coverage
```

**Expected Output**:
```
---------------------|---------|----------|---------|---------|
File                 | % Stmts | % Branch | % Funcs | % Lines |
---------------------|---------|----------|---------|---------|
All files            |   85.23 |    78.45 |   90.12 |   85.67 |
 src/game.js         |   88.45 |    82.30 |   92.31 |   89.12 |
 src/renderer.js     |   82.14 |    75.50 |   87.50 |   83.21 |
 src/input.js        |   86.20 |    80.00 |   91.67 |   85.45 |
---------------------|---------|----------|---------|---------|
```

**Validation**:
- [ ] Overall coverage >80%
- [ ] No file below 75% coverage

### Step 3: Manual Browser Testing

Open the game:

1. Open `index.html` in a web browser
   - **Mac**: `open index.html`
   - **Linux**: `xdg-open index.html`
   - **Windows**: Double-click `index.html`

2. Open DevTools Console (F12 or Cmd+Option+I)

**Validation**:
- [ ] Game loads without errors
- [ ] No red errors in console
- [ ] Canvas displays correctly
- [ ] "Start Game" button visible

### Step 4: Test Core Mechanics

#### 4.1 Test Snake Movement

1. Click "Start Game"
2. Press arrow keys:
   - **Right Arrow**: Snake moves right
   - **Down Arrow**: Snake moves down
   - **Left Arrow**: Snake moves left
   - **Up Arrow**: Snake moves up

**Validation**:
- [ ] Snake moves in correct direction
- [ ] Snake cannot reverse 180° (down when moving up)
- [ ] Movement is smooth
- [ ] Direction changes work mid-movement

#### 4.2 Test Food Consumption

1. Navigate snake to food (red square)
2. Move snake head onto food position

**Validation**:
- [ ] Food disappears when touched
- [ ] New food spawns at random location
- [ ] Snake grows by one segment
- [ ] Score increments by 1

#### 4.3 Test Wall Collision

1. Navigate snake toward any wall
2. Move snake head outside grid boundary

**Validation**:
- [ ] Game ends immediately on wall hit
- [ ] "Game Over" or similar message appears
- [ ] Game loop stops (snake stops moving)
- [ ] Final score displays correctly

#### 4.4 Test Self Collision

1. Grow snake by eating food (length > 4)
2. Navigate to create a self-collision:
   - Move right → down → left → up (forms a loop)
   - Snake head hits body

**Validation**:
- [ ] Game ends on self-collision
- [ ] Game recognizes body vs. head collision
- [ ] Game over state triggers

#### 4.5 Test Game Reset

1. After game over, click "Start Game" again

**Validation**:
- [ ] Score resets to 0
- [ ] Snake returns to starting position
- [ ] Snake resets to initial length (3 segments)
- [ ] Food spawns at new location
- [ ] Game is fully playable again

### Step 5: Performance Check

During gameplay:

**Validation**:
- [ ] Frame rate is smooth (~10 FPS)
- [ ] No stuttering or lag
- [ ] Input is responsive
- [ ] No memory leaks (play for 2+ minutes)

### Step 6: Cross-Browser Testing (Optional)

Test in multiple browsers:

1. Chrome/Chromium
2. Firefox
3. Safari (if on Mac)
4. Edge (if on Windows)

**Validation**:
- [ ] Game works in all tested browsers
- [ ] No browser-specific errors
- [ ] Visual appearance consistent

## Success Criteria

All of the following must be true:

### Automated Tests
- [ ] `npm test` exits with code 0
- [ ] All unit tests pass (11/11)
- [ ] Test coverage ≥80%

### Manual Testing
- [ ] Game loads without errors
- [ ] Browser console shows no errors
- [ ] Snake moves in all 4 directions correctly
- [ ] Food consumption works (grow + score)
- [ ] Wall collision triggers game over
- [ ] Self collision triggers game over
- [ ] Score tracking is accurate
- [ ] Game reset works properly
- [ ] No performance issues

### Code Quality
- [ ] No console.log statements in source
- [ ] No commented-out code
- [ ] Code follows project conventions

## Examples

### Example 1: Feature Validation

```
Developer: "I added pause functionality. Use game-testing to validate."

AI: "Using game-testing skill...

Step 1: Running automated tests...
✓ All tests pass (11/11)

Step 2: Checking coverage...
✓ Coverage: 87% (above threshold)

Step 3: Testing in browser...
✓ Game loads without errors
✓ New 'Pause' button visible

Step 4: Testing core mechanics...
✓ Movement works
✓ Pause button stops game
✓ Unpause resumes correctly
✓ All mechanics work with pause feature

Step 5: Performance check...
✓ No performance degradation

All checks passed! Pause feature is working correctly."
```

### Example 2: Bug Fix Verification

```
Developer: "Fixed issue #42 (food spawning under snake). 
           Use game-testing to verify."

AI: "Using game-testing skill...

Step 1: Automated tests...
✓ All tests pass

Step 2: Manual testing...
✓ Game loads

Step 4.2: Food consumption testing...
Testing multiple food spawns (20 iterations)...
✓ Food never spawned under snake body
✓ Issue #42 appears fixed

All checks passed! Bug fix verified."
```

### Example 3: Pre-Release Testing

```
Developer: "We're releasing v2.0. Full game-testing before release."

AI: "Using game-testing skill for release validation...

[Runs all steps meticulously]

Step 1: ✓ Automated tests pass
Step 2: ✓ Coverage 89%
Step 3: ✓ Browser load successful
Step 4.1: ✓ Movement works
Step 4.2: ✓ Food consumption works
Step 4.3: ✓ Wall collision works
Step 4.4: ✓ Self collision works
Step 4.5: ✓ Reset works
Step 5: ✓ Performance acceptable
Step 6: ✓ Cross-browser (Chrome, Firefox, Safari)

All success criteria met! v2.0 is ready for release."
```

## Troubleshooting

### Issue: Tests fail with "Cannot find module 'jest'"

**Cause**: Dependencies not installed

**Solution**:
```bash
npm install
npm test
```

### Issue: Browser shows blank canvas

**Cause**: JavaScript not loading or error in initialization

**Solution**:
1. Open DevTools Console (F12)
2. Look for error messages
3. Common issues:
   - File path incorrect in `index.html`
   - Module import error
   - Canvas element not found

### Issue: "Cannot read property 'getContext' of null"

**Cause**: Canvas element not found in DOM

**Solution**:
1. Verify `index.html` has `<canvas id="gameCanvas"></canvas>`
2. Check that `main.js` runs after DOM loads
3. Verify correct canvas ID in JavaScript

### Issue: Snake doesn't move after clicking Start

**Cause**: Game loop not starting or input not wired

**Solution**:
1. Check console for errors
2. Verify `setInterval` is being called
3. Check that `InputHandler` is initialized
4. Confirm event listeners are attached

### Issue: Food spawns under snake immediately

**Cause**: Food spawn logic doesn't check snake position

**Solution**: This is known issue #42. Verify the fix:
```javascript
// food should not spawn at snake positions
function spawnFood() {
  let food;
  do {
    food = randomPosition();
  } while (isOccupiedBySnake(food));
  return food;
}
```

## Related Skills

- **code-review**: Review code changes before testing
- **documentation-update**: Update docs after feature testing
- **deployment**: Deploy after successful testing
- **performance-profiling**: Deep dive into performance issues

## Notes

### Testing Frequency

- **Daily**: Run automated tests
- **Per feature**: Full testing procedure
- **Pre-release**: Complete testing + cross-browser
- **Post-deployment**: Smoke test

### Test Data

For consistent testing:
- Grid size: 20x20
- Initial snake length: 3 segments
- Initial position: (10, 10)
- Initial direction: Right

### Known Limitations

- Manual testing is subjective
- Performance varies by device
- Cross-browser testing requires multiple browsers
- No automated visual regression testing

### Future Enhancements

- [ ] Add automated visual testing
- [ ] Implement E2E testing with Playwright
- [ ] Add performance benchmarking
- [ ] Create automated cross-browser tests
```

### Why This Skill Works

1. **Comprehensive**: Covers all aspects of testing
2. **Structured**: Clear steps, easy to follow
3. **Validated**: Success criteria at each step
4. **Practical**: Real commands, real outputs
5. **Troubleshooting**: Common issues documented
6. **Reusable**: Works for any testing scenario

## Skill Discovery and Usage

### Discovering Available Skills

#### Method 1: Skills Directory

```bash
# List all skills
ls .github/skills/

# Output:
game-testing.md
code-review.md
deployment.md
documentation.md
```

#### Method 2: Skill Index

Create `.github/skills/INDEX.md`:

```markdown
# Available Skills

## Testing
- [game-testing](./game-testing.md) - Test game mechanics
- [performance-testing](./performance-testing.md) - Profile performance

## Development
- [feature-development](./feature-development.md) - Add new features
- [bug-fixing](./bug-fixing.md) - Debug and fix bugs

## Quality Assurance
- [code-review](./code-review.md) - Review code changes
- [security-audit](./security-audit.md) - Check security

## Documentation
- [documentation-update](./documentation-update.md) - Update docs
- [readme-generation](./readme-generation.md) - Generate README

## Deployment
- [staging-deploy](./staging-deploy.md) - Deploy to staging
- [production-deploy](./production-deploy.md) - Deploy to production
```

#### Method 3: AGENTS.md Reference

```markdown
# AGENTS.md

## Available Skills

AI assistants can use these skills:

### Testing
- **game-testing** (`.github/skills/game-testing.md`)
  - Purpose: Comprehensive game testing
  - Usage: "Use game-testing skill to validate the game"

### Development
- **feature-development** (`.github/skills/feature-development.md`)
  - Purpose: Add new features following conventions
  - Usage: "Use feature-development skill to add [feature]"
```

### Invoking Skills

#### Direct Invocation

```
User: "Use the game-testing skill"

AI: *reads .github/skills/game-testing.md*
    *follows steps*
    "Running tests..."
```

#### Parameterized Invocation

```
User: "Use game-testing skill, focus on collision detection"

AI: *reads skill*
    *emphasizes collision tests*
    "Focusing on collision detection tests..."
```

#### Conditional Invocation

```
User: "If tests fail, use the debugging skill"

AI: *runs tests*
    *tests fail*
    *invokes debugging skill*
    "Tests failed, using debugging skill..."
```

### Chaining Skills

```
User: "Use feature-development to add pause button, 
      then game-testing to validate,
      then documentation-update to document it"

AI: *reads feature-development skill*
    "Adding pause button..."
    
    *reads game-testing skill*
    "Testing pause feature..."
    
    *reads documentation-update skill*
    "Updating documentation..."
    
    "All steps completed successfully!"
```

## Best Practices

### 1. One Skill, One Purpose

❌ **Bad**: `do-everything.md` (500 lines, mixed purposes)

✅ **Good**: 
- `game-testing.md` - Testing only
- `deployment.md` - Deployment only
- `documentation.md` - Docs only

### 2. Keep Steps Clear

❌ **Bad**:
```markdown
## Steps
1. Run tests and check browser
```

✅ **Good**:
```markdown
## Steps

### Step 1: Run Tests
```bash
npm test
```

### Step 2: Open Browser
```bash
open index.html
```
```

### 3. Include Validation

❌ **Bad**:
```markdown
## Steps
1. Run command
2. Done
```

✅ **Good**:
```markdown
## Steps
1. Run command
   ```bash
   npm test
   ```
   
   **Expected**: All tests pass
   **Validation**: Exit code 0
```

### 4. Provide Troubleshooting

❌ **Bad**: (no troubleshooting section)

✅ **Good**:
```markdown
## Troubleshooting

### Issue: Command not found

**Solution**: Install dependencies
```bash
npm install
```
```

### 5. Use Examples

❌ **Bad**: (no examples)

✅ **Good**:
```markdown
## Examples

### Example 1: Basic Usage
User: "Use skill X"
AI: [shows expected behavior]
```

### 6. Version Your Skills

```yaml
---
version: 1.0.0    # Semantic versioning
updated: 2024-01-15
---
```

Update version when:
- Major: Breaking changes
- Minor: New features
- Patch: Bug fixes, clarifications

### 7. Tag for Discovery

```yaml
---
tags: [testing, automation, quality]
category: testing
---
```

Makes skills searchable.

### 8. Estimate Time

```yaml
---
estimated_time: 10min
---
```

Helps users plan their work.

### 9. Specify Requirements

```yaml
---
requires: [node, npm, browser, docker]
---
```

```markdown
## Prerequisites
- Node.js 18+
- Docker installed and running
```

### 10. Link Related Skills

```markdown
## Related Skills

- **code-review**: Run before testing
- **deployment**: Run after testing passes
- **performance-analysis**: For performance issues
```

### 11. Keep It Current

```markdown
## Notes

Last verified: 2024-01-15
Next review: 2024-02-15

Changelog:
- 2024-01-15: Updated for v2.0 architecture
- 2023-12-01: Added cross-browser testing
```

### 12. Test Your Skills

```
1. Write skill
2. Have AI use it
3. Verify it works
4. Iterate based on results
```

## Advanced Patterns

### Conditional Logic

```markdown
## Steps

### Step 1: Run Tests

```bash
npm test
```

**If tests pass**: Continue to Step 2
**If tests fail**: Jump to Troubleshooting section

### Step 2: Deploy (only if Step 1 passed)
...
```

### Parameterized Skills

```markdown
# deployment.md

---
parameters:
  environment: [staging, production]
  version: string
---

## Steps

### Step 1: Deploy to {environment}

```bash
deploy --env={environment} --version={version}
```

Usage: "Use deployment skill with environment=staging version=1.2.3"
```

### Nested Skills

```markdown
# full-release.md

## Steps

1. **Use feature-development skill** to implement feature
2. **Use code-review skill** to review code
3. **Use game-testing skill** to validate
4. **Use documentation-update skill** to document
5. **Use deployment skill** to deploy
```

### Templated Skills

```markdown
# feature-template.md

## Feature: {FEATURE_NAME}

### Implementation
Create `src/features/{FEATURE_NAME}.js`:
```javascript
export class {FeatureName} {
  constructor() {
    // Implementation
  }
}
```

### Tests
Create `tests/features/{FEATURE_NAME}.test.js`:
```javascript
import { {FeatureName} } from '../../src/features/{FEATURE_NAME}';

describe('{FeatureName}', () => {
  test('works correctly', () => {
    // Tests
  });
});
```
```

### Interactive Skills

```markdown
## Steps

### Step 1: Choose Test Type

Please specify test type:
- Unit tests only
- Integration tests only
- Full test suite (both)

Based on choice, proceed to:
- Unit: Step 2a
- Integration: Step 2b
- Full: Step 2c
```

### Progress Tracking

```markdown
## Progress Checklist

- [ ] Prerequisites verified
- [ ] Step 1: Tests run
- [ ] Step 2: Browser opened
- [ ] Step 3: Manual testing done
- [ ] Step 4: Validation complete
- [ ] Success criteria met

Update this checklist as you progress.
```

## Skill Library Organization

### Directory Structure

```
.github/skills/
├── INDEX.md                    # Skill catalog
├── README.md                   # How to use skills
│
├── testing/                    # Category: Testing
│   ├── game-testing.md
│   ├── performance-testing.md
│   └── security-testing.md
│
├── development/                # Category: Development
│   ├── feature-development.md
│   ├── bug-fixing.md
│   └── refactoring.md
│
├── quality/                    # Category: Quality
│   ├── code-review.md
│   ├── linting.md
│   └── validation.md
│
├── documentation/              # Category: Documentation
│   ├── readme-update.md
│   ├── api-docs.md
│   └── changelog.md
│
└── deployment/                 # Category: Deployment
    ├── staging-deploy.md
    ├── production-deploy.md
    └── rollback.md
```

### Skill Catalog (INDEX.md)

```markdown
# Skill Library

## Quick Reference

| Skill | Category | Difficulty | Time | Purpose |
|-------|----------|------------|------|---------|
| [game-testing](testing/game-testing.md) | Testing | Beginner | 5min | Test game |
| [feature-development](development/feature-development.md) | Development | Intermediate | 30min | Add feature |
| [code-review](quality/code-review.md) | Quality | Intermediate | 10min | Review code |
| [production-deploy](deployment/production-deploy.md) | Deployment | Advanced | 20min | Deploy |

## By Category

### Testing
- **game-testing**: Comprehensive game testing
- **performance-testing**: Profile and optimize performance
- **security-testing**: Security audit and vulnerability check

### Development
- **feature-development**: Add new features
- **bug-fixing**: Debug and fix bugs
- **refactoring**: Improve code quality

### Quality Assurance
- **code-review**: Review code changes
- **linting**: Run linters and formatters
- **validation**: Validate against standards

### Documentation
- **readme-update**: Update README.md
- **api-docs**: Generate API documentation
- **changelog**: Update CHANGELOG.md

### Deployment
- **staging-deploy**: Deploy to staging environment
- **production-deploy**: Deploy to production
- **rollback**: Rollback failed deployment

## By Difficulty

### Beginner
- game-testing
- readme-update
- linting

### Intermediate
- feature-development
- code-review
- staging-deploy

### Advanced
- production-deploy
- security-testing
- performance-testing

## Usage

To use a skill:
```
User: "Use [skill-name] skill"
AI: *reads and follows skill*
```

Example:
```
User: "Use game-testing skill"
AI: "Using game-testing skill... [executes]"
```
```

## Testing Skills

### Manual Testing

```bash
# Have AI use the skill
ai use-skill game-testing

# Verify each step works
# Check outputs match expectations
# Identify any issues
```

### Automated Testing

```javascript
// tests/skills/game-testing.test.js

const { validateSkill } = require('../skill-validator');

test('game-testing skill is valid', () => {
  const skill = readSkillFile('.github/skills/testing/game-testing.md');
  
  expect(validateSkill(skill)).toEqual({
    valid: true,
    hasFrontmatter: true,
    hasSteps: true,
    hasSuccessCriteria: true,
    hasTroubleshooting: true
  });
});
```

### Integration Testing

```bash
# Test skill in real workflow
git checkout -b test-skill
# Make changes
# Use skill
# Verify results
git checkout main
git branch -D test-skill
```

### Validation Checklist

- [ ] Frontmatter complete and valid
- [ ] Purpose clearly stated
- [ ] Steps are executable
- [ ] Examples are realistic
- [ ] Success criteria are measurable
- [ ] Troubleshooting covers common issues
- [ ] No broken links
- [ ] No outdated information
- [ ] Commands actually work
- [ ] Tested with actual AI assistant

---

## Summary

**Agent Skills** are powerful tools that:

✅ **Extend** AI capabilities with project-specific knowledge
✅ **Preserve** complex procedures across sessions
✅ **Ensure** consistency in execution
✅ **Save** time by eliminating repetitive explanations
✅ **Improve** quality through validation and checklists

### Quick Start

1. **Create**: `.github/skills/my-skill.md`
2. **Write**: Frontmatter + steps + validation
3. **Test**: Have AI use it
4. **Document**: Add to AGENTS.md
5. **Maintain**: Update as project evolves

### Key Takeaways

- One skill = one purpose
- Clear steps + validation = success
- Examples make skills understandable
- Troubleshooting prevents frustration
- Organization enables discovery
- Testing ensures quality

**With Agent Skills, you transform AI assistants into specialized team members with deep project knowledge and proven procedures.**
