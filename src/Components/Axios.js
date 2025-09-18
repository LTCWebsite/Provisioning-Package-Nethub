import axios from "axios";

export const AxiosAPI = axios.create({
  // baseURL: "http://172.28.14.48:3001/",
  baseURL: "http://10.30.6.148:3001/",
  auth: {
    username: "isd",
    password: "#Ltc1qaz2wsx@isd",
  },
});

export const AxiosReq = axios.create({
  //baseURL: "http://10.30.6.148:5678/",
  baseURL: "http://10.30.6.148:9999/",
  // baseURL: "http://localhost:5001/",
});

export const AxiosElastic = axios.create({
  baseURL: "http://172.28.26.97:9200/"
});

export const AxiosMonomax = axios.create({
  //baseURL: "http://10.30.6.148:5678/",
  baseURL: "http://172.28.26.123:9000",
  auth: {
    username: "monomax",
    password: "#Monomax@2025",
  },
  // baseURL: "http://localhost:5001/",
});

export const AxiosReq2 = axios.create({
  baseURL: "http://10.30.6.148:5678/api/",
  // baseURL: "http://localhost:5001/",
});
export const AxiosReq3 = axios.create({
  baseURL: "http://10.30.6.148:5678/",
  // baseURL: "http://localhost:5001/",
});

export const Axios5g = axios.create({
  baseURL: "172.28.14.48:2031/",
  auth: {
    username: "package",
    password: "#Ltc1qaz2wsx@pk",
  },
});

export const AxiosCBS = axios.create({
  //baseURL: "http://172.28.26.146:9910/",
  baseURL: "http://10.30.6.148:9910/",
  auth: {
    username: "admin",
    password: "#Ltc1qaz2wsx@cbs",
  },
});

export const AxiosSpecialRedeem = axios.create({
  baseURL: "http://10.30.6.148:3002/api/",
});

export const AxiosSubscriber = axios.create({
  baseURL: "http://10.30.6.148:5678",
});
