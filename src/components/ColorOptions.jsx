import { useState } from "react";
import { COLORS } from "../utils/Constants";
import { ColorPaletteIcon } from "../images/index";
import { useNotes } from "../providers/NotesContextProvider";

function ColorOptions(props){
    const [isColorPaletteOpen, setIsColorPaletteOpen] = useState(false);
    const { dispatch } = useNotes();

    function toggleColorPalette(){
        setIsColorPaletteOpen(isColorPaletteOpen => !isColorPaletteOpen);
    }

    function handleColorChange(color){
        dispatch({ type:"EDIT_NOTE_COLOR_OR_TAG",  payload: {uuid: props.note.uuid, name: 'color', value: color, pin: props.note.pin} });
        props.setNote?.({...props.note, color:color});
    }

    return(
    <div onMouseEnter={ toggleColorPalette }>
        <ColorPaletteIcon className="color-palette-icon"/>
        {
        isColorPaletteOpen &&  
            <div className="color-box">
            {
                COLORS.map(color => {
                    return <div className="color" style={{ backgroundColor: `${color.value}` }} onClick={() => handleColorChange(color.value)}></div>;
                })
            }
            </div>
        }
    </div>
    );
}

export { ColorOptions };