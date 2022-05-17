import axios from 'axios'

const AxiosElastic = axios.create({
    baseURL: "http://172.28.26.49:9200/",
})
export default AxiosElastic
