import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import { useNotes } from "../providers/NotesContextProvider";
import { COLORS } from "../utils/Constants";

const initialNote = {
  title: "",
  body: "",
  pin: false,
  date: "",
  color: "#fff",
  tag: "NONE",
  uuid: null,
};

function TakeNote() {
  const [note, setNote] = useState(initialNote);
  const [showNote, setShowNote] = useState(false);
  const [isColorPaletteOpen, toggleColorPalette]=useState(false);

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

  function handleColorChange(color){
    console.log({...note, color:color});
    setNote({...note, color:color});
  }

  return (
    <div className="take-note" 
      style={!showNote?{
      }:{  
      boxSizing:"border-box",
      boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
      borderRadius: "5px",
      backgroundColor: note.color}}>
      <div className="take-note-header" style={{ display: showNote ? "flex" : "none" }}>
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
          {note.pin ? <svg className="pin-fill" width="1em" height="1em" viewBox="0 0 24 24"><path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z" fill="currentColor"></path></svg> : <svg className="pin-outline" width="1em" height="1em" viewBox="0 0 24 24"><path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2m-7.2 2l1.2-1.2V4h4v8.8l1.2 1.2H8.8z" fill="currentColor"></path></svg>}
        </button>
      </div>
      <textarea
        className="take-note-textarea"
        type="text"
        placeholder="Take a note..."
        value={note.body}
        onClick={() => setShowNote(true)}
        name="body"
        onChange={handleChange}
        style={showNote?{
          fontSize:"1.05rem",
          fontFamily: "var(--font-family)",
          color: "var(--text-color-dark)",
        }:{  
          boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
          padding: "0.75rem 1rem 0.25rem 1rem",
          borderRadius: "5px"}}
      />
      <div className="take-note-footer" style={{ display: showNote ? "flex" : "none" }}>
        <div onMouseEnter={() => toggleColorPalette(isColorPaletteOpen=>!isColorPaletteOpen)}>
          <svg  className="color-box-icon" width="1em" height="1em" viewBox="0 0 384 384"><path d="M192 0q80 0 136 50t56 121q0 44-31.5 75T277 277h-37q-14 0-23 9.5t-9 22.5q0 12 8 21q8 10 8 22q0 13-9.5 22.5T192 384q-80 0-136-56T0 192T56 56T192 0zM74.5 192q13.5 0 23-9.5T107 160t-9.5-22.5t-23-9.5t-22.5 9.5t-9 22.5t9 22.5t22.5 9.5zm64-85q13.5 0 23-9.5t9.5-23t-9.5-22.5t-23-9t-22.5 9t-9 22.5t9 23t22.5 9.5zm107 0q13.5 0 22.5-9.5t9-23t-9-22.5t-22.5-9t-23 9t-9.5 22.5t9.5 23t23 9.5zm64 85q13.5 0 22.5-9.5t9-22.5t-9-22.5t-22.5-9.5t-23 9.5T277 160t9.5 22.5t23 9.5z" fill="currentColor"></path></svg>
          {
            isColorPaletteOpen?     
              <div className="color-box">
               {
                 COLORS.map(color => {
                   return <div className="color" style={{backgroundColor:color.value}} onClick={() => handleColorChange(color.value)}></div>;
                 })
               }
              </div>
              : 
            <></>
          }
      </div>
      <select className="tag-select" onChange={handleChange} value={note.tag} name="tag">
          {tagOptions.map((tag) => {
            return <option value={tag}>{tag}</option>;
          })}
      </select>
        <button
        className="note-close-btn"
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
