# Game Testing Skill

## Description
Automated testing for JavaScript games with coverage reporting.

## Usage
```
Use game-testing skill to run tests
```

## Requirements
- Node.js 14+
- Jest installed
- Tests in tests/ directory

## Output
- Test results
- Coverage report
- Pass/fail status

## Configuration
Set coverage threshold:
```json
{
  "jest": {
    "coverageThreshold": {
      "global": {
        "lines": 90
      }
    }
  }
}
```

## Examples

### Basic Usage
```
Use game-testing skill
```

### With Threshold
```
Use game-testing skill with 95% coverage
```

### Specific File
```
Use game-testing skill for tests/game.test.js
```
