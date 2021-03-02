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

  function handleSubmit(event)
  {
    if(input.title!=="" || input.note!=="")
    {
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

  function handleChange(event)
  {
    setInput({...input,[event.target.name]:event.target.value});
  }

  return (
    <div className="take-note">
      <div style={{ display: showNote ? "block" : "none" }}>
      <input className="take-note-title"
        type="text"
        placeholder="Title"
        value={input.title}
        name="title"
        onChange={handleChange}
        />
      <button className="take-note-pin" onClick={(event) => setInput({ ...input, pin: !input.pin })}>{ input.pin?"UNPIN":"PIN"}</button>
      </div>
        <div>
         <textarea
          className="take-note-placeholder"
          type="text"
          placeholder="Take a note..."
          value={input.note}
          onClick={() => setShowNote(true)}
          name="note"
          onChange={handleChange}
         />
        </div>
        <div style={{display:showNote? "block":"none"}}>
          <select onChange={handleChange} value={input.color} name="color">
            {
              colorOptions.map(color => {
                return <option value={color.value}>{color.name}</option>
              })
            }
          </select>
          <select onChange={handleChange} value={input.tag} name="tag">
            {
              tagOptions.map(tag => {
                return <option value={tag}>{tag}</option>
              })
            }
          </select>
          <button onClick={(event) => {handleSubmit(event); setShowNote(false)}}>Close</button>
        </div>
    </div>
  );
}

export { TakeNote };
