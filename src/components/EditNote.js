import { useState } from "react";
import { useNotes } from "../providers/NotesContextProvider";
import { COLORS } from "../utils/Constants";

function EditNote() {
  const {
    state: { tagOptions , editNote },
    dispatch,
  } = useNotes();

  const [editedNote, setEditedNote] = useState({...editNote.editingNote});

  function handleSubmit(event) {
    event.preventDefault();
    if (editedNote.title !== "" && editedNote.note !== "") {
      dispatch({type: "EDIT_NOTE", payload: editedNote});
    }
  }

  return (
    <div className="outer-div-modal">
      <div className="inner-div-modal">
        <div>
          <input
            className="take-note-title"
            type="text"
            value={editedNote.title}
            onChange={(event) => {
              setEditedNote({ ...editedNote, title: event.target.value });
            }}
          />
          <button
            className="take-note-pin"
            onClick={(event) =>
              {
                dispatch({type:"TOGGLE_NOTE_PIN", payload:editedNote});
                setEditedNote({ ...editedNote, pin: !editedNote.pin });
              }
            }
          >
            { editedNote.pin? "UNPIN": "PIN" }
          </button>
        </div>
        <div>
          <textarea
            className="take-note-placeholder"
            type="text"
            value={editedNote.body}
            onChange={(event) =>
              setEditedNote({ ...editedNote, body: event.target.value })
            }
          />
        </div>
        <div>
          <select
            onChange={(event) =>
              setEditedNote({ ...editedNote, color: event.target.value })
            }
            value={editedNote.color}
          >
            {COLORS.map((color) => {
              return <option value={color.value}>{color.name}</option>;
            })}
          </select>
          <select
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
