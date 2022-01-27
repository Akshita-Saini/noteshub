import { useState } from "react";
import { useNotes } from "../providers/NotesContextProvider";
import { getTagColor } from "../utils/genericFunctions";

function NewTag({ newTag, setNewTag, toggleAddLabel }) {
  const { dispatch } = useNotes();
  return (
    <div className="new-tag">
      <input
        type="text"
        value={newTag}
        onChange={(event) => {
          setNewTag(event.target.value);
        }}
      />
      <button
        onClick={() => {
          if (newTag !== "") {
            dispatch({ type: "ADD_TAG_OPTION", payload: newTag });
            setNewTag("");
            toggleAddLabel((isAddLabelOpen) => !isAddLabelOpen);
          }
        }}
      >
        ADD
      </button>
    </div>
  );
}

function Tag({ tagName }) {
  const {
    state: { selectedTag },
    dispatch,
  } = useNotes();

  return (
    <li
      className="list-item"
      style={{ backgroundColor: getTagColor(selectedTag, tagName), borderRadius:"0 50px 50px 0" }}
      onClick={() =>
        dispatch({ type: "CHANGE_SELECTED_TAG", payload: tagName })
      }
    >
      <svg
        className="list-item-icon"
        width="1em"
        height="1em"
        viewBox="0 0 256 256"
      >
        <path
          d="M187.7 212H40a20.1 20.1 0 0 1-20-20V64a20.1 20.1 0 0 1 20-20h147.7a20.1 20.1 0 0 1 16.7 8.9l45.6 68.4a11.9 11.9 0 0 1 0 13.3l-45.6 68.5a20.1 20.1 0 0 1-16.7 8.9zM44 188h141.6l40-60l-40-60H44z"
          fill="currentColor"
        ></path>
      </svg>
      <span className="list-item-text">{tagName}</span>
    </li>
  );
}

function SideBar() {
  const [newTag, setNewTag] = useState("");
  const [isAddLabelOpen, toggleAddLabel]=useState(false);

  const {
    state: { selectedTag, tagOptions },
    dispatch,
  } = useNotes();


  function openAddLabel(){
    toggleAddLabel((isAddLabelOpen) => !isAddLabelOpen);
  }

  return (
    <div className="sidebar">
      <ul style={{ listStyle: "none" }} className="list">
        <li
          onClick={() =>
            dispatch({ type: "CHANGE_SELECTED_TAG", payload: "NONE" })
          }
          style={{ backgroundColor: getTagColor(selectedTag, "NONE"), borderRadius:"0 50px 50px  0"}}
          className="list-item"
        >
          <svg
            className="list-item-icon"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <path
              d="M19 21H5a1 1 0 0 1-1-1v-9H1l10.327-9.388a1 1 0 0 1 1.346 0L23 11h-3v9a1 1 0 0 1-1 1zM6 19h12V9.157l-6-5.454l-6 5.454V19z"
              fill="currentColor"
            ></path>
          </svg>
          <span className="list-item-text">Notes</span>
        </li>
        {tagOptions.map((tagName) => {
          return <Tag key={tagName} tagName={tagName} />;
        })}
      </ul>
      
      {
        isAddLabelOpen? <NewTag newTag={newTag} setNewTag={setNewTag} toggleAddLabel={toggleAddLabel} />:
        <div className="list-item" onClick={openAddLabel}>
          <svg className="list-item-icon" width="1em" height="1em" viewBox="0 0 24 24"><path d="M20.71 7.04c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.37-.39-1.02-.39-1.41 0l-1.84 1.83l3.75 3.75M3 17.25V21h3.75L17.81 9.93l-3.75-3.75L3 17.25z" fill="currentColor"></path></svg> 
          <span className="list-item-text">Add Label</span>
      </div>
      }
    </div>
  );
}

export { SideBar };
