import { Grid } from '@mui/material'
import axios from 'axios'
import React from 'react'
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