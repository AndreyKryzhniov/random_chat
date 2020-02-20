import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getUserTC, setUserTC} from '../../bll/usersReducer'
import { AppStateType } from '../../bll/store';
import { Redirect } from 'react-router-dom';
import Loader from "../loader/Loader";


function StartPage() {
    let {isFetching, chatId, isLoading} = useSelector((store: AppStateType) => store.users)
    const dispatch = useDispatch()

    const startSearching = () => {
        dispatch(setUserTC())
    }

    useEffect(() => {
        if (isFetching && !isLoading) {
            setTimeout(() => {
                dispatch(getUserTC())
            }, 1500)
        }
    }, [isFetching, isLoading])

    if (chatId) {
        return <Redirect to={'/chat_page'}/>
    }


    return (
        <div className="App">
            <button onClick={startSearching} disabled={isFetching}>Start a random conversation</button>
            {isFetching &&
                <Loader/>
            }
        </div>
    );
}

export default StartPage;