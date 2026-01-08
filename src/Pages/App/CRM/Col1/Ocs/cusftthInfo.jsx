import { Button, Dialog, Grid, IconButton, Slide, isShowSuccess, setIsShowSuccess } from '@mui/material'
import { AllInbox, Close, Done } from '@mui/icons-material'
import { CheckCircle, } from '@mui/icons-material'
import { Skeleton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { AxiosFtth, AxiosReq } from '../../../../../Components/Axios'
import moment from 'moment'
import 'react-toastify/dist/ReactToastify.css';


function CusFtthInfo() {

    const [data, setData] = useState([])
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(false)
        AxiosFtth.post("api/ftth",
            {
                "msisdn": localStorage.getItem("ONE_PHONE"),
                "bussinessCode": "onescreen",
                "transactionId": "ftth1234",
                "username": "APISUPERAPP",
                "password": "sQQF82VgLz8YOqcDrQhrkteKEQdoPlzQAiYqmtbeChwYaF2eqTcdHw/0r+U+lXM4"
            },
        ).then(res => {
            if (res.status === 200) {
                setData(res.data.customer_info)
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

                    <Grid item container xs={12} className={'link-box-blue-click'}>
                        <Grid item xs={6}><div>ລົງທະບຽນ FTTH  </div></Grid>

                    </Grid>
                    <Grid container item xs={12} className="link-box-dev">
                        <Grid item xs={5}><div>ຊື່ : </div></Grid>
                        <Grid item xs={7}><div className='text-right'>{data.individualInfo?.
                            FirstName}</div></Grid>
                        <Grid item xs={5}><div>ທີ່ຢູ່ : </div></Grid>
                        <Grid item xs={7}><div className='text-right'>
                            {`${data?.addressInfo?.Address9 + ',' + data.addressInfo.Address10 + ',' + data.addressInfo.Address11}
                        `}</div></Grid>
                        <Grid item xs={5}><div>ວັນທີລົງທະບຽນ : </div></Grid>
                        <Grid item xs={7}><div className='text-right'>{data.activeDate}</div></Grid>
                        <Grid item xs={5}><div>ສະຖານະເບີ : </div></Grid>
                        <Grid item xs={7}><div className='text-right'>{data.status}</div></Grid>
                    </Grid>

                </>}
        </>
    )
}

export default CusFtthInfo