const initialState = {
  pinnedNotesList: [],
  otherNotesList: [],
  tagOptions: ["URGENT", "IMP", "TO-DO"],
  selectedTag: "NONE",
  editNote:{ isOpen:false, editingNote:{} }
};

function reducer(state, action) {
  switch (action.type) {
    case "CHANGE_SELECTED_TAG":
      return { ...state, selectedTag: action.payload };
    case "ADD_TAG_OPTION":
      return { ...state, tagOptions: [...state.tagOptions, action.payload] };
    case "ADD_NOTE":
      console.log("add note here");
      return action.payload.pin
        ? {
            ...state,
            pinnedNotesList: [action.payload, ...state.pinnedNotesList],
          }
        : {
            ...state,
            otherNotesList: [action.payload, ...state.otherNotesList],
          };
    case "DELETE_NOTE":
      console.log("delete here");
      return action.payload.pin
        ? {
            ...state,
            pinnedNotesList: [...state.pinnedNotesList.filter((note) => note.uuid !== action.payload.uuid)]
          }
        : {
            ...state,
            otherNotesList: [...state.otherNotesList.filter((note) => note.uuid !== action.payload.uuid)]
          };
    case "TOGGLE_NOTE_PIN":
      console.log("toggle pin here");
      return action.payload.pin ? 
      {
        ...state, 
        pinnedNotesList: [...state.pinnedNotesList.filter((note) => note.uuid!==action.payload.uuid)],
        otherNotesList: [{...action.payload, pin:!action.payload.pin}, ...state.otherNotesList]
      } : {
        ...state,
        otherNotesList: [...state.otherNotesList.filter((note) => note.uuid!==action.payload.uuid)],
        pinnedNotesList: [{...action.payload, pin:!action.payload.pin}, ...state.pinnedNotesList]
      };
    case "EDIT_NOTE_PROPERTY":
      console.log("edit note property here");
      return action.payload.pin ? 
      {
        ...state, 
        pinnedNotesList: [...state.pinnedNotesList.map((note) => {
          if(note.uuid === action.payload.uuid){
            return {...note, [action.payload.name] : action.payload.value}
          }
          return note;
        })]
      }
      :
      {
        ...state,
        otherNotesList: [...state.otherNotesList.map((note) => {
          if(note.uuid === action.payload.uuid){
            return {...note, [action.payload.name] : action.payload.value}
          }
          return note;
        })]
      };
    case "EDIT_NOTE":
      console.log("edit note here", action.payload);
      return action.payload.pin ? 
      {
        ...state, 
        editNote:{ isOpen:false, editingNote:{}},
        pinnedNotesList: [...state.pinnedNotesList.map((note) => {
          return note.uuid === action.payload.uuid? action.payload: note;
        })]
      }
      :
      {
        ...state,
        editNote:{ isOpen:false, editingNote:{}},
        otherNotesList: [...state.otherNotesList.map((note) => {
          return note.uuid === action.payload.uuid? action.payload: note;
        })]
      };
    case "SET_EDIT_NOTE":
      console.log("edit note here");
      return {
        ...state,
        editNote: action.payload
      }
    default:
      return state;
  }
}

export { reducer, initialState };
