import React, { useState } from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../bll/store";
import {Redirect} from "react-router-dom";
import InoutPanel from "./inputPanelComponent";
import {sendMessageTC} from "../../bll/usersReducer";

function ChatPage() {

    let chatId = useSelector((store: AppStateType) => store.users.chatId)

    let [disabledOut, setDisabled] = useState(false)

    const dispatch = useDispatch()

    if (!chatId) {
        return <Redirect to={'/start_page'}/>
    }

    const logOutOfChat = () => {
        setDisabled(true)
        dispatch(sendMessageTC('1qaz2wsx3edc'))
    }


    return (
        <div className="App">
            <button onClick={logOutOfChat} disabled={disabledOut}>out</button>
            <InoutPanel/>
        </div>
    );
}

export default ChatPage;