import axios from 'axios'

const Axios = axios.create({
    baseURL: "http://10.30.6.148:28899/",
})
export default Axios
