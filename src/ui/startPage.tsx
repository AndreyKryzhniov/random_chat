import React from 'react';
// import './App.css';
import {useDispatch} from "react-redux";
import {getUserTC} from '../bll/usersReducer'

function StartPage() {

    const dispatch = useDispatch()

    const startSearching = () => {
        dispatch(getUserTC())
    }

    return (
        <div className="App">
            <button onClick={startSearching}>Start a random conversation</button>
        </div>
    );
}

export default StartPage;