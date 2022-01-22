import { createContext, useContext, useReducer } from "react";
import { reducer, initialState } from "../reducers/NotesReducer.jsx";

const NotesContext = createContext();

function ContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <NotesContext.Provider value={{ state, dispatch }}>
      {children}
    </NotesContext.Provider>
  );
}

function useNotes() {
  return useContext(NotesContext);
}

export { ContextProvider, useNotes };
