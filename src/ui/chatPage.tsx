import React from 'react';
import {useSelector} from "react-redux";
import {AppStateType} from "../bll/store";
import {Redirect} from "react-router-dom";

function ChatPage() {

    let chatId = useSelector((store: AppStateType) => store.users.chatId)

    if (!chatId) {
        return <Redirect to={'/start_page'}/>
    }

    return (
        <div className="App">
            <button>out</button>
        </div>
    );
}

export default ChatPage;