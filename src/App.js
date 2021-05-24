import React, { useState, useEffect } from "react";
import Preview from "./components/Preview";
import Message from "./components/Message";
import NotesContainer from "./components/Notes/NotesContainer";
import NotesList from "./components/Notes/NotesList";
import Note from "./components/Notes/Note";
import "./App.css";
import NoteForm from "./components/Notes/NoteForm";
import Alert from "./components/Alert";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [creating, setCreating] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [editing, setEditing] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("notes")) {
      setNotes(JSON.parse(localStorage.getItem("notes")));
    } else {
      localStorage.setItem("notes", JSON.stringify([]));
    }
  }, []);

  useEffect(() => {
    if (validationErrors.length !== 0)
      setTimeout(() => {
        setValidationErrors([]);
      }, 3000);
  }, [validationErrors]);
  //save the notes to local sotrage
  const saveTolocalstorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  //set the new title
  const changeTitleHandler = (e) => {
    setTitle(e.target.value);
  };
  //set the new content
  const changeContentHandler = (e) => {
    setContent(e.target.value);
  };
  //save the new note
  const saveNoteHandler = () => {
    if (!validate()) return;
    const note = {
      id: new Date(),
      title: title,
      content: content,
    };
    const updatedNotes = [...notes, note];
    saveTolocalstorage("notes", updatedNotes);
    setNotes(updatedNotes);
    setCreating(false);
    setSelectedNote(note.id);
    setContent("");
    setTitle("");
  };

  // to select a note
  const selectedNoteHandler = (notId) => {
    setSelectedNote(notId);
    setEditing(false);
    setCreating(false);
  };

  //change to editing the selected note
  const editNotHandler = () => {
    const note = notes.find((note) => note.id === selectedNote);
    setEditing(true);
    setTitle(note.title);
    setContent(note.content);
  };
  //update a note
  const updateNoteHandler = () => {
    if (!validate()) return;
    const updatedNotes = [...notes];
    const noteIndex = notes.findIndex((note) => note.id === selectedNote);
    updatedNotes[noteIndex] = {
      id: selectedNote, //the same id of old note
      title: title,
      content: content,
    };
    updatedNotes("notes", updatedNotes);
    setNotes(updatedNotes);
    setContent("");
    setTitle("");
    setEditing(false);
  };
  //change to add a new note
  const addNoteHandler = () => {
    setCreating(true);
    setEditing(false);
    setContent("");
    setTitle("");
  };

  // delete the selected note
  const deleteNoteHandler = () => {
    const updateNotes = [...notes];
    const noteIndex = updateNotes.findIndex((note) => note.id === selectedNote);
    notes.splice(noteIndex, 1);
    saveTolocalstorage("notes", notes);
    setNotes(notes);
    setSelectedNote(null);
  };

  //validation the input errors
  const validate = () => {
    const errorMessages = [];
    let validInput = true;
    if (!title) {
      errorMessages.push("Bitte, den Title eingeben! ");
      validInput = false;
    }
    if (!content) {
      errorMessages.push("Bitte, den Inhalt eingeben! ");
      validInput = false;
    }
    setValidationErrors(errorMessages);
    return validInput;
  };

  //to view ( form: add new note)
  const getAddNote = () => {
    return (
      <NoteForm
        formTitle="Notiz einfügen"
        title={title}
        content={content}
        titleChanged={changeTitleHandler}
        contentChanched={changeContentHandler}
        submitClicked={saveNoteHandler}
        submitInner="speichern"
      />
    );
  };

  // to view the content of selected Note
  const getPreview = () => {
    if (notes.length === 0) return <Message message="Es gibt keine Notizen" />;

    if (!selectedNote) return <Message message="Bitte, Notiz auswählen" />;

    const note = notes.find((note) => note.id === selectedNote);

    // to view note editing
    let noteDisplay = (
      <div>
        <h2>{note.title}</h2>
        <p>{note.content}</p>
      </div>
    );

    if (editing)
      noteDisplay = (
        <NoteForm
          formTitle="Notiz bearbriten"
          title={title}
          content={content}
          titleChanged={changeTitleHandler}
          contentChanched={changeContentHandler}
          submitClicked={updateNoteHandler}
          submitInner="aktualisieren"
        />
      );

    return (
      <div>
        {!editing && (
          <div className="note-operations">
            <a id="editIcon" href="#">
              <i className="fa fa-pencil-alt" onClick={editNotHandler} />
            </a>
            <a id="deletIcon" href="#">
              <i className="fa fa-trash" onClick={deleteNoteHandler} />
            </a>
          </div>
        )}
        {noteDisplay}
      </div>
    );
  };

  return (
    <div className="App">
      <NotesContainer>
        <NotesList>
          {notes.map((note) => (
            <Note
              key={note.id}
              title={note.title}
              active={note.id === selectedNote}
              clickedNote={() => selectedNoteHandler(note.id)}
            />
          ))}
          <button className="add-btn" onClick={addNoteHandler}>
            +
          </button>
        </NotesList>
      </NotesContainer>
      <Preview className="preview-section">
        {creating ? getAddNote() : getPreview()}
      </Preview>
      {validationErrors.length !== 0 && (
        <Alert validationMessages={validationErrors} />
      )}
    </div>
  );
}

export default App;
