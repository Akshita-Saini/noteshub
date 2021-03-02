import { NoteFooter, NoteTitle, NoteBody } from "./index";

function Note({ note, notesList, setNotesList, colorOptions, tagOptions, deleteNote, editNote, togglePin })
{   
    
    function editNoteTrigger(event)
    {
        if (event.target.localName!=="button" && event.target.localName!=="select")
        {
            editNote(note.flag, note)  
        }
    }
    
      return (
        <div className="note" style={{ backgroundColor: `${note.color}` }} onClick={editNoteTrigger}>
               <NoteTitle note={note} togglePin={ togglePin }/>
               <NoteBody  note={ note} />
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
