import {useState} from "react";

function SideBar({selectedTag, selectTag, tagOptions, addNewTag})
{
  const [input, setInput] = useState("");
  function getTagColor(selectedTag, currentTag)
  {
    if(selectedTag===currentTag)
    {
      return "#FEEFC3";
    }
  }
  
  function TagItem({ item })
  {
    return (
      <li
        style={{ backgroundColor: getTagColor(selectedTag, item.value) }}
        onClick={() => selectTag(item.value)}>
        {item.name}
      </li>
    );
  }
  
  function NewTag()
  {
    return (
      <div>
        <input
          type="text"
          value={input}
          onChange={(event) => { setInput(event.target.value) }}
        />
        <button onClick={() => {
          if(input!=="")
            {
              addNewTag(input);
              setInput("");
          }
        }}
        >
          ADD
        </button>
      </div>
    );
  }

  function TagList({selectedTag, selectTag, tagOptions, addNewTag})
  {
    return (
      <ul style={{listStyle:"none"}}>
        <li onClick={() => selectTag("none")} style={{ backgroundColor: getTagColor(selectedTag, "none") }}>
          Home
        </li>
        {
          tagOptions.map(item => {
            return (
              <TagItem key={item.name} item={item} />
            );
          })
        } 
        <li>
          <NewTag />
        </li>
    </ul>  
    );
  }

    return (
        <div>
        <TagList
          selectedTag={selectedTag}
          selectTag={selectTag}
          tagOptions={tagOptions}
          addNewTag={addNewTag}
        />
        </div>
    );
}

export {SideBar};