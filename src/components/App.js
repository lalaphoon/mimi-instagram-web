import React from 'react';
import '../styles/App.css';
import {Topbar} from "./Topbar"
import { Main } from "./Main"

function App() {
  return (
    <div className="App">
        <Topbar/>
        <Main />
    </div>
  );
}

export default App;
