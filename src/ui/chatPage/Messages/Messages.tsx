import React, {useEffect, useState} from 'react';
import {IMessage} from "../../../api/api";
import mes from './Messages.module.css'

interface IProps {
    userId: number
    messages: IMessage[]
}

function Messages(props: IProps) {
    const ref = React.createRef<HTMLDivElement>()
    useEffect(() => {
        ref.current!.scroll(0, Number.MAX_SAFE_INTEGER)
    }, [props.messages])

    let messages = props.messages.map((m, i) => {
        let classMessage = props.userId === m.userId
            ? mes.firstUser
            : m.userId === 0
                ? mes.systemMessage
                : mes.secondUser

        return (
            <div>
                <div key={i} className={classMessage}>
                <pre>
                    {m.userId === 0 ? 'Пользователь покинул чат' : m.message}
                    <br/>
                    <div>{new Date(m.date).getHours()}:{new Date(m.date).getMinutes()}</div>
                </pre>
                </div>

            </div>
        )
    })


    return (
        <div className={mes.container_messages} style={{height: 350, overflow: "auto"}} ref={ref}>
            {messages}
        </div>
    );
}

export default Messages;