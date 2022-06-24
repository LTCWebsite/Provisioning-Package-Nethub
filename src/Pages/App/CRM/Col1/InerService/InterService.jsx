import { Grid, Switch } from '@mui/material'
import React from 'react'
import { useState } from 'react'

function InterService() {
    const [check, setCheck] = useState({ voice: true, data: true })
    return (
        <>
            <Grid item container xs={12} className='link-box-dev'>
                <Grid item xs={4}><div>Voice IR : </div></Grid>
                <Grid item xs={8}><div className='text-right'>
                    <Switch
                        size='small'
                        checked={check.voice}
                        onChange={() => setCheck({ ...check, voice: !check.voice })}
                        color="success"
                    />
                </div></Grid>
            </Grid>
            <Grid item container xs={12} className='link-box-dev'>
                <Grid item xs={4}><div>Data IR : </div></Grid>
                <Grid item xs={8}><div className='text-right'>
                    <Switch
                        size='small'
                        checked={check.data}
                        onChange={() => setCheck({ ...check, data: !check.data })}
                        color="success"
                    />
                </div></Grid>
            </Grid>
        </>
    )
}

export default InterService