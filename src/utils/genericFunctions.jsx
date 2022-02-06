function getTagColor(selectedTag, currentTag) {
  if (selectedTag === currentTag) {
    return "#FEEFC3";
  }
}

function getFilteredNotesList(notesList, selectedTag){
  return notesList.filter((note) => selectedTag === "None" || selectedTag === note.tag )
}

export { getTagColor, getFilteredNotesList };
