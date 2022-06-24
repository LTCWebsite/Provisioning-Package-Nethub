import { Grid } from '@mui/material'
import React from 'react'
import Banking from './Col2/Banking/Banking'
import BillQuery from './Col2/BillQuery/BillQuery'
import Packages from './Col2/Packge/Packages'

function Col2() {
  return (
    <>
      <Grid container>
        <Grid container item xs={12} md={12} lg={12} className="box-crm">
          <Grid item xs={12}>
            <h2 className='blue'>Bill Query</h2>

            <BillQuery />

          </Grid>
        </Grid>
        <Grid container item xs={12} md={12} lg={6} className="box-crm">
          <Grid item xs={12}>
            <h2 className='blue'>Package</h2>

            <Packages />

          </Grid>
        </Grid>
        <Grid container item xs={12} md={12} lg={6} className="box-crm">
          <Grid item xs={12}>
            <h2 className='blue'>Banking</h2>

            <Banking />

            
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default Col2