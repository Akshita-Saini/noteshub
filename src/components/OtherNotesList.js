import { EditNote, Note } from "./index";
import { useNotes } from "../providers/NotesContextProvider";

function OtherNotesList({}) {
  const {
    state: { selectedTag, otherNotesList, editNote}
  } = useNotes();

  const filteredNotesList = otherNotesList.filter((note) => {
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
      {filteredNotesList.length !== 0 && <h3>OTHERS</h3>}
      <div className="notesList-others">
        {otherNotesList.map((note) => {
          if (selectedTag === "NONE") {
            return (
              <Note note={note} key={note.uuid}/>
            );
          } else if (selectedTag === note.tag) {
            return (
              <Note note={note}  key={note.uuid}/>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}

export { OtherNotesList };
