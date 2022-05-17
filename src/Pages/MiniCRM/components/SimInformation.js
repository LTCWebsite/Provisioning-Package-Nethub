import React from 'react'
import { Grid, Button, Dialog } from '@material-ui/core'
import Axios from '../../Components/Axios'
import Crypt from '../../Components/Crypt'
import LoadingLottie from '../../Components/LoadingLottie'
// import { confirmAlert } from 'react-confirm-alert'
import Switch from '@material-ui/core/Switch'
import { AlertSuccess, AlertError } from '../../Components/Toast'
import cookie from 'js-cookie'
import Doing from '../../Components/Doing'

function SimInformation() {
    const [stop, setStop] = React.useState(false)
    const [ir, setIr] = React.useState(false)
    const [call, setCall] = React.useState(false)
    const [alert, setAlert] = React.useState(false)
    const [my3G, setMy3G] = React.useState(false)
    const [my4G, setMy4G] = React.useState(false)
    const [reason, setReason] = React.useState({ text: null, alert: false, message: null, dialog: false, status: null })
    React.useEffect(() => {
        setStop(false)
        setAlert(false)
        var phone = Crypt({ type: "decrypt", value: localStorage.getItem("input-phone") })
        Axios.get("QueryHLRInfo?msisdn=" + phone.text, { headers: { 'Authorization': 'Bearer ' + cookie.get("one_session") } }).then(res => {
            if (res.status === 200) {
                setTimeout(() => {
                    setIr(res.data.queryServiceResult.irData === '0' ? false : true)
                    setMy3G(res.data.queryServiceResult.open3G === '0' ? false : true)
                    setMy4G(res.data.queryServiceResult.open4G === '0' ? false : true)
                    setCall(res.data.queryServiceResult.irCall === '0' ? false : true)
                    // console.log(res.data.queryServiceResult)
                    setStop(true)
                }, 200)
            }
            // console.log(res.data)
        }).catch(err => {
            setStop(true)
            setAlert(true)
        })
    }, [])
    /////////////////////       Open or Close 3G
    const change3G = () => {
        var curr3G = my3G
        var send = ''
        var text = ''
        if (curr3G === false) {
            send = 'OD3G'
            text = 'ເປີດ'
        } else if (curr3G === true) {
            send = 'CD3G'
            text = 'ປິດ'
        }
        var phone = Crypt({ type: "decrypt", value: localStorage.getItem("input-phone") })
        Axios.post("InternetOpen?msisdn=" + phone.text + "&orderType=" + send, {}, { headers: { 'Authorization': 'Bearer ' + cookie.get("one_session") } }).then(res => {
            if (res.data.orderChangeResult.resultDesc === "Operation successed.") {
                AlertSuccess("ບັນທຶກຂໍ້ມູນ " + text + " 3G ສຳເລັດ")
                setMy3G(!my3G)
            } else {
                AlertError(res.data.orderChangeResult.resultDesc)
            }
            Doing({
                msisdn: Crypt({ type: "decrypt", value: localStorage.getItem("input-phone") }).text,
                username: Crypt({ type: "decrypt", value: localStorage.getItem("one_info") }).username,
                detail: text + ' 3G',
                info: reason.text,
                resualt: res.data.orderChangeResult.resultDesc,
            })
        }).catch(err => {
            AlertError(err)
            Doing({
                msisdn: Crypt({ type: "decrypt", value: localStorage.getItem("input-phone") }).text,
                username: Crypt({ type: "decrypt", value: localStorage.getItem("one_info") }).username,
                detail: text + ' 3G',
                info: reason.text,
                resualt: 'error',
            })
        })
    }
    /////////////////////       Open or Close 4G
    const change4G = () => {
        var curr4G = my4G
        var send = ''
        var text = ''
        if (curr4G === false) {
            send = 'OD4G'
            text = 'ເປີດ'
        } else if (curr4G === true) {
            send = 'CD4G'
            text = 'ປິດ'
        }
        var phone = Crypt({ type: "decrypt", value: localStorage.getItem("input-phone") })
        Axios.post("InternetOpen?msisdn=" + phone.text + "&orderType=" + send, {}, { headers: { 'Authorization': 'Bearer ' + cookie.get("one_session") } }).then(res => {
            if (res.data.orderChangeResult.resultDesc === "Operation successed.") {
                AlertSuccess("ບັນທຶກຂໍ້ມູນ " + text + " 4G ສຳເລັດ")
                setMy4G(!my4G)
            } else {
                AlertError(res.data.orderChangeResult.resultDesc)
            }
            Doing({
                msisdn: Crypt({ type: "decrypt", value: localStorage.getItem("input-phone") }).text,
                username: Crypt({ type: "decrypt", value: localStorage.getItem("one_info") }).username,
                detail: text + ' 4G',
                info: reason.text,
                resualt: res.data.orderChangeResult.resultDesc,
            })
        }).catch(err => {
            AlertError(err)
            Doing({
                msisdn: Crypt({ type: "decrypt", value: localStorage.getItem("input-phone") }).text,
                username: Crypt({ type: "decrypt", value: localStorage.getItem("one_info") }).username,
                detail: text + ' 4G',
                info: reason.text,
                resualt: 'error',
            })
        })
    }

    const CFDialog = ({ st: ST, message: Message }) => {
        setReason({ ...reason, message: Message, dialog: true, status: ST, alert: false, text: null })
    }
    const handleCloseCon = () => {
        setReason({ ...reason, dialog: false })
    }
    const SaveCF = () => {
        if (reason.text === null || reason.text === '') {
            setReason({ ...reason, alert: true })
        } else {
            setReason({ ...reason, alert: false, dialog: false })
            if (reason.status === '3G') {
                change3G()
            } else if (reason.status === '4G') {
                change4G()
            }
        }
    }
    // /////////////////////       Confirm Function
    // const CFAlert = ({ message, data }) => {
    //     confirmAlert({
    //         customUI: ({ onClose }) => {
    //             return (
    //                 <div className='custom-ui'>
    //                     <h1>ຢືນຢັນການນຳໃຊ້</h1>
    //                     <p>{message}</p>
    //                     <Grid container>
    //                         <Grid container item xs={12}>
    //                             <Grid item xs={6}>
    //                                 <Button color="primary" onClick={onClose}>No</Button>
    //                             </Grid>
    //                             <Grid item xs={6}>
    //                                 {data === "3G" && <Button variant="contained" color="primary" onClick={() => change3G(onClose)}>Yes</Button>}
    //                                 {data === "4G" && <Button variant="contained" color="primary" onClick={() => change4G(onClose)}>Yes</Button>}
    //                             </Grid>
    //                         </Grid>
    //                     </Grid>
    //                 </div>
    //             )
    //         }
    //     })
    // }



    return (
        <>
            {!stop ? <Grid item xs={12} style={{ height: 180 }}><LoadingLottie isStopped={stop} height={200} /></Grid> : <>
                <Grid item xs={12}><h2 className="center">{alert ? <label className="error">ຂໍ້ມູນເບີໂທ</label> : 'ຂໍ້ມູນເບີໂທ'}</h2></Grid>
                <Grid item xs={5}><div><b>3G:</b></div></Grid>
                <Grid item xs={7}>
                    <Switch checked={my3G} onChange={() => { CFDialog({ st: '3G', message: my3G ? <p className='center-cf'>ຕ້ອງການ ປິດ 3G ?</p> : <p className='center-cf'>ຕ້ອງການ ເປີດ 3G ?</p>, data: "3G" }) }} />
                </Grid>
                <Grid item xs={5}><div><b>4G:</b></div></Grid>
                <Grid item xs={7}>
                    <Switch checked={my4G} onChange={() => { CFDialog({ st: '4G', message: my4G ? <p className='center-cf'>ຕ້ອງການ ປິດ 4G ?</p> : <p className='center-cf'>ຕ້ອງການ ເປີດ 4G ?</p>, data: "4G" }) }} />
                </Grid>
                <Grid item xs={5}><div><b>IR Data:</b></div></Grid>
                <Grid item xs={7}>
                    <Switch checked={ir} />
                </Grid>
                <Grid item xs={5}><div><b>IR Call:</b></div></Grid>
                <Grid item xs={7}>
                    <Switch checked={call} />
                </Grid>

            </>}
            <Dialog
                open={reason.dialog}
                onClose={handleCloseCon}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <Grid container style={{ paddingLeft: 20, paddingRight: 20 }}>
                    <Grid item container xs={12}>
                        <Grid item xs={12}><div className="center"><h1>ຢືນຢັນການນຳໃຊ້</h1></div></Grid>
                        <Grid item xs={12}><div className="center">{reason.message}</div></Grid>
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
                                <div className="center"><Button variant="contained" color="primary" onClick={SaveCF}>Yes</Button></div>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Dialog>
        </>
    )
}

export default SimInformation
