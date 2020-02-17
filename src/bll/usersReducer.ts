import {Dispatch} from "redux";
import {api, IMessage} from '../api/api'
import {AppStateType} from "./store";

const SET_USER = 'SET_USER'
const SET_USER_IN_CHAT = 'SET_USER_IN_CHAT'
const SET_MESSAGES = 'SET_MESSAGES'

interface IUserState {
    userId: number
    isFetching: boolean
    chatId: number
    messages: IMessage[]
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

interface IActionUserSetMessages {
    type: typeof SET_MESSAGES
    status: string
    messages: IMessage[]
}


const initialState: IUserState = {
    userId: 0,
    isFetching: false,
    chatId: 0,
    messages: [],
}

type IActions = IActionSetUser | IActionUserSetInChat | IActionUserSetMessages


const usersReducer = (state: IUserState = initialState, action: IActions): IUserState => {
    switch (action.type) {
        case SET_USER: {
            return {
                ...state,
                userId: action.userId,
                isFetching: action.status === 'wait',
                messages: [],
            }
        }
        case SET_USER_IN_CHAT: {
            return {
                ...state,
                chatId: action.chatId,
                isFetching: !(action.status === 'found' || action.status === '1qaz2wsx3edc'),
            }
        }
        case SET_MESSAGES: {
            return {
                ...state,
                messages: [...state.messages, ...action.messages],
            }
        }


    }
    return state
}


const postUser = (userId: number, status: string): IActionSetUser => ({type: SET_USER, userId, status})
const setUserInChat = (status: string, chatId: number): IActionUserSetInChat => ({type: SET_USER_IN_CHAT, status, chatId})
const setMessages = (status: string, messages: IMessage[]): IActionUserSetMessages => ({type: SET_MESSAGES, status, messages})

export const setUserTC = () => {
    return (dispatch: Dispatch) => {
        dispatch(postUser(0, 'wait'))
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

export const getMessagesTC = () => {
    return (dispatch: Dispatch, getState: () => AppStateType) => {
        const users = getState().users;
        const date = '' + (users.messages.length && users.messages[users.messages.length - 1].date);
        api.getMessages(users.userId, users.chatId, date).then(response => {
            dispatch(setMessages(response.data.status, response.data.messages))
        })
    }
}
export const sendMessageTC = (message: string) => {
    return (dispatch: Dispatch, getState: () => AppStateType) => {
        const users = getState().users;
        api.sendMessage(users.userId, users.chatId, message).then(response => {
            {
                message === '1qaz2wsx3edc' && dispatch(setUserInChat('1qaz2wsx3edc', 0))
            }
            // dispatch(setUserInChat(response.data.status, response.data.chatId))
        })
    }
}

export default usersReducer