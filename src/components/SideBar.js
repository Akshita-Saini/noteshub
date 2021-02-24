import {useState} from "react";

function SideBar({currentTag, selectTag, tagOptions, addNewTag})
{
    const [input, setInput] = useState("");
    function getColor(currentTag, item)
    {
        if(currentTag===item)
        {
            return "#FEEFC3";
        }
    }
    console.log(tagOptions);
    return (
        <div>
            <ul style={{listStyle:"none"}}>
                <li onClick={() => selectTag("none")} style={{backgroundColor:getColor(currentTag,"none")}}>Home</li>
                {tagOptions.map(item => {return(
                        <li key={item.name} style={{backgroundColor:getColor(currentTag, item.value)}} onClick={() => selectTag(item.value)}>{item.name}</li>
                    );
                })} 
                <li>
                    <input type="text" value={input}  onChange={(event)=>
                        {setInput(event.target.value)}} />
                    <button onClick={() =>
                        {
                            if(input!=="")
                            {
                                addNewTag(input);
                                setInput("");
                            }

                        }
                        }>ADD</button>
                </li>
            </ul>  
        </div>
    );
}

export {SideBar};