import { Grid } from '@mui/material'
import React from 'react'
import logo from '../../Image/ltc_tower.png'
import TopItem from './TopItem/TopItem'

function Blank() {
    return (
        <Grid container>
            <TopItem />
            <Grid item xs={12}>
                <div className="center">
                    <img src={logo} width={500} alt="logo" style={{ paddingTop: 100 }} />
                    <h1 className="grey">ກະລຸນາປ້ອນເບີໂທ ເພື່ອຄົ້ນຫາ !!</h1>
                </div>
            </Grid>
        </Grid>
    )
}

export default Blank
