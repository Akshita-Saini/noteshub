import { useState } from "react";
import { useNotes } from "../providers/NotesContextProvider";
import { COLORS } from "../utils/Constants";
import { PinFillIcon, PinOutlineIcon, ColorPaletteIcon, DeleteIcon } from "../images/index";

function Note({ note }) {
  const { dispatch, state: { tagOptions } } = useNotes();
  const [isColorPaletteOpen, setIsColorPaletteOpen] = useState(false);


  function toggleColorPalette(){
    setIsColorPaletteOpen(isColorPaletteOpen => !isColorPaletteOpen);
  }

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
      dispatch({ type: "SET_NOTE_TO_EDIT", payload: { isOpen: true, note: note } });
    }
  }
  
  function handleColorChange(color){
    dispatch({ type:"EDIT_NOTE_COLOR_OR_TAG",  payload: {uuid: note.uuid, name: 'color', value: color, pin: note.pin} })
  }


  return (
    <div
      className="note"
      style={{ backgroundColor: `${note.color}` }}
      onClick={(event) => editNoteTrigger(event, note)}>
      <div className="note-header">
          <h3 className="note-title"> { note.title } </h3>
          <button className="note-pin" onClick={() => { dispatch({ type: "TOGGLE_NOTE_PIN", payload: note }) }}>
          { note.pin ? <PinFillIcon className="pin-fill"/>  : <PinOutlineIcon className="pin-outline"/> }
          </button>
      </div>
      <p className="note-body"> { note.body } </p>
      <div className="note-footer">
        <div localName="select" onMouseEnter={ toggleColorPalette }>
         <ColorPaletteIcon className="color-box-icon"/>
          {
            isColorPaletteOpen &&  
              <div className="note-color-box">
               {
                 COLORS.map(color => {
                   return <div className="color" style={{ backgroundColor: `${color.value}` }} onClick={() => handleColorChange(color.value)}></div>;
                 })
               }
              </div>
          }
        </div>
        <select 
          className="note-select"
          onChange={(event) => { dispatch({ type: "EDIT_NOTE_COLOR_OR_TAG", payload: { pin: note.pin, uuid: note.uuid, name: "tag", value: event.target.value } })}}
          value={ note.tag }
        >
          {
            tagOptions.map((tag) => {
              return <option value={ tag } key={ tag }> { tag } </option>;
            })
          }
        </select>
        <button className="note-close-btn" onClick={() => dispatch({ type: "DELETE_NOTE", payload: note })}>
          <DeleteIcon className="delete-icon"/>
        </button>
      </div>
    </div>
  );
}

export { Note };
