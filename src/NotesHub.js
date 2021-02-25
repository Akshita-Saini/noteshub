import {useState} from "react";
import { Header, Footer, TakeNote, NotesList, SideBar } from "./components/index.js";

function NotesHub() {

  const [pinnedNotesList, setPinnedNotesList] = useState([]);
  const [otherNotesList, setOtherNotesList] = useState([]);

  const [tagOptions, setTagOptions] =
    useState([
      { value: 'urgent', name: 'Urgent' },
      { value: 'imp', name: 'IMP' },
      { value: 'read', name: 'Read' }
    ]);
  const [tag, setTag] = useState("none");

  const colorOptions = [
        {name: "Orange" , value:"rgb(251, 188, 4, 0.5)"},
        {name: "Red" , value : "rgb(242, 139, 130, 0.9)"},
        {name: "Yellow", value: "rgb(255, 244, 117, 0.9)"},
        {name: "Green", value : "rgb(204, 255, 144, 0.9)"},
        {name: "Teal" , value: "rgb(167, 255, 235, 0.9)"},
        {name: "Blue" , value: "rgb(203, 240, 248, 0.9)"},
        {name: "Dark Blue", value: "rgb(174, 203, 250, 0.9)"},
        {name: "Purple", value:"rgb(215, 174, 251, 0.9)"},
        {name: "Pink", value: "rgb(253, 207, 232, 0.9)"},
        {name: "Brown", value: "rgb(230, 201, 168, 0.9)"},
        {name: "Grey", value: "rgb(232, 234, 237, 0.9)"}]

  function addNewTag(newTag)
  {
    setTagOptions([...tagOptions,{value:newTag.toLowerCase(),name:newTag}]);
  }

  function selectTag(tag)
  {
    setTag(tag);
  }

  function addNote(note)
  {
    if(note.pin)
    {
      setPinnedNotesList([note,...pinnedNotesList]);
    }
    else{
      setOtherNotesList([note,...otherNotesList]);
    }   
  }

  return (

    <div className="notes-hub">
      <Header />
      <div className="container">
        <SideBar
          selectTag={selectTag}
          tagOptions={tagOptions}
          addNewTag={addNewTag}
          selectedTag={tag}
        />
        <div className="notes-container">
          <TakeNote
            addNote={addNote}
            tagOptions={tagOptions}
            colorOptions={colorOptions}
          />
          <NotesList 
            nameClass="notesList-pinned" 
            heading="Pinned" 
            tag={tag} 
            notesList={pinnedNotesList} 
            setNotesList={setPinnedNotesList} 
            altNotesList={otherNotesList} 
            setAltNotesList={setOtherNotesList}
            tagOptions={tagOptions}
            colorOptions={colorOptions}
          />
          <NotesList
            nameClass="notesList-others"
            heading="Others"
            tag={tag}
            notesList={otherNotesList}
            setNotesList={setOtherNotesList}
            altNotesList={pinnedNotesList}
            setAltNotesList={setPinnedNotesList}
            tagOptions={tagOptions}
            colorOptions={colorOptions}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export { NotesHub };
