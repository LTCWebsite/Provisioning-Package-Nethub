import axios from 'axios'
import moment from 'moment'

export default function Doing({ username, msisdn, detail, resualt, info }) {
  const create = {
    mappings: {
      properties: {
        username: {
          type: "text"
        },
        msisdn: {
          type: "text"
        },
        timestamp: {
          type: "date"
        },
        function_name: {
          "type": "text"
        },
        detail: {
          type: "text"
        },
        info: {
          type: "text"
        },
        resualt: {
          type: "text"
        }
      }
    }
  }
  var save = {
    username: username,
    msisdn: msisdn,
    timestamp: moment(new Date()).format(),
    detail: detail,
    resualt: resualt,
    info: info,
  }
  let date = moment(new Date()).format("YYYYMM")
  axios.put("http://10.30.6.90:9200/one-" + date, create, { auth: { username: "elastic", password: "ltc1qaz2wsx" } })
  setTimeout(() => {
    axios.post("http://10.30.6.90:9200/one-" + date + "/_doc", save, { auth: { username: 'elastic', password: 'ltc1qaz2wsx' } })
  }, 100)
}

