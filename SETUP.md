# Notebook Application - Setup Guide

This guide will help you set up and deploy the Notebook application.

## Quick Start

### Running Locally

#### Frontend Only (Recommended for testing)
```bash
cd frontend
npm install
npm start
```
The app will open at `http://localhost:3000`

#### With Backend (Optional - for Gist sync)
1. **Start the backend:**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt

# Set environment variables (optional for Gist integration)
export GITHUB_TOKEN=your_token_here
export GIST_ID=your_gist_id_here
export FLASK_ENV=development

python app.py
```

2. **Start the frontend:**
```bash
cd frontend
npm install
npm start
```

## GitHub Pages Deployment

### Automatic Deployment (Recommended)

1. **Enable GitHub Pages:**
   - Go to your repository on GitHub
   - Navigate to Settings > Pages
   - Under "Build and deployment", select "GitHub Actions"

2. **Push to main branch:**
   ```bash
   git push origin main
   ```
   The GitHub Actions workflow will automatically build and deploy your app.

3. **Access your app:**
   - Your app will be available at: `https://[username].github.io/notebook/`

### Manual Deployment

If you prefer to deploy manually:

```bash
cd frontend
npm install
npm run build

# Install gh-pages globally if not already installed
npm install -g gh-pages

# Deploy
gh-pages -d build
```

## Configuration

### Environment Variables

Create a `.env` file in the `backend` directory:

```env
GITHUB_TOKEN=your_github_personal_access_token
GIST_ID=your_gist_id_for_data_storage
FLASK_ENV=development
```

**Note:** Never commit the `.env` file to version control!

### GitHub Gist Setup

To enable cross-device sync via GitHub Gist:

1. **Create a Personal Access Token:**
   - Go to GitHub Settings > Developer settings > Personal access tokens
   - Generate new token with `gist` scope
   - Copy and save the token securely

2. **Create a Gist:**
   - Go to https://gist.github.com/
   - Create a new public Gist
   - Name it `notebook-data.json`
   - Add initial content: `{"todos": [], "notes": []}`
   - Copy the Gist ID from the URL

3. **Configure the backend:**
   - Set `GITHUB_TOKEN` and `GIST_ID` in your `.env` file

## Features

### Current Implementation
- ✅ Todo list with full CRUD operations
- ✅ Note-taking with multiple notes support
- ✅ Real-time clock display
- ✅ Dark/Light mode toggle
- ✅ Year progress indicator
- ✅ Daily quotes
- ✅ Daily article display
- ✅ Hamburger menu navigation
- ✅ LocalStorage data persistence
- ✅ Responsive design

### Backend Integration (Optional)
- ⚙️ GitHub Gist sync for cross-device data
- ⚙️ Quote scraping from nitch.com
- ⚙️ Random article fetching from curated gist

## Customization

### Adding Navigation Links

Edit `frontend/src/components/HamburgerMenu.js`:

```javascript
const links = [
  { name: 'Your App', url: 'https://your-app.com' },
  { name: 'Another App', url: 'https://another-app.com' },
];
```

### Changing Color Scheme

Edit `frontend/src/App.css` to customize:
- `.light-mode { background-color: #ffffff; color: #000000; }`
- `.dark-mode { background-color: #1a1a1a; color: #ffffff; }`

### Adding More Quotes

Edit `frontend/src/components/QuoteDisplay.js` to add more quotes to the fallback array.

## Troubleshooting

### Build fails
- Make sure Node.js 18+ is installed
- Delete `node_modules` and `package-lock.json`, then run `npm install` again

### Data not persisting
- Check browser console for errors
- Ensure localStorage is enabled in your browser
- Clear browser cache and try again

### Backend connection issues
- Verify backend is running on port 5000
- Check CORS configuration if accessing from different origin
- Ensure environment variables are set correctly

## Production Considerations

### Security
- Never expose your GitHub token in client-side code
- Always run backend with `FLASK_ENV=production` in production
- Use HTTPS for all API endpoints
- Implement rate limiting for API routes

### Performance
- The app uses React for optimal performance
- LocalStorage keeps data access fast
- Build creates optimized production bundle

## Support

For issues or questions:
1. Check the main README.md
2. Review the code comments
3. Open an issue on GitHub

## License

MIT License - See LICENSE file for details
