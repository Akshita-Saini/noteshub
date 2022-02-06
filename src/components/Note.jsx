import { useNotes } from "../providers/NotesContextProvider";
import { PinFillIcon, PinOutlineIcon, DeleteIcon } from "../images/index";
import { ColorOptions, TagOptions } from "./index";

function Note({ note }) {
  const { dispatch } = useNotes();

  function editNoteTrigger(event, note) {
    if (
      event.target.localName !== "button" &&
      event.target.localName !== "select" &&
      event.target.localName !== "svg" &&
      event.target.localName !== "path" &&
      event.target.localName !== "span" &&
      event.target.className !== 'color-box' &&
      event.target.className !== 'color' &&
      event.target.className !== 'color-palette-icon'
    ){
      dispatch({ type: "SET_NOTE_TO_EDIT", payload: { isOpen: true, note: note } });
    }
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
        <ColorOptions note={note} />
        <TagOptions note={note} dispatchTagChange />
        <button className="delete-btn" onClick={() => dispatch({ type: "DELETE_NOTE", payload: note })}>
          <DeleteIcon className="delete-icon"/>
        </button>
      </div>
    </div>
  );
}

export { Note };
