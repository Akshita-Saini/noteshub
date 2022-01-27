import { useState } from "react";
import { useNotes } from "../providers/NotesContextProvider";
import { COLORS } from "../utils/Constants";

function EditNote() {
  const {
    state: { tagOptions , editNote },
    dispatch,
  } = useNotes();

  const [editedNote, setEditedNote] = useState({...editNote.editingNote});
  const [isColorPaletteOpen, toggleColorPalette]=useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    if (editedNote.title !== "" && editedNote.note !== "") {
      dispatch({type: "EDIT_NOTE", payload: editedNote});
    }
  }

  
  function handleColorChange(color){
    console.log({...editedNote, color:color});
    setEditedNote({...editedNote, color:color});
  }

  return (
    <div className="outer-div-modal">
      <div className="inner-div-modal" style={{backgroundColor:editedNote.color}}>
        <div className="edit-note-header">
          <input
            className="edit-note-title"
            type="text"
            value={editedNote.title}
            onChange={(event) => {
              setEditedNote({ ...editedNote, title: event.target.value });
            }}
          />
          <button
            className="edit-note-pin"
            onClick={(event) =>
              {
                dispatch({type:"TOGGLE_NOTE_PIN", payload:editedNote});
                setEditedNote({ ...editedNote, pin: !editedNote.pin });
              }
            }
          >
            { editedNote.pin? <svg className="pin-fill" width="1em" height="1em" viewBox="0 0 24 24"><path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z" fill="currentColor"></path></svg> : <svg className="pin-outline" width="1em" height="1em" viewBox="0 0 24 24"><path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2m-7.2 2l1.2-1.2V4h4v8.8l1.2 1.2H8.8z" fill="currentColor"></path></svg> }
          </button>
        </div>
        <textarea
            className="edit-note-textarea"
            type="text"
            value={editedNote.body}
            onChange={(event) =>
              setEditedNote({ ...editedNote, body: event.target.value })
            }
        />
        <div className="edit-note-footer">
          <div onMouseEnter={() => toggleColorPalette(isColorPaletteOpen=>!isColorPaletteOpen)}>
            <svg className="color-box-icon" width="1em" height="1em" viewBox="0 0 384 384"><path d="M192 0q80 0 136 50t56 121q0 44-31.5 75T277 277h-37q-14 0-23 9.5t-9 22.5q0 12 8 21q8 10 8 22q0 13-9.5 22.5T192 384q-80 0-136-56T0 192T56 56T192 0zM74.5 192q13.5 0 23-9.5T107 160t-9.5-22.5t-23-9.5t-22.5 9.5t-9 22.5t9 22.5t22.5 9.5zm64-85q13.5 0 23-9.5t9.5-23t-9.5-22.5t-23-9t-22.5 9t-9 22.5t9 23t22.5 9.5zm107 0q13.5 0 22.5-9.5t9-23t-9-22.5t-22.5-9t-23 9t-9.5 22.5t9.5 23t23 9.5zm64 85q13.5 0 22.5-9.5t9-22.5t-9-22.5t-22.5-9.5t-23 9.5T277 160t9.5 22.5t23 9.5z" fill="currentColor"></path></svg>
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
          <select
            className="tag-select"
            onChange={(event) =>
              setEditedNote({ ...editedNote, tag: event.target.value })
            }
            value={editedNote.tag}
          >
            {tagOptions.map((tag) => {
              return <option value={tag}>{tag}</option>;
            })}
          </select>
          <button
            className="update-btn"
            onClick={(event) => {
              handleSubmit(event);
            }}
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
