import React from "react"
import ReactDOM from "react-dom/client"
import { Workspace } from "./page/Editor/Workspace"
import "./index.scss"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <div className="App">
      <Workspace />
    </div>
  </React.StrictMode>,
)
