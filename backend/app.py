from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup
import json
import os
from datetime import datetime
from github import Github

app = Flask(__name__)
CORS(app)

# Configuration
GIST_ID = os.environ.get('GIST_ID', '')
GITHUB_TOKEN = os.environ.get('GITHUB_TOKEN', '')

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
            'source': 'fallback',
            'error': str(e)
        })

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
            'content': 'Your daily companion for notes, tasks, and inspiration.',
            'error': str(e)
        })

@app.route('/api/data', methods=['GET'])
def get_data():
    """Fetch data from gist"""
    if not GITHUB_TOKEN or not GIST_ID:
        return jsonify({'error': 'Gist not configured'}), 400
    
    try:
        g = Github(GITHUB_TOKEN)
        gist = g.get_gist(GIST_ID)
        
        # Get notebook data file
        notebook_file = gist.files.get('notebook-data.json')
        if notebook_file:
            data = json.loads(notebook_file.content)
            return jsonify(data)
        else:
            return jsonify({'todos': [], 'notes': []})
    except Exception as e:
        print(f"Error fetching data: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/data', methods=['POST'])
def save_data():
    """Save data to gist"""
    if not GITHUB_TOKEN or not GIST_ID:
        return jsonify({'error': 'Gist not configured'}), 400
    
    try:
        data = request.json
        g = Github(GITHUB_TOKEN)
        gist = g.get_gist(GIST_ID)
        
        # Update the gist
        gist.edit(
            files={
                'notebook-data.json': {
                    'content': json.dumps(data, indent=2)
                }
            }
        )
        
        return jsonify({'status': 'success', 'message': 'Data saved to gist'})
    except Exception as e:
        print(f"Error saving data: {e}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
