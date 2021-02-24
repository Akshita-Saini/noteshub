
function ViewNotesList({nameClass, notesList, setNotesList, altNotesList, setAltNotesList, heading, tag}) {
    function togglePin(note)
    {
        let newList = [{...note,pin:!note.pin},...altNotesList];
        let oldList = [...notesList];
        oldList = oldList.filter(obj => obj.uuid!==note.uuid)
        setNotesList(oldList);
        setAltNotesList(newList);
    }

    function deleteNote(note)
    {
        let oldList = [...notesList];
        oldList = oldList.filter(obj => obj.uuid!==note.uuid)
        setNotesList(oldList);
    }

    return (
        <div>
            <h3>{heading}</h3>
            <div className={nameClass}>
                    {notesList.map(note => {
                        if(tag==="none")
                        {
                            return <div className="note" style={{backgroundColor:`${note.color}`}}>
                                <div>{note.title}</div>
                                <button onClick={() => togglePin(note)}>{note.pin?"UNPIN":"PIN"}</button>
                                <div>{note.note}</div>
                                <div><button onClick={() => deleteNote(note)}>DELETE</button></div>
                            </div>;
                        }
                        else if(tag===note.tag)
                        {
                            return <div className="note" style={{backgroundColor:`${note.color}`}}>
                                <div>{note.title}</div>
                                <button onClick={() => togglePin(note)}>{note.pin?"UNPIN":"PIN"}</button>
                                <div>{note.note}</div>
                                <div><button onClick={() => deleteNote(note)}>DELETE</button></div>
                            </div>;
                        }
                        return null;
                        })}
                </div>
        </div>
    );
  }
  
  export { ViewNotesList };
  