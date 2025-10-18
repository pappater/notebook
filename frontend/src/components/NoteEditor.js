import React, { useState } from 'react';
import './NoteEditor.css';

function NoteEditor({ notes, setNotes, currentNote, setCurrentNote, darkMode }) {
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');

  const createNewNote = () => {
    if (noteTitle.trim()) {
      const note = {
        id: Date.now(),
        title: noteTitle,
        content: noteContent,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setNotes([...notes, note]);
      setCurrentNote(note);
      setNoteTitle('');
      setNoteContent('');
    }
  };

  const selectNote = (note) => {
    setCurrentNote(note);
    setNoteTitle(note.title);
    setNoteContent(note.content);
  };

  const updateNote = () => {
    if (currentNote && noteTitle.trim()) {
      setNotes(notes.map(note => 
        note.id === currentNote.id 
          ? { ...note, title: noteTitle, content: noteContent, updatedAt: new Date().toISOString() }
          : note
      ));
      setCurrentNote({ ...currentNote, title: noteTitle, content: noteContent });
    }
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
    if (currentNote && currentNote.id === id) {
      setCurrentNote(null);
      setNoteTitle('');
      setNoteContent('');
    }
  };

  const newNoteForm = () => {
    setCurrentNote(null);
    setNoteTitle('');
    setNoteContent('');
  };

  return (
    <div className="note-editor">
      <div className="note-header">
        <h2>Notes</h2>
        <button onClick={newNoteForm} className="new-note-btn">+ New Note</button>
      </div>

      <div className="note-list">
        {notes.map(note => (
          <div 
            key={note.id} 
            className={`note-list-item ${currentNote && currentNote.id === note.id ? 'active' : ''}`}
            onClick={() => selectNote(note)}
          >
            <span className="note-title">{note.title}</span>
            <button 
              onClick={(e) => { e.stopPropagation(); deleteNote(note.id); }} 
              className="delete-note-btn"
            >
              ✗
            </button>
          </div>
        ))}
      </div>

      <div className="note-form">
        <input
          type="text"
          value={noteTitle}
          onChange={(e) => setNoteTitle(e.target.value)}
          placeholder="Note title..."
          className="note-title-input"
        />
        <textarea
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
          placeholder="Take your notes here..."
          className="note-content-input"
          rows="10"
        />
        <button 
          onClick={currentNote ? updateNote : createNewNote} 
          className="save-note-btn"
        >
          {currentNote ? 'Update Note' : 'Create Note'}
        </button>
      </div>
    </div>
  );
}

export default NoteEditor;
