import React from 'react'
import { Grid, Card, CardContent } from '@material-ui/core'
import TabShowDetail from './TabShowDetail'
import Axios from '../Components/Axios'
import GetPhoneNumber from '../Components/GetPhoneNumber'
import cookie from 'js-cookie'


import RegisterInfo from './components/RegisterInfo'
import SimInformation from './components/SimInformation'
import UserDetail from './components/UserDetail'
import Application from './components/Application'
import BalanceAndData from './components/BalanceAndData'
import ValueAddedService from './components/ValueAddedService'
// import Product from './components/Product'
import BSSinfo from './components/BSSinfo'
import Fadao from './components/Fadao'

import FTTH from './components/FTTH'
import FTTHPhone from './components/FTTHPhone'

function MiniCRM() {
    const [st, setST] = React.useState(null)
    React.useEffect(() => {
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
            <Grid container item xs={12}>
                {st !== "FTTH" &&
                    <Grid item xs={12} lg={3}>
                        <Card elevation={0} className="box" style={{ borderBottom: "6px solid #f6c23e" }}>
                            <CardContent className="content-1">
                                <Grid container>
                                    <UserDetail />
                                </Grid>
                            </CardContent>
                        </Card>
                        <Card style={{ marginTop: 10, borderBottom: "6px solid #1cc88a" }} elevation={0} className="box">
                            <CardContent className="content-1">
                                <Grid container>
                                    {/* import OCS */}
                                    <RegisterInfo />


                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                }
                {st === 'FTTH' &&
                    <Grid item xs={12} lg={6}>
                        <Card elevation={0} className="box" style={{ borderBottom: "6px solid ##36b9cc" }}>
                            <CardContent className="content-1">
                                <Grid container>
                                    {/* FTTH */}
                                    <FTTH />
                                </Grid>
                            </CardContent>
                        </Card>
                        <Card style={{ marginTop: 10 }} elevation={0} className="box">
                            <CardContent className="content-1">
                                <Grid container>
                                    {/* import OCS */}
                                    <FTTHPhone />

                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>

                }
                <Grid item xs={12} lg={3}>
                    <Card elevation={0} className="box" style={{ borderBottom: '6px solid #5a5c69' }}>
                        <CardContent className="content-1">
                            <Grid container>

                                {/* import Application */}
                                <BSSinfo />

                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                {st !== 'FTTH' &&
                    <Grid item xs={12} lg={3}>
                        <Card elevation={0} className="box" style={{ borderBottom: '6px solid #4e73df' }}>
                            <CardContent className="content-1">
                                <Grid container>

                                    {/* sim infomation */}
                                    <SimInformation />

                                </Grid>
                            </CardContent>
                        </Card>
                        <Card style={{ marginTop: 10 }} elevation={0} className="box" style={{ borderBottom: '6px solid #e74a3b' }}>
                            <CardContent className="content-1">
                                <Grid container>

                                    {/* import valueAddedService */}
                                    <ValueAddedService />

                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                }

                <Grid item xs={12} lg={3}>
                    <Card elevation={0} className="box" style={{ borderBottom: '6px solid #1cc88a' }}>
                        <CardContent className="content-1">
                            <Grid container>

                                <BalanceAndData />

                            </Grid>
                        </CardContent>
                    </Card>
                    {st !== 'FTTH' &&
                        <Card style={{ marginTop: 10, borderBottom: '6px solid #e74a3b' }} elevation={0} className="box">
                            <CardContent className="content-1">
                                <Grid container>
                                    {/* import Application */}
                                    <Application />

                                </Grid>
                            </CardContent>
                        </Card>
                    }
                    <Card style={{ marginTop: 10, borderBottom: "6px solid #f6c23e" }} elevation={0} className="box">
                        <CardContent className="content-1">
                            <Grid container>
                                {/* import Application */}
                                <Fadao />

                            </Grid>
                        </CardContent>
                    </Card>

                </Grid>

                {/* tab */}
                <TabShowDetail />

            </Grid>
        </>
    )
}

export default MiniCRM
