import React from "react";
import {App} from "./components/App/App";
import * as ReactDOMClient from "react-dom/client";

const root = ReactDOMClient.createRoot(document.getElementById('root'))
root.render(<App />);