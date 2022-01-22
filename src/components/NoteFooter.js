import { useNotes } from "../providers/NotesContextProvider";
import { COLORS } from "../utils/Constants";

function NoteFooter({ note, notesList, setNotesList }) {
  const {
    state: { tagOptions },
    dispatch,
  } = useNotes();

  function ColorOptions() {
    return (
      <select
        onChange={(event) => {
          let arrayWithoutNote = notesList.filter(
            (item) => item.uuid !== note.uuid
          );
          setNotesList([
            ...arrayWithoutNote,
            { ...note, color: event.target.value },
          ]);
        }}
        value={note.color}
      >
        {COLORS.map((item) => {
          return <option value={item.value}>{item.name}</option>;
        })}
      </select>
    );
  }

  function TagOptions() {
    return (
      <select
        onChange={(event) => {
          let arrayWithoutNote = notesList.filter(
            (item) => item.uuid !== note.uuid
          );
          setNotesList([
            ...arrayWithoutNote,
            { ...note, tag: event.target.value },
          ]);
        }}
        value={note.tag}
      >
        {tagOptions.map((item) => {
          return <option value={item}>{item}</option>;
        })}
      </select>
    );
  }
  return (
    <div>
      <ColorOptions />
      <TagOptions />
      <button onClick={() => dispatch({ type: "DELETE_NOTE", payload: note })}>
        DELETE
      </button>
    </div>
  );
}

export { NoteFooter };
