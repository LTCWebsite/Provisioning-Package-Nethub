import { Cancel, Visibility } from '@material-ui/icons'
import { CheckCircle, Close } from '@mui/icons-material'
import { Button, CircularProgress, Dialog, Grid, IconButton, Skeleton, Slide } from '@mui/material'
import React, { useEffect } from 'react'
import { useState } from 'react'
import cookie from 'js-cookie'
import { AxiosReq } from '../../../../../Components/Axios'
import LoadLottie from '../../../../../Components/LoadLottie'
import File from '../../../../../Lottie/caution.json'
import { toast_success, toast_error } from '../../../../../Components/Toast'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function BlackList({ data, load }) {
    // console.log(data)
    const [open, setOpen] = useState(false)
    const [btn, setBtn] = useState(false)
    const [show, setShow] = useState(false)
    const [point, setPoint] = useState([])
    const bl = data.blacklistStatus

    const UnBlackList = () => {
        setOpen(false)
        if (bl !== 0) {
            setOpen(true)
        }
    }
    const SaveUnBlackList = () => {
        setBtn(true)
        let phone = localStorage.getItem("ONE_PHONE")
        AxiosReq.post("UnBlackList?msisdn=" + phone, {},{ headers: { 'Authorization': 'Bearer ' + cookie.get("ONE_TOKEN") } }).then(res => {
            if (res.status === 200 && res.data.resultCode === "0") {
                toast_success({ text: res.data.resultDesc })
                bl = 0
            } else {
                toast_error({ text: res.data.resultDesc })
            }
            setOpen(false)
            setBtn(false)
        }).catch(er => {
            // console.log(er)
            setOpen(false)
            setBtn(false)
        })
    }
    useEffect(() => {
        setShow(false)
        let phone = localStorage.getItem("ONE_PHONE")
        AxiosReq.get("CheckPoint?msisdn=" + phone,{ headers: { 'Authorization': 'Bearer ' + cookie.get("ONE_TOKEN") } }).then(res => {
            if (res.status === 200) {
                // console.log(res.data)
                setShow(true)
                setPoint(res.data)
            }
        })
    }, [])
    return (
        <>
            <Grid item container xs={12} className={bl === 0 ? 'link-box-success-click' : 'link-box-error-click-hover'} onClick={UnBlackList}>
                {bl === 0 ? <>
                    <Grid item xs={6}><div>BlackList Status : </div></Grid>
                </> : <>
                    <Grid item xs={1}><Visibility style={{ paddingTop: 4 }} /></Grid>
                    <Grid item xs={5}><div style={{ paddingTop: 4 }}>&nbsp;BlackList Status : </div></Grid>
                </>}
                <Grid item xs={5} className="text-right"><div>{load ? <Skeleton animation="wave" /> : bl === 0 ? 'No' : 'Yes'}</div></Grid>
                <Grid item xs={1}>{load ? <Skeleton animation="wave" /> : bl !== 0 ? <Cancel className='link-icon' /> : <CheckCircle className='link-icon' />}</Grid>
            </Grid>
            <Grid item container xs={12} className="link-box-text">
                <Grid item xs={5}><div>Point : </div></Grid>
                <Grid item xs={7} className="right"><div>{load ? <Skeleton animation="wave" /> : parseInt(point?.checkPointResult?.resultPoint) >= 0 ? parseInt(point?.checkPointResult?.resultPoint) : '---'}</div></Grid>
            </Grid>

            <Dialog
                maxWidth="md"
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                TransitionComponent={Transition}
            >
                <Grid container>
                    <Grid item container xs={12} className="m-body-sm">
                        <Grid item xs={1}></Grid>
                        <Grid item xs={10}><div className="center"><h1>UnBlackList</h1></div></Grid>
                        <Grid item xs={1}>
                            <div className="right">
                                <IconButton aria-label="delete" onClick={() => setOpen(false)}>
                                    <Close />
                                </IconButton>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <h3 className='center'>ຕ້ອງການ UnBlackList ( {localStorage.getItem("ONE_PHONE")} ) ?</h3>
                            <LoadLottie
                                loadStop={false}
                                loadHeight={300}
                                loadWidth={300}
                                loadTop={0}
                                src={File}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Button
                                variant='contained'
                                color='inherit'
                                onClick={() => setOpen(false)}
                            >
                                Cancel
                            </Button>
                        </Grid>
                        <Grid item xs={6} className="right">
                            <Button
                                variant='contained'
                                color='primary'
                                disabled={btn}
                                onClick={SaveUnBlackList}
                            >
                                {btn ? <CircularProgress size={25} /> : 'Save'}
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Dialog>
        </>
    )
}

export default BlackList