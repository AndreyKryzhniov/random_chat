import React from 'react';
import app from './App.module.css';
import StartPage from "./ui/startPage/startPage";
import ChatPage from "./ui/chatPage/chatPage";
import {Route, Redirect} from "react-router-dom";


function App() {
  return (
    <div className={app.container}>
      <Route render={ () => <StartPage/>} patch={'/start_page'}/>
      <Route render={ () => <ChatPage/>} patch={'/chat_page'}/>
      <Route render={ () => <Redirect to={'/chat_page'}/>} patch={'/'}/>
    </div>
  );
}

export default App;
