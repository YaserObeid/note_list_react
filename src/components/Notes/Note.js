import React from "react";

const Note = (props) => {
  const { title, active, clickedNote } = props;
  return (
    <li className={`note-item ${active && "active"}`} 
        onClick={clickedNote}>
        {title}
    </li>
  );
};

export default Note;
