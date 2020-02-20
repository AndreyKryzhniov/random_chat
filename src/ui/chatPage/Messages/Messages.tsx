import React from 'react';
import {IMessage} from "../../../api/api";
import mes from './Messages.module.css'

interface IProps {
    userId: number
    messages: IMessage[]
}

function Messages(props: IProps) {


    let messages = props.messages.map((m, i) => {
        let classMessage = props.userId === m.userId
            ? mes.firstUser
            : m.userId === 0
                ? mes.systemMessage
                : mes.secondUser

        return <div key={i} className={classMessage}><span>{m.userId === 0 ? 'Пользователь покинул чат' : m.message}</span></div>
    })


    return (
        <div className={mes.container_messages}>
            {messages}
        </div>
    );
}

export default Messages;