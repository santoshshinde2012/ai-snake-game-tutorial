# Organization-Wide Development Rules

This file contains centralized rules that apply to all projects using Ruler.

## Code Quality Standards

### Testing
- All code must have automated tests
- Minimum 80% code coverage (projects can require higher)
- Tests must pass before merging
- Use Test-Driven Development (TDD) when possible

### Code Style
- Follow language-specific style guides
- Use linters and formatters
- No compiler/linter warnings in production code
- Consistent naming conventions

### Documentation
- README.md required for all projects
- API documentation for public functions
- Architecture documentation for complex systems
- Keep changelogs updated

## Git Practices

### Commits
- Use conventional commit messages
- Make atomic commits (one logical change per commit)
- Write descriptive commit messages
- Reference issues in commit messages

### Branches
- Use feature branches for development
- Keep main/master branch stable
- Delete branches after merging
- Use meaningful branch names

### Pull Requests
- Pull requests required for all changes
- At least one approval before merging
- All checks must pass
- Address review comments promptly

## Security

### Code Security
- No secrets in source code
- Use environment variables for sensitive data
- Keep dependencies updated
- Run security scans regularly

### Dependency Management
- Review dependencies before adding
- Keep dependencies updated
- Remove unused dependencies
- Use lock files (package-lock.json, etc.)

## Development Workflow

### Before Starting
1. Pull latest changes
2. Create feature branch
3. Understand requirements

### During Development
1. Write tests first (TDD)
2. Implement feature
3. Run tests frequently
4. Commit regularly

### Before Merging
1. All tests pass
2. Linting passes
3. Coverage thresholds met
4. Documentation updated
5. Code reviewed

## Language-Specific Rules

### JavaScript/TypeScript
- Use ES6+ features
- Prefer const over let, never use var
- Use async/await over callbacks
- Follow ESLint rules

### Python
- Follow PEP 8
- Use type hints
- Use virtual environments
- Follow pylint rules

### General
- Keep functions small (< 50 lines)
- Meaningful variable names
- Avoid code duplication (DRY)
- Write self-documenting code

## Performance

### Optimization
- Profile before optimizing
- Optimize bottlenecks only
- Keep code readable
- Document performance-critical sections

### Resource Management
- Clean up resources (files, connections)
- Avoid memory leaks
- Use appropriate data structures
- Consider scalability

## Accessibility

### Web Projects
- Follow WCAG guidelines
- Use semantic HTML
- Provide alt text for images
- Ensure keyboard navigation

### Documentation
- Use clear language
- Provide examples
- Include diagrams when helpful
- Support multiple learning styles

## Continuous Integration

### CI/CD Requirements
- Automated testing in CI
- Build verification
- Linting checks
- Security scanning

### Deployment
- Automated deployments
- Staging environment testing
- Rollback capability
- Monitoring and logging

## Communication

### Code Reviews
- Be respectful and constructive
- Focus on code, not person
- Explain reasoning
- Acknowledge good work

### Issues and PRs
- Use templates
- Provide context
- Include reproduction steps (bugs)
- Link related issues

## Exceptions

Projects may deviate from these rules if:
1. Documented with reasoning
2. Approved by maintainers
3. Tracked as technical debt
4. Has migration plan (if temporary)

## Updates

These rules are reviewed quarterly and updated as needed.

**Version**: 1.0.0  
**Last Updated**: 2024-01-15  
**Next Review**: 2024-04-15

## Compliance

Use `.ruler/ruler.toml` to configure which rules apply to your project.

## Questions

Contact organization maintainers for clarification.
