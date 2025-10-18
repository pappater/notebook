# Notebook - Your Daily Companion

A minimalistic note-taking and todo list application with a clean black & white UI. Built with React and Python, designed to be your everyday companion.

![Notebook App](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## Features

- ✅ **Todo List Management**: Add, edit, delete, and mark tasks as complete
- 📝 **Note-Taking**: Create and manage multiple notes with rich text editing
- 🕐 **Real-time Clock**: Numbered clock display updating every second
- 🌓 **Dark/Light Mode**: Toggle between dark and light themes
- 💭 **Daily Quotes**: Inspiring quotes fetched daily
- 📰 **Random Articles**: Daily random article from curated collection
- 📊 **Year Progress**: Visual representation of how much of the year has passed
- 🍔 **Hamburger Menu**: Quick access to other applications (Yearigy, Blog, Articlay)
- 💾 **Data Persistence**: All data stored locally (with Gist integration option)
- 🎨 **Minimalistic Design**: Clean black and white aesthetic

## Project Structure

```
notebook/
├── frontend/           # React application
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Clock.js
│   │   │   ├── TodoList.js
│   │   │   ├── NoteEditor.js
│   │   │   ├── HamburgerMenu.js
│   │   │   ├── YearProgress.js
│   │   │   ├── QuoteDisplay.js
│   │   │   └── ArticleDisplay.js
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── backend/            # Python Flask API
│   ├── app.py
│   ├── requirements.txt
│   └── .env.example
└── .github/
    └── workflows/
        └── deploy.yml  # GitHub Pages deployment
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Python 3.8+
- Git

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Backend Setup (Optional - for Gist integration)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Create a `.env` file from the example:
   ```bash
   cp .env.example .env
   ```

5. Configure your environment variables:
   - `GITHUB_TOKEN`: Your GitHub personal access token
   - `GIST_ID`: Your GitHub Gist ID for data storage

6. Run the Flask server:
   ```bash
   python app.py
   ```

## Deployment to GitHub Pages

The application is configured to automatically deploy to GitHub Pages when you push to the main branch.

### Setup GitHub Pages

1. Go to your repository settings
2. Navigate to "Pages" section
3. Under "Build and deployment", select "GitHub Actions"
4. The workflow will automatically deploy on push to main

### Manual Deployment

You can also deploy manually:

```bash
cd frontend
npm run build
npm install -g gh-pages
npm run deploy
```

## Usage

### Adding Tasks
1. Type your task in the input field under "Todo List"
2. Press Enter or click the "+" button
3. Check the checkbox to mark as complete
4. Click the edit icon to modify or delete icon to remove

### Creating Notes
1. Click "+ New Note" button
2. Enter a title and content
3. Click "Create Note" to save
4. Select existing notes from the list to edit them

### Theme Toggle
- Click the sun/moon icon in the header to switch between light and dark modes
- Your preference is saved automatically

### Navigation
- Click the hamburger menu (☰) in the top-left to access links to other applications

## Data Persistence

By default, all data is stored in the browser's localStorage. For cross-device synchronization:

1. Set up the Python backend with Gist integration
2. Create a public Gist to store your data
3. Configure the backend with your GitHub token and Gist ID
4. The app will sync data to your Gist

## Features in Detail

### Clock
- Displays current time with hours, minutes, and seconds
- Updates every second
- Shows full date below the time

### Year Progress
- Calculates the percentage of the year completed
- Visual progress bar
- Updates hourly

### Daily Quote
- New quote every day
- Cached to avoid repeated API calls
- Fallback quotes available

### Random Article
- Fetches random article from configured Gist
- Updates daily at 6 AM
- Persistent across browser sessions

## Customization

### Styling
The app uses CSS variables for easy customization. Edit `App.css` to change:
- Colors
- Fonts
- Spacing
- Border styles

### Adding More Links
Edit `HamburgerMenu.js` to add more application links:

```javascript
const links = [
  { name: 'Your App', url: 'https://your-app.com' },
  // Add more links here
];
```

## Technologies Used

- **Frontend**: React 19, CSS3
- **Backend**: Python, Flask, BeautifulSoup
- **Storage**: LocalStorage, GitHub Gist (optional)
- **Deployment**: GitHub Pages, GitHub Actions
- **API Integration**: GitHub API, Web Scraping

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Acknowledgments

- Inspired by minimalistic note-taking apps
- Quotes from various sources
- Built with love for productivity enthusiasts

## Contact

For questions or feedback, please open an issue on GitHub.

---

Made with ❤️ for daily productivity