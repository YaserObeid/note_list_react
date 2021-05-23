import React from "react";

const NoteForm = (promps) => {
  const {
    formTitle,
    title,
    content,
    titleChanged,
    contentChanched,
    submitClicked,
    submitInner,
  } = promps;

  return (
    <div>
      <h2>{formTitle}</h2>
      <div>
        <input
          name="title"
          className="form-input mb-30"
          type="text"
          placeholder="Title"
          value={title}
          onChange={titleChanged}
        />
        <textarea
          name="content"
          className="form-input"
          rows="8"
          placeholder="Inhalt ..."
          value={content}
          onChange={contentChanched}
        />
        <button className="button green" onClick={submitClicked}>
          {submitInner}
        </button>
      </div>
    </div>
  );
};

export default NoteForm;
