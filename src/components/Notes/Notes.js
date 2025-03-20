import React, { useState, useEffect } from 'react';
import { supabase } from '../../config/supabase';
import '../../styles/Notes.css';
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [newNote, setNewNote] = useState({ title: '', content: '' });
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);

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

  const handleEdit = (note) => {
    setSelectedNote(note);
    setNewNote({ title: note.title, content: note.content });
    setIsEditing(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!newNote.title || !newNote.content) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const { error } = await supabase
        .from('notes')
        .update({
          title: newNote.title,
          content: newNote.content,
        })
        .match({ id: selectedNote.id });

      if (error) throw error;

      setNotes(notes.map(note =>
        note.id === selectedNote.id
          ? { ...note, title: newNote.title, content: newNote.content }
          : note
      ));
      setNewNote({ title: '', content: '' });
      setSelectedNote(null);
      setIsEditing(false);
      setError('');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="notes-container">
      <div className="notes-sidebar">
        <button className="add-note-button" onClick={() => {
          setSelectedNote(null);
          setNewNote({ title: '', content: '' });
          setIsEditing(false);
        }}>
          <FaPlus /> New Note
        </button>
        <div className="notes-list">
          {notes.map(note => (
            <div
              key={note.id}
              className={`note-item ${selectedNote?.id === note.id ? 'selected' : ''}`}
              onClick={() => handleEdit(note)}
            >
              <h4>{note.title}</h4>
              <p>{note.content.substring(0, 50)}...</p>
            </div>
          ))}
        </div>
      </div>

      <div className="notes-content">
        <form onSubmit={isEditing ? handleUpdate : handleSubmit} className="note-form">
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
          <div className="note-actions">
            <button type="submit" className="submit-button">
              {isEditing ? 'Update Note' : 'Add Note'}
            </button>
            {selectedNote && (
              <button
                type="button"
                onClick={() => handleDelete(selectedNote.id)}
                className="delete-button"
              >
                <FaTrash /> Delete
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Notes;