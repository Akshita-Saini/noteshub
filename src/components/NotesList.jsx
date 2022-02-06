import { EditNote, Note } from "./index";
import { useNotes } from "../providers/NotesContextProvider";
import { getFilteredNotesList } from "../utils/genericFunctions";

function NotesList({ listName, notesList}) {
  const {
    state: { selectedTag, editNote}
  } = useNotes();

  const filteredNotesList = getFilteredNotesList( notesList, selectedTag );

  return (
    <div>
      {  editNote.isOpen && <EditNote /> }
      {  filteredNotesList.length !== 0 && 
        <> 
          <h3> { listName } </h3>
          <div className = "notesList">
            {     
              filteredNotesList.map( note => <Note note={note}  key={note.uuid} />)
            }
          </div>
        </> 
     }
    </div>
  );
}

export { NotesList };
