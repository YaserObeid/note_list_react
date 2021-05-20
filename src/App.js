import React, { useState } from "react";
import Preview from './components/Preview'
import "./App.css";

function App() {
  const [notes, setnotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [creating, setCreating] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [editing, setEditing] = useState(false);

  //to view (add new note)
  const getAddNote = () => {
    return (
      <div>
        <h2>Notiz Einfügen</h2>
        <div>
          <input
            type="text"
            name="title"
            className="form-input mb-30"
            placeholder="Notiz-Title"
            value=""
          />

          <textarea
            rows="10"
            name="content"
            className="form-input"
            placeholder="Notiz schreiben"
          />

          <a href="#" className="button green">
            speischern
          </a>
        </div>
      </div>
    );
  };
  // to view the content of selected Note
  const getPreview = () => {
    return (
      <div>
        <div className="note-operations">
          <a id="editIcon" href="#">
            <i className="fa fa-pencil-alt" />
          </a>
          <a id="deletIcon" href="#">
            <i className="fa fa-trash" />
          </a>
        </div>
        <div>
          <h2>Muster-Titel</h2>
          <p>Muster-Text</p>
        </div>
      </div>
    );
  };

  const addNoteHandler = () => setCreating(true);
  return (
    <div className="App">
      <div className="notes-section">
        <ul className="notes-list">
          <li className="note-item">Notiz Num. 1</li>
          <li className="note-item">Notiz Num. 2</li>
          <li className="note-item">Notiz Num. 3</li>
          <li className="note-item">Notiz Num. 4</li>
        </ul>
        <button className="add-btn" onClick={addNoteHandler}>
          +
        </button>
      </div>
      <Preview className="preview-section">
        {creating ? getAddNote() : getPreview()}
      </Preview>
    </div>
  );
}

export default App;
