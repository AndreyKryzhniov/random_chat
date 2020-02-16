import axios from "axios"

const instance = axios.create({
    baseURL: "https://vast-sands-32724.herokuapp.com/",
})

export const api ={
    setUser () {
        return instance.post('user')
    },
    getUser () {
        return instance.get('user')
    }
}