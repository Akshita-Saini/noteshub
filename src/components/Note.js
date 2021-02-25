import { NoteFooter } from "./index";

function Note({ note, notesList, setNotesList, colorOptions, tagOptions, deleteNote, editNote, togglePin })
    {
      return (
        <div className="note" style={{ backgroundColor: `${note.color}` }} onClick={(event) => {
          if (event.target.localName!=="button" && event.target.localName!=="select")
          {
            editNote(note.flag, note)}
          }
         }>
        <h3>{note.title}</h3>
        <button onClick={() => togglePin(note)}>{note.pin?"UNPIN":"PIN"}</button>
        <div>{note.note}</div>

        <NoteFooter
          note={note}
          notesList={notesList}
          setNotesList={setNotesList}
          colorOptions={colorOptions}
          tagOptions={tagOptions}
          deleteNote={deleteNote}
        />
    </div>
      );
}
    
export { Note };
