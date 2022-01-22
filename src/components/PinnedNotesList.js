import { useState } from "react";
import { EditNote, Note } from "./index";
import { useNotes } from "../providers/NotesContextProvider";

function PinnedNotesList({
  notesList,
  setNotesList,
  altNotesList,
  setAltNotesList,
}) {
  const {
    state: { selectedTag },
    dispatch,
  } = useNotes();

  const [edit, setEdit] = useState({ flag: false, note: {} });
  function togglePin(note) {
    let newList = [{ ...note, pin: !note.pin }, ...altNotesList];
    let oldList = [...notesList];
    oldList = oldList.filter((obj) => obj.uuid !== note.uuid);
    setNotesList(oldList);
    setAltNotesList(newList);
  }

  function editNote(flag, note) {
    console.log(note.title + " " + note.note + " edit note console");
    setEdit({ flag: !flag, note: note });
  }

  return (
    <div>
      {edit.flag && (
        <EditNote
          note={edit.note}
          editNote={editNote}
          setNotesList={setNotesList}
          notesList={notesList}
        />
      )}

      {notesList.length !== 0 && <h3>OTHERS</h3>}
      <div className="notesList-pinned">
        {notesList.map((note) => {
          if (selectedTag === "none") {
            return (
              <Note
                note={note}
                notesList={notesList}
                setNotesList={setNotesList}
                editNote={editNote}
                togglePin={togglePin}
              />
            );
          } else if (selectedTag === note.tag) {
            return (
              <Note
                note={note}
                notesList={notesList}
                setNotesList={setNotesList}
                editNote={editNote}
                togglePin={togglePin}
              />
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}

export { PinnedNotesList };
