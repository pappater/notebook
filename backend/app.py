from flask import Flask, jsonify, request, redirect, session, url_for
from flask_cors import CORS
from urllib.parse import urlencode
import requests
from bs4 import BeautifulSoup
import json
import os
import secrets
from datetime import datetime
from github import Github, InputFileContent


app = Flask(__name__)
CORS(app, supports_credentials=True, origins=["http://localhost:3000", "http://127.0.0.1:3000"])
app.secret_key = os.environ.get('FLASK_SECRET_KEY', secrets.token_hex(16))


# GitHub OAuth Config
GITHUB_CLIENT_ID = os.environ.get('GITHUB_CLIENT_ID', '')
GITHUB_CLIENT_SECRET = os.environ.get('GITHUB_CLIENT_SECRET', '')
GITHUB_OAUTH_CALLBACK = os.environ.get('GITHUB_OAUTH_CALLBACK', 'http://localhost:5000/auth/github/callback')
GITHUB_OAUTH_AUTHORIZE_URL = 'https://github.com/login/oauth/authorize'
GITHUB_OAUTH_TOKEN_URL = 'https://github.com/login/oauth/access_token'
GITHUB_API_USER_URL = 'https://api.github.com/user'
GITHUB_API_GISTS_URL = 'https://api.github.com/gists'
def get_user_token():
    return session.get('github_token')

def get_user_gist_id():
    gist_id = session.get('gist_id')
    token = get_user_token()
    if not token:
        return None
    g = Github(token)
    user = g.get_user()
    # Always search for existing gist if not present in session
    for gist in user.get_gists():
        if 'notebook-data.json' in gist.files:
            session['gist_id'] = gist.id
            return gist.id
    # If not found, clear session gist_id
    session.pop('gist_id', None)
    return None

def set_user_gist_id(gist_id):
    session['gist_id'] = gist_id

def clear_user_session():
    session.pop('github_token', None)
    session.pop('github_user', None)
    session.pop('gist_id', None)

# --- OAuth Endpoints ---
@app.route('/login/github')
def login_github():
    state = secrets.token_urlsafe(16)
    session['oauth_state'] = state
    params = {
        'client_id': GITHUB_CLIENT_ID,
        'redirect_uri': GITHUB_OAUTH_CALLBACK,
        'scope': 'gist',
        'state': state
    }
    url = f"{GITHUB_OAUTH_AUTHORIZE_URL}?{urlencode(params)}"
    return redirect(url)

@app.route('/auth/github/callback')
def github_callback():
    code = request.args.get('code')
    state = request.args.get('state')
    if not code or not state or state != session.get('oauth_state'):
        return 'Invalid state or code', 400
    # Exchange code for access token
    token_resp = requests.post(
        GITHUB_OAUTH_TOKEN_URL,
        headers={'Accept': 'application/json'},
        data={
            'client_id': GITHUB_CLIENT_ID,
            'client_secret': GITHUB_CLIENT_SECRET,
            'code': code,
            'redirect_uri': GITHUB_OAUTH_CALLBACK,
            'state': state
        }
    )
    token_json = token_resp.json()
    access_token = token_json.get('access_token')
    if not access_token:
        return 'Failed to get access token', 400
    # Get user info
    user_resp = requests.get(GITHUB_API_USER_URL, headers={
        'Authorization': f'token {access_token}',
        'Accept': 'application/json'
    })
    user_json = user_resp.json()
    session['github_token'] = access_token
    session['github_user'] = user_json
    # Redirect to frontend (adjust as needed)
    return redirect('http://localhost:3000/')

@app.route('/api/status')
def api_status():
    token = get_user_token()
    user = session.get('github_user')
    if token and user:
        return jsonify({'logged_in': True, 'user': user, 'token': token})
    else:
        return jsonify({'logged_in': False})

@app.route('/logout')
def logout():
    # Do NOT delete the gist, just clear session
    clear_user_session()
    return jsonify({'status': 'logged_out'})

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({'status': 'healthy', 'timestamp': datetime.now().isoformat()})

@app.route('/api/quote', methods=['GET'])
def get_quote():
    """Fetch quote from nitch.com"""
    try:
        response = requests.get('https://www.nitch.com/', timeout=10)
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Try to find quote element (this may need adjustment based on actual site structure)
        quote_element = soup.find('div', class_='quote') or soup.find('blockquote')
        
        if quote_element:
            quote_text = quote_element.get_text(strip=True)
            return jsonify({'quote': quote_text, 'source': 'nitch.com'})
        else:
            # Fallback quote
            return jsonify({
                'quote': 'The only way to do great work is to love what you do.',
                'author': 'Steve Jobs',
                'source': 'fallback'
            })
    except Exception as e:
        print(f"Error fetching quote: {e}")
        return jsonify({
            'quote': 'The only way to do great work is to love what you do.',
            'author': 'Steve Jobs',
            'source': 'fallback'
        }), 500

@app.route('/api/article', methods=['GET'])
def get_random_article():
    """Fetch random article from gist"""
    try:
        gist_url = 'https://gist.githubusercontent.com/pappater/17c58ca69bfa6f204a353a76f21b7774/raw/'
        response = requests.get(gist_url, timeout=10)
        data = response.json()
        
        if 'articles' in data and len(data['articles']) > 0:
            import random
            article = random.choice(data['articles'])
            return jsonify(article)
        else:
            return jsonify({
                'title': 'Welcome to Notebook',
                'content': 'Your daily companion for notes, tasks, and inspiration.'
            })
    except Exception as e:
        print(f"Error fetching article: {e}")
        return jsonify({
            'title': 'Welcome to Notebook',
            'content': 'Your daily companion for notes, tasks, and inspiration.'
        }), 500



if __name__ == '__main__':
    # Use debug mode only in development, not in production
    debug_mode = os.environ.get('FLASK_ENV') == 'development'
    app.run(debug=debug_mode, port=5000)
