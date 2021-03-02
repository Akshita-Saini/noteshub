import { useState } from "react";

function EditNote({note, editNote, notesList, setNotesList, colorOptions, tagOptions, deleteNote})
{ 
    const [input, setInput] = useState({ ...note });
    
    function handleSubmit(event){
        event.preventDefault();
        if(input.title!==""&&input.note!=="")
        {
          let list = notesList.filter(item => item.uuid !== note.uuid);
          setNotesList([...list,{...input}]);
        }
        editNote(true,{});
  }
  
    return <div className="outer-div-modal">
       <div className="inner-div-modal">
       <div >
          <input  className="take-note-title"
          type="text"
          value={input.title} 
          onChange={(event) => {setInput({...input,title:event.target.value});}}
          />
          <button className="take-note-pin" onClick={(event) => setInput({...input,pin:!input.pin})}>PIN</button>
        </div>
        <div>
         <textarea
          className="take-note-placeholder"
          type="text"
          value={input.note}
          onChange={(event) => setInput({...input,note:event.target.value})}
         />
        </div>
       <div>
          <select onChange={(event) => setInput({...input,color:event.target.value}) } value={input.color}>
            {
              colorOptions.map(color => {
                return <option value={color.value}>{color.name}</option>
              })
            }
          </select>
          <select onChange={(event) => setInput({...input,tag:event.target.value}) } value={input.tag}>
            {
              tagOptions.map(tag => {
                return <option value={tag}>{tag}</option>
              })
            }
          </select> 
          <button onClick={(event) => {handleSubmit(event);}}>Update</button>
       </div>
   </div>;
</div>
}

export {EditNote};