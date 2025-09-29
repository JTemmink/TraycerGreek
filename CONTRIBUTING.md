# Contributing to TraycerGreek

Thank you for your interest in contributing to TraycerGreek! This document provides guidelines and information for contributors.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Contributing Guidelines](#contributing-guidelines)
- [Pull Request Process](#pull-request-process)
- [Issue Reporting](#issue-reporting)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Documentation](#documentation)

## Code of Conduct

This project follows a code of conduct that ensures a welcoming environment for all contributors. Please be respectful and constructive in all interactions.

## Getting Started

1. Fork the repository
2. Clone your fork locally
3. Set up the development environment
4. Create a feature branch
5. Make your changes
6. Test your changes
7. Submit a pull request

## Development Setup

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git
- Supabase CLI (for local development)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/TraycerGreek.git
cd TraycerGreek

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# Set up Supabase (if working with database)
npx supabase start
npx supabase db reset

# Run the development server
npm run dev
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run test` - Run unit tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:e2e` - Run end-to-end tests
- `npm run test:coverage` - Run tests with coverage

## Contributing Guidelines

### Types of Contributions

- **Bug fixes** - Fix issues in existing code
- **Features** - Add new functionality
- **Documentation** - Improve or add documentation
- **Tests** - Add or improve test coverage
- **Performance** - Optimize existing code
- **Accessibility** - Improve accessibility features

### Before You Start

1. Check existing issues and pull requests
2. Discuss major changes in an issue first
3. Ensure your changes align with project goals
4. Follow the coding standards

## Pull Request Process

### Creating a Pull Request

1. **Fork and branch**: Create a feature branch from `main`
2. **Make changes**: Implement your changes following coding standards
3. **Test**: Ensure all tests pass and add new tests if needed
4. **Document**: Update documentation if necessary
5. **Commit**: Use conventional commit messages
6. **Push**: Push your branch to your fork
7. **Create PR**: Open a pull request with a clear description

### Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] E2E tests pass
- [ ] Manual testing completed

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes (or clearly documented)
```

### Review Process

1. **Automated checks** - CI/CD pipeline runs tests and linting
2. **Code review** - Maintainers review code quality and functionality
3. **Testing** - Changes are tested in staging environment
4. **Approval** - At least one maintainer approval required
5. **Merge** - Changes are merged to main branch

## Issue Reporting

### Before Creating an Issue

1. Search existing issues
2. Check if it's already fixed in latest version
3. Gather relevant information

### Issue Template

```markdown
## Bug Report / Feature Request

**Describe the issue/feature**
A clear description of the problem or feature request.

**To Reproduce** (for bugs)
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment**
- OS: [e.g. Windows, macOS, Linux]
- Browser: [e.g. Chrome, Firefox, Safari]
- Version: [e.g. 1.0.0]

**Additional context**
Any other context about the problem.
```

## Coding Standards

### TypeScript/JavaScript

- Use TypeScript for all new code
- Follow ESLint configuration
- Use meaningful variable and function names
- Add JSDoc comments for public APIs
- Prefer functional components over class components
- Use hooks for state management

### React

- Use functional components with hooks
- Implement proper error boundaries
- Follow accessibility guidelines (WCAG 2.1 AA)
- Use semantic HTML elements
- Implement proper loading and error states

### CSS/Styling

- Use Tailwind CSS utility classes
- Follow mobile-first responsive design
- Use CSS custom properties for theming
- Ensure proper contrast ratios
- Test with different screen sizes

### File Organization

```
src/
├── app/                 # Next.js App Router pages
├── components/          # Reusable components
│   ├── ui/             # Basic UI components
│   ├── auth/           # Authentication components
│   ├── learning/       # Learning-specific components
│   └── layout/         # Layout components
├── lib/                # Utility functions and configurations
├── store/              # Zustand stores
├── types/              # TypeScript type definitions
└── content/            # JSON content files
```

## Testing

### Unit Tests

- Write tests for all utility functions
- Test component rendering and behavior
- Mock external dependencies
- Aim for >80% code coverage

### Integration Tests

- Test component interactions
- Test API integrations
- Test state management

### End-to-End Tests

- Test critical user flows
- Test authentication flows
- Test learning progress tracking
- Test responsive design

### Test Files

- Unit tests: `__tests__/` directory
- E2E tests: `e2e/` directory
- Test utilities: `__tests__/utils/`

## Documentation

### Code Documentation

- Document all public APIs
- Use JSDoc for functions and classes
- Include usage examples
- Document complex algorithms

### User Documentation

- Keep README.md updated
- Document new features
- Provide setup instructions
- Include troubleshooting guides

### API Documentation

- Document all API endpoints
- Include request/response examples
- Document error codes
- Keep OpenAPI specs updated

## Release Process

### Versioning

We follow [Semantic Versioning](https://semver.org/):
- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

### Release Checklist

- [ ] All tests pass
- [ ] Documentation updated
- [ ] Version bumped
- [ ] Changelog updated
- [ ] Release notes prepared

## Getting Help

- **Discord**: Join our community Discord
- **Issues**: Create a GitHub issue
- **Discussions**: Use GitHub Discussions for questions
- **Email**: Contact maintainers directly

## Recognition

Contributors will be recognized in:
- CONTRIBUTORS.md file
- Release notes
- Project documentation
- Community highlights

Thank you for contributing to TraycerGreek! 🏛️
