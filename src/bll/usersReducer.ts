import {Dispatch} from "redux";
import {api} from '../api/api'
import {AppStateType} from "./store";

const SET_USER = 'SET_USER'
const SET_USER_IN_CHAT = 'SET_USER_IN_CHAT'

interface IUserState {
    userId: number,
    isFetching: boolean,
    chatId: number
}

interface IActionSetUser {
    type: typeof SET_USER
    userId: number
    status: string
}

interface IActionUserSetInChat {
    type: typeof SET_USER_IN_CHAT
    status: string
    chatId: number
}


const initialState: IUserState = {
    userId: 0,
    isFetching: false,
    chatId: 0
}


const usersReducer = (state: IUserState = initialState, action: IActionSetUser | IActionUserSetInChat): IUserState => {
    switch (action.type) {
        case SET_USER: {
            return {
                ...state,
                userId: action.userId,
                isFetching: action.status === 'wait'
            }
        }
        case SET_USER_IN_CHAT: {
            return {
                ...state,
                chatId: action.chatId,
                isFetching: !(action.status === 'found')
            }
        }
    }
    return state
}


const postUser = (userId: number, status: string): IActionSetUser => ({type: SET_USER, userId, status})
const setUserInChat = (status: string, chatId: number): IActionUserSetInChat => ({type: SET_USER_IN_CHAT, status, chatId})

export const setUserTC = () => {
    return (dispatch: Dispatch) => {
        api.setUser().then(response => {
            dispatch(postUser(response.data.userId, response.data.status))
        })
    }
}

export const getUserTC = () => {
    return (dispatch: Dispatch, getState: () => AppStateType) => {
        api.getUser(getState().users.userId).then(response => {
            dispatch(setUserInChat(response.data.status, response.data.chatId))
        })
    }
}

export default usersReducer