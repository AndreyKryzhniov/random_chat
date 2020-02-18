import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../bll/store";
import {Redirect} from "react-router-dom";
import InoutPanel from "./inputPanelComponent";
import {sendMessageTC, getMessagesTC} from "../../bll/usersReducer";

function ChatPage() {
    let {chatId, messages} = useSelector((store: AppStateType) => store.users)
    let [disabledOut, setDisabled] = useState(false)
    const dispatch = useDispatch()
    const [int, setInt] = useState()
    useEffect(() => {
        clearInterval(int)
        if (chatId)
        setInt(setInterval(() => {
            dispatch(getMessagesTC())
        }, 1000))
        return () => clearInterval(int)
    }, [chatId])

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
            {messages.map((m, i) => <div key={i}>{m.message}</div>)}
            <InoutPanel/>
        </div>
    );
}

export default ChatPage;
