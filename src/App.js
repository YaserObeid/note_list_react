import React, { useState } from "react";
import Preview from "./components/Preview";
import Message from "./components/Message";
import NotesContainer from "./components/Notes/NotesContainer";
import NotesList from "./components/Notes/NotesList";
import Note from "./components/Notes/Note";
import "./App.css";

function App() {
  const [notes, setnotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [creating, setCreating] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [editing, setEditing] = useState(false);

  //set the new title
  const onChangeTitleHandler = (e) => {
    setTitle(e.target.value);
  };
  //set the new content
  const onChangeContentHandler = (e) => {
    setContent(e.target.value);
  };
  // save the new note
  const savenoteHandler = () => {
    const note = {
      id: new Date(),
      title: title,
      content: content,
    };

    const updareNotes = [...notes, note];
    setnotes(updareNotes);
    setCreating(false);
    setSelectedNote(note.id);
    setContent('');
    setTitle('');
  };
  // to select a note
  const selectedNoteHandler = (notId)=> setSelectedNote(notId);
  //to view ( form: add new note)
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
            value={title}
            onChange={onChangeTitleHandler}
          />

          <textarea
            rows="10"
            name="content"
            className="form-input"
            placeholder="Notiz schreiben"
            value={content}
            onChange={onChangeContentHandler}
          />

          <a href="#" className="button green" onClick={savenoteHandler}>
            speischern
          </a>
        </div>
      </div>
    );
  };
  // to view the content of selected Note
  const getPreview = () => {
    if (notes.length === 0) {
      return <Message messageTitle="es git keine Notizen" />;
    }

    if (!selectedNote) {
      return <Message messageTitle="Bitte, Notiz auswählen" />;
    }

    const note = notes.find((note) => note.id === selectedNote);

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
          <h2>{note.title}</h2>
          <p>{note.content}</p>
        </div>
      </div>
    );
  };

  const addNoteHandler = () => setCreating(true);
  return (
    <div className="App">
      <NotesContainer>
        <NotesList>
          {notes.map( note => 
          <Note key ={note.id} 
            title={note.title}
            active ={note.id === selectedNote}
            clickedNote = {()=> selectedNoteHandler(note.id)}
            />)};

       
        <button className="add-btn" onClick={addNoteHandler}>+</button>
        </NotesList>
      </NotesContainer>
      <Preview className="preview-section">
        {creating ? getAddNote() : getPreview()}
      </Preview>
    </div>
  );
}

export default App;
