import { useNotes } from "../providers/NotesContextProvider";
import { COLORS } from "../utils/Constants";
import { useState } from "react";

function Note({ note }) {
  const { dispatch, state:{ tagOptions } } = useNotes();
  const [isColorPaletteOpen, toggleColorPalette]=useState(false);

  function editNoteTrigger(event, note) {
    if (
      event.target.localName !== "button" &&
      event.target.localName !== "select" &&
      event.target.localName !== "svg" &&
      event.target.localName !== "path" &&
      event.target.localName !== "span" &&
      event.target.className !== 'note-color-box' &&
      event.target.className !== 'color' &&
      event.target.className !== 'color-box-icon'
    ){
      dispatch({type: "SET_EDIT_NOTE", payload: { isOpen:true, editingNote: note }});
    }
  }

  function ColorOptions({note}) {
    return (
      <select
        onChange={(event) => { dispatch({type:"EDIT_NOTE_PROPERTY", payload:{pin:note.pin, uuid:note.uuid, name:"color", value:event.target.value}}) }}
        value={note.color}
      >
        {COLORS.map((color) => {
          return <option value={color.value} key={color.name}>{color.name}</option>;
        })}
      </select>
     
    );
  }

  function TagOptions({note}) {
    return (
      <select 
        className="note-select"
        onChange={(event) => { dispatch({type:"EDIT_NOTE_PROPERTY", payload:{pin:note.pin, uuid:note.uuid, name:"tag", value:event.target.value}}) }}
        value={note.tag}
      >
        {tagOptions.map((tag) => {
          return <option value={tag} key={tag}>{tag}</option>;
        })}
      </select>
    );
  }
  
  function handleColorChange(color){
    dispatch({type:"EDIT_NOTE_PROPERTY",  payload:{uuid:note.uuid, name:'color', value:color, pin:note.pin}})
  }


  return (
    <div
      className="note"
      style={{ backgroundColor: `${note.color}` }}
      onClick={(event) => editNoteTrigger(event, note)}>
      <div className="note-header">
          <h3 className="note-title">{note.title}</h3>
          <button className="note-pin" onClick={() => {dispatch({type:"TOGGLE_NOTE_PIN", payload:note})}}>
          {note.pin ? <svg className="pin-fill" width="1em" height="1em" viewBox="0 0 24 24"><path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z" fill="currentColor"></path></svg> : <svg className="pin-outline" width="1em" height="1em" viewBox="0 0 24 24"><path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2m-7.2 2l1.2-1.2V4h4v8.8l1.2 1.2H8.8z" fill="currentColor"></path></svg>}
          </button>
      </div>
      <p className="note-body" >{note.body}</p>
      <div className="note-footer">
        <div localName="select" onMouseEnter={() => toggleColorPalette(isColorPaletteOpen=>!isColorPaletteOpen)}>
          <svg  className="color-box-icon" width="1em" height="1em" viewBox="0 0 384 384"><path d="M192 0q80 0 136 50t56 121q0 44-31.5 75T277 277h-37q-14 0-23 9.5t-9 22.5q0 12 8 21q8 10 8 22q0 13-9.5 22.5T192 384q-80 0-136-56T0 192T56 56T192 0zM74.5 192q13.5 0 23-9.5T107 160t-9.5-22.5t-23-9.5t-22.5 9.5t-9 22.5t9 22.5t22.5 9.5zm64-85q13.5 0 23-9.5t9.5-23t-9.5-22.5t-23-9t-22.5 9t-9 22.5t9 23t22.5 9.5zm107 0q13.5 0 22.5-9.5t9-23t-9-22.5t-22.5-9t-23 9t-9.5 22.5t9.5 23t23 9.5zm64 85q13.5 0 22.5-9.5t9-22.5t-9-22.5t-22.5-9.5t-23 9.5T277 160t9.5 22.5t23 9.5z" fill="currentColor"></path></svg>
          {
            isColorPaletteOpen?     
              <div className="note-color-box">
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
        <TagOptions note={note}/>
        <button className="note-close-btn" onClick={() => dispatch({ type: "DELETE_NOTE", payload: note })}>
        <svg className="note-close-btn-icon" width="1em" height="1em" viewBox="0 0 24 24"><path d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12M8 9h8v10H8V9m7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5z" fill="currentColor"></path></svg>
        </button>
      </div>
    </div>
  );
}

export { Note };
