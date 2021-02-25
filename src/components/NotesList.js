import { useState } from "react";
import { EditNote, Note } from "./index";

function NotesList({ nameClass, notesList, setNotesList, altNotesList, setAltNotesList, heading, tag, tagOptions, colorOptions }) {
  
    const [edit, setEdit] = useState({flag:false, note:{}});
    function togglePin(note)
    {
        let newList = [{...note,pin:!note.pin},...altNotesList];
        let oldList = [...notesList];
        oldList = oldList.filter(obj => obj.uuid!==note.uuid)
        setNotesList(oldList);
        setAltNotesList(newList);
    }

    function editNote(flag, note)
    {
      console.log(note.title + " " + note.note + " edit note console");
      setEdit({flag:!flag, note:note});
    }
  
    function deleteNote(note)
    {
        let oldList = [...notesList];
        oldList = oldList.filter(obj => obj.uuid!==note.uuid)
        setNotesList(oldList);
    }

    return (
      <div>
        
        {
          edit.flag &&       
          <EditNote
            note={edit.note}
            editNote={editNote}
            setNotesList={setNotesList}
            notesList={notesList}
            colorOptions={colorOptions}
            tagOptions={tagOptions}
            deleteNote={deleteNote}
          />
        }
        
        {
          notesList.length !== 0 && <h3>{heading}</h3>
        }
          <div className={nameClass}>
            {notesList.map(note => {
              if (tag === "none")
              {
                return <Note
                  note={note}
                  notesList={notesList}
                  setNotesList={setNotesList}
                  colorOptions={colorOptions}
                  tagOptions={tagOptions}
                  deleteNote={deleteNote}
                  editNote={editNote}
                  togglePin={togglePin}
                />
              }
              else if(tag===note.tag)
              {
                return <Note
                  note={note}
                  notesList={notesList}
                  setNotesList={setNotesList}
                  colorOptions={colorOptions}
                  tagOptions={tagOptions}
                  deleteNote={deleteNote}
                  editNote={editNote}
                  togglePin={togglePin}
                />
              }
              return null;
              })}
          </div>
        </div>
    );
  }
  
  export { NotesList };
  