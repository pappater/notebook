import React, { useState, useEffect } from 'react';
import './QuoteDisplay.css';

function QuoteDisplay({ darkMode }) {
  const [quote, setQuote] = useState({ text: 'Loading quote...', author: '' });

  useEffect(() => {
    // For now, using a fallback quote system since scraping nitch.com requires backend
    const quotes = [
      { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
      { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
      { text: "Life is 10% what happens to you and 90% how you react to it.", author: "Charles R. Swindoll" },
      { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
      { text: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle" },
      { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins" },
      { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
      { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" }
    ];

    const getQuoteOfTheDay = () => {
      const today = new Date().toDateString();
      const savedQuote = localStorage.getItem('daily-quote');
      const savedDate = localStorage.getItem('daily-quote-date');

      if (savedQuote && savedDate === today) {
        setQuote(JSON.parse(savedQuote));
      } else {
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        setQuote(randomQuote);
        localStorage.setItem('daily-quote', JSON.stringify(randomQuote));
        localStorage.setItem('daily-quote-date', today);
      }
    };

    getQuoteOfTheDay();
  }, []);

  return (
    <div className="quote-display">
      <h3>Quote of the Day</h3>
      <blockquote className="quote-text">"{quote.text}"</blockquote>
      {quote.author && <p className="quote-author">— {quote.author}</p>}
    </div>
  );
}

export default QuoteDisplay;
