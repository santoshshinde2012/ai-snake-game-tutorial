# Organization-Wide TypeScript Standards

## TypeScript Rules
- Strict mode enabled
- No implicit any
- Explicit return types for functions
- Interface over type for objects

## Testing Standards
- 80%+ coverage minimum
- TDD approach
- Jest for unit tests
- React Testing Library for components

## Code Quality
- ESLint + Prettier
- No console.log in production
- Meaningful variable names
- Functions < 50 lines

## React Best Practices
- Use functional components
- Custom hooks for reusable logic
- Props interface for all components
- Avoid prop drilling with context when needed

## Performance
- Memoize expensive calculations
- Use React.memo for pure components
- Lazy load components when appropriate
- Optimize re-renders

## Security
- Validate all user inputs
- Sanitize data before rendering
- No eval() or dangerous functions
- Keep dependencies updated
