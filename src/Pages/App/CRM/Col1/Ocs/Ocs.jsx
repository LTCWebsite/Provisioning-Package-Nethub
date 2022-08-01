import { CheckCircle, Close, } from '@mui/icons-material'
import { Dialog, Grid, IconButton, Skeleton, Slide } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { AxiosReq } from '../../../../../Components/Axios'
import Can from '@material-ui/icons/Cancel'
import { Visibility } from '@material-ui/icons'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function Ocs({ load, st }) {
    const [data, setData] = useState([])
    const [show, setShow] = useState(false)
    const [open, setOpen] = useState(false)
    console.log(st)
    useEffect(() => {
        setShow(false)
        let phone = localStorage.getItem("ONE_PHONE")
        AxiosReq.get("QueryCustomerBSS?msisdn=" + phone).then(res => {
            if (res.status === 200) {
                setData(res.data.querySubInfoResult)
                setShow(true)
                // cb(res.data.querySubInfoResult)
                // console.log(res.data.querySubInfoResult)
            }
        }).catch(er => {
            setShow(true)
            setData([])
        })
    }, [])
    const BSS = () => {
        if (data.statusBSSDesc === "Activated") {
            setOpen(true)
        }
    }

    return (
        <>
            {!show ?
                <Grid item xs={12}>
                    <Skeleton animation="wave" className="wave" />
                </Grid> :
                <>
                    <Grid item container xs={12} className={st === "Active" ? 'link-box-success-click-hover' : 'link-box-error-click'}>
                        <Grid item xs={1}><Visibility style={{ paddingTop: 4 }} /></Grid>
                        <Grid item xs={5}><div style={{ paddingTop: 4 }}>&nbsp;OCS Status : </div></Grid>
                        <Grid item xs={5} className="text-right">
                            <div>&nbsp;{st}</div>
                        </Grid>
                        <Grid item xs={1}>
                            {st === "Active" ?
                                <CheckCircle className={'link-icon-error'} style={{ paddingTop: 4 }} /> :
                                <Can className={'link-icon-success'} style={{ paddingTop: 4 }} />}
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
                    <Grid item container xs={12} className="m-body">
                        <Grid item xs={1}></Grid>
                        <Grid item xs={10}><div className="center"><h1>ຂໍ້ມູນການລົງທະບຽນ BSS</h1></div></Grid>
                        <Grid item xs={1}>
                            <div className="right">
                                <IconButton aria-label="delete" onClick={() => setOpen(false)}>
                                    <Close />
                                </IconButton>
                            </div>
                        </Grid>
                        <Grid item container xs={12} className="down">
                            <Grid item xs={4}>ຊື່:</Grid>
                            <Grid item xs={8}>{data.name}</Grid>
                        </Grid>
                        <Grid item container xs={12} className="down">
                            <Grid item xs={4}>ທີ່ຢູ່:</Grid>
                            <Grid item xs={8}>{data.address}</Grid>
                        </Grid>
                        <Grid item container xs={12} className="down">
                            <Grid item xs={4}>Pay full address:</Grid>
                            <Grid item xs={8}>{data.paY_FULL_ADDRESS}</Grid>
                        </Grid>
                        <Grid item container xs={12} className="down">
                            <Grid item xs={4}>BSS Status:</Grid>
                            <Grid item xs={8}><u className={data.statusBSSDesc === "Activated" ? "success-u" : "error-u"}>{data.statusBSSDesc}</u></Grid>
                        </Grid>
                        <Grid item container xs={12} className="down">
                            <Grid item xs={4}>OCS Status:</Grid>
                            <Grid item xs={8}><u className={data.ocS_Status === "1" ? "success-u" : "error-u"}>{data.ocS_Status === '1' ? "Active" : "DisActive"}</u></Grid>
                        </Grid>
                        <Grid item container xs={12} className="down">
                            <Grid item xs={4}>HLR Status:</Grid>
                            <Grid item xs={8}><u className={data.hrL_Status === '1' ? "success-u" : "error-u"}>{data.hrL_Status === '1' ? "Active" : "DisActive"}</u></Grid>
                        </Grid>
                        <Grid item container xs={12} className="down">
                            <Grid item xs={4}>First Connect:</Grid>
                            <Grid item xs={8}>{data.firsT_CONNECT}</Grid>
                        </Grid>
                        <Grid item container xs={12} className="down">
                            <Grid item xs={4}>Change Date:</Grid>
                            <Grid item xs={8}>{data.changE_DATETIME}</Grid>
                        </Grid>
                        <Grid item container xs={12} className="down">
                            <Grid item xs={4}>Register Date:</Grid>
                            <Grid item xs={8}>{data.regsister_date}</Grid>
                        </Grid>
                        <Grid item container xs={12} className="down">
                            <Grid item xs={4}>Serial:</Grid>
                            <Grid item xs={8}>{data.serial}</Grid>
                        </Grid>
                        <Grid item container xs={12} className="down">
                            <Grid item xs={4}>Sub type:</Grid>
                            <Grid item xs={8}>{data.suB_TYPE}</Grid>
                        </Grid>
                        <Grid item container xs={12} className="down">
                            <Grid item xs={4}>IMSI:</Grid>
                            <Grid item xs={8}>{data.imsi}</Grid>
                        </Grid>
                        <Grid item container xs={12} className="down">
                            <Grid item xs={4}>Emp Code:</Grid>
                            <Grid item xs={8}>{data.emP_CODE}</Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Dialog>
        </>
    )
}

export default Ocs