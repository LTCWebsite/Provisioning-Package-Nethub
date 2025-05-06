import { Grid, Skeleton } from '@mui/material'
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import React, { useState } from 'react'
import FtthBundle from './Model/FtthBundle'

function FtthBundleTap() {
    const [open, setOpen] = useState({ ftthbundle: false })
    const [count, setCount] = useState({ ftthcount: 0 })
    const [loading, setLoading] = useState({ ftthbundle: true })

    return (
        <>
            <Grid container>
                <Grid item xs={12} container className='link-box-pointer' onClick={() => setOpen({ ...open, ftthbundle: true })}>
                    <Grid item xs={2}><AddIcCallIcon /></Grid>
                    <Grid item xs={6}>ເບີຜູກກັບ FTTH Bundle</Grid>
                    <Grid item xs={4}>
                        {loading.ftthcount ? <Skeleton animation="wave" /> : <div className={count.ftthbundle > 0 ? 'text-right bage-success' : 'text-right bage-error'}><u>{count.ftthbundle}</u></div>}
                    </Grid>
                </Grid>
            </Grid>
           
            <FtthBundle open={open.ftthbundle} cb={(e) => setOpen({ ...open, ftthbundle: e })} count={(e) => setCount({ ...count, ftthbundle: e })} stop={(e) => setLoading({ ...loading, ftthbundle: e })} />
        </>
    )
}

export default FtthBundleTap