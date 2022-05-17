import React from 'react'
import { Grid } from '@material-ui/core'
import Axios from '../../Pages/Components/Axios'
import GetPhoneNumber from '../../Pages/Components/GetPhoneNumber'
import cookie from 'js-cookie'

import Accordion_1 from './Accordion/Accordion_1'
import Accordion_2 from './Accordion/Accordion_2'
import Accordion_3 from './Accordion/Accordion_3'
import Accordion_4 from './Accordion/Accordion_4'
import Accordion_5 from './Accordion/Accordion_5'
import Accordion_6 from './Accordion/Accordion_6'
import Accordion_7 from './Accordion/Accordion_7'

import TopItem from './TopItem/TopItem'
import Accordion_8 from './Accordion/Accordion_8'
import BssCard from './Card/BssCard'

function MiniCRM() {
    const [st, setST] = React.useState(null)
    React.useEffect(() => {
        // console.log('ok')
        var phone = GetPhoneNumber()
        Axios.get("api/CheckNetworkType?msisdn=" + phone, { headers: { 'Authorization': 'Bearer ' + cookie.get("one_session") } }).then(res => {
            if (res.status === 200) {
                if (res.data.networK_CODE === "G") {
                    setST("BSS")
                } else if (res.data.networK_CODE === "M") {
                    setST("OCS")
                } else if (res.data.networK_CODE === "F") {
                    setST("FTTH")
                }
            }
        }).catch(err => {
            setST("OCS")
        })

    }, [])
    return (
        <>
            <Grid container>
                <TopItem />
                <Grid item xs={12} md={4}>
                    {st !== "FTTH" && <>
                        <Accordion_1 />
                    </>}

                    <Accordion_2 />
                    <Accordion_3 />
                    <Accordion_4 />
                </Grid>
                <Grid item xs={12} md={4}>
                    {st !== "FTTH" && <>
                        <Accordion_5 />
                        <Accordion_6 />
                        <Accordion_7 />
                        {/* <Accordion_8 /> */}
                    </>}
                </Grid>
                <Grid item xs={12} md={4}>
                    <BssCard />
                </Grid>


            </Grid>
        </>
    )
}

export default MiniCRM
