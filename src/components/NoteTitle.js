function NoteTitle({note, togglePin})
{
    return (
        <div>
            <h3>{note.title}</h3>
            <button onClick={() => togglePin(note)}>{note.pin?"UNPIN":"PIN"}</button>
        </div>
    );
}

export { NoteTitle };