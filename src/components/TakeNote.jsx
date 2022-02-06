import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import { useNotes } from "../providers/NotesContextProvider";
import { initialNote } from "../utils/Constants";
import { PinFillIcon, PinOutlineIcon } from "../images/index";
import { takeNoteStyle, takeNoteTextareaStyle } from "../utils/styles.jsx";
import { ColorOptions } from "./ColorOptions";

function TakeNote() {
  const [note, setNote] = useState(initialNote);
  const [showNote, setShowNote] = useState(false);

  const {
    state: { tagOptions },
    dispatch,
  } = useNotes();

  function handleSubmit() {
    if (note.title.trim() !== "" || note.body.trim() !== "") {
      dispatch({
        type: "ADD_NOTE",
        payload: { ...note, date: new Date(), uuid: uuid() },
      });
    }
    setNote(initialNote);
    setShowNote(false);
  }

  function handleChange(event) {
    setNote({ ...note, [event.target.name]: event.target.value.trim() });
  }

  return (
    <div className="take-note" 
      style={ !showNote? {}: { ...takeNoteStyle, backgroundColor: `${note.color}` } }>
      <div className="take-note-header" style={{ display: showNote ? "flex" : "none" }}>
        <input
          className="take-note-title"
          type="text"
          placeholder="Title"
          value={ note.title }
          name="title"
          onChange={ handleChange }
        />
        <button
          className="note-pin"
          onClick={() => setNote({ ...note, pin: !note.pin })}
        >
          {note.pin ? <PinFillIcon className="pin-fill"/>  : <PinOutlineIcon className="pin-outline"/>}
        </button>
      </div>
      <textarea
        className="take-note-textarea"
        type="text"
        placeholder="Take a note..."
        value={note.body}
        onClick={() => setShowNote(true)}
        name="body"
        onChange={ handleChange }
        style={ showNote? { fontSize: "1.05rem" }: { ...takeNoteTextareaStyle } }
      />
      <div className="take-note-footer" style={{ display: showNote ? "flex" : "none" }}>
        <ColorOptions note={note} setNote={setNote} />
        <select className="tag-select" onChange={ handleChange } value={ note.tag } name="tag">
            {
              tagOptions.map((tag) => {
                return <option value={ tag }> { tag } </option>;
              })
            }
        </select>
        <button className="note-close-btn" onClick={ handleSubmit }>
          Close
        </button>
      </div>
    </div>
  );
}

export { TakeNote };
