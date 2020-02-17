import React, {ChangeEvent, useState} from 'react';
import {useDispatch} from "react-redux";
import {sendMessageTC} from "../../bll/usersReducer";


function InoutPanel() {

    const [message, newMessage] = useState('')

    const dispatch = useDispatch()

    const changeMessage = (e: ChangeEvent<HTMLInputElement>) => {
        newMessage(e.currentTarget.value)
    }

    const sendMessage = () => {
        newMessage('')
        dispatch(sendMessageTC(message))
    }

    return (
        <div className="App">
            <input onChange={changeMessage} value={message}/>
            <button onClick={sendMessage}>SEND</button>
        </div>
    );
}

export default InoutPanel;