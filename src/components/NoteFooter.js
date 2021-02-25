function NoteFooter({note,notesList,setNotesList,colorOptions,tagOptions, deleteNote})
{
  function ColorOptions({colorOptions})
  {
    return (
      <select onChange={(event) => {
        let arrayWithoutNote = notesList.filter(item => item.uuid !== note.uuid);
        setNotesList([...arrayWithoutNote,{...note,color:event.target.value}]);
        }} 
        value={note.color}>
        {
          colorOptions.map(item => {
            return <option value={item.value}>{item.name}</option>
        })
        }
      </select>
    );
  }
  
  function TagOptions({tagOptions})
  {
    return (
      <select onChange={(event) => {
        let arrayWithoutNote = notesList.filter(item => item.uuid !== note.uuid);
        setNotesList([...arrayWithoutNote,{...note,tag:event.target.value}]);
        }} 
        value={note.tag}>
        {
        tagOptions.map(item => {
            return <option value={item}>{item}</option>
        })
        }
      </select>
    );
  }
    return (
        <div>                                   
          <ColorOptions colorOptions={colorOptions}/>
          <TagOptions tagOptions={tagOptions}/>
          <button onClick={() => deleteNote(note)}>DELETE</button>
        </div>
    );
}

export {NoteFooter}