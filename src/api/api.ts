import axios from "axios"

const instance = axios.create({
    baseURL: "https://vast-sands-32724.herokuapp.com/",
})

export const api ={
    setUser () {
        return instance.post('user')
    },
    getUser (userId: number) {
        return instance.get(`user?userId=${userId}`)
    }
}