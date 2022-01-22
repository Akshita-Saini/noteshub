import { useState } from "react";
import { useNotes } from "../providers/NotesContextProvider";
import { COLORS } from "../utils/Constants";

function EditNote({ note, editNote, notesList, setNotesList }) {
  const [editedNote, setEditedNote] = useState({ ...note });

  const {
    state: { tagOptions },
    dispatch,
  } = useNotes();

  function handleSubmit(event) {
    event.preventDefault();
    if (editedNote.title !== "" && editedNote.note !== "") {
      let list = notesList.filter((item) => item.uuid !== note.uuid);
      setNotesList([...list, { ...editedNote }]);
    }
    editNote(true, {});
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
              setEditedNote({ ...editedNote, pin: !editedNote.pin })
            }
          >
            PIN
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
