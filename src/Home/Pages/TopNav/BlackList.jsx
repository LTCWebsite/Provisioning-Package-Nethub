import React from 'react'
import cookie from 'js-cookie'
import Axios from '../../../Pages/Components/Axios'
import Crypt from '../../../Pages/Components/Crypt'
import { AlertError, AlertInfo, AlertSuccess } from '../../../Pages/Components/Toast'
import Doing from '../../../Pages/Components/Doing'
import { Button, Grid } from '@mui/material';
import { Dialog } from '@material-ui/core'
import { WarningAmber } from '@mui/icons-material'

function BlackList({ st }) {
    const [backList, setBackList] = React.useState('')
    const [open, setOpen] = React.useState(false)
    const [reason, setReason] = React.useState({ text: null, alert: false, message: null, dialog: false, status: null })
    React.useEffect(() => {
        setBackList(st)
    }, [])

    const unblockBackList = () => {
        setOpen(false)
        var phone = Crypt({ type: "decrypt", value: localStorage.getItem("input-phone") })
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

    const SaveCF = () => {
        if (reason.text === null || reason.text === '') {
            setReason({ ...reason, alert: true })
        } else {
            setReason({ ...reason, alert: false, dialog: false })
            unblockBackList()
        }
    }
    return (
        <>
            {backList === '' ? '' : backList ? <Button variant="contained" style={{ backgroundColor: '#E74A3B', height: 23, fontSize: 14 }} onClick={() => setOpen(true)}><b>Yes</b></Button> : <b>No</b>}
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <Grid container style={{ paddingLeft: 20, paddingRight: 20 }}>
                    <Grid item container xs={12}>
                        <Grid item xs={12}><div className="center"><h1>ຢືນຢັນການນຳໃຊ້</h1></div></Grid>
                        <Grid item xs={12}>
                            <div className="center">
                                <WarningAmber style={{ fontSize: 150, color: '#E74A3B'}} />
                            </div>
                            <h2 className="center">ຕ້ອງການ ປົດລ໋ອກ BackList ?</h2>
                        </Grid>
                        <Grid item lg={2}></Grid>
                        <Grid item xs={12} lg={8} style={{ marginBottom: 20 }}>
                            <textarea style={{ width: '90%', padding: '5px 10px', fontSize: 16 }} placeholder="ເຫດຜົນ" onChange={(e) => { setReason({ ...reason, text: e.target.value }) }}></textarea>
                            {reason.alert && <div className="red">ກະລຸນາປ້ອນເຫດຜົນ</div>}
                        </Grid>
                        <Grid item container xs={12} style={{ paddingBottom: 20 }}>
                            <Grid item xs={6}>
                                <div className="center"><Button color="primary" onClick={() => setOpen(false)}>No</Button></div>
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

export default BlackList
