import { v4 as uuid } from "uuid";

const COLORS = [
  { name: "White", value: "#fff"},
  { name: "Orange", value: "#FDDD81" },
  { name: "Red", value: "#F3968E" },
  { name: "Yellow", value: "#FFF583" },
  { name: "Green", value: "#D1FF9B" },
  { name: "Teal", value: "#B0FFED" },
  { name: "Blue", value: "#D0F1F9" },
  { name: "Dark Blue", value: "#B6D0FA" },
  { name: "Purple", value: "#D7AEFA" },
  { name: "Pink", value: "#FCCFE7" },
  { name: "Brown", value: "#E5C9A9" },
  { name: "Grey", value: "#E8EAED" },
];

const initialNote = {
  title: "",
  body: "",
  pin: false,
  date: "",
  color: "#fff",
  tag: "NONE",
  uuid: null,
};

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
  editNote: { isOpen:false, editingNote:{} }
};

export { COLORS, initialNote, initialState };
