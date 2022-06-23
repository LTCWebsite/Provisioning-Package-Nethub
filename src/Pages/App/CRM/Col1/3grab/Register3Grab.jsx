import { Cancel, CheckCircle, } from '@mui/icons-material'
import { Grid, Skeleton } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { AxiosReq } from '../../../../../Components/Axios'
import Can from '@material-ui/icons/Cancel'
// import GetPhoneNumber from '../../../../../Components/GetPhoneNumber'

// const Transition = React.forwardRef(function Transition(props, ref) {
//     return <Slide direction="up" ref={ref} {...props} />;
// });

function Register3Grab() {
    const [data, setData] = useState([])
    const [show, setShow] = useState(false)
    useEffect(() => {
        setShow(false)
        let phone = localStorage.getItem("ONE_PHONE")
        AxiosReq.get("Register3Grab?msisdn=" + phone).then(res => {
            if (res.status === 200) {
                setData(res.data)
                setShow(true)
            }
        })
    }, [])
    return (
        <>
            {!show ?
                <Grid item xs={12}>
                    <Skeleton animation="wave" className="wave" />
                </Grid> :
                <>
                    <Grid item container xs={12} className={data.name !== "None" ? 'link-box-success-click' : 'link-box-error-click'}>
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
                        </Grid>
                    }
                </>}
        </>
    )
}

export default Register3Grab