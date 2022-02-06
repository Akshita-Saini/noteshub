import { ReactComponent as TagIcon } from "../images/tag-icon.svg";
import { useNotes } from "../providers/NotesContextProvider";
import { getTagColor } from "../utils/genericFunctions";
import { ReactComponent as HomeIcon } from "../images/home-icon.svg";

function Tag({ tagName }) {
    const {
      state: { selectedTag },
      dispatch,
    } = useNotes();
  
    return (
    <li
        onClick={() =>
          dispatch({ type: "CHANGE_SELECTED_TAG", payload: tagName })
        }
        style={{ backgroundColor: getTagColor(selectedTag, tagName), borderRadius:"0 50px 50px  0"}}
        className="list-item" 
        >
          {
            tagName === "None" ? <HomeIcon className="list-item-icon"/> :  <TagIcon className="list-item-icon" />
          }
          <span className="list-item-text">  { tagName === "None" ? "Notes" : tagName } </span> 
    </li>
  );
}

export { Tag };