import { Grid, Button } from '@material-ui/core'
import React from 'react'
import Axios from '../../Components/Axios'
import Crypt from '../../Components/Crypt'
import LoadingLottie from '../../Components/LoadingLottie'
// import moment from 'moment'
import { confirmAlert } from 'react-confirm-alert'
import { AlertError, AlertInfo, AlertSuccess } from '../../Components/Toast'
import cookie from 'js-cookie'
import Doing from '../../Components/Doing'

function RegisterInfo() {
    const [stop, setStop] = React.useState(false)
    const [data, setData] = React.useState([])
    const [alert, setAlert] = React.useState(false)
    const [backList, setBackList] = React.useState(false)
    const [ocs, setOCS] = React.useState([])

    React.useEffect(() => {
        setStop(false)
        setAlert(false)
        var phone = Crypt({ type: "decrypt", value: localStorage.getItem("input-phone") })
        Axios.get("QueryCustomerOCS?msisdn=" + phone.text, { headers: { 'Authorization': 'Bearer ' + cookie.get("one_session") } }).then(res => {
            if (res.status === 200) {
                var edit = res.data.ocsDetail
                var myData = {
                    activeDate: edit.activeDate.substr(6, 2) + '-' + edit.activeDate.substr(4, 2) + '-' + edit.activeDate.substr(0, 4) + ' ' + edit.activeDate.substr(8, 2) + ':' + edit.activeDate.substr(10, 2) + ':' + edit.activeDate.substr(12, 2),
                    barringDate: edit.barringDate.substr(6, 2) + '-' + edit.barringDate.substr(4, 2) + '-' + edit.barringDate.substr(0, 4) + ' ' + edit.barringDate.substr(8, 2) + ':' + edit.barringDate.substr(10, 2) + ':' + edit.barringDate.substr(12, 2),
                    expriceDate: edit.expriceDate.substr(6, 2) + '-' + edit.expriceDate.substr(4, 2) + '-' + edit.expriceDate.substr(0, 4) + ' ' + edit.expriceDate.substr(8, 2) + ':' + edit.expriceDate.substr(10, 2) + ':' + edit.expriceDate.substr(12, 2),
                    suspendDate: edit.suspendDate.substr(6, 2) + '-' + edit.suspendDate.substr(4, 2) + '-' + edit.suspendDate.substr(0, 4) + ' ' + edit.suspendDate.substr(8, 2) + ':' + edit.suspendDate.substr(10, 2) + ':' + edit.suspendDate.substr(12, 2),
                    mainProduct: edit.mainProduct,
                    productType: edit.productType,
                    state: edit.state,
                }
                setOCS(myData)
                // console.log(myData)
            }
        }).catch(err => {
            setAlert(true)
        })
        Axios.get("CheckStatusSIM?msisdn=" + phone.text, { headers: { 'Authorization': 'Bearer ' + cookie.get("one_session") } }).then(res => {
            if (res.status === 200) {
                setData(res.data)
                setBackList(res.data.blacklistStatus === '0' ? false : true)
                setTimeout(() => {
                    setAlert(false)
                    setStop(true)
                }, 200)
            }
        }).catch(err => {
            setAlert(true)
            setStop(true)
        })
    }, [])
    /////////////////////       Confirm Function
    const CFAlert = () => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='custom-ui'>
                        <h1>ຢືນຢັນການນຳໃຊ້</h1>
                        <p>ຕ້ອງການ ປົດລ໋ອກ BackList ?</p>
                        <Grid container>
                            <Grid container item xs={12}>
                                <Grid item xs={6}>
                                    <Button color="primary" onClick={onClose}>No</Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button variant="contained" color="primary" onClick={() => { unblockBackList(onClose) }}>Yes</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>
                )
            }
        })
    }
    const unblockBackList = (onClose) => {
        var phone = Crypt({ type: "decrypt", value: localStorage.getItem("input-phone") })
        onClose()
        Axios.post("UnBlackList?msisdn=" + phone.text, {}, { headers: { 'Authorization': 'Bearer ' + cookie.get("one_session") } }).then(res => {
            if (res.status === 200 && res.data.resultCode === "118030078") {
                AlertInfo(res.data.resultDesc)
            } else {
                AlertSuccess(res.data.resultDesc)
                setBackList(false)
            }
            Doing({
                msisdn: Crypt({ type: "decrypt", value: localStorage.getItem("input-phone") }).text,
                username: Crypt({ type: "decrypt", value: localStorage.getItem("one_info") }).username,
                detail: 'unBlackList',
                resualt: res.data.resultDesc,
            })
        }).catch(err => {
            AlertError(err)
            Doing({
                msisdn: Crypt({ type: "decrypt", value: localStorage.getItem("input-phone") }).text,
                username: Crypt({ type: "decrypt", value: localStorage.getItem("one_info") }).username,
                detail: 'unBlackList',
                resualt: 'error',
            })
        })
    }



    return (
        <>
            {!stop ? <Grid item xs={12} style={{ height: 315 }}><LoadingLottie isStopped={stop} height={200} /></Grid> : <>
                <Grid item xs={12}><h2 className="center">{alert ? <label className="error">ຂໍ້ມູນການລົງທະບຽນ OCS</label> : <label>ຂໍ້ມູນການລົງທະບຽນ OCS</label>}</h2></Grid>
                <Grid item xs={5}><div><b>ສະຖານະ:</b></div></Grid>
                <Grid item xs={7}><div>{ocs.state ? ocs.state === "active" ? <label className="active">Active</label> : <label className="dis_active">{data.status}</label> : '-'}</div></Grid>
                <Grid item xs={5}><div><b>Network Type:</b></div></Grid>
                <Grid item xs={7}><div>{data.networkType ?? '-'}</div></Grid>
                <Grid item xs={5}><div><b>Product Type:</b></div></Grid>
                <Grid item xs={7}><div>{ocs.productType?? '-'}</div></Grid>
                <Grid item xs={5}><div><b>Black List:</b></div></Grid>
                <Grid item xs={7}>
                    {backList ? <Button color="secondary" onClick={CFAlert}><b>Yes</b></Button> : <div>No</div>}
                </Grid>
                <Grid item xs={5}><div><b>First Active Date:</b></div></Grid>
                <Grid item xs={7}><div>{ocs.activeDate ?? '-'}</div></Grid>
                <Grid item xs={5}><div><b>Register Date:</b></div></Grid>
                <Grid item xs={7}><div>{ocs.activeDate ?? '-'}</div></Grid>
                <Grid item xs={5}><div><b>Active Stop Date:</b></div></Grid>
                <Grid item xs={7}><div>{ocs.expriceDate ?? '-'}</div></Grid>
                <Grid item xs={5}><div><b>Suspend Stop Date:</b></div></Grid>
                <Grid item xs={7}><div>{ocs.suspendDate ?? '-'}</div></Grid>
                <Grid item xs={5}><div><b>Disable Stop Date:</b></div></Grid>
                <Grid item xs={7}><div>{ocs.barringDate ?? '-'}</div></Grid>

            </>}
        </>
    )
}

export default RegisterInfo
