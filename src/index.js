import ReactDOM from "react-dom";
import { ContextProvider } from "./providers/NotesContextProvider";

import NotesHub from "./NotesHub";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <ContextProvider>
    <NotesHub />
  </ContextProvider>,
  rootElement
);
