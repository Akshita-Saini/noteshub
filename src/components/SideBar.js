import { useState } from "react";
import { useNotes } from "../providers/NotesContextProvider";
import { getTagColor } from "../utils/genericFunctions";

function NewTag({ newTag, setNewTag }) {
  const { dispatch } = useNotes();
  return (
    <>
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
            dispatch({ type: "ADD_TAG_OPTION", payload: newTag.toUpperCase() });
            setNewTag("");
          }
        }}
      >
        ADD
      </button>
    </>
  );
}

function Tag({ tagName }) {
  const {
    state: { selectedTag },
    dispatch,
  } = useNotes();

  return (
    <li
      style={{ backgroundColor: getTagColor(selectedTag, tagName) }}
      onClick={() =>
        dispatch({ type: "CHANGE_SELECTED_TAG", payload: tagName })
      }
    >
      {tagName}
    </li>
  );
}

function SideBar() {
  const [newTag, setNewTag] = useState("");

  const {
    state: { selectedTag, tagOptions },
    dispatch,
  } = useNotes();

  return (
    <ul style={{ listStyle: "none" }}>
      <li
        onClick={() =>
          dispatch({ type: "CHANGE_SELECTED_TAG", payload: "NONE" })
        }
        style={{ backgroundColor: getTagColor(selectedTag, "NONE") }}
      >
        HOME
      </li>
      {tagOptions.map((tagName) => {
        return <Tag key={tagName} tagName={tagName} />;
      })}
      <li>
        <NewTag newTag={newTag} setNewTag={setNewTag} />
      </li>
    </ul>
  );
}

export { SideBar };
