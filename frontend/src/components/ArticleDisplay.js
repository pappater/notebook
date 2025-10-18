import React, { useState, useEffect } from 'react';
import './ArticleDisplay.css';

function ArticleDisplay({ darkMode }) {
  const [article, setArticle] = useState({ title: 'Loading article...', content: '' });

  useEffect(() => {
    const fetchRandomArticle = async () => {
      const today = new Date().toDateString();
      const savedArticle = localStorage.getItem('daily-article');
      const savedDate = localStorage.getItem('daily-article-date');
      const lastFetchTime = localStorage.getItem('daily-article-time');

      // Check if we need to fetch a new article (after 6 AM)
      const now = new Date();
      const sixAM = new Date();
      sixAM.setHours(6, 0, 0, 0);

      const shouldFetchNew = !savedArticle || 
                            savedDate !== today || 
                            (lastFetchTime && new Date(lastFetchTime) < sixAM && now >= sixAM);

      if (!shouldFetchNew && savedArticle) {
        setArticle(JSON.parse(savedArticle));
        return;
      }

      try {
        // Fetch from the gist containing articles
        const response = await fetch('https://gist.githubusercontent.com/pappater/17c58ca69bfa6f204a353a76f21b7774/raw/');
        const data = await response.json();
        
        if (data && data.articles && data.articles.length > 0) {
          const randomArticle = data.articles[Math.floor(Math.random() * data.articles.length)];
          setArticle(randomArticle);
          localStorage.setItem('daily-article', JSON.stringify(randomArticle));
          localStorage.setItem('daily-article-date', today);
          localStorage.setItem('daily-article-time', now.toISOString());
        } else {
          // Fallback article
          const fallback = {
            title: "Welcome to Notebook",
            content: "Your daily companion for notes, tasks, and inspiration. Start by adding your first note or task above!"
          };
          setArticle(fallback);
        }
      } catch (error) {
        console.error('Error fetching article:', error);
        // Fallback article
        const fallback = {
          title: "Welcome to Notebook",
          content: "Your daily companion for notes, tasks, and inspiration. Start by adding your first note or task above!"
        };
        setArticle(fallback);
        localStorage.setItem('daily-article', JSON.stringify(fallback));
        localStorage.setItem('daily-article-date', today);
      }
    };

    fetchRandomArticle();
  }, []);

  return (
    <div className="article-display">
      <h3>Daily Article</h3>
      <h4 className="article-title">{article.title}</h4>
      <p className="article-content">{article.content}</p>
    </div>
  );
}

export default ArticleDisplay;
