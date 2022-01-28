import {
  Header,
  Footer,
  SideBar,
  TakeNote,
  PinnedNotesList,
  OtherNotesList,
} from "./components/index.js";
import "./styles.css";

function NotesHub() {
  return (
    <div className="notes-hub">
      <Header />
        <SideBar />
        <div className="notes-container">
          <TakeNote />
          <PinnedNotesList />
          <OtherNotesList />
        </div>  
      <Footer />
    </div>
  );
}

export default NotesHub;
