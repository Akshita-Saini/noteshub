const initialState = {
  pinnedNotesList: [],
  otherNotesList: [],
  tagOptions: ["URGENT", "IMP", "TO-DO"],
  selectedTag: "NONE",
};

function reducer(state, action) {
  switch (action.type) {
    case "CHANGE_SELECTED_TAG":
      return { ...state, selectedTag: action.payload };
    case "ADD_TAG_OPTION":
      return { ...state, tagOptions: [...state.tagOptions, action.payload] };
    case "ADD_NOTE":
      return action.payload.pin
        ? {
            ...state,
            pinnedNotesList: [action.payload, ...state.pinnedNotesList],
          }
        : {
            ...state,
            pinnedNotesList: [action.payload, ...state.otherNotesList],
          };
    case "DELETE_NOTE":
      return action.payload.pin
        ? {
            ...state,
            pinnedNotesList: state.pinnedNotesList.filter(
              (note) => note.uuid !== action.payload.uuid
            ),
          }
        : {
            ...state,
            otherNotesList: state.otherNotesList.filter(
              (note) => note.uuid !== action.payload.uuid
            ),
          };
    case "EDIT_NOTE":
      return action.payload.pin ? {} : {};
    case "TOGGLE_NOTE_PIN":
      return action.payload.pin ? {} : {};
    default:
      throw new Error();
  }
}

export { reducer, initialState };
