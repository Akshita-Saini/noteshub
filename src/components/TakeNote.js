import React, { useState } from "react";
import { v4 as uuid } from 'uuid';


function TakeNote({addNote, tagOptions, colorOptions}) {
  const [input, setInput] = useState({
    title:"",
    note:"",
    pin:false,
    date:"",
    color:"white",
    tag:"none",
    uuid:""
  });

  const [showNote, setShowNote] = useState(false);

  console.log(input);

  function handleSubmit(event)
  {
    event.preventDefault();
    if(input.title!==""&&input.note!=="")
    {
      console.log("submitted"+input)
      addNote({...input, date:new Date(),uuid:uuid() });
    }
    setInput({
      title:"",
      note:"",
      pin:false,
      date:"",
      color:"white",
      tag:"none",
      uuid:""
    });
  }

  function getDisplay(value)
  {
      if(value) return "block";
      else return "none";
  }

  return (
    <div className="take-note">
        <div style={{display:getDisplay(showNote)}}>
          <input  className="take-note-title"
          type="text"
          placeholder="Title"
          value={input.title} 
          onChange={(event) => {setInput({...input,title:event.target.value});}}
          />
          <button className="take-note-pin" onClick={(event) => setInput({...input,pin:!input.pin})}>PIN</button>
        </div>
        <div>
         <textarea
          className="take-note-placeholder"
          type="text"
          placeholder="Take a note..."
          value={input.note}
          onClick={() => setShowNote(true)}
          onChange={(event) => setInput({...input,note:event.target.value})}
         />
        </div>
        <div style={{display:getDisplay(showNote)}}>
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
                return <option value={tag.value}>{tag.name}</option>
              })
            }
          </select>
          <button onClick={(event) => {handleSubmit(event); setShowNote(false)}}>Close</button>
        </div>
    </div>
  );
}

export { TakeNote };
