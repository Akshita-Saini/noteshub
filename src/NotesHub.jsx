import {
  Header,
  Footer,
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
        <NotesList  listName="PINNED" listClass="notesList-pinned" notesList={pinnedNotesList}/>
        <NotesList  listName="OTHER" listClass="notesList-others" notesList={otherNotesList}/>
      </div>  
      <Footer />
    </div>
  );
}

export default NotesHub;
