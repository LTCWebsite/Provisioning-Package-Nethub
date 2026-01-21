import { Grid, Skeleton } from '@mui/material'
import React from 'react'
import 'react-toastify/dist/ReactToastify.css';


function FtthBundleMsisdn({ data, show }) {
    return (
        <>
            {!show ?
                <Grid item xs={12}>
                    <Skeleton animation="wave" className="wave" />
                </Grid> :
                <>

                    <Grid item xs={12} container >
                        {[0, 1, 2, 3, 4].map((index) => (
                            <Grid item container xs={12} className='link-box' key={index}>
                                <Grid item xs={6}><div>No.{index + 1}</div></Grid>
                                <Grid item xs={6}><div className='text-right'>{data?.bundle_numbers?.[index]?.number || "null"}</div></Grid>
                            </Grid>
                        ))}
                    </Grid>

                </>}
        </>
    )
}

export default FtthBundleMsisdn;