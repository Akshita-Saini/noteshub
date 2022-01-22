import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import { useNotes } from "../providers/NotesContextProvider";
import { COLORS } from "../utils/Constants";

function TakeNote() {
  const initialNote = {
    title: "",
    body: "",
    pin: false,
    date: "",
    color: "white",
    tag: "NONE",
    uuid: null,
  };
  const [note, setNote] = useState(initialNote);
  const [showNote, setShowNote] = useState(false);

  const {
    state: { tagOptions },
    dispatch,
  } = useNotes();

  function handleSubmit(event) {
    if (note.title !== "" || note.body !== "") {
      dispatch({
        type: "ADD_NOTE",
        payload: { ...note, date: new Date(), uuid: uuid() },
      });
    }
    setNote(initialNote);
  }

  function handleChange(event) {
    setNote({ ...note, [event.target.name]: event.target.value });
  }

  return (
    <div className="take-note">
      <div style={{ display: showNote ? "block" : "none" }}>
        <input
          className="take-note-title"
          type="text"
          placeholder="Title"
          value={note.title}
          name="title"
          onChange={handleChange}
        />
        <button
          className="take-note-pin"
          onClick={() => setNote({ ...note, pin: !note.pin })}
        >
          {note.pin ? "UNPIN" : "PIN"}
        </button>
      </div>
      <div>
        <textarea
          className="take-note-placeholder"
          type="text"
          placeholder="Take a note..."
          value={note.body}
          onClick={() => setShowNote(true)}
          name="body"
          onChange={handleChange}
        />
      </div>
      <div style={{ display: showNote ? "block" : "none" }}>
        <select onChange={handleChange} value={note.color} name="color">
          {COLORS.map((color) => {
            return <option value={color.value}>{color.name}</option>;
          })}
        </select>
        <select onChange={handleChange} value={note.tag} name="tag">
          {tagOptions.map((tag) => {
            return <option value={tag}>{tag}</option>;
          })}
        </select>
        <button
          onClick={(event) => {
            handleSubmit(event);
            setShowNote(false);
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export { TakeNote };
