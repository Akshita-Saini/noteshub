import { useState } from "react";
import { useNotes } from "../providers/NotesContextProvider";
import { PinFillIcon, PinOutlineIcon } from "../images/index";
import { ColorOptions, TagOptions } from "./index";

function EditNote() {
  const {
    state: { editNote },
    dispatch,
  } = useNotes();

  const [note, setNote] = useState({...editNote.note});
 
  function handleSubmit(event) {
    event.preventDefault();
    if (note.title.trim() !== "" && note.body.trim() !== "") {
      dispatch({type: "SAVE_EDITED_NOTE", payload: note});
    }
  }

  function handleChange(event) {
    setNote({ ...note, [event.target.name]: event.target.value.trim() });
  }

  function handlePinChange(){
      dispatch({type: "TOGGLE_NOTE_PIN", payload: note});
      setNote({ ...note, pin: !note.pin }); 
  }

  return (
    <div className="outer-div-modal">
      <div className="inner-div-modal" style={{ backgroundColor: `${note.color}` }}>
        <div className="edit-note-header">
          <input
            className="edit-note-title"
            type="text"
            name="title"
            value={ note.title }
            onChange={ handleChange }
          />
          <button
            className="note-pin"
            onClick={ handlePinChange }
          >
            { note.pin? <PinFillIcon className="pin-fill"/>  : <PinOutlineIcon className="pin-outline"/> }
          </button>
        </div>
        <textarea
            className="edit-note-textarea"
            type="text"
            name="body"
            value={ note.body }
            onChange={ handleChange }
        />
        <div className="edit-note-footer">
          <ColorOptions note={note} setNote={setNote} />
          <TagOptions note={note} setNote={setNote} />
          <button
            className="update-btn"
            onClick={ handleSubmit }
          >
            Update
          </button>
        </div>
      </div>
      ;
    </div>
  );
}

export { EditNote };
