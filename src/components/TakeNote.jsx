import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import { useNotes } from "../providers/NotesContextProvider";
import { COLORS, initialNote } from "../utils/Constants";
import { ReactComponent as PinFill } from "../images/pin-fill.svg";
import { ReactComponent as PinOutline } from "../images/pin-outline.svg";
import { ReactComponent as ColorPaletteIcon } from "../images/color-palette-icon.svg";
import { takeNoteStyle, takeNoteTextareaStyle } from "../utils/styles.jsx";

function TakeNote() {
  const [note, setNote] = useState(initialNote);
  const [showNote, setShowNote] = useState(false);
  const [isColorPaletteOpen, setIsColorPaletteOpen ]=useState(false);

  const {
    state: { tagOptions },
    dispatch,
  } = useNotes();

  function toggleColorPalette(){
    setIsColorPaletteOpen(isColorPaletteOpen => !isColorPaletteOpen);
  }

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

  function handleColorChange(color){
    setNote({...note, color:color});
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
          className="take-note-pin"
          onClick={() => setNote({ ...note, pin: !note.pin })}
        >
          {note.pin ? <PinFill className="pin-fill"/>  : <PinOutline className="pin-outline"/>}
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
        <div onMouseEnter={ toggleColorPalette }>
          <ColorPaletteIcon className="color-palette-icon" />
          {
            isColorPaletteOpen &&    
              <div className="color-box">
               {
                 COLORS.map(color => {
                   return <div className="color" style={{ backgroundColor: `${color.value}` }} onClick={() => handleColorChange(color.value)}></div>;
                 })
               }
              </div>
          }
        </div>
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
