import {Dispatch} from "redux";
import {api} from '../api/api'

const SET_USERS = 'SET_USERS'

interface IUserState {
    id: number,
    isFetching: boolean
}

interface IAction {
    type: typeof SET_USERS
    id: number
    status: string
}

const initialState: IUserState = {
    id: 0,
    isFetching: false
}


const usersReducer = (state: IUserState = initialState, action: IAction): IUserState => {
    switch (action.type) {
        case SET_USERS: {
            debugger
            return {
                ...state,
                id: action.id,
                isFetching: action.status === 'wait'
            }
        }
    }
    return state
}


const setUser = (id: number, status: string): IAction => ({type: SET_USERS, id, status})

export const getUserTC = () => {
    return (dispatch: Dispatch) => {
        api.getUser().then(response => {
            dispatch(setUser(response.data.userId, response.data.status))
        })
    }
}

export default usersReducer