import { WarningAmber } from '@mui/icons-material'
import { Button, Dialog, DialogTitle, Grid, Skeleton, Switch } from '@mui/material'
import { Cancel, CheckCircle } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { toast_success, toast_error } from '../../../../../Components/Toast'
import { AxiosAPI, AxiosReq } from '../../../../../Components/Axios'
import axios from 'axios'
import Cookies from 'js-cookie'
import Axios5g from 'axios'
import { List } from '@material-ui/core'

function MobileService({ check, is5G, cb }) {
    // console.log(is5G)
    const [reason, setReason] = React.useState({ text: null, alert: false, message: null, dialog: false, status: null })

    const CFDialog = ({ st: ST, message: Message }) => {
        setReason({ ...reason, message: Message, dialog: true, status: ST, alert: false, text: null })
    }

    //dialog5g
    const [reason5g, setReason5g] = React.useState({ text: null, alert: false, message: null, dialog: false, status: null })
    const CFDialog5g = ({ st: ST, message: Message }) => {
        setReason5g({ ...reason, message: Message, dialog: true, status: ST, alert: false, text: null })
    }
    const handleCloseCon = () => {
        setReason({ ...reason, dialog: false })
    }
    const [smsST, setsmsST] = useState(false)

    const [datapk, setDataPk] = useState()

    const change3G = () => {
        var curr3G = check.n_3g
        var send = ''
        var text = ''
        if (curr3G === false) {
            send = 'OD3G'
            text = 'ເປີດ'
        } else if (curr3G === true) {
            send = 'CD3G'
            text = 'ປິດ'
        }
        var phone = localStorage.getItem("ONE_PHONE")
        AxiosReq.post("InternetOpen?msisdn=" + phone + "&orderType=" + send, {}).then(res => {
            if (res.data.orderChangeResult.resultDesc === "Operation successed.") {
                toast_success({ text: "ບັນທຶກຂໍ້ມູນ " + text + " 3G ສຳເລັດ" })
                cb({ ...check, n_3g: !check.n_3g })
            } else {
                toast_error({ text: res.data.orderChangeResult.resultDesc })
            }
            // Doing({
            //     msisdn: Crypt({ type: "decrypt", value: localStorage.getItem("input-phone") }).text,
            //     username: Crypt({ type: "decrypt", value: localStorage.getItem("one_info") }).username,
            //     detail: text + ' 3G',
            //     info: reason.text,
            //     resualt: res.data.orderChangeResult.resultDesc,
            // })
        }).catch(err => {
            toast_error({ text: err })
            // Doing({
            //     msisdn: Crypt({ type: "decrypt", value: localStorage.getItem("input-phone") }).text,
            //     username: Crypt({ type: "decrypt", value: localStorage.getItem("one_info") }).username,
            //     detail: text + ' 3G',
            //     info: reason.text,
            //     resualt: 'error',
            // })
        })
    }

    const change4G = () => {
        var curr4G = check.n_4g
        var send = ''
        var text = ''
        if (curr4G === false) {
            send = 'OD4G'
            text = 'ເປີດ'
        } else if (curr4G === true) {
            send = 'CD4G'
            text = 'ປິດ'
        }
        var phone = localStorage.getItem("ONE_PHONE")
        AxiosReq.post("InternetOpen?msisdn=" + phone + "&orderType=" + send, {}).then(res => {
            if (res.data.orderChangeResult.resultDesc === "Operation successed.") {
                toast_success({ text: "ບັນທຶກຂໍ້ມູນ " + text + " 4G ສຳເລັດ" })
                cb({ ...check, n_4g: !check.n_4g })
            } else {
                toast_error({ text: res.data.orderChangeResult.resultDesc })
            }
            // Doing({
            //     msisdn: Crypt({ type: "decrypt", value: localStorage.getItem("input-phone") }).text,
            //     username: Crypt({ type: "decrypt", value: localStorage.getItem("one_info") }).username,
            //     detail: text + ' 4G',
            //     info: reason.text,
            //     resualt: res.data.orderChangeResult.resultDesc,
            // })
        }).catch(err => {
            toast_error({ text: err })
            // Doing({
            //     msisdn: Crypt({ type: "decrypt", value: localStorage.getItem("input-phone") }).text,
            //     username: Crypt({ type: "decrypt", value: localStorage.getItem("one_info") }).username,
            //     detail: text + ' 4G',
            //     info: reason.text,
            //     resualt: 'error',
            // })
        })
    }
    const changeSMS = () => {
        let sendData = {
            msisdn: localStorage.getItem("ONE_PHONE"),
            prov: smsST ? 'false' : 'true'
        }
        AxiosReq.post("CheckSms", sendData, { headers: { 'Authorization': 'Bearer ' + Cookies.get("ONE_TOKEN") } }).then(res => {
            if (res.status === 200) {
                setsmsST(smsST ? false : true)
                toast_success({ text: res.data?.resultDesc })
            } else {
                toast_error({ text: res.data?.resultDesc })
            }
        }).catch(er => {
            toast_error({ text: "API Error !!!" })
        })
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
            } else if (reason.status === "SMS") {
                changeSMS()
            }
        }
    }
    useEffect(() => {
        AxiosReq.get("CheckSms?msisdn=" + localStorage.getItem("ONE_PHONE"), { headers: { 'Authorization': 'Bearer ' + Cookies.get("ONE_TOKEN") } })
            .then(res => {
                if (res.status === 200) {
                    setsmsST(res.data?.status)
                }
            })
    }, [])



    const getInfo5g = () => {
        Axios5g.post("http://172.28.14.48:2031/list-5g", { msisdn: localStorage.getItem("ONE_PHONE") }, {
            headers: {
                'Authorization': 'Basic cGFja2FnZTojTHRjMXFhejJ3c3hAcGs=',
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (res.status === 200) {
                    setDataPk(res.data.Data[0])
                }

                // setDataPk(res.data)

            })
    }

    useEffect(() => {
        getInfo5g()

    }, [])
    // console.log(datapk);

    // console.log(datapk);


    const [isDialogOpen, setDialogOpen] = useState(false);

    const [openDialog, handleDisplay] = React.useState(false);

    const handleClose = () => {
        handleDisplay(false);
    };

    const openDialogBox = () => {
        handleDisplay(true);
    };
    const dialogStyle = {
        padding: "20px",
    };
    const buttonStyle = {
        width: "10rem",
        fontsize: "1.5rem",
        height: "2rem",
        padding: "5px",
        borderRadius: "10px",
        backgroundColor: "green",
        color: "White",
        border: "2px solid yellow",
    };

    return (
        <>
            <Grid item container xs={12} className='link-box-dev'>
                <Grid item xs={9}><div>5G : </div></Grid>
                <Grid item xs={3}><div className='text-right'>
                    {is5G ? <CheckCircle className="success" />

                        :
                        <Cancel className="danger" />}

                </div></Grid>

            </Grid>
            {/* <Grid item container xs={12} className='link-box-dev'>
                <Grid item xs={9}><div><Button>Info-5G</Button></div>
                </Grid>
             
            </Grid> */}





            <Grid item xs={12} container className='link-box-pointer'>
                {datapk !== undefined ? (
                    <Grid item xs={6} >IMEI:{datapk?.imei}</Grid>
                ) : (
                    <Grid item xs={6} >------</Grid>
                )}
            </Grid>

            <Grid item xs={12} container className='link-box-pointer' >


                {datapk !== undefined ? (
                    <Grid item xs={6} >Brand Name: {datapk?.brand_name}</Grid>
                ) : (
                    <Grid item xs={6} >------</Grid>
                )}
            </Grid>
            <Grid item xs={12} container className='link-box-pointer' >
                {datapk !== undefined ? (
                    <Grid item xs={6} >Device Type: {datapk?.device_type}</Grid>
                ) : (
                    <Grid item xs={6} >------</Grid>
                )}

            </Grid>

            <Grid item xs={12} container className='link-box-pointer' >
                {datapk !== undefined ? (
                    <Grid item xs={6} >Marketing Name: {datapk?.marketing_name}</Grid>
                ) : (
                    <Grid item xs={6} >------</Grid>
                )}

            </Grid>






            {/* <Dialog onClose = {handleClose} open = {openDialog}> */}
            {/* <DialogTitle> Demo Dialog </DialogTitle> */}

            {/* <Grid container style={{ paddingLeft: 20, paddingRight: 20 }}>
                    <Grid item container xs={12}>
                <h3>imei: </h3>
                <h3>marketing_name: </h3>
                <h3>brand_name: </h3>
                <h3>os: </h3>
                <h3>device_type: </h3>
                <h3>create_date: </h3>
                </Grid>
                </Grid>
            
         </Dialog> */}

            <Grid item container xs={12} className='link-box-dev'>
                <Grid item xs={9}><div>4G : </div></Grid>
                <Grid item xs={3}><div className='text-right'>
                    {check.load ? <Skeleton animation="wave" /> : <Switch
                        size='small'
                        checked={check.n_4g}
                        onChange={() => { CFDialog({ st: '4G', message: check.n_4g ? <p className='center-cf'>ຕ້ອງການ ປິດ 4G ?</p> : <p className='center-cf'>ຕ້ອງການ ເປີດ 4G ?</p>, data: "4G" }) }}
                        color="success"
                    />}
                </div></Grid>
            </Grid>

            <Grid item container xs={12} className='link-box-dev'>
                <Grid item xs={9}><div>3G : </div></Grid>
                <Grid item xs={3}><div className='text-right'>
                    {check.load ? <Skeleton animation="wave" /> : <Switch
                        size='small'
                        checked={check.n_3g}
                        onChange={() => { CFDialog({ st: '3G', message: check.n_3g ? <p className='center-cf'>ຕ້ອງການ ປິດ 3G ?</p> : <p className='center-cf'>ຕ້ອງການ ເປີດ 3G ?</p>, data: "3G" }) }}
                        color="success"
                    />}
                </div></Grid>
            </Grid>

            <Grid item container xs={12} className='link-box-dev'>
                <Grid item xs={9}><div>RBT : </div></Grid>
                <Grid item xs={3}><div className='text-right'>
                    {check.load ? <Skeleton animation="wave" /> : <Switch
                        size='small'
                        checked={check.rbt}
                        // onChange={() => cb({ ...check, rbt: !check.rbt })}
                        color="success"
                    />}

                </div></Grid>
            </Grid>

            <Grid item container xs={12} className='link-box-dev'>
                <Grid item xs={9}><div>Voice IR : </div></Grid>
                <Grid item xs={3}><div className='text-right'>
                    {check.load ? <Skeleton animation="wave" /> : <Switch
                        size='small'
                        checked={check.ir_call}
                        // onChange={() => setCheck({ ...check, voice: !check.voice })}
                        color="success"
                    />}

                </div></Grid>
            </Grid>
            <Grid item container xs={12} className='link-box-dev'>
                <Grid item xs={9}><div>Data IR : </div></Grid>
                <Grid item xs={3}><div className='text-right'>
                    {check.load ? <Skeleton animation="wave" /> : <Switch
                        size='small'
                        checked={check.ir_data}
                        // onChange={() => setCheck({ ...check, data: !check.data })}
                        color="success"
                    />}

                </div></Grid>
            </Grid>

            <Grid item container xs={12} className='link-box-dev'>
                <Grid item xs={9}><div>SMS : </div></Grid>
                <Grid item xs={3}><div className='text-right'>
                    {check.load ? <Skeleton animation="wave" /> : <Switch
                        size='small'
                        checked={smsST}
                        onChange={() => { CFDialog({ st: 'SMS', message: smsST ? <p className='center-cf'>ຕ້ອງການ ປິດ SMS ?</p> : <p className='center-cf'>ຕ້ອງການ ເປີດ SMS ?</p>, data: "SMS" }) }}
                        color="success"
                    />}
                </div></Grid>
            </Grid>

            <Dialog
                open={reason.dialog}
                onClose={handleCloseCon}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <Grid container style={{ paddingLeft: 20, paddingRight: 20 }}>
                    <Grid item container xs={12}>
                        <Grid item xs={12}><div className="center"><h1>ຢືນຢັນການນຳໃຊ້</h1></div></Grid>
                        <Grid item xs={12}>
                            <div className="center">
                                <WarningAmber style={{ fontSize: 150, color: '#E74A3B' }} />
                            </div>
                            <h2 className="center">{reason.message}</h2>
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
                                <div className="center"><Button variant="contained" color="primary" onClick={SaveCF}>Yes</Button></div>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Dialog>

        </>
    )
}

export default MobileService