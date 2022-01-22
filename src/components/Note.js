import { useNotes } from "../providers/NotesContextProvider";
import { COLORS } from "../utils/Constants";

function Note({ note }) {
  const { dispatch, state:{ tagOptions } } = useNotes();

  function editNoteTrigger(event, note) {
    if (
      event.target.localName !== "button" &&
      event.target.localName !== "select"
    ){
      dispatch({type: "SET_EDITING_NOTE", payload: { isOpen:true, editingNote: note }});
    }
  }

  function ColorOptions({note}) {
    return (
      <select
        onChange={(event) => { console.log({note}); dispatch({type:"EDIT_NOTE", payload:{pin:note.pin, uuid:note.uuid, name:"color", value:event.target.value}}) }}
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
        onChange={(event) => {  console.log("I'm firing changeTag"); dispatch({type:"EDIT_NOTE", payload:{pin:note.pin, uuid:note.uuid, name:"tag", value:event.target.value}}) }}
        value={note.tag}
      >
        {tagOptions.map((tag) => {
          return <option value={tag} key={tag}>{tag}</option>;
        })}
      </select>
    );
  }
  
  return (
    <div
      className="note"
      style={{ backgroundColor: `${note.color}` }}
      onClick={(event) => editNoteTrigger(event, note)}>
      <div>{note.body}</div>
      <div>
        <ColorOptions note={note}/>
        <TagOptions note={note}/>
        <button onClick={() => dispatch({ type: "DELETE_NOTE", payload: note })}>
          DELETE
        </button>
      </div>
      <div>
          <h3>{note.title}</h3>
          <button onClick={() => {console.log("toggle pin onclick fires");  dispatch({type:"TOGGLE_NOTE_PIN", payload:note})}}>{note.pin?"UNPIN":"PIN"}</button>
      </div>
    </div>
  );
}

export { Note };
