import { Grid } from '@mui/material'
import React from 'react'
import Col1 from './Col1'
import Col2 from './Col2'

function CRM() {
  return (
    <>
      <Grid container>
        <Grid item xs={12} md={6}>
          <Col1 />
        </Grid>
        <Grid item xs={12} md={6}>
          <Col2 />
        </Grid>
      </Grid>
    </>
  )
}

export default CRM