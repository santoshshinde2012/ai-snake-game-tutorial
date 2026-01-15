# Agent Skills Guide

## What are Agent Skills?

Agent Skills are reusable, packaged capabilities that AI agents can use to perform specific tasks. Think of them as plugins or modules that extend what an AI agent can do.

## The Problem Skills Solve

### Without Skills
```markdown
Agent A: "Run tests"
> Execute: npm test

Agent B: "Run tests"
> Execute: npm test

Agent C: "Run tests"
> Execute: npm test
```

**Issues**:
- Duplicate instructions
- Inconsistent execution
- No reusability
- Hard to maintain

### With Skills
```markdown
All Agents: "Use game-testing skill"
> Skill: Validates environment
> Skill: Runs appropriate test command
> Skill: Reports coverage
> Skill: Generates summary
```

**Benefits**:
- Reusable across agents
- Consistent behavior
- Easy to maintain
- Composable

## Skill Structure

A skill is a directory containing:

```
.skills/
└── game-testing/
    ├── SKILL.md           # Skill documentation
    ├── scripts/           # Automation scripts
    │   ├── run_tests.py
    │   └── coverage.sh
    └── config/            # Configuration (optional)
        └── jest.config.js
```

## Creating a Skill

### 1. Skill Directory
```bash
mkdir -p .skills/game-testing/scripts
```

### 2. SKILL.md

Create `.skills/game-testing/SKILL.md`:

```markdown
# Game Testing Skill

## Description
Automated testing skill for game projects with coverage reporting.

## Capabilities
- Run unit tests
- Generate coverage reports
- Validate coverage thresholds
- Summary reporting

## Usage

### Basic
\```
Use game-testing skill to run tests
\```

### With Options
\```
Use game-testing skill with coverage threshold 90%
\```

## Requirements
- Node.js 14+
- Jest installed
- Tests in tests/ directory

## Configuration
Set coverage threshold in package.json:
\```json
{
  "jest": {
    "coverageThreshold": {
      "global": {
        "lines": 90
      }
    }
  }
}
\```

## Output
- Test results summary
- Coverage percentages
- Failed test details
- Suggestions for improvement
```

### 3. Automation Scripts

Create `.skills/game-testing/scripts/run_tests.py`:

```python
#!/usr/bin/env python3
import subprocess
import json
import sys

def run_tests():
    """Run Jest tests with coverage"""
    try:
        result = subprocess.run(
            ['npm', 'test', '--', '--coverage', '--json'],
            capture_output=True,
            text=True
        )
        
        # Parse results
        if result.returncode == 0:
            print("✅ All tests passed!")
        else:
            print("❌ Some tests failed")
            
        # Coverage summary
        print("\nCoverage Summary:")
        subprocess.run(['npm', 'test', '--', '--coverage'])
        
        return result.returncode
        
    except Exception as e:
        print(f"Error running tests: {e}")
        return 1

if __name__ == "__main__":
    sys.exit(run_tests())
```

## Using Skills

### In AGENTS.md

Reference skills in your AGENTS.md:

```markdown
# Project AGENTS.md

## Available Skills

### game-testing
Location: `.skills/game-testing/`
Use for: Running tests with coverage

Example:
\```
Agent, use the game-testing skill to validate my changes
\```

## Testing Changes

When making changes:
1. Implement your feature
2. Use game-testing skill
3. Ensure 90%+ coverage
4. Fix any failing tests
```

### Direct Invocation

AI agents can invoke skills:

```markdown
> Use game-testing skill with verbose output
> Use game-testing skill focusing on src/game.js
> Use game-testing skill and report coverage
```

## Skill Types

### 1. Testing Skills
- Unit testing
- Integration testing
- E2E testing
- Coverage analysis

### 2. Code Quality Skills
- Linting
- Formatting
- Security scanning
- Complexity analysis

### 3. Documentation Skills
- API doc generation
- README validation
- Diagram generation
- Changelog creation

### 4. Deployment Skills
- Build automation
- Release management
- Versioning
- Publishing

## Best Practices

### 1. Single Responsibility
Each skill should do one thing well.

```
✅ Good: game-testing (focused)
❌ Bad: test-lint-build-deploy (too broad)
```

### 2. Clear Documentation
```markdown
# Skill Name

## Description
One-sentence description

## Usage
How to invoke the skill

## Requirements
What's needed to use it

## Examples
Concrete usage examples
```

### 3. Error Handling
```python
try:
    result = run_command()
    if result.success:
        print("✅ Success")
    else:
        print("❌ Failed:", result.error)
except Exception as e:
    print("⚠️  Error:", str(e))
    sys.exit(1)
```

### 4. Configurability
```markdown
## Configuration

Environment variables:
- TEST_COVERAGE_THRESHOLD (default: 80)
- TEST_TIMEOUT (default: 30000)
- TEST_VERBOSE (default: false)
```

## Real-World Example

### Complete game-testing Skill

`.skills/game-testing/SKILL.md`:
```markdown
# Game Testing Skill v1.0.0

## Description
Comprehensive testing skill for JavaScript game projects.

## Features
- Jest test execution
- Coverage reporting (lines, branches, functions)
- Threshold validation
- CI-friendly output
- Detailed failure reports

## Usage

### Run All Tests
\```
use game-testing skill
\```

### Run Specific Test File
\```
use game-testing skill for src/game.js
\```

### With Custom Threshold
\```
use game-testing skill with 95% coverage
\```

## Requirements
- Node.js 14+
- npm or yarn
- Jest configured
- Tests in tests/ directory

## Installation
\```bash
npm install --save-dev jest
\```

## Configuration
In package.json:
\```json
{
  "scripts": {
    "test": "jest --coverage"
  },
  "jest": {
    "coverageThreshold": {
      "global": {
        "branches": 90,
        "functions": 90,
        "lines": 90,
        "statements": 90
      }
    }
  }
}
\```

## Output Format

### Success
\```
✅ All tests passed!
📊 Coverage: 95.2%
  - Lines: 96.1%
  - Branches: 94.3%
  - Functions: 95.8%
  - Statements: 95.9%
\```

### Failure
\```
❌ 3 tests failed

Failed Tests:
1. src/game.test.js
   - should handle collision
   - Expected: true, Received: false

📊 Coverage: 78.4% (below threshold of 90%)
⚠️  Action needed: Add tests for uncovered branches
\```

## Troubleshooting

### Tests Not Found
- Check tests/ directory exists
- Verify test file naming (*.test.js)

### Coverage Too Low
- Run with --coverage to see gaps
- Focus on untested branches
- Add edge case tests

## Advanced

### Custom Jest Config
Place jest.config.js in skill directory:
\```javascript
module.exports = {
  testEnvironment: 'jsdom',
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['src/**/*.js']
};
\```

### CI Integration
\```yaml
- name: Run Game Tests
  run: python .skills/game-testing/scripts/run_tests.py
\```
```

## Skill Composition

Combine multiple skills:

```markdown
## Test and Deploy Workflow

1. Use game-testing skill
   - Validates code quality
   
2. Use build skill
   - Creates production build
   
3. Use deploy skill
   - Deploys to hosting
```

## Skill Discovery

Help agents discover skills:

```markdown
## Available Skills

### Core Skills
- **game-testing**: Run tests with coverage
- **lint-code**: Check code style
- **generate-docs**: Create documentation

### Specialized Skills
- **performance-test**: Measure game performance
- **browser-test**: Cross-browser testing

To list all skills:
\```bash
ls -la .skills/
\```
```

## Skill Versioning

Version your skills:

```markdown
# Game Testing Skill

**Version**: 1.2.0

## Changelog
- v1.2.0: Added coverage threshold validation
- v1.1.0: Added CI-friendly output
- v1.0.0: Initial release

## Compatibility
- Node.js: 14+
- Jest: 27+
```

## Testing Skills

Test your skills:

```python
# tests/test_game_testing_skill.py
def test_run_tests_success():
    result = run_tests()
    assert result.exit_code == 0
    assert "All tests passed" in result.output

def test_run_tests_failure():
    result = run_tests_with_failing_test()
    assert result.exit_code != 0
    assert "failed" in result.output.lower()
```

## Skill Marketplace (Future)

Imagine a future where:
```markdown
## Install Skills

\```bash
skill install testing/game-testing
skill install docs/api-generator
skill install deploy/github-pages
\```

## Community Skills
Browse at: skills.dev/marketplace
```

## Integration with Ruler

Skills can reference ruler rules:

```markdown
# Testing Skill

## Compliance
This skill enforces rules from `.ruler/AGENTS.md`:
- Minimum coverage threshold
- Test naming conventions
- Documentation requirements
```

## Metrics

Track skill effectiveness:

```markdown
## Skill Usage Metrics

game-testing skill:
- Used: 150 times
- Success rate: 94%
- Average runtime: 12s
- Coverage improvement: +5%
```

## Platform-Specific Skills

### Python Projects
```
.skills/
└── python-testing/
    ├── SKILL.md
    └── scripts/
        └── run_pytest.py
```

### Mobile Apps
```
.skills/
└── mobile-testing/
    ├── SKILL.md
    └── scripts/
        ├── run_ios_tests.sh
        └── run_android_tests.sh
```

## Resources

- [Example Skills](../examples/03-with-skills/)
- [AGENTS.md Guide](AGENTS_MD_GUIDE.md)
- [Ruler Guide](RULER_GUIDE.md)

## Summary

Agent Skills provide:
- ✅ Reusability
- ✅ Consistency
- ✅ Maintainability
- ✅ Composability
- ✅ Automation

Build a library of skills to supercharge your AI agent ecosystem!

## Quick Start

1. Create skill directory: `.skills/my-skill/`
2. Add SKILL.md with documentation
3. Add scripts for automation
4. Reference in AGENTS.md
5. Use in development workflow

Skills transform AI agents from code generators into specialized team members with professional tooling.
