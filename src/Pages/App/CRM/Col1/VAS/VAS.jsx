import React from 'react'
import { Grid, Button, Dialog } from '@material-ui/core'
import { AxiosReq } from '../../../../../Components/Axios'
import Switch from '@material-ui/core/Switch'
import { toast_success, toast_error } from '../../../../../Components/Toast'
import { Close, WarningAmber } from '@mui/icons-material'
import { IconButton, Skeleton } from '@mui/material'

function VAS() {
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
        var phone = localStorage.getItem("ONE_PHONE")
        AxiosReq.get("VAS?msisdn=" + phone).then(res => {
            if (res.status === 200) {
                var useData = res.data
                AxiosReq.options("VAS").then(re => {
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
                        var update = newData.slice(0, 5)
                        setOption7(update)
                        setTimeout(() => {
                            setStop(true)
                        }, 100)
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

    const allService2 = () => {
        if (reason.text === null || reason.text === '') {
            setReason({ ...reason, alert: true })
        } else {
            setReason({ ...reason, alert: false })

            var phone = localStorage.getItem("ONE_PHONE")
            handleCloseCon()
            if (st === false) {
                /////////////////////       POST
                AxiosReq.get("ManageVAS?msisdn=" + phone + "&servicename=" + data).then(res => {
                    if (res.status === 200 && res.data.registerResult.resultcode === "200") {
                        var newData = option.map(row =>
                            row.nameService === data ? row.checked === false ? { ...row, checked: true } : { ...row, checked: false } : { ...row }
                        )
                        setOption(newData)
                        var update = newData.slice(0, 5)
                        setOption7(update)
                        toast_success({ text: res.data.registerResult.resultdesc })
                    } else {
                        toast_error({ text: res.data.registerResult.resultdesc })
                    }
                    // Doing({
                    //     msisdn: Crypt({ type: "decrypt", value: localStorage.getItem("input-phone") }).text,
                    //     username: Crypt({ type: "decrypt", value: localStorage.getItem("one_info") }).username,
                    //     detail: 'ເປີດ ' + data,
                    //     info: reason.text,
                    //     resualt: res.data.registerResult.resultdesc,
                    // })
                }).catch(err => {
                    toast_error({ text: err })
                    // Doing({
                    //     msisdn: Crypt({ type: "decrypt", value: localStorage.getItem("input-phone") }).text,
                    //     username: Crypt({ type: "decrypt", value: localStorage.getItem("one_info") }).username,
                    //     detail: 'ເປີດ ' + data,
                    //     info: reason.text,
                    //     resualt: 'error',
                    // })
                })
            } else if (st === true) {
                //////////////////// Patch
                AxiosReq.post("ManageVAS?msisdn=" + phone + "&servicename=" + data, {}).then(res => {
                    if (res.status === 200 && res.data.cancelResult.resultcode === "200") {
                        var newData = option.map(row =>
                            row.nameService === data ? row.checked === false ? { ...row, checked: true } : { ...row, checked: false } : { ...row }
                        )
                        setOption(newData)
                        var update = newData.slice(0, 5)
                        setOption7(update)
                        toast_success({ text: res.data.cancelResult.resultdesc })
                    } else {
                        toast_error({ text: res.data.registerResult.resultdesc })
                    }
                    // Doing({
                    //     msisdn: Crypt({ type: "decrypt", value: localStorage.getItem("input-phone") }).text,
                    //     username: Crypt({ type: "decrypt", value: localStorage.getItem("one_info") }).username,
                    //     detail: 'ປິດ ' + data,
                    //     info: reason.text,
                    //     resualt: res.data.cancelResult.resultdesc,
                    // })
                }).catch(err => {
                    toast_error({ text: err })
                    // Doing({
                    //     msisdn: Crypt({ type: "decrypt", value: localStorage.getItem("input-phone") }).text,
                    //     username: Crypt({ type: "decrypt", value: localStorage.getItem("one_info") }).username,
                    //     detail: 'ປິດ ' + data,
                    //     info: reason.text,
                    //     resualt: 'error',
                    // })
                })
            }
        }

    }


    return (
        <>
            {!stop ?
                <Grid container>
                    <Grid item xs={12} className="link-box-dev">
                        <Skeleton animation="wave" />
                    </Grid>
                    <Grid item xs={12} className="link-box-dev">
                        <Skeleton animation="wave" />
                    </Grid>
                    <Grid item xs={12} className="link-box-dev">
                        <Skeleton animation="wave" />
                    </Grid>
                    <Grid item xs={4}></Grid>
                    <Grid item xs={4} className="center">
                        <Skeleton animation="wave" />
                    </Grid>
                </Grid> :
                <Grid container>
                    {option7.length > 0 && option7.map((row, idx) =>
                        <Grid key={idx} container xs={12} className="link-box-dev">
                            <Grid item xs={5}><div>{row.nameService ?? null}:</div></Grid>
                            <Grid item xs={4} className="right">
                                <Switch size='small' checked={row.checked === true ?? false} onChange={() => {
                                    CFAlert2({ message: row.checked ? <p className='center-cf'>ຕ້ອງການ ປິດ {row.nameService} ?</p> : <p className='center-cf'>ຕ້ອງການ ເປີດ {row.nameService} ?</p>, data: row.nameService, st: row.checked === true ?? false })
                                }} />
                            </Grid>
                            <Grid item xs={3}><div style={{ color: '#5a5c69!important', fontWeight: '700!important', textAlign: 'right' }}>{row?.price === '0' ? 'FREE' : parseInt(row?.price)?.toLocaleString() + ' ກີບ'}</div></Grid>
                        </Grid>
                    )}
                    <Grid item xs={12}>
                        <div className="center"><Button color="primary" onClick={handleClickOpen}>View more VAS</Button></div>
                    </Grid>
                    <Grid item xs={12}>
                        <div className="hr-1"></div>
                    </Grid>
                </Grid>}



            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <Grid container style={{ paddingLeft: 40, paddingRight: 10, paddingBottom: 20 }}>
                    <Grid container item xs={12}>
                        <Grid item xs={3}></Grid>
                        <Grid item xs={6}><h2 className="center">Value add Service</h2></Grid>
                        <Grid item xs={3}>
                            <div className='right'><Close className='icon' onClick={handleClose} /></div>
                        </Grid>
                        {option.length > 0 && option.map(row =>
                            <>
                                <Grid item xs={5}><div><b>{row.nameService ?? null}:</b></div></Grid>
                                <Grid item xs={4}>
                                    <Switch checked={row.checked === true ?? false} onChange={() => { CFAlert2({ message: row.checked ? <p className='center-cf'>ຕ້ອງການ ປິດ {row.nameService} ?</p> : <p className='center-cf'>ຕ້ອງການ ເປີດ {row.nameService} ?</p>, data: row.nameService, st: row.checked === true ?? false }) }} />
                                </Grid>
                                <Grid item xs={3}><div style={{ color: '#5a5c69!important', fontWeight: '700!important' }}>{row?.price === '0' ? 'FREE' : row?.price + ' ກີບ'}</div></Grid>
                            </>
                        )}
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

export default VAS
