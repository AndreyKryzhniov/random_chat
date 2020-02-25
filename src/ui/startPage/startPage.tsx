import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getUserTC, setUserTC} from '../../bll/usersReducer'
import {AppStateType} from '../../bll/store';
import {Redirect} from 'react-router-dom';
import Loader from "../loader/Loader";
import s from './StartPage.module.css'


function StartPage() {
    let {isFetching, chatId, isLoading} = useSelector((store: AppStateType) => store.users)
    const dispatch = useDispatch()
    const [mySex, setMySex] = useState<undefined | string>(undefined)
    const [findSex, setFindSex] = useState<string[]>(['all'])

    const sex = [
        'male',
        'female',
        'else',
    ]
    const checkSex = (checkedSex: string) => {
        if (!!findSex.find(s => s === checkedSex)) setFindSex(s => s.filter(s2 => s2 !== checkedSex))
        else setFindSex(s => [...s, checkedSex])
    }

    const startSearching = () => {
        dispatch(setUserTC(mySex, findSex))
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
        <div className={s.container}>

            {isFetching
                ? <Loader/>
                : (
                    <div style={{display: 'flex', flexFlow: 'column'}}>
                        my sex:
                        <select value={undefined} onChange={e => setMySex(e.currentTarget.value)}>
                            <option value={undefined}>none</option>
                            {sex.map((s, i) => <option key={'o' + i} value={s}>{s}</option>)}
                        </select>

                        find sex:
                        <label>
                            <input
                                type={'checkbox'}
                                checked={!!findSex.find(s => s === 'all')}
                                onChange={() => checkSex('all')}
                            />
                            all
                        </label>
                        {sex.map((s, i) => (
                            <label key={'s' + i}>
                                <input
                                    type={'checkbox'}
                                    checked={!!findSex.find(s2 => s2 === s)}
                                    onChange={() => checkSex(s)}
                                />
                                {s}
                            </label>

                        ))}

                        <button onClick={startSearching} disabled={isFetching}>Start a random conversation</button>
                    </div>
                )
            }
        </div>
    );
}

export default StartPage;
