import React from 'react';
import './App.css';
import StartPage from "./ui/startPage/startPage";
import ChatPage from "./ui/chatPage/chatPage";
import {Route} from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Route render={ () => <StartPage/>} patch={'/start_page'}/>
      <Route render={ () => <ChatPage/>} patch={'/chat_page'}/>
    </div>
  );
}

export default App;
