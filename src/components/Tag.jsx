import { ReactComponent as TagIcon } from "../images/tag-icon.svg";
import { useNotes } from "../providers/NotesContextProvider";
import { getTagColor } from "../utils/genericFunctions";

function Tag({ tagName }) {
    const {
      state: { selectedTag },
      dispatch,
    } = useNotes();
  
    return (
      <li
        className="list-item"
        style={{ backgroundColor: getTagColor(selectedTag, tagName), borderRadius:"0 50px 50px 0"  }}
        onClick={() => dispatch({ type: "CHANGE_SELECTED_TAG", payload: tagName })}
      >
        <TagIcon className="list-item-icon" />
        <span className="list-item-text">{tagName}</span>
      </li>
    );
}

export { Tag };