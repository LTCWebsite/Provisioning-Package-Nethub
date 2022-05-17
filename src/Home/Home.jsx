import React from 'react'
import { useWindowSize } from '@react-hook/window-size'
import Sidebar from "react-sidebar"
import { Button, Grid, IconButton } from '@mui/material'
import { Menu as Toggle, Search } from '@mui/icons-material'
import { Scrollbars } from 'react-custom-scrollbars'
import Nav from './Nav'
import Crypt from '../Pages/Components/Crypt'
import './home.css'
import { useHistory } from 'react-router-dom'
import { AlertWarning } from '../Pages/Components/Toast'
import logo from '../Image/one_screen.png'
import Doing from '../Pages/Components/Doing'
import Router from './router'

import cookie from 'js-cookie'
import Axios from '../Pages/Components/Axios'
// import moment from 'moment'
import Profile from './Pages/Profile/Profile'

function Home() {
    const history = useHistory()
    const size = useWindowSize()
    const [info, setInfo] = React.useState('')
    const [myphone, setPhone] = React.useState(null)


    const [nKyc, setNkyc] = React.useState({ st: '', data: [], use: [], fc: false })
    // const [nBss, setNbss] = React.useState({ st: '', data: [], use: [], fc: false })
    const [nOcs, setNocs] = React.useState({ st: '', data: [], use: [], fc: false, ch: [] })
    const [nbad, setNbad] = React.useState({ st: '', data: [], use: [], fc: false })
    const [call, setCall] = React.useState({ st: '', data: [], use: [], fc: false })
    const [bl, setBL] = React.useState({ st: '', fc: false })
    const [appli, setAppli] = React.useState({ st: '', data: [], use: [], fc: false })
    const [ftth, setFtth] = React.useState({ st: '', data: [], use: [], fc: false })
    const [ftthPhone, setFtthPhone] = React.useState({ st: '', data: [], use: [], fc: false })
    const [network, setNetwork] = React.useState('')
    // const [pk, setPK] = React.useState({ st: '', data: [], use: [], fc: false })
    // const [vas, setVas] = React.useState({ st: '', data: [], use: [], fc: false })

    React.useEffect(() => {
        if (size[0] <= 1200) {
            setOpen(false)
        } else {
            setOpen(true)
        }
        try {
            setInfo(Crypt({ type: 'decrypt', value: localStorage.getItem("one_info") }).username)
        } catch (err) {

        }
        try {
            var phone = Crypt({ type: "decrypt", value: localStorage.getItem("input-phone") })
            phone = phone.text
            setPhone(phone)
        } catch (err) {

        }
    }, [size])
    const [open, setOpen] = React.useState(false)

    function Menu() {
        return (
            <div className="nav">
                <div className="center nav-bg">
                    <img src={logo} alt="logo" style={{ height: 140 }} />
                </div>
                <div className="center pad-10">
                    <Scrollbars style={{ width: '100%', height: size[1] - 160 }}>

                        <Nav
                            ocs={nOcs}
                            kyc={nKyc}
                            // nbss={nBss}
                            bad={nbad}
                            call={call}
                            bl={bl}
                            application={appli}
                            network_code={network}
                            ftth={ftth}
                            ftthPhone={ftthPhone}
                        // vas={vas}
                        // pk={pk} 
                        />

                    </Scrollbars>
                </div>
            </div>
        )
    }

    const changePhone = (e) => {
        if (e.length > 10) {
            let number = e.replaceAll(/\s/g, '')
            let newPhone = ''
            if (number.includes("+85620")) {
                newPhone = String(number).substring(4, 14)
            } else if (number.includes("20")) {
                newPhone = number
            }

            if (newPhone.length === 10) {
                setPhone(newPhone)
                setNbad({ ...nbad, fc: false })
            }
        } else {
            setPhone(e)
            setNbad({ ...nbad, fc: false })
        }
    }
    const checkKey = (e) => {
        if (e.code === 'Enter' || e.code === 'NumpadEnter') {
            searchPhoneNumber()
        }
    }






    ///////////////////////////////     loading Data
    const loadNav = () => {
        const phone = Crypt({ type: "decrypt", value: localStorage.getItem("input-phone") })

        setFtth({ st: 'loading', data: [], use: [], fc: false })
        setFtthPhone({ st: 'loading', data: [], use: [], fc: false })
        setNbad({ st: 'loading', data: [], use: [], fc: false })
        setNkyc({ st: 'loading', data: [], use: [], fc: false })
        setNocs({ st: 'loading', data: [], ch: [], use: [], fc: false })
        setBL({ st: 'loading', fc: false })
        setAppli({ st: 'loading', data: [], use: [], fc: false })
        setCall({ st: 'loading', data: [], ch: [], use: [], fc: false })

        Axios.get("api/CheckNetworkType?msisdn=" + myphone, { headers: { 'Authorization': 'Bearer ' + cookie.get("one_session") } }).then(res => {
            if (res.status === 200) {
                var save = res.data.networK_CODE
                setNetwork(save)
                localStorage.setItem("network_code", Crypt({
                    type: "crypt", value: JSON.stringify({
                        text: save
                    })
                }))

                if (save === "F") {


                    
                    Axios.get("Fiber?ftth=" + phone.text, { headers: { 'Authorization': 'Bearer ' + cookie.get("one_session") } }).then(res => {
                        if (res.status === 200) {
                            setFtth({ st: 'Yes', data: res.data, use: [], fc: true })
                        }
                    })

                    
                    // Axios.post("Fiber?ftth=" + phone.text, {}, { headers: { 'Authorization': 'Bearer ' + cookie.get("one_session") } }).then(res => {
                    //     if (res.status === 200) {
                    //         setFtthPhone({ st: 'Yes', data: res.data, use: [], fc: true })
                    //     }
                    // })
                } else {



                    
                    Axios.get("CheckPoint?msisdn=" + phone.text, { headers: { 'Authorization': 'Bearer ' + cookie.get("one_session") } }).then(res => {
                        if (res.status === 200) {
                            var get = res.data.checkPointResult
                            Axios.get("CheckBalance?msisdn=" + phone.text, { headers: { 'Authorization': 'Bearer ' + cookie.get("one_session") } }).then(re => {
                                if (re.status === 200) {
                                    setNbad({ st: 'Yes', data: get, use: re.data, fc: true })
                                }
                            })
                        }
                    })

                    
                    Axios.get("Register3Grab?msisdn=" + phone.text, { headers: { 'Authorization': 'Bearer ' + cookie.get("one_session") } }).then(res => {
                        if (res.status === 200) {
                            var myData = { re: '-', number: '-' }
                            if (res.data.idcard !== '' && res.data.idcard !== 'None') {
                                myData = { re: 'ບັດປະຈຳຕົວ', number: res.data.idcard?.substr(0, res.data.idcard.length - 5) + 'XXXXX' }
                            } else if (res.data.passport !== '' && res.data.passport !== 'None') {
                                myData = { re: 'Passport', number: res.data.passport?.substr(0, res.data.passport.length - 3) + 'XXX' }
                            } else if (res.data.idfamily !== '' && res.data.idfamily !== 'None') {
                                myData = { re: 'ສຳມະໂນຄົວ', number: res.data.idfamily?.substr(0, res.data.idfamily.length - 2) + 'XX' }
                            } else {
                                myData = { re: '-', number: '-' }
                            }
                            setNkyc({ st: res.data.resultCode === '200' ? 'Yes' : 'No', data: res.data, use: myData, fc: true })
                        }
                    })
                    // se


                    
                    
                    Axios.get("QueryCustomerOCS?msisdn=" + phone.text, { headers: { 'Authorization': 'Bearer ' + cookie.get("one_session") } }).then(res => {
                        if (res.status === 200) {
                            var edit = res.data?.ocsDetail
                            var myData = {
                                activeDate: edit.activeDate === null ? '' : edit.activeDate.substr(6, 2) + '-' + edit.activeDate.substr(4, 2) + '-' + edit.activeDate.substr(0, 4) + ' ' + edit.activeDate.substr(8, 2) + ':' + edit.activeDate.substr(10, 2) + ':' + edit.activeDate.substr(12, 2),
                                barringDate: edit.barringDate === null ? '' : edit.barringDate.substr(6, 2) + '-' + edit.barringDate.substr(4, 2) + '-' + edit.barringDate.substr(0, 4) + ' ' + edit.barringDate.substr(8, 2) + ':' + edit.barringDate.substr(10, 2) + ':' + edit.barringDate.substr(12, 2),
                                expriceDate: edit.expriceDate === null ? '' : edit.expriceDate.substr(6, 2) + '-' + edit.expriceDate.substr(4, 2) + '-' + edit.expriceDate.substr(0, 4) + ' ' + edit.expriceDate.substr(8, 2) + ':' + edit.expriceDate.substr(10, 2) + ':' + edit.expriceDate.substr(12, 2),
                                suspendDate: edit.suspendDate === null ? '' : edit.suspendDate.substr(6, 2) + '-' + edit.suspendDate.substr(4, 2) + '-' + edit.suspendDate.substr(0, 4) + ' ' + edit.suspendDate.substr(8, 2) + ':' + edit.suspendDate.substr(10, 2) + ':' + edit.suspendDate.substr(12, 2),
                                mainProduct: edit.mainProduct,
                                productType: edit.productType,
                                state: edit.state,
                            }
                            Axios.get("CheckStatusSIM?msisdn=" + phone.text, { headers: { 'Authorization': 'Bearer ' + cookie.get("one_session") } }).then(re => {
                                if (re.status === 200) {
                                    setNocs({ st: edit.state, data: myData, use: re.data.blacklistStatus === '0' ? false : true, fc: true, ch: re.data })
                                    setBL({ st: re.data.blacklistStatus === '0' ? false : true, fc: true })
                                }
                            }).catch(err => {
                                setNocs({ st: edit.state, data: myData, use: '', fc: true, ch: [] })
                                setBL({ st: '' })
                            })
                        }
                    })

                    
                    Axios.get("QueryHLRInfo?msisdn=" + phone.text, { headers: { 'Authorization': 'Bearer ' + cookie.get("one_session") } }).then(res => {
                        if (res.status === 200) {
                            var myData = {
                                m_ir: res.data.queryServiceResult.irData === '0' ? false : true,
                                m_3G: res.data.queryServiceResult.open3G === '0' ? false : true,
                                m_4G: res.data.queryServiceResult.open4G === '0' ? false : true,
                                m_call: res.data.queryServiceResult.irCall === '0' ? false : true,
                            }
                            setCall({ st: 'done', data: myData, use: [], fc: true })
                        }
                    })

                    
                    Axios.get("MServices?msisdn=" + phone.text, { headers: { 'Authorization': 'Bearer ' + cookie.get("one_session") } }).then(res => {
                        if (res.status === 200) {
                            var m_service = res.data.isRegistered
                            Axios.get("MTopupPlus?msisdn=" + phone.text, { headers: { 'Authorization': 'Bearer ' + cookie.get("one_session") } }).then(res => {
                                if (res.status === 200) {
                                    var m_topup = res.data.isRegistered
                                    setAppli({ st: 'done', data: m_service, use: m_topup, fc: true })
                                }
                            }).catch(err => {
                                setAppli({ st: 'done', data: m_service, use: [], fc: true })
                            })
                        }
                    })

                    // setVas({ st: 'loading', data: [], use: [], fc: false })


                    // setPK({ st: 'loading', data: [], use: [], fc: false })
                    // Axios.get("QueryPackage?msisdn=" + phone.text, { headers: { 'Authorization': 'Bearer ' + cookie.get("one_session") } }).then(res => {
                    //     if (res.status === 200) {
                    //         var num = 0
                    //         var update = res.data.map(row => {
                    //             row.id_idx = num + 1
                    //             row.date_expire = moment(row.expiryTime).format("DD-MM-YYYY HH:mm:ss")
                    //             row.date_start = moment(row.startTime).format("DD-MM-YYYY HH:mm:ss")
                    //             num = num + 1
                    //             return row
                    //         })
                    //         setPK({ st: num, data: update, use: [], fc: true })
                    //         // Doing({
                    //         //     msisdn: Crypt({ type: "decrypt", value: localStorage.getItem("input-phone") }).text,
                    //         //     username: Crypt({ type: "decrypt", value: localStorage.getItem("one_info") }).username,
                    //         //     detail: 'check package',
                    //         //     resualt: 'Operation successed.',
                    //         // })
                    //     }
                    // }).catch(err => {
                    //     console.log(err)
                    //     setPK({ st: 'Error', data: [], use: [], fc: true })
                    // })
                }


            }
        })
    }

    const searchPhoneNumber = () => {
        var saveData = {
            text: myphone
        }
        localStorage.setItem("input-phone", Crypt({ type: "crypt", value: JSON.stringify(saveData) }))
        if (myphone === '' || myphone === null) {
            AlertWarning("ກະລຸນາປ້ອນເບີໂທ")
        } else {
            /////////////////////////////////////////////
            // mi ber
            loadNav()

            history.push("/v2")
            setTimeout(() => {
                Doing({
                    msisdn: Crypt({ type: "decrypt", value: localStorage.getItem("input-phone") }).text,
                    username: Crypt({ type: "decrypt", value: localStorage.getItem("one_info") }).username,
                    detail: 'searching',
                    resualt: 'Operation successed.',
                })
                history.push("/v2/oneScreen")
            }, 300)
        }
    }
    return (
        <div>
            <Sidebar
                sidebar={<Menu />}
                open={open}
                sidebarClassName="bg-nav"
                docked={open}
            >
                <div className="bg">
                    <div className="nav-head">
                        <Grid container>
                            <Grid item xs={3}>
                                <IconButton color="default" aria-label="toggle" onClick={() => setOpen(!open)}>
                                    <Toggle className="nav-toggle" />
                                </IconButton>
                            </Grid>
                            <Grid item xs={4} container spacing={1}>
                                <Grid item xs={10}>
                                    <input
                                        type="search"
                                        className="v-input input-1"
                                        maxLength="20"
                                        placeholder="205xxxxxxx"
                                        onChange={(e) => { changePhone(e.target.value) }}
                                        onKeyPress={(e) => { checkKey(e) }}
                                        value={myphone}
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <Button variant="contained" color="primary" fullWidth style={{ height: 39, marginTop: 5 }} onClick={searchPhoneNumber}>
                                        <Search />
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid item xs={5}>
                                <div className="nav-user-log" style={{ marginRight: !open ? 0 : 350 }}>
                                    <Profile username={info ?? '-'} />
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                    <Scrollbars style={{ width: '100%', height: size[1] }}>
                        <div className="nav-body">
                            <Router />
                        </div>
                    </Scrollbars>
                </div>
            </Sidebar>
        </div>
    )
}

export default Home
