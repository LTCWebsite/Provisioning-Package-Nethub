import { Grid } from '@mui/material'
import { Skeleton } from '@mui/material'
import React from 'react'
import 'react-toastify/dist/ReactToastify.css';


function CusFtthInfo({ data, show }) {
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