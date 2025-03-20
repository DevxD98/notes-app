import React, { useState, useEffect } from 'react';
import { supabase } from '../../config/supabase';
import '../../styles/Notes.css';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: '', content: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const { data: notes, error } = await supabase
        .from('notes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setNotes(notes);
    } catch (error) {
      console.error('Error fetching notes:', error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewNote(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newNote.title || !newNote.content) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('notes')
        .insert([{
          title: newNote.title,
          content: newNote.content,
          user_id: supabase.auth.user()?.id
        }]);

      if (error) throw error;

      setNotes([data[0], ...notes]);
      setNewNote({ title: '', content: '' });
      setError('');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDelete = async (noteId) => {
    try {
      const { error } = await supabase
        .from('notes')
        .delete()
        .match({ id: noteId });

      if (error) throw error;

      setNotes(notes.filter(note => note.id !== noteId));
    } catch (error) {
      console.error('Error deleting note:', error.message);
    }
  };

  return (
    <div className="notes-container">
      <form onSubmit={handleSubmit} className="note-form">
        <input
          type="text"
          name="title"
          placeholder="Note Title"
          value={newNote.title}
          onChange={handleInputChange}
          className="note-input"
        />
        <textarea
          name="content"
          placeholder="Note Content"
          value={newNote.content}
          onChange={handleInputChange}
          className="note-textarea"
        />
        {error && <div className="error-message">{error}</div>}
        <button type="submit" className="submit-button">Add Note</button>
      </form>

      <div className="notes-grid">
        {notes.map(note => (
          <div key={note.id} className="note-card">
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <button
              onClick={() => handleDelete(note.id)}
              className="delete-button"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notes;