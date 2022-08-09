import { Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { AxiosReq } from '../../../Components/Axios'
import Crypt from '../../../Components/Crypt'
import Col1 from './Col1'
import Col2 from './Col2'
import { useHistory } from 'react-router-dom'
import { toast_error } from '../../../Components/Toast'

function CRM() {
  const [ready, setReady] = useState({ load: false })
  const history = useHistory()
  const [load, setLoad] = useState(true)

  useEffect(() => {
    setLoad(true)
    try {
      let phone = localStorage.getItem("ONE_PHONE")
      if (phone.length <= 0) {
        toast_error({ text: "ກະລຸນາປ້ອນເບີ !!" })
        history.push("/app")
      } else {
        setReady({ ...ready, load: true })
        AxiosReq.get("NewNetworkType?msisdn=" + phone).then(res => {
          if (res.status === 200) {
            // console.log(res.data)
            localStorage.setItem("ONE_NETWORK", Crypt({ Type: "crypt", Value: JSON.stringify(res.data) }))
            setReady({ ...ready, load: false })
            setLoad(false)
          }
        })
      }
    } catch (error) {
      toast_error({ text: "ກະລຸນາປ້ອນເບີ !!" })
      history.push("/app")
      setLoad(false)
    }
  }, [])
  return (
    <>
      {!load &&
        <Grid container>
          <Grid item xs={12} md={6}>
            <Col1 />
          </Grid>
          <Grid item xs={12} md={6}>
            <Col2 />
          </Grid>
        </Grid>}
    </>
  )
}

export default CRM