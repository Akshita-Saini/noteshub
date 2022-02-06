import { useNotes } from "../providers/NotesContextProvider"; 

function TagOptions({ note, setNote, dispatchTagChange }){
    const { state: { tagOptions }, dispatch } = useNotes();

    function handleTagChange(event){
        if(dispatchTagChange){
            dispatch({ type: "EDIT_NOTE_COLOR_OR_TAG", payload: { pin: note.pin, uuid: note.uuid, name: "tag", value: event.target.value } })
        }else{
            setNote({...note, tag:event.target.value })
        }
    }

    return (
        <select
            className="select-tag"
            name="tag"
            onChange={ handleTagChange }
            value={ note.tag }
        >
            {
                tagOptions.map((tag) => {
                    return <option value={ tag }> { tag } </option>;
                })
            }
        </select>
    );
}

export {TagOptions};