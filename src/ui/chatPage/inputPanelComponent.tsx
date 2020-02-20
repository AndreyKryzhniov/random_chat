import React, {ChangeEvent, useState} from 'react';
import {useDispatch} from "react-redux";
import {sendMessageTC} from "../../bll/usersReducer";


function InoutPanel() {

    const [message, newMessage] = useState('')

    const dispatch = useDispatch()

    const changeMessage = (e: ChangeEvent<HTMLTextAreaElement>) => {
        newMessage(e.currentTarget.value)
    }

    const sendMessage = () => {
        if (!(message.length === 0)) {newMessage('')
        dispatch(sendMessageTC(message))}
    }

    const onKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && e.shiftKey) {
            sendMessage()
        }
    }

    return (
        <div className="App">
            <textarea onChange={changeMessage} value={message}  onKeyPress={onKeyPress}/>
            <button onClick={sendMessage}>SEND</button>
        </div>
    );
}

export default InoutPanel;