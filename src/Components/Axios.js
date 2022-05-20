import axios from 'axios'

export const AxiosAPI = axios.create({
    baseURL: "http://172.28.14.48:3001/",
    auth: {
        username: "isd",
        password: "#Ltc1qaz2wsx@isd"
    }
})
