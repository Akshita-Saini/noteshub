import { v4 as uuid } from "uuid";

const initialState = {
  pinnedNotesList: [{
    body: "Four Thousand Weeks \nNever Split the Difference \nHappy Sexy Millionaire \nHow to Not Die Alone \nThe Millionaire Fastlane \nTraction",
    color: "#D1FF9B",
    date: "Thu Jan 27 2022 21:14:40 GMT+0530 (India Standard Time)",
    pin: true,
    tag: "NONE",
    title: "6 Books to Read in 2022",
    uuid: uuid()
  }
],
  otherNotesList: [
    {
      body: "Why does 1% matter?\nThe Importance of Systems Rather Than Goals\nIdentity Change is the North Star of Habit Change\nHow to Build A Habit\nThe 4 Laws of Behaviour Change",
      color: "#FCCFE7",
      date: "Thu Jan 27 2022 21:19:50 GMT+0530 (India Standard Time)",
      pin: false,
      tag: "Todo",
      title: "Points from Atomic Habits - James Clear",
      uuid: uuid()
    }
  ],
  tagOptions: ["Urgent", "Todo"],
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
      return {
        ...state,
        editNote: action.payload
      }
    default:
      return state;
  }
}

export { reducer, initialState };
