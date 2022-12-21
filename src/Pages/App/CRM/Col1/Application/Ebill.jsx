import React from 'react';
import { Radio, Tooltip, Dialog, Grid, Button } from '@material-ui/core';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { AxiosReq } from '../../../../../Components/Axios'
// import Crypt from '../../Components/Crypt'
import cookie from 'js-cookie'
import { Cancel, CheckCircle, HelpOutline } from '@material-ui/icons';
import { toast_success, toast_error } from '../../../../../Components/Toast';
// import Doing from '../../Components/Doing'
import { WarningAmber } from '@mui/icons-material';

export default function Ebill() {
    const [value, setValue] = React.useState(null)
    const [data, setData] = React.useState([])
    const [open, setOpen] = React.useState(false)
    const [tool, setTool] = React.useState(null)
    const [curValue, setCurValue] = React.useState(null)
    const [reason, setReason] = React.useState({ text: null, alert: false })
    React.useEffect(() => {
        var phone = localStorage.getItem("ONE_PHONE")
        AxiosReq.get("CheckEbillInfo?msisdn=" + phone,{ headers: { 'Authorization': 'Bearer ' + cookie.get("ONE_TOKEN") } }).then(res => {
            if (res.status === 200) {
                setData(res.data)
                setValue(res.data.sendType)
                setCurValue(res.data.sendType)
                if (res.data.sendType === '1') {
                    setTool("ສົ່ງ email")
                } else if (res.data.sendType === '2') {
                    setTool("ບໍ່ເອົາໃບບິນ")
                } else {
                    setTool("ຍົກເລີກ ebill ( ກັບໄປພິມເຈ້ຍໃຫ້ລູກຄ້າ)")
                }
                // console.log(res.data)
            }
        }).catch(err => {
            console.log('not')
        })
    }, [])
    const handleChange = (event) => {
        setValue(event.target.value)
    }
    const handleClickOpen = () => {
        setValue(curValue)
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    const changeEbill = () => {
        handleClickOpen(true)
    }
    const saveEbill = () => {
        if (reason.text === null || reason.text === '') {
            setReason({ ...reason, alert: true })
        } else {
            var sendType = value
            var text = ''
            if (sendType === '1') {
                text = "ສົ່ງ email"
            } else if (sendType === '2') {
                text = "ບໍ່ເອົາໃບບິນ"
            } else {
                text = "ຍົກເລີກ ebill ( ກັບໄປພິມເຈ້ຍໃຫ້ລູກຄ້າ)"
            }
            var phone = localStorage.getItem("ONE_PHONE")
            AxiosReq.post("CheckEbillInfo?msisdn=" + phone + "&sendType=" + sendType, { headers: { 'Authorization': 'Bearer ' + cookie.get("ONE_TOKEN") } }).then(res => {
                if (res.status === 200) {
                    if (sendType === '1') {
                        setTool("ສົ່ງ email")
                    } else if (sendType === '2') {
                        setTool("ບໍ່ເອົາໃບບິນ")
                    } else {
                        setTool("ຍົກເລີກ ebill ( ກັບໄປພິມເຈ້ຍໃຫ້ລູກຄ້າ)")
                    }
                    toast_success({ text: phone + " ປ່ຽນການນຳໃຊ້ Ebill ສຳເລັດ" })
                    setCurValue(sendType)
                    handleClose()
                    // Doing({
                    //     msisdn: Crypt({ type: "decrypt", value: localStorage.getItem("input-phone") }).text,
                    //     username: Crypt({ type: "decrypt", value: localStorage.getItem("one_info") }).username,
                    //     detail: 'ປ່ຽນ ' + tool + ' ເປັນ ' + text,
                    //     info: reason.text,
                    //     resualt: 'Operation successed.',
                    // })
                } else {
                    toast_error({ text: res.data })
                    // Doing({
                    //     msisdn: Crypt({ type: "decrypt", value: localStorage.getItem("input-phone") }).text,
                    //     username: Crypt({ type: "decrypt", value: localStorage.getItem("one_info") }).username,
                    //     detail: 'ປ່ຽນ ' + tool + ' ເປັນ ' + text,
                    //     info: reason.text,
                    //     resualt: 'error',
                    // })
                }
            }).catch(err => {
                console.log(err)
                // Doing({
                //     msisdn: Crypt({ type: "decrypt", value: localStorage.getItem("input-phone") }).text,
                //     username: Crypt({ type: "decrypt", value: localStorage.getItem("one_info") }).username,
                //     detail: 'ປ່ຽນ ' + tool + ' ເປັນ ' + text,
                //     info: reason.text,
                //     resualt: 'error',
                // })
            })
        }

    }

    return (
        <>
            {data.length <= 0 ? <Cancel className="danger" checked={false} /> :
                <>
                    <CheckCircle className="success" /> &nbsp;
                    <Tooltip title={tool} onClick={changeEbill}>
                        <HelpOutline className="pointer" />
                    </Tooltip>
                </>
            }
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <Grid container style={{ paddingLeft: 40, paddingRight: 40 }}>
                    <Grid container item xs={12}>
                        <Grid item xs={12}><h2 className="center">ຂໍ້ມູນການນຳໃຊ້ Ebill</h2></Grid>
                        <Grid item xs={12}>
                            <div className="center">
                                <WarningAmber style={{ fontSize: 150, color: '#E74A3B' }} />
                            </div>
                            <FormControl component="fieldset" className="center">
                                <RadioGroup aria-label="gender" value={value} onChange={handleChange}>
                                    <FormControlLabel value="1" control={<Radio />} label="ສົ່ງ email" />
                                    <FormControlLabel value="2" control={<Radio />} label="ບໍ່ເອົາໃບບິນ" />
                                    <FormControlLabel value="3" control={<Radio />} label="ຍົກເລີກ ebill ( ກັບໄປພິມເຈ້ຍໃຫ້ລູກຄ້າ)" />
                                </RadioGroup>
                            </FormControl>
                            <textarea style={{ width: '95%', padding: '5px 10px', fontSize: 16, marginTop: 10 }} placeholder="ເຫດຜົນ" onChange={(e) => { setReason({ ...reason, text: e.target.value }) }}></textarea>
                            {reason.alert && <div className="red">ກະລຸນາປ້ອນເຫດຜົນ</div>}
                        </Grid>
                        <Grid container item xs={12} style={{ paddingTop: 20, paddingBottom: 20 }}>
                            <Grid item xs={6}>
                                <div><Button color="primary" onClick={handleClose}><b>Close</b></Button></div>
                            </Grid>
                            <Grid item xs={6}>
                                <div className="right"><Button variant="contained" color="primary" onClick={saveEbill}><b>Save</b></Button></div>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Dialog>
        </>
    )
}
