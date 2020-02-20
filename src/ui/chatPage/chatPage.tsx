import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../bll/store";
import {Redirect} from "react-router-dom";
import InoutPanel from "./inputPanelComponent";
import {sendMessageTC, getMessagesTC} from "../../bll/usersReducer";
import Messages from './Messages/Messages';
import c from './ChatPage.module.css'


function ChatPage() {
    let {chatId, messages, isLoading, userId} = useSelector((store: AppStateType) => store.users)
    let [disabledOut, setDisabled] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        if (chatId && !isLoading)
        setTimeout(() => {
            dispatch(getMessagesTC())
        }, 1500)
    }, [isLoading, chatId])

    if (!chatId) {
        return <Redirect to={'/start_page'}/>
    }

    const logOutOfChat = () => {
        setDisabled(true)
        dispatch(sendMessageTC('1qaz2wsx3edc'))
    }


    return (
        <div className={c.container}>
            <div>
                <button onClick={logOutOfChat} disabled={disabledOut}>out</button>
            </div>
            <Messages messages={messages} userId={userId}/>
            <InoutPanel/>
        </div>
    );
}

export default ChatPage;
