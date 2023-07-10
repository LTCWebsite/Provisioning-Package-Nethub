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
import { MyCryptTry } from '../../../../../Components/MyCrypt'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function Ocs({ cus, load, st }) {
    const [show, setShow] = useState(false)
    const [open, setOpen] = useState(false)
    const [idel, setidel] = useState(false)
    const [pass, setPass] = useState(false)
    const [useIdel, setuseIdel] = useState(false)

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
    }, [])
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
                    <Grid item container xs={12} className={st === 'Active' ? 'link-box-success-click-hover next' : 'link-box-error-click next'} onClick={() => setOpen(cus?.resultCode === "0" ? true : false)}>
                        <Grid item xs={1}><Visibility style={{ paddingTop: 4 }} /></Grid>
                        <Grid item xs={5}><div style={{ paddingTop: 4 }}>&nbsp;CBS Status : </div></Grid>
                        <Grid item xs={5} className="text-right">
                            <div>&nbsp;{st}</div>
                        </Grid>
                        <Grid item xs={1}>
                            {st === 'Active' ?
                                <CheckCircle className={'link-icon-error'} style={{ paddingTop: 4 }} /> :
                                <Can className={'link-icon-success'} style={{ paddingTop: 4 }} />}
                        </Grid>
                    </Grid>
                    {useIdel && <>
                        {st?.toUpperCase() === 'IDLE' && !pass &&
                            <Grid item container xs={12} className={'link-box-danger-click-hover'} onClick={() => setidel(true)}>
                                <Grid item xs={1}><Loop style={{ paddingTop: 4 }} /></Grid>
                                <Grid item xs={11}><div style={{ paddingTop: 4 }}>&nbsp;IDEL to Active status</div></Grid>
                            </Grid>}
                    </>}

                    <Grid item xs={12} container className=''>
                        <Grid item container xs={12} className='link-box'>
                            <Grid item xs={6}><div>Offering ID : </div></Grid>
                            <Grid item xs={6}><div className='text-right'>{cus?.primaryOffering}</div></Grid>
                        </Grid>
                        <Grid item container xs={12} className='link-box'>
                            <Grid item xs={6}><div>Offering Name : </div></Grid>
                            <Grid item xs={6}><div className='text-right'>{cus?.offeringName}</div></Grid>
                        </Grid>
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