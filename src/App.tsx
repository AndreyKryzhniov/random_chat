import React from 'react';
import './App.css';
import StartPage from "./ui/startPage/startPage";
import ChatPage from "./ui/chatPage/chatPage";
import {Route, Redirect} from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Route render={ () => <StartPage/>} patch={'/start_page'}/>
      <Route render={ () => <ChatPage/>} patch={'/chat_page'}/>
      <Route render={ () => <Redirect to={'/chat_page'}/>} patch={'/'}/>
    </div>
  );
}

export default App;
