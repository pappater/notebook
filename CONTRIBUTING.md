# Contributing to Notebook

Thank you for your interest in contributing to the Notebook application! This document provides guidelines for contributing to the project.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/notebook.git`
3. Create a new branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Test your changes thoroughly
6. Commit your changes: `git commit -m "Add your feature"`
7. Push to your fork: `git push origin feature/your-feature-name`
8. Create a Pull Request

## Development Setup

### Prerequisites
- Node.js 18 or higher
- Python 3.8 or higher
- Git

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

## Code Style

### JavaScript/React
- Use functional components with hooks
- Follow React best practices
- Use meaningful variable and function names
- Add comments for complex logic
- Keep components small and focused

### Python
- Follow PEP 8 style guide
- Use descriptive variable names
- Add docstrings to functions
- Handle exceptions appropriately
- Avoid exposing sensitive information in errors

### CSS
- Use BEM naming convention where applicable
- Keep selectors simple and maintainable
- Avoid inline styles unless necessary
- Use CSS variables for theme colors

## Testing

Before submitting a PR:

1. Test all features manually
2. Ensure the app builds successfully: `npm run build`
3. Check for console errors
4. Test in both light and dark modes
5. Verify responsive design on mobile

## Commit Messages

Use clear and descriptive commit messages:
- ✅ Good: "Add edit functionality to todo items"
- ❌ Bad: "Update files"

Format:
```
Add feature X to component Y

- Detail 1
- Detail 2
```

## Pull Request Guidelines

1. **Title**: Clear and descriptive
2. **Description**: Explain what changes you made and why
3. **Screenshots**: Include screenshots for UI changes
4. **Testing**: Describe how you tested your changes
5. **Breaking Changes**: Clearly mark any breaking changes

## Areas for Contribution

### Features
- [ ] Gist integration for data sync
- [ ] Export/import functionality
- [ ] Search functionality for notes
- [ ] Categories/tags for todos and notes
- [ ] Keyboard shortcuts
- [ ] Mobile app wrapper
- [ ] Markdown support for notes
- [ ] Reminders for todos

### Improvements
- [ ] Better error handling
- [ ] Accessibility improvements
- [ ] Performance optimizations
- [ ] Better mobile responsiveness
- [ ] Additional themes
- [ ] Internationalization (i18n)

### Documentation
- [ ] API documentation
- [ ] Component documentation
- [ ] Video tutorials
- [ ] More code examples

## Security

If you discover a security vulnerability:
1. **DO NOT** open a public issue
2. Email the details to the repository owner
3. Wait for a response before disclosing publicly

## Questions?

Feel free to open an issue for:
- Bug reports
- Feature requests
- Questions about the codebase
- Suggestions for improvements

## Code of Conduct

### Our Pledge
We are committed to providing a welcoming and inspiring community for all.

### Our Standards
- Be respectful and inclusive
- Accept constructive criticism gracefully
- Focus on what is best for the community
- Show empathy towards other community members

### Unacceptable Behavior
- Harassment or discrimination of any kind
- Trolling or insulting comments
- Public or private harassment
- Publishing others' private information

Thank you for contributing to Notebook! 🎉
