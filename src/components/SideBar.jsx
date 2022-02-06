import { useState } from "react";
import { useNotes } from "../providers/NotesContextProvider";
import { Tag, NewTag } from "./index";
import { AddLabelIcon } from "../images/index";

function SideBar() {
  const [newTag, setNewTag] = useState("");
  const [isAddLabelOpen, setIsAddLabelOpen] = useState(false);

  const {
    state: { tagOptions }
  } = useNotes();


  function toggleAddLabel(){
    setIsAddLabelOpen((isAddLabelOpen) => !isAddLabelOpen);
  }

  return (
    <div className="sidebar">
      <ul className="list">
        {
          tagOptions.map((tagName) =>  <Tag key={ tagName } tagName={ tagName } /> )
        }
      </ul> 
      {
        isAddLabelOpen? 
          <NewTag newTag={newTag} setNewTag={setNewTag} toggleAddLabel={toggleAddLabel} />
          :
          <div className="list-item" onClick={toggleAddLabel}>
            <AddLabelIcon className="list-item-icon"/>
            <span className="list-item-text">Add Label</span>
          </div>
      }
    </div>
  );
}

export { SideBar };
