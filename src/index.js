import { StrictMode } from "react";
import ReactDOM from "react-dom";

import NotesHub  from "./NotesHub";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <NotesHub />
  </StrictMode>,
  rootElement
);
