import { EditNote, Note } from "./index";
import { useNotes } from "../providers/NotesContextProvider";
import { getFilteredNotesList } from "../utils/genericFunctions";

function PinnedNotesList() {
  const {
    state: { selectedTag, pinnedNotesList, editNote}
  } = useNotes();

  const filteredNotesList = getFilteredNotesList( pinnedNotesList, selectedTag );
  
  return (
    <div>
      { 
        editNote.isOpen && <EditNote /> 
      }
      {
        filteredNotesList.length !== 0 && 
        <>
          <h3>PINNED</h3>
          <div className="notesList-pinned">
            {
              filteredNotesList.map( note => <Note note={note}  key={note.uuid} />)
            }
          </div>
        </>
      }
    </div>
  );
}

export { PinnedNotesList };
