import React, {useEffect, useState} from 'react';
// import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {getUserTC, setUserTC} from '../../bll/usersReducer'
import { AppStateType } from '../../bll/store';
import { Redirect } from 'react-router-dom';

function StartPage() {

    let [intervalId, changeIntervalId] = useState()
    let isFetching = useSelector((store: AppStateType) => store.users.isFetching)
    let chatId = useSelector((store: AppStateType) => store.users.chatId)
    const dispatch = useDispatch()

    const startSearching = () => {
        dispatch(setUserTC())
    }

    useEffect(() => {
        clearInterval(intervalId)
        if (isFetching) {
            changeIntervalId(setInterval(() => {
                dispatch(getUserTC())
            }, 1000))
        }
        return () => clearInterval(intervalId)
    }, [isFetching])

    if (chatId) {
        return <Redirect to={'/chat_page'}/>
    }


    return (
        <div className="App">
            <button onClick={startSearching} disabled={isFetching}>Start a random conversation</button>
        </div>
    );
}

export default StartPage;