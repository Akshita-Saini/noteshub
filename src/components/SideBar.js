import { useState } from "react";
import { useNotes } from "../providers/NotesContextProvider";
import { Tag } from "./Tag";
import { NewTag } from "./NewTag";
import { getTagColor } from "../utils/genericFunctions";
import { ReactComponent as AddLabelIcon } from "../images/add-label-icon.svg";
import { ReactComponent as HomeIcon } from "../images/home-icon.svg";

function SideBar() {
  const [newTag, setNewTag] = useState("");
  const [isAddLabelOpen, setIsAddLabelOpen] = useState(false);

  const {
    state: { selectedTag, tagOptions },
    dispatch,
  } = useNotes();


  function toggleAddLabel(){
    setIsAddLabelOpen((isAddLabelOpen) => !isAddLabelOpen);
  }

  return (
    <div className="sidebar">
      <ul className="list">
        <li
          onClick={() =>
            dispatch({ type: "CHANGE_SELECTED_TAG", payload: "NONE" })
          }
          style={{ backgroundColor: getTagColor(selectedTag, "NONE"), borderRadius:"0 50px 50px  0"}}
          className="list-item" >
          <HomeIcon className="list-item-icon"/>
          <span className="list-item-text">Notes</span>
        </li>
        {tagOptions.map((tagName) => {
          return <Tag key={tagName} tagName={tagName} />;
        })}
      </ul>
      
      {
        isAddLabelOpen? 
          <NewTag newTag={newTag} setNewTag={setNewTag} toggleAddLabel={toggleAddLabel} />:
          <div className="list-item" onClick={toggleAddLabel}>
            <AddLabelIcon className="list-item-icon"/>
            <span className="list-item-text">Add Label</span>
          </div>
      }
    </div>
  );
}

export { SideBar };
