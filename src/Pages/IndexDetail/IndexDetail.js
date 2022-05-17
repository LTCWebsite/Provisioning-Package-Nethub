import React from 'react'
import { Img } from 'react-image'
import { Grid } from '@material-ui/core'
import logo from '../../Image/ltc_tower.png'
import LoadingLottie from '../Components/LoadingLottie'

function IndexDetail() {
    const [stop, setStop] = React.useState(false)
    React.useEffect(() => {
        setTimeout(() => {
            setStop(true)
        }, 500)
    }, [])
    return (
        <>
            {!stop ? <LoadingLottie loadStop={stop} height={100} /> :
                <Grid item xs={12}>
                    <div className="center">
                        <Img src={logo} width={500} style={{ paddingTop: 100 }} />
                        <h1 className="grey">ກະລຸນາປ້ອນເບີໂທ ເພື່ອຄົ້ນຫາ !!</h1>
                    </div>
                </Grid>}
        </>
    )
}

export default IndexDetail
