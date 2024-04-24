import { CheckCircle, Close, Loop, } from '@mui/icons-material'
import { Button, Dialog, Grid, Skeleton, Slide } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import Can from '@material-ui/icons/Cancel'
import { Visibility } from '@material-ui/icons'
import OCSTab from './OCSTab'
import axios from 'axios'
import { toast_success, toast_error } from '../../../../../Components/Toast'
import { MyCrypt, MyCryptTry } from '../../../../../Components/MyCrypt'
import { AxiosCBS, AxiosReq } from '../../../../../Components/Axios'
import Cookies from 'js-cookie'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function Ocs({ cus, load, st }) {
    const [show, setShow] = useState(false)
    const [open, setOpen] = useState(false)
    const [idel, setidel] = useState(false)
    const [pass, setPass] = useState(false)
    const [useIdel, setuseIdel] = useState(false)
    const [data, setdata] = useState([])
    const [show2, setShow2] = useState(false)
    let type = MyCrypt("de", localStorage.getItem("ONE_NETWORK"))
    const [ftthData, setftthData] = useState([])
    // console.log(cus)
    useEffect(() => {
        setShow(load)
        let info = MyCryptTry("de", localStorage.getItem("ONE_DETAIL"))
        if (info?.user?.length > 0) {
            info?.user?.map(row => {
                if (row?.value === "Administrator Online" || row?.value === "Super Admin" || row?.value === "Super User Online") {
                    setuseIdel(true)
                }
            })
        }
        loadCBS_Balance()
    }, [])
    useEffect(() => {
        if (type?.NETWORK_CODE === "F") {
            loadFtth()
        }
    }, [type?.NETWORK_CODE])
    const loadFtth = () => {
        AxiosReq.get("Fiber?ftth=" + localStorage.getItem("ONE_PHONE"), { headers: { 'Authorization': 'Bearer ' + Cookies.get("ONE_TOKEN") } }).then(res => {
            if (res.status === 200) {
                setftthData(res.data)
                // console.log(res.data)
            }
        })
    }
    const loadCBS_Balance = () => {
        let phone = localStorage.getItem("ONE_PHONE")
        let sendData = {
            msisdn: phone
        }
        AxiosCBS.post("query_balance", sendData).then(res => {
            if (res.status === 200) {
                setdata(res.data)
                console.log(res.data)
                setShow2(true)
            }
        })
    }
    // console.log('por',st)
    const SaveIDEL = () => {
        let sendData = {
            "username": localStorage.getItem('USERNAME'),
            "msisdn": localStorage.getItem("ONE_PHONE")
        }
        setidel(false)
        let link_1 = `http://172.28.26.146:2025/activeIdleNumber`
        // let link_1 = `http://172.28.14.48:2025/activeIdleNumber`
        axios.post(link_1, sendData, {
            headers: {
                "api_key": "jfbuebfjhebkfnsknksankfnsknjsfhwbjdnjwjdnjwkkiwnninfknknsfsjwnf==="
            }
        }).then(res => {
            if (res.status === 200 && parseInt(res.data?.ResultCode) === 200) {
                setPass(true)
                toast_success({ text: res.data?.ResultDesc })
            } else {
                toast_error({ text: res.data?.ResultDesc })
            }
        }).catch(er => {
            toast_error({ text: "API error" })
        })
    }
    return (
        <>
            {!show ?
                <Grid item xs={12}>
                    <Skeleton animation="wave" className="wave" />
                </Grid> :
                <>
                    {/* <Grid item container xs={12} className={st === "Active" ? 'link-box-success-click-hover next' : 'link-box-error-click next'} onClick={() => setOpen(st === "Active" ? true : false)}>
                        <Grid item xs={1}><Visibility style={{ paddingTop: 4 }} /></Grid>
                        <Grid item xs={5}><div style={{ paddingTop: 4 }}>&nbsp;CBS Status : </div></Grid>
                        <Grid item xs={5} className="text-right">
                            <div>&nbsp;{st}</div>
                        </Grid>
                        <Grid item xs={1}>
                            {st === "Active" ?
                                <CheckCircle className={'link-icon-error'} style={{ paddingTop: 4 }} /> :
                                <Can className={'link-icon-success'} style={{ paddingTop: 4 }} />}
                        </Grid>
                    </Grid> */}
                    <Grid item container xs={12} className={cus?.status === '2' ? 'link-box-success-click-hover next' : 'link-box-error-click next'} onClick={() => setOpen(cus?.resultCode === "0" ? true : false)}>
                        <Grid item xs={1}><Visibility style={{ paddingTop: 4 }} /></Grid>
                        <Grid item xs={5}><div style={{ paddingTop: 4 }}>&nbsp;CBS Status : </div></Grid>
                        <Grid item xs={5} className="text-right">
                            <div>&nbsp;
                                {cus?.status === '1' && 'IDLE'}
                                {cus?.status === '2' && 'ACTIVE'}
                                {cus?.status === '3' && 'CALLBRARING/ SUSPEND'}
                                {cus?.status === '4' && 'DISABLE'}
                                {cus?.status === '5' && 'POOL'}
                                {cus?.status === '6' && 'DEACTIVE'}
                                {cus?.status === undefined && 'NULL'}
                            </div>
                        </Grid>
                        <Grid item xs={1}>
                            {cus?.status === '2' && <CheckCircle className={'link-icon-error'} style={{ paddingTop: 4 }} />}

                            {cus?.status !== '2' && <Can className={'link-icon-success'} style={{ paddingTop: 4 }} />}
                        </Grid>
                    </Grid>
                    <Grid item container xs={12} className={'link-box-click-hover link-box'}>
                        <Grid item xs={6}><div>OfferingID : </div></Grid>
                        <Grid item xs={6}><div className='text-right'>{cus?.primaryOffering}</div></Grid>
                    </Grid>
                    {type?.NETWORK_CODE === 'M' || type?.NETWORK_CODE === "H" || type?.NETWORK_CODE === 'W' ? null :
                        <Grid item container xs={12} className={'link-box-click-hover link-box'}>
                            <Grid item xs={6}><div>ຍອດໜີ້ : </div></Grid>
                            <Grid item xs={6}><div className='text-right'>{parseInt(data?.Summary?.Total).toLocaleString()}</div></Grid>
                        </Grid>}

                    {useIdel && <>
                        {cus?.status === '1' && !pass &&
                            <Grid item container xs={12} className={'link-box-danger-click-hover'} onClick={() => setidel(true)}>
                                <Grid item xs={1}><Loop style={{ paddingTop: 4 }} /></Grid>
                                <Grid item xs={11}><div style={{ paddingTop: 4 }}>&nbsp;IDEL to Active status</div></Grid>
                            </Grid>}
                    </>}

                    {/* <Grid item xs={12} container className=''>
                        <Grid item container xs={12} className='link-box'>
                            <Grid item xs={6}><div>Offering ID : </div></Grid>
                            <Grid item xs={6}><div className='text-right'>{cus?.primaryOffering}</div></Grid>
                        </Grid>
                        <Grid item container xs={12} className='link-box'>
                            <Grid item xs={6}><div>Offering Name : </div></Grid>
                            <Grid item xs={6}><div className='text-right'>{cus?.offeringName}</div></Grid>
                        </Grid>
                    </Grid> */}
                    <Grid item xs={12} container>
                        <Grid item container xs={12} className='link-box'>
                            <Grid item xs={6}><div>Balance Type : </div></Grid>
                            <Grid item xs={6}><div className='text-right'>{data?.C_MAIN_BILLING_ACCOUNT?.BalanceType}</div></Grid>
                        </Grid>
                        {type?.NETWORK_CODE !== "M" &&
                            <Grid item xs={12} container>
                                <Grid item container xs={12} className='link-box'>
                                    <Grid item xs={6}><div>Offering Name : </div></Grid>
                                    <Grid item xs={6}><div className='text-right'>{cus?.offeringName}</div></Grid>
                                </Grid>
                                <Grid item container xs={12} className='link-box'>
                                    <Grid item xs={6}><div>Balance Type Name: </div></Grid>
                                    <Grid item xs={6}><div className='text-right'>{data?.C_MAIN_BILLING_ACCOUNT?.BalanceTypeName}</div></Grid>
                                </Grid>
                                <Grid item container xs={12} className='link-box'>
                                    <Grid item xs={6}><div>TotalAmount: </div></Grid>
                                    <Grid item xs={6}><div className='text-right'>{parseInt(data?.C_MAIN_BILLING_ACCOUNT?.TotalAmount).toLocaleString()}</div></Grid>
                                </Grid>
                            </Grid>
                        }
                        {type?.NETWORK_CODE === "F" &&
                            <Grid item xs={12} container>
                                <Grid item container xs={12} className='link-box'>
                                    <Grid item xs={6}><div>FTTH Package : </div></Grid>
                                    <Grid item xs={6}><div className='text-right'>
                                        {ftthData?.ftthPackage}
                                    </div></Grid>
                                </Grid>
                                <Grid item container xs={12} className='link-box'>
                                    <Grid item xs={6}><div>Expire Date : </div></Grid>
                                    <Grid item xs={6}><div className='text-right'>
                                        {parseInt((parseFloat(data?.AccountCredit?.TotalRemainAmount)) / (parseFloat(ftthData?.ftthPrice) + 5000) * 30)} Days
                                    </div></Grid>
                                </Grid>
                                <Grid item container xs={12} className='link-box'>
                                    <Grid item xs={6}><div>Total Remain Amount in month : </div></Grid>
                                    <Grid item xs={6}><div className='text-right'>
                                        {parseFloat(data?.AccountCredit?.TotalRemainAmount).toLocaleString()}
                                    </div></Grid>
                                </Grid>
                                <Grid item container xs={12} className='link-box'>
                                    <Grid item xs={6}><div>Total Usage Amount in month : </div></Grid>
                                    <Grid item xs={6}><div className='text-right'>
                                        {parseFloat(data?.AccountCredit?.TotalUsageAmount).toLocaleString()}
                                    </div></Grid>
                                </Grid>
                            </Grid>
                        }
                    </Grid>
                </>}

            <Dialog
                maxWidth="xl"
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                TransitionComponent={Transition}
            >
                <Grid container>
                    <Grid item container xs={12}>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={10}><div className="center"><h1>ຂໍ້ມູນການລົງທະບຽນ CBS</h1></div></Grid>
                        <Grid item xs={1}>
                            <div className='right'><Close className='icon' onClick={() => setOpen(!open)} /></div>
                        </Grid>
                        <Grid item xs={12} style={{ width: 1000 }}>
                            <OCSTab />
                        </Grid>
                    </Grid>
                </Grid>
            </Dialog>

            <Dialog
                maxWidth="xl"
                open={idel}
                onClose={() => setidel(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                TransitionComponent={Transition}
            >
                <Grid container>
                    <Grid item container xs={12}>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={10}><div className="center"><h1>Change IDEL to Active status ?</h1></div></Grid>
                        <Grid item xs={1}>
                            <div className='right'><Close className='icon' onClick={() => setidel(false)} /></div>
                        </Grid>
                        <Grid item xs={12} style={{ width: 400 }}>
                            <div className='center'>
                                <Loop style={{ fontSize: 200 }} />
                            </div>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} container style={{ padding: 20 }}>
                        <Grid item xs={6}>
                            <Button variant='contained' color='inherit' onClick={() => setidel(false)}>
                                ຍົກເລີກ
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <div className='right'>
                                <Button variant='contained' color='error' className='btn-success' onClick={SaveIDEL}>
                                    ຢືນຢັນ
                                </Button>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </Dialog>
        </>
    )
}

export default Ocs