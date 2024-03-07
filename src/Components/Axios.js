import axios from 'axios'

export const AxiosAPI = axios.create({
    // baseURL: "http://172.28.14.48:3001/",
    baseURL: "http://10.30.6.148:3001/",
    auth: {
        username: "isd",
        password: "#Ltc1qaz2wsx@isd"
    }
})

export const AxiosReq = axios.create({
    // baseURL: "http://10.30.6.148:5678/",
    baseURL: "http://localhost:5001/",
})

export const Axios5g = axios.create({
    baseURL: "172.28.14.48:2031/",
    auth: {
        username: "package",
        password: "#Ltc1qaz2wsx@pk"
    }
})
