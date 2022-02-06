import { initialState } from "../utils/Constants";

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
            otherNotesList: [action.payload, ...state.otherNotesList],
          };
    case "DELETE_NOTE":
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
      return action.payload.pin ? 
      {
        ...state, 
        editNote:{ isOpen:false, note:{}},
        pinnedNotesList: [...state.pinnedNotesList.map((note) => {
          return note.uuid === action.payload.uuid? action.payload: note;
        })]
      }
      :
      {
        ...state,
        editNote:{ isOpen:false, note:{}},
        otherNotesList: [...state.otherNotesList.map((note) => {
          return note.uuid === action.payload.uuid? action.payload: note;
        })]
      };
    case "SET_NOTE_TO_EDIT":
      return {
        ...state,
        editNote: action.payload
      }
    default:
      return state;
  }
}

export { reducer, initialState };
