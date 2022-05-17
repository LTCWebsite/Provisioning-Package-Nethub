import { Grid } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import React from 'react'
import MServiceTab from './MServiceTab'

function MService() {
    return (
        <div>
            <Grid container>
                <Grid item md={2} lg={3} xl={4}></Grid>
                <Grid item xs={12} md={8} lg={6} xl={4}>
                    <Alert variant="outlined" severity="info" style={{ marginTop: 10 }}>
                        ກໍລະນີທີ່ຕ້ອງການສະແດງຂໍ້ມູນຫຼາຍກ່ວາ 10 ລາຍການ ໃຫ້ຄຼິກໄປທີ່ More Detail ຢູ່ດ້ານລຸ່ມ
                    </Alert>
                </Grid>
            </Grid>
            <MServiceTab />
        </div>
    )
}

export default MService
