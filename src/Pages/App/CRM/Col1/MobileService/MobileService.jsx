import { Grid, Switch } from '@mui/material'
import React from 'react'
import { useState } from 'react'

function MobileService() {
    const [check, setCheck] = useState({ n_3g: false, n_4g: false, RBT: false })
    return (
        <>
            <Grid item container xs={12} className='link-box-dev'>
                <Grid item xs={4}><div>3G : </div></Grid>
                <Grid item xs={8}><div className='text-right'>
                    <Switch
                        size='small'
                        checked={check.n_3g}
                        onChange={() => setCheck({ ...check, n_3g: !check.n_3g })}
                        color="success"
                    />
                </div></Grid>
            </Grid>
            <Grid item container xs={12} className='link-box-dev'>
                <Grid item xs={4}><div>4G : </div></Grid>
                <Grid item xs={8}><div className='text-right'>
                    <Switch
                        size='small'
                        checked={check.n_4g}
                        onChange={() => setCheck({ ...check, n_4g: !check.n_4g })}
                        color="success"
                    />
                </div></Grid>
            </Grid>
            <Grid item container xs={12} className='link-box-dev'>
                <Grid item xs={4}><div>RBT : </div></Grid>
                <Grid item xs={8}><div className='text-right'>
                    <Switch
                        size='small'
                        checked={check.RBT}
                        onChange={() => setCheck({ ...check, RBT: !check.RBT })}
                        color="success"
                    />
                </div></Grid>
            </Grid>
        </>
    )
}

export default MobileService