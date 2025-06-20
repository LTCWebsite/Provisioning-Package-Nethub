import { Button, Dialog, Grid, IconButton, Slide, isShowSuccess, setIsShowSuccess } from '@mui/material'
import { AllInbox, Close, Done } from '@mui/icons-material'
import { CheckCircle, } from '@mui/icons-material'
import { Skeleton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { AxiosReq } from '../../../../../Components/Axios'
import { AxiosReq2 } from '../../../../../Components/Axios'
import Can from '@material-ui/icons/Cancel'
import cookie from 'js-cookie'
import moment from 'moment'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


function Register3Grab() {

    const [bkData, setBkData] = React.useState({})
    const [isLoading, setIsLoading] = React.useState(false)
    const [isShowSuccess, setIsShowSuccess] = React.useState(false)
    const [data, setData] = useState([])
    const [show, setShow] = useState(false)
    useEffect(() => {
        setShow(false)
        let phone = localStorage.getItem("ONE_PHONE")
        AxiosReq.get("Register3Grab?msisdn=" + phone, { headers: { 'Authorization': 'Bearer ' + cookie.get("ONE_TOKEN") } }).then(res => {
            if (res.status === 200) {
                setData(res.data)
                setShow(true)
            }
        }).catch(er => {
            setShow(true)
            setData({ name: 'None' })
        })
    }, [])

    const toast_success = ({ text }) => toast.success(text);
    const toast_error = ({ text }) => toast.error(text);

    const _onOrderchange = () => {
        setIsLoading(!isLoading);
        const phone = localStorage.getItem("ONE_PHONE");

        AxiosReq2.post("RerunOrderchange?msisdn=" + phone, {}, {
            headers: {
                'Authorization': 'Bearer ' + cookie.get("ONE_TOKEN")
            }
        }).then(res => {
            if (res.status === 200 && res.data?.resultcode == "1000") {
                setBkData(res.data);
                toast_success({ text: res.data?.responMsg || "ສຳເລັດ" });
            } else {
                setBkData(res.data);
                toast_error({ text: res.data?.responMsg || "ບໍ່ສໍາເລັດ" });
            }
        }).catch(err => {
            toast_error({ text: err.message });
        });
    };


    // const _onOrderchange = () => {
    //     //console.log("Ku Test Button clicked U der"); 
    //     setIsLoading(!isLoading)
    //     let phone = localStorage.getItem("ONE_PHONE")
    //     //console.log(phone + ' ' + "Bug bg ber")
    //     AxiosReq2.post("RerunOrderchange?msisdn=" + phone, {}, { headers: { 'Authorization': 'Bearer ' + cookie.get("ONE_TOKEN") } }).then(res => {
    //         if (res.status === 200 && res.data.resultCode === "1000") {
    //             setBkData(res.data);
    //             toast_success({ text: res.data.orderChangeResult.responMsg });
    //         } else {
    //             setBkData(res.data);
    //             toast_error({ text: res.data.orderChangeResult.resultDesc });
    //         }
    //     }).catch(err => {
    //         console.log({ err })
    //     })
    // }

    return (
        <>
            {!show ?
                <Grid item xs={12}>
                    <Skeleton animation="wave" className="wave" />
                </Grid> :
                <>

                    <Grid item container xs={12} className={data.name !== "None" && data.status === "Approved" ? 'link-box-success-click' : 'link-box-error-click'}>
                        <Grid item xs={6}><div>ລົງທະບຽນ 3 ແກັບ : </div></Grid>
                        <Grid item xs={5} className="text-right">
                            <div>{data.name !== "None" ? 'ສໍາເລັດ' : 'ບໍ່ສໍາເລັດ'}</div>
                        </Grid>
                        <Grid item xs={1}>
                            {data.name !== "None" ?
                                <CheckCircle className={'link-icon-error'} /> :
                                <Can className={'link-icon-success'} style={{ paddingTop: 4 }} />}
                        </Grid>
                    </Grid>
                    {data.name !== "None" &&
                        <Grid container item xs={12} className="link-box-dev">
                            <Grid item xs={5}><div>ຊື່ : </div></Grid>
                            <Grid item xs={7}><div className='text-right'>{data.name + " " + data.surname}</div></Grid>
                            <Grid item xs={5}><div>ທີ່ຢູ່ : </div></Grid>
                            <Grid item xs={7}><div className='text-right'>{data.address}</div></Grid>
                            <Grid item xs={5}><div>ວັນທີລົງທະບຽນ : </div></Grid>
                            <Grid item xs={7}><div className='text-right'>{moment(data.autoDate).format("YYYY-MM-DD HH:mm:ss")}</div></Grid>
                            <Grid item xs={5}><div>ສະຖານະເບີ : </div></Grid>
                            <Grid item xs={7}><div className='text-right'>{data.status}</div></Grid>
                            <Button variant="contained" color="error" className='btn-primary' fullWidth style={{ height: 25, marginTop: 5 }} onClick={_onOrderchange}>
                                <a>Rerun 1Grab</a>
                            </Button>
                        </Grid>
                    }
                </>}
            <Dialog
                maxWidth="xl"
                open={isShowSuccess}
                onClose={() => setIsShowSuccess(!isShowSuccess)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                TransitionComponent={Transition}
            >
                <Grid container>
                    <Grid item container xs={12} style={{ width: 600 }}>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={10}>
                            <div className="center">
                                <h1>{bkData.resultDesc}</h1>
                                <h3>{bkData.responMsg}</h3>
                            </div>
                        </Grid>
                        <Grid item xs={1}>
                            <div className="right">
                                <IconButton aria-label="delete" onClick={() => setIsShowSuccess(!isShowSuccess)}>
                                    <Close />
                                </IconButton>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </Dialog>
        </>
    )
}

export default Register3Grab