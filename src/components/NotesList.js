import { useState } from "react";
import { EditNote, NoteFooter } from "./index";

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

    function Note({note})
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
                return <Note note={ note }/>
              }
              else if(tag===note.tag)
              {
                return <Note note={ note }/>
              }
              return null;
              })}
          </div>
        </div>
    );
  }
  
  export { NotesList };
  