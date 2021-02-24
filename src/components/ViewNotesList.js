
function ViewNotesList({nameClass, notesList, setNotesList, altNotesList, setAltNotesList, heading, tag, tagOptions, colorOptions}) {
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
                                <div>
                                  <select
                                        onChange={(event) => {
                                        let arrayWithoutNote = notesList.filter(item => item.uuid !== note.uuid);
                                        setNotesList([...arrayWithoutNote,{...note,color:event.target.value}]);
                                        }} 

                                        value={note.color}>
                                        {
                                        colorOptions.map(color => {
                                            return <option value={color.value}>{color.name}</option>
                                        })
                                        } 
                                    </select>
                                    <select
                                        onChange={(event) => {
                                        let arrayWithoutNote = notesList.filter(item => item.uuid !== note.uuid);
                                        setNotesList([...arrayWithoutNote,{...note,tag:event.target.value}]);
                                        }} 

                                        value={note.tag}>
                                        {
                                        tagOptions.map(tag => {
                                            return <option value={tag.value}>{tag.name}</option>
                                        })
                                        } 
                                    </select>
                                    <button onClick={() => deleteNote(note)}>DELETE</button>
                                </div>
                            </div>;
                        }
                        else if(tag===note.tag)
                        {
                            return <div className="note" style={{backgroundColor:`${note.color}`}}>
                                <div>{note.title}</div>
                                <button onClick={() => togglePin(note)}>{note.pin?"UNPIN":"PIN"}</button>
                                <div>{note.note}</div>
                                <div>
                                <select onChange={(event) => {
                                        let arrayWithoutNote = notesList.filter(item => item.uuid !== note.uuid);
                                        setNotesList([...arrayWithoutNote,{...note,color:event.target.value}]);
                                        }} 
                                        value={note.color}>
                                        {
                                        colorOptions.map(color => {
                                            return <option value={color.value}>{color.name}</option>
                                        })
                                        }
                                    </select>
                                    <select
                                        onChange={(event) => {
                                        let arrayWithoutNote = notesList.filter(item => item.uuid !== note.uuid);
                                        setNotesList([...arrayWithoutNote,{...note,tag:event.target.value}]);
                                        }} 

                                        value={note.tag}>
                                        {
                                        tagOptions.map(tag => {
                                            return <option value={tag.value}>{tag.name}</option>
                                        })
                                        } 
                                    </select>
                                    <button onClick={() => deleteNote(note)}>DELETE</button>
                                </div>
                            </div>;
                        }
                        return null;
                        })}
                </div>
        </div>
    );
  }
  
  export { ViewNotesList };
  