import { Grid } from '@mui/material'
import React from 'react'
import logo from '../../../Image/ltc_tower.png'
import FadeIn from 'react-fade-in/lib/FadeIn'

function Home() {
    return (
        <FadeIn transitionDuration={500}>
            <Grid container>
                <Grid item xs={12}>
                    <div className="center">
                        <img src={logo} width={600} alt="logo" style={{ paddingTop: 100 }} />
                        <h1 className="grey">ກະລຸນາປ້ອນເບີໂທ ເພື່ອຄົ້ນຫາ !!</h1>
                    </div>
                </Grid>
            </Grid>
        </FadeIn>
    )
}

export default Home