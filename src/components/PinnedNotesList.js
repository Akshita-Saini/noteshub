import { EditNote, Note } from "./index";
import { useNotes } from "../providers/NotesContextProvider";

function PinnedNotesList() {
  const {
    state: { selectedTag, pinnedNotesList, editNote}
  } = useNotes();

  const filteredNotesList = pinnedNotesList.filter( (note) => {
    if(selectedTag === "NONE"){
      return <Note note={note}/>;
    }else if(selectedTag === note.tag){
      return <Note note={note}/>;
    }

  })
  
  return (
    <div>
      {editNote.isOpen && (
        <EditNote />
      )}

      {filteredNotesList.length !== 0 && <h3>PINNED</h3>}
      <div className="notesList-pinned">
        {pinnedNotesList.map((note) => {
          if (selectedTag === "NONE") {
            return (
              <Note
                note={note}
              />
            );
          } else if (selectedTag === note.tag) {
            return (
              <Note
                note={note}
              />
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}

export { PinnedNotesList };
