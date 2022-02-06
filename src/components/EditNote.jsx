import { useState } from "react";
import { useNotes } from "../providers/NotesContextProvider";
import { COLORS } from "../utils/Constants";
import { ReactComponent as PinFill } from "../images/pin-fill.svg";
import { ReactComponent as PinOutline } from "../images/pin-outline.svg";
import { ReactComponent as ColorPaletteIcon } from "../images/color-palette-icon.svg";

function EditNote() {
  const {
    state: { tagOptions , editNote },
    dispatch,
  } = useNotes();

  const [editedNote, setEditedNote] = useState({...editNote.editingNote});
  const [isColorPaletteOpen, setIsColorPaletteOpen] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    if (editedNote.title.trim() !== "" && editedNote.body.trim() !== "") {
      dispatch({type: "EDIT_NOTE", payload: editedNote});
    }
  }

  function handleChange(event) {
    setEditedNote({ ...editedNote, [event.target.name]: event.target.value.trim() });
  }

  function toggleColorPalette(){
    setIsColorPaletteOpen(isColorPaletteOpen => !isColorPaletteOpen);
  }
  
  function handleColorChange(color){
    setEditedNote({...editedNote, color:color});
  }

  function handlePinChange(){
      dispatch({type:"TOGGLE_NOTE_PIN", payload:editedNote});
      setEditedNote({ ...editedNote, pin: !editedNote.pin }); 
  }

  return (
    <div className="outer-div-modal">
      <div className="inner-div-modal" style={{ backgroundColor: `${editedNote.color}` }}>
        <div className="edit-note-header">
          <input
            className="edit-note-title"
            type="text"
            name="title"
            value={ editedNote.title }
            onChange={ handleChange }
          />
          <button
            className="edit-note-pin"
            onClick={ handlePinChange }
          >
            { editedNote.pin? <PinFill className="pin-fill"/>  : <PinOutline className="pin-outline"/> }
          </button>
        </div>
        <textarea
            className="edit-note-textarea"
            type="text"
            name="body"
            value={ editedNote.body }
            onChange={ handleChange }
        />
        <div className="edit-note-footer">
          <div onMouseEnter={ toggleColorPalette }>
          <ColorPaletteIcon className="color-palette-icon" />
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
            className="tag-select"
            name="tag"
            onChange={ handleChange }
            value={ editedNote.tag }
          >
            {
            tagOptions.map((tag) => {
              return <option value={ tag }> { tag } </option>;
            })
            }
          </select>
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
