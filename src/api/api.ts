import axios from "axios"

const instance = axios.create({
    baseURL: "https://vast-sands-32724.herokuapp.com/",
})

export const api ={
    getUser () {
        return instance.post('user')
    }
}