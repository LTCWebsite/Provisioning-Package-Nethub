import { Close } from '@mui/icons-material'
import { Dialog, DialogTitle, Grid } from '@mui/material'
import React from 'react'
import MyTable from '../../../../../../Components/MyTable'

function QueryPackage({ open, data, cb }) {
  const columns = [
    { title: 'No', field: 'idx', maxWidth: 50 },
    { title: 'Name', field: 'pacakge_name', minWidth: 200 },
    { title: 'Expire', field: 'expire_time', minWidth: 150 },
    { title: 'Priority', field: 'priority' },
    { title: 'Reserve', field: 'reserve' },
    { title: 'Data Total', field: 'total_data', type: 'numeric', render: row => row?.total_data?.toLocaleString() },
    { title: 'Remaining Data', field: 'remaining_data', type: 'numeric', render: row => row?.remaining_data?.toLocaleString() },
    
  ]
  return (
    <>
      <Dialog
        open={open}
        onClose={() => cb(!open)}
        maxWidth={1000}
      >
        <Grid container>
          <Grid item xs={3}></Grid>
          <Grid item xs={6}>
            <DialogTitle className='center'>ດາຕ້າແພັກເກັດ</DialogTitle>
          </Grid>
          <Grid item xs={3}>
            <div className='right'><Close className='icon' onClick={() => cb(!open)} /></div>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} style={{ width: 1000 }}>
            <MyTable tTitle={"ດາຕ້າແພັກເກັດ"} tData={data} tColumns={columns} />
          </Grid>
        </Grid>
      </Dialog>
    </>
  )
}

export default QueryPackage