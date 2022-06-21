import { PhoneIphone } from '@material-ui/icons'
import { CheckCircle, PersonOutline } from '@mui/icons-material'
import { Grid, Switch } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { AxiosReq } from '../../../Components/Axios'
import { MyCrypt } from '../../../Components/MyCrypt'
import Balance from './Col1/Balance'
import LifeCycle from './Col1/LifeCycle'
import Network from './Col1/Network'

function Col1() {
    const [check, setCheck] = useState({ n_3g: false, n_4g: false })
    
    return (
        <>
            <Grid container>
                <Grid item xs={12} md={12} lg={6} className="box-crm">
                    <Grid item xs={12}><h2 className='blue'>Info</h2></Grid>
                    <Grid item container xs={12} className='link-box'>
                        <Grid item xs={4}><PhoneIphone /></Grid>
                        <Grid item xs={8}><div className='text-right'>2059944454</div></Grid>
                    </Grid>
                    <Grid item container xs={12} className='link-box'>
                        <Grid item xs={4}><PersonOutline /></Grid>
                        <Grid item xs={8}><div className='text-right'>Mr. Joe</div></Grid>
                    </Grid>
                    <Grid item container xs={12} className='link-box-success'>
                        <Grid item xs={6}><div>BSS status : </div></Grid>
                        <Grid item xs={5} className="text-right"><div>Active</div></Grid>
                        <Grid item xs={1}><CheckCircle className='link-icon' /></Grid>
                    </Grid>
                    <Grid item container xs={12} className='link-box-success'>
                        <Grid item xs={6}><div>OCS status : </div></Grid>
                        <Grid item xs={5} className="text-right"><div>Active</div></Grid>
                        <Grid item xs={1}><CheckCircle className='link-icon' /></Grid>
                    </Grid>
                    <Grid item container xs={12} className='link-box-success'>
                        <Grid item xs={6}><div>Network status : </div></Grid>
                        <Grid item xs={5} className="text-right"><div>Online</div></Grid>
                        <Grid item xs={1}><CheckCircle className='link-icon' /></Grid>
                    </Grid>
                    <Grid item container xs={12} className='link-box-success'>
                        <Grid item xs={6}><div>3Grab status : </div></Grid>
                        <Grid item xs={5} className="text-right"><div>Registerd</div></Grid>
                        <Grid item xs={1}><CheckCircle className='link-icon' /></Grid>
                    </Grid>

                    <Grid item container xs={12} className='link-box'>
                        <Grid item xs={6}><div>Product ID OCS : </div></Grid>
                        <Grid item xs={6}><div className='text-right'>30000012</div></Grid>
                    </Grid>

                    <Balance />

                    <Network />

                    <LifeCycle />

                </Grid>

                <Grid item xs={12} md={12} lg={6} className="box-crm">
                    <h2 className='blue'>Life Cycle</h2>
                    <Grid item container xs={12} className='link-box'>
                        <Grid item xs={4}><PhoneIphone /></Grid>
                        <Grid item xs={8}><div className='text-right'>2059944454</div></Grid>
                    </Grid>
                    <Grid item container xs={12} className='link-box'>
                        <Grid item xs={4}><PersonOutline /></Grid>
                        <Grid item xs={8}><div className='text-right'>Mr. Joe</div></Grid>
                    </Grid>
                    <Grid item container xs={12} className='link-box-success'>
                        <Grid item xs={6}><div>BSS status : </div></Grid>
                        <Grid item xs={5} className="text-right"><div>Active</div></Grid>
                        <Grid item xs={1}><CheckCircle className='link-icon' /></Grid>
                    </Grid>
                    <Grid item container xs={12} className='link-box-success'>
                        <Grid item xs={6}><div>OCS status : </div></Grid>
                        <Grid item xs={5} className="text-right"><div>Active</div></Grid>
                        <Grid item xs={1}><CheckCircle className='link-icon' /></Grid>
                    </Grid>
                    <Grid item container xs={12} className='link-box-success'>
                        <Grid item xs={6}><div>Network status : </div></Grid>
                        <Grid item xs={5} className="text-right"><div>Online</div></Grid>
                        <Grid item xs={1}><CheckCircle className='link-icon' /></Grid>
                    </Grid>
                    <Grid item container xs={12} className='link-box-success'>
                        <Grid item xs={6}><div>3Grab status : </div></Grid>
                        <Grid item xs={5} className="text-right"><div>Registerd</div></Grid>
                        <Grid item xs={1}><CheckCircle className='link-icon' /></Grid>
                    </Grid>

                    <Grid item container xs={12} className='link-box'>
                        <Grid item xs={6}><div>Product ID OCS : </div></Grid>
                        <Grid item xs={6}><div className='text-right'>30000012</div></Grid>
                    </Grid>

                    <Grid item container xs={12} className='link-box-success'>
                        <Grid item xs={6}><div className='text-left'>3G : </div></Grid>
                        <Grid item xs={6} className="text-right"><div>
                            <Switch
                                size='small'
                                checked={check.n_3g}
                                onChange={() => setCheck({ ...check, n_3g: !check.n_3g })}
                                color="success"
                            />
                        </div></Grid>
                    </Grid>
                </Grid>

            </Grid>
        </>
    )
}

export default Col1