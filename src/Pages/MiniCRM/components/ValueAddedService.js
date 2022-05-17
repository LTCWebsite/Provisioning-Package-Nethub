import React from 'react'
import { Grid, Button, Dialog } from '@material-ui/core'
import Axios from '../../Components/Axios'
import Crypt from '../../Components/Crypt'
// import LoadingLottie from '../../Components/LoadingLottie'
import Switch from '@material-ui/core/Switch'
// import { confirmAlert } from 'react-confirm-alert'
import { AlertSuccess, AlertError } from '../../Components/Toast'
import cookie from 'js-cookie'
import Doing from '../../Components/Doing'
import { WarningAmber } from '@mui/icons-material'
import { LoadingVAS } from '../../../Loading/TableLoading'
import NavLoad from '../../../Home/Pages/Components/NavLoad'

function ValueAddedService() {
    const [stop, setStop] = React.useState(false)
    const [alert, setAlert] = React.useState(false)
    const [option, setOption] = React.useState([])
    const [option7, setOption7] = React.useState([])
    const [open, setOpen] = React.useState(false)
    const [openCon, setOpenCon] = React.useState(false)
    const [message, setMessage] = React.useState('')
    const [data, setData] = React.useState('')
    const [st, setST] = React.useState(null)

    const [reason, setReason] = React.useState({ text: null, alert: false })

    const handleClickOpen = () => {
        setOpen(true)
    }
    const handleClickOpenCon = () => {
        setOpenCon(true)
    }

    const handleClose = () => {
        setOpen(false)
    }
    const handleCloseCon = () => {
        setOpenCon(false)
    }
    const CFAlert2 = ({ message, data, st }) => {
        setReason({ text: null, alert: false })
        setMessage(message)
        setData(data)
        setST(st)
        handleClickOpenCon()
    }


    React.useEffect(() => {
        setStop(false)
        setAlert(false)
        var phone = Crypt({ type: "decrypt", value: localStorage.getItem("input-phone") })
        Axios.get("VAS?msisdn=" + phone.text, { headers: { 'Authorization': 'Bearer ' + cookie.get("one_session") } }).then(res => {
            if (res.status === 200) {
                var useData = res.data
                Axios.options("VAS", { headers: { 'Authorization': 'Bearer ' + cookie.get("one_session") } }).then(re => {
                    if (re.status === 200) {
                        var newData = re.data.map(row => {
                            var num = 0;
                            for (var i = 0; i < useData.length; i++) {
                                if (row.nameService === useData[i].serviceName) {
                                    num = num + 1
                                } else {
                                    num = num + 0
                                }
                            }
                            num === 0 ? row.checked = false : row.checked = true
                            return row
                        })
                        setOption(newData)
                        // console.log(newData);
                        var update = newData.slice(0, 7)
                        setOption7(update)
                        setTimeout(() => {
                            setStop(true)
                        }, 500)
                        // console.log(update)
                    }
                }).catch(err => {
                    setStop(true)
                    console.log("VAS option error !!")
                })
            }
        }).catch(err => {
            setStop(true)
            console.log("VAS get error !!")
        })
    }, [])

    /////////////////////       Confirm Function
    // const CFAlert = ({ message, data, st }) => {
    //     confirmAlert({
    //         customUI: ({ onClose }) => {
    //             return (
    //                 <div className='custom-ui'>
    //                     <h1>ຢືນຢັນການນຳໃຊ້</h1>
    //                     <p>{message}</p>
    //                     <textarea style={{ width: '90%', padding: '5px 10px' }} value={reason.text} placeholder="ເຫດຜົນ" onChange={(e) => { changeReason(e.target.value) }}></textarea>
    //                     <Grid container style={{ marginTop: 20 }}>
    //                         <Grid container item xs={12}>
    //                             <Grid item xs={6}>
    //                                 <Button color="primary" onClick={onClose}>No</Button>
    //                             </Grid>
    //                             <Grid item xs={6} className="right">
    //                                 <Button variant="contained" color="primary" onClick={() => allService(onClose, data, st)}>Yes</Button>
    //                             </Grid>
    //                         </Grid>
    //                     </Grid>
    //                 </div>
    //             )
    //         }
    //     })
    // }
    // const changeReason = (e) => {
    //     setReason({ ...reason, text: e })
    //     console.log(e)
    // }



    // const allService = (onClose, data, st) => {
    //     if (reason.text === null || reason.text === '') {
    //         setReason({ ...reason, alert: true })
    //     } else {
    //         setReason({ ...reason, alert: false })

    //         onClose()
    //         var phone = Crypt({ type: "decrypt", value: localStorage.getItem("input-phone") })
    //         // var token = cookie.get("one_session")
    //         if (st === false) {
    //             /////////////////////       POST
    //             Axios.get("ManageVAS?msisdn=" + phone.text + "&servicename=" + data, { headers: { 'Authorization': 'Bearer ' + cookie.get("one_session") } }).then(res => {
    //                 if (res.status === 200 && res.data.registerResult.resultcode === "200") {
    //                     var newData = option.map(row =>
    //                         row.nameService === data ? row.checked === false ? { ...row, checked: true } : { ...row, checked: false } : { ...row }
    //                     )
    //                     setOption(newData)
    //                     var update = newData.slice(0, 7)
    //                     setOption7(update)
    //                     AlertSuccess(res.data.registerResult.resultdesc)
    //                 } else {
    //                     AlertError(res.data.registerResult.resultdesc)
    //                 }
    //                 Doing({
    //                     msisdn: Crypt({ type: "decrypt", value: localStorage.getItem("input-phone") }).text,
    //                     username: Crypt({ type: "decrypt", value: localStorage.getItem("one_info") }).username,
    //                     detail: 'ເປີດ ' + data,
    //                     info: reason.text,
    //                     resualt: res.data.registerResult.resultdesc,
    //                 })
    //             }).catch(err => {
    //                 AlertError(err)
    //                 Doing({
    //                     msisdn: Crypt({ type: "decrypt", value: localStorage.getItem("input-phone") }).text,
    //                     username: Crypt({ type: "decrypt", value: localStorage.getItem("one_info") }).username,
    //                     detail: 'ເປີດ ' + data,
    //                     info: reason.text,
    //                     resualt: 'error',
    //                 })
    //             })
    //         } else if (st === true) {
    //             //////////////////// Patch
    //             Axios.post("ManageVAS?msisdn=" + phone.text + "&servicename=" + data, {}, { headers: { 'Authorization': 'Bearer ' + cookie.get("one_session") } }).then(res => {
    //                 if (res.status === 200 && res.data.cancelResult.resultcode === "200") {
    //                     var newData = option.map(row =>
    //                         row.nameService === data ? row.checked === false ? { ...row, checked: true } : { ...row, checked: false } : { ...row }
    //                     )
    //                     setOption(newData)
    //                     var update = newData.slice(0, 7)
    //                     setOption7(update)
    //                     AlertSuccess(res.data.cancelResult.resultdesc)
    //                 } else {
    //                     AlertError(res.data.cancelResult.resultdesc)
    //                 }
    //                 Doing({
    //                     msisdn: Crypt({ type: "decrypt", value: localStorage.getItem("input-phone") }).text,
    //                     username: Crypt({ type: "decrypt", value: localStorage.getItem("one_info") }).username,
    //                     detail: 'ປິດ ' + data,
    //                     info: reason.text,
    //                     resualt: res.data.cancelResult.resultdesc,
    //                 })
    //             }).catch(err => {
    //                 AlertError(err)
    //                 Doing({
    //                     msisdn: Crypt({ type: "decrypt", value: localStorage.getItem("input-phone") }).text,
    //                     username: Crypt({ type: "decrypt", value: localStorage.getItem("one_info") }).username,
    //                     detail: 'ປິດ ' + data,
    //                     info: reason.text,
    //                     resualt: 'error',
    //                 })
    //             })
    //         }
    //     }
    // }
    const allService2 = () => {
        if (reason.text === null || reason.text === '') {
            setReason({ ...reason, alert: true })
        } else {
            setReason({ ...reason, alert: false })

            var phone = Crypt({ type: "decrypt", value: localStorage.getItem("input-phone") })
            handleCloseCon()
            if (st === false) {
                /////////////////////       POST
                Axios.get("ManageVAS?msisdn=" + phone.text + "&servicename=" + data, { headers: { 'Authorization': 'Bearer ' + cookie.get("one_session") } }).then(res => {
                    if (res.status === 200 && res.data.registerResult.resultcode === "200") {
                        var newData = option.map(row =>
                            row.nameService === data ? row.checked === false ? { ...row, checked: true } : { ...row, checked: false } : { ...row }
                        )
                        setOption(newData)
                        var update = newData.slice(0, 7)
                        setOption7(update)
                        AlertSuccess(res.data.registerResult.resultdesc)
                    } else {
                        AlertError(res.data.registerResult.resultdesc)
                    }
                    Doing({
                        msisdn: Crypt({ type: "decrypt", value: localStorage.getItem("input-phone") }).text,
                        username: Crypt({ type: "decrypt", value: localStorage.getItem("one_info") }).username,
                        detail: 'ເປີດ ' + data,
                        info: reason.text,
                        resualt: res.data.registerResult.resultdesc,
                    })
                }).catch(err => {
                    AlertError(err)
                    Doing({
                        msisdn: Crypt({ type: "decrypt", value: localStorage.getItem("input-phone") }).text,
                        username: Crypt({ type: "decrypt", value: localStorage.getItem("one_info") }).username,
                        detail: 'ເປີດ ' + data,
                        info: reason.text,
                        resualt: 'error',
                    })
                })
            } else if (st === true) {
                //////////////////// Patch
                Axios.post("ManageVAS?msisdn=" + phone.text + "&servicename=" + data, {}, { headers: { 'Authorization': 'Bearer ' + cookie.get("one_session") } }).then(res => {
                    if (res.status === 200 && res.data.cancelResult.resultcode === "200") {
                        var newData = option.map(row =>
                            row.nameService === data ? row.checked === false ? { ...row, checked: true } : { ...row, checked: false } : { ...row }
                        )
                        setOption(newData)
                        var update = newData.slice(0, 7)
                        setOption7(update)
                        AlertSuccess(res.data.cancelResult.resultdesc)
                    } else {
                        AlertError(res.data.registerResult.resultdesc)
                    }
                    Doing({
                        msisdn: Crypt({ type: "decrypt", value: localStorage.getItem("input-phone") }).text,
                        username: Crypt({ type: "decrypt", value: localStorage.getItem("one_info") }).username,
                        detail: 'ປິດ ' + data,
                        info: reason.text,
                        resualt: res.data.cancelResult.resultdesc,
                    })
                }).catch(err => {
                    AlertError(err)
                    Doing({
                        msisdn: Crypt({ type: "decrypt", value: localStorage.getItem("input-phone") }).text,
                        username: Crypt({ type: "decrypt", value: localStorage.getItem("one_info") }).username,
                        detail: 'ປິດ ' + data,
                        info: reason.text,
                        resualt: 'error',
                    })
                })
            }
        }

    }


    return (
        <>
            <NavLoad height={350} use={!stop} />
            <Grid container className='vas-font text'>
                {/* <Grid item xs={12}><h2 className="center">{alert ? <label className="error">Value added Service</label> : 'Value added Service'}</h2></Grid> */}
                {option7.length > 0 && option7.map(row =>
                    <>
                        <Grid item xs={5}><div><b>{row.nameService ?? null}:</b></div></Grid>
                        <Grid item xs={3}>
                            <Switch checked={row.checked === true ?? false} onChange={() => {
                                CFAlert2({ message: row.checked ? <p className='center-cf'>ຕ້ອງການ ປິດ {row.nameService} ?</p> : <p className='center-cf'>ຕ້ອງການ ເປີດ {row.nameService} ?</p>, data: row.nameService, st: row.checked === true ?? false })
                            }} />
                        </Grid>
                        {/* <Grid item xs={3}><div style={{color: 'green'}}>1,000 ກີບ</div></Grid> */}
                        <Grid item xs={4}><div style={{ color: '#5a5c69!important', fontWeight: '700!important' }}>{row?.price === '0' ? 'FREE' : row?.price + ' ກີບ'}</div></Grid>
                    </>
                )}
                <Grid item xs={12}>
                    <div className="center"><Button color="primary" onClick={handleClickOpen}>View more VAS</Button></div>
                </Grid>
                <Grid item xs={12}>
                    <div className="hr-1"></div>
                </Grid>
            </Grid>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <Grid container style={{ paddingLeft: 40, paddingRight: 40 }}>
                    <Grid container item xs={12}>
                        <Grid item xs={12}><h2 className="center">Value add Service</h2></Grid>
                        {option.length > 0 && option.map(row =>
                            <>
                                <Grid item xs={5}><div><b>{row.nameService ?? null}:</b></div></Grid>
                                <Grid item xs={4}>
                                    <Switch checked={row.checked === true ?? false} onChange={() => { CFAlert2({ message: row.checked ? <p className='center-cf'>ຕ້ອງການ ປິດ {row.nameService} ?</p> : <p className='center-cf'>ຕ້ອງການ ເປີດ {row.nameService} ?</p>, data: row.nameService, st: row.checked === true ?? false }) }} />
                                </Grid>
                                <Grid item xs={3}><div style={{ color: '#5a5c69!important', fontWeight: '700!important' }}>{row?.price === '0' ? 'FREE' : row?.price + ' ກີບ'}</div></Grid>
                            </>
                        )}
                        <Grid item xs={12} style={{ paddingTop: 20, paddingBottom: 20 }}>
                            <div className="right"><Button color="primary" onClick={handleClose}><b>Close</b></Button></div>
                        </Grid>
                    </Grid>
                </Grid>
            </Dialog>
            <Dialog
                open={openCon}
                onClose={handleCloseCon}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <Grid container style={{ paddingLeft: 20, paddingRight: 20 }}>
                    <Grid item container xs={12}>
                        <Grid item xs={12}>
                            <div className="center"><h1>ຢືນຢັນການນຳໃຊ້</h1></div>
                        </Grid>
                        <Grid item xs={12}>
                            <div className="center">
                                <WarningAmber style={{ fontSize: 150, color: '#E74A3B' }} />
                            </div>
                            <div className="center">{message}</div>
                        </Grid>
                        <Grid item lg={2}></Grid>
                        <Grid item xs={12} lg={8} style={{ marginBottom: 20 }}>
                            <textarea style={{ width: '90%', padding: '5px 10px', fontSize: 16 }} placeholder="ເຫດຜົນ" onChange={(e) => { setReason({ ...reason, text: e.target.value }) }}></textarea>
                            {reason.alert && <div className="red">ກະລຸນາປ້ອນເຫດຜົນ</div>}
                        </Grid>
                        <Grid item container xs={12} style={{ paddingBottom: 20 }}>
                            <Grid item xs={6}>
                                <div className="center"><Button color="primary" onClick={handleCloseCon}>No</Button></div>
                            </Grid>
                            <Grid item xs={6}>
                                <div className="center"><Button variant="contained" color="primary" onClick={allService2}>Yes</Button></div>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Dialog>
        </>
    )
}

export default ValueAddedService
