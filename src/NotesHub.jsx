import {
  Header,
  SideBar,
  TakeNote,
  NotesList
} from "./components/index.jsx";
import "./styles.css";
import { useNotes } from "./providers/NotesContextProvider";

function NotesHub() {
  const { state: { otherNotesList, pinnedNotesList }} = useNotes();

  return (
    <div className="notes-hub">
      <Header />
      <SideBar />
      <div className="notes-container">
        <TakeNote />
        <NotesList  listName="PINNED"  notesList={pinnedNotesList}/>
        <NotesList  listName="OTHER"  notesList={otherNotesList}/>
      </div>  
    </div>
  );
}

export default NotesHub;
