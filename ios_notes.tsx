import { useState } from 'react';

const NotesApp = () => {
  const [notes, setNotes] = useState<{ id: number; title: string; content: string }[]>([]);
  const [selectedNote, setSelectedNote] = useState<{ id: number; title: string; content: string } | null>(null);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');

  // Add a new note
  const addNote = () => {
    const newNote = { id: Date.now(), title: 'New Note', content: '' };
    setNotes([newNote, ...notes]);
    setSelectedNote(newNote);
    setTitle(newNote.title);
    setContent(newNote.content);
  };

  // Update the selected note
  const updateNote = (id: number, newTitle: string, newContent: string) => {
    setNotes(notes.map(note => (note.id === id ? { ...note, title: newTitle, content: newContent } : note)));
  };

  // Delete the selected note
  const deleteNote = (id: number) => {
    setNotes(notes.filter(note => note.id !== id));
    setSelectedNote(null);
    setTitle('');
    setContent('');
  };

  // Save changes to the note
  const saveNote = () => {
    if (selectedNote) {
      updateNote(selectedNote.id, title, content);
    }
  };

  // Select a note to edit
  const selectNote = (note: { id: number; title: string; content: string }) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
  };

  return (
    <div className="container">
      <aside className="sidebar">
        <h2>Notes</h2>
        <button onClick={addNote}>+ New Note</button>
        <ul className="note-list">
          {notes.map(note => (
            <li
              key={note.id}
              className={note.id === selectedNote?.id ? 'active' : ''}
              onClick={() => selectNote(note)}
            >
              <strong>{note.title}</strong>
              <p>{note.content.slice(0, 20)}...</p>
            </li>
          ))}
        </ul>
      </aside>

      <main className="note-editor">
        {selectedNote ? (
          <>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              onBlur={saveNote}
              className="note-title"
              placeholder="Note title..."
            />
            <textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              onBlur={saveNote}
              className="note-content"
              placeholder="Write your note here..."
            ></textarea>
            <button onClick={() => deleteNote(selectedNote.id)} className="delete-button">Delete</button>
          </>
        ) : (
          <p className="no-note">Select or create a note to begin.</p>
        )}
      </main>

      <style jsx>{`
        .container {
          display: flex;
          height: 100vh;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          color: #333;
        }
        .sidebar {
          width: 30%;
          background: #f7f7f7;
          padding: 20px;
          border-right: 1px solid #ddd;
          display: flex;
          flex-direction: column;
        }
        .sidebar h2 {
          font-size: 1.4rem;
          margin-bottom: 1rem;
        }
        .sidebar button {
          background: #007aff;
          border: none;
          color: white;
          padding: 10px;
          font-size: 1rem;
          border-radius: 8px;
          cursor: pointer;
          margin-bottom: 1rem;
        }
        .note-list {
          list-style: none;
          padding: 0;
          overflow-y: auto;
          flex-grow: 1;
        }
        .note-list li {
          padding: 10px;
          border-radius: 5px;
          margin-bottom: 5px;
          cursor: pointer;
        }
        .note-list li.active {
          background: #e2e2ff;
        }
        .note-list li:hover {
          background: #ececec;
        }
        .note-list strong {
          display: block;
        }
        .note-editor {
          width: 70%;
          padding: 20px;
          display: flex;
          flex-direction: column;
        }
        .note-title {
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 10px;
          border: none;
          outline: none;
          border-bottom: 1px solid #ddd;
          padding: 5px;
        }
        .note-content {
          flex-grow: 1;
          border: none;
          outline: none;
          padding: 10px;
          font-size: 1rem;
          resize: none;
        }
        .no-note {
          font-size: 1.2rem;
          color: #888;
          text-align: center;
          margin-top: 20px;
        }
        .delete-button {
          background: #ff3b30;
          color: white;
          border: none;
          padding: 10px;
          border-radius: 8px;
          font-size: 1rem;
          cursor: pointer;
          margin-top: 10px;
        }
      `}</style>
    </div>
  );
};

export default NotesApp;
