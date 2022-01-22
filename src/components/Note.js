import { NoteFooter, NoteTitle, NoteBody } from "./index";

function Note({ note, notesList, setNotesList, editNote, togglePin }) {
  function editNoteTrigger(event) {
    if (
      event.target.localName !== "button" &&
      event.target.localName !== "select"
    ) {
      editNote(note.flag, note);
    }
  }
  return (
    <div
      className="note"
      style={{ backgroundColor: `${note.color}` }}
      onClick={editNoteTrigger}
    >
      <NoteTitle note={note} togglePin={togglePin} />
      <NoteBody note={note} />
      <NoteFooter
        note={note}
        notesList={notesList}
        setNotesList={setNotesList}
      />
    </div>
  );
}

export { Note };
