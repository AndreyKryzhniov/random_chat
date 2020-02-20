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
        <div className="App" style={{display: "flex", alignItems: 'center', justifyContent: "center"}}>
            <textarea
                onChange={changeMessage}
                value={message}
                onKeyPress={onKeyPress}
                style={{margin: 5, width: 250, height: 50, resize: "none", outline: "none"}}
            />
            <button onClick={sendMessage}>SEND</button>
        </div>
    );
}

export default InoutPanel;