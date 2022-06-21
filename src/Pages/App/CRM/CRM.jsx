import { Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { AxiosReq } from '../../../Components/Axios'
import Crypt from '../../../Components/Crypt'
import Col1 from './Col1'
import Col2 from './Col2'

function CRM() {
  // React.useEffect(() => {
  //   console.log('ooooo')
  //   let sendData = {
  //     "ChanelRequest":"ISD",
  //     "MessageSeq": "queryBalance1234",
  //     "LoginSystemCode": "APIGEEAPI",
  //     "Password": "cdVOUWF+57KsMd57vH8D3H+ykq4CbeLtc8wCapSScPhjazQDDuTrFUP4sDBpyX+q",
  //     "RemoteIP":"10.180.2.21",
  //     "ChannelID":"3",
  //     "PrimaryIdentity": "2059944454"
  // }
  //   axios.post("https://172.28.26.72:9443/api/cbs_ar_services/querybalance", sendData, {
  //     headers: {
  //       apikey: "1ceLL3KitsCAUekVdYTYSaYHrGho6QKA"
  //     }
  //   }).then(res => {
  //     console.log(res.data)
  //   }).catch(err => {
  //     console.log(err)
  //   })
  // }, [])
  const [ready, setReady] = useState({ load: false })
  useEffect(() => {
    setReady({ ...ready, load: true })
    let phone = "2059944454"
    AxiosReq.get("NewNetworkType?msisdn=" + phone).then(res => {
      if (res.status === 200) {
        // console.log(res.data)
        localStorage.setItem("ONE_NETWORK", Crypt({ Type: "crypt", Value: JSON.stringify(res.data) }))
        setReady({ ...ready, load: false })
      }
    })
  }, [])
  return (
    <>
      <Grid container>
        <Grid item xs={12} md={6}>
          <Col1 />
        </Grid>
        <Grid item xs={12} md={6}>
          <Col2 />
        </Grid>
      </Grid>
    </>
  )
}

export default CRM