import React, { useState, useEffect } from 'react';
import './App.css';
import Clock from './components/Clock';
import TodoList from './components/TodoList';
import NoteEditor from './components/NoteEditor';
import HamburgerMenu from './components/HamburgerMenu';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [todos, setTodos] = useState([]);
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);

  useEffect(() => {
    // Load data from localStorage (temporary until Gist integration)
    const savedTodos = localStorage.getItem('notebook-todos');
    const savedNotes = localStorage.getItem('notebook-notes');
    const savedDarkMode = localStorage.getItem('notebook-darkmode');
    
    if (savedTodos) setTodos(JSON.parse(savedTodos));
    if (savedNotes) setNotes(JSON.parse(savedNotes));
    if (savedDarkMode) setDarkMode(JSON.parse(savedDarkMode));
  }, []);

  useEffect(() => {
    // Save data to localStorage
    localStorage.setItem('notebook-todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem('notebook-notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('notebook-darkmode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`app ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="header">
        <h1>Notebook</h1>
        <div className="header-actions">
          <button className="theme-toggle" onClick={toggleDarkMode}>
            {darkMode ? '☀️' : '🌙'}
          </button>
          <HamburgerMenu darkMode={darkMode} />
        </div>
      </div>

      <Clock />
      
      <div className="main-content">
        <div className="center-panel">
          <TodoList todos={todos} setTodos={setTodos} darkMode={darkMode} />
          <NoteEditor 
            notes={notes} 
            setNotes={setNotes} 
            currentNote={currentNote}
            setCurrentNote={setCurrentNote}
            darkMode={darkMode}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
