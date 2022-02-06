
import { useNotes } from "../providers/NotesContextProvider";

function NewTag({ newTag, setNewTag, toggleAddLabel }) {
    const { dispatch } = useNotes();

    function addNewTagHandler(){
        if (newTag.trim() !== "") {
            dispatch({ type: "ADD_TAG_OPTION", payload: newTag});
            setNewTag("");
            toggleAddLabel();
        }
    }

    return (
      <div className="new-tag">
        <input
          type="text"
          value={newTag}
          onChange={(event) => setNewTag(event.target.value)} />
        <button onClick={ addNewTagHandler }>
          ADD
        </button>
      </div>
    );
  }

  export { NewTag };