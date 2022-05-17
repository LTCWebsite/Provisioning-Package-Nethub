import React from 'react'
import { Grid } from '@mui/material';
import NavLoad from '../Components/NavLoad'

function Register3Gab({ allData }) {
    const [stop, setStop] = React.useState(false)
    const [data, setData] = React.useState([])
    const [card, setCard] = React.useState([])
    React.useEffect(() => {
        if(allData.st !== 'loading'){
            setTimeout(() => {
                setData(allData.data)
                setCard(allData.use)
                setStop(true)
            }, 300)
        }
    }, [])
    return (
        <>
            <NavLoad height={230} use={!stop} />
            <Grid container item xs={12} className="text">
                <Grid item xs={5}><div><b>ຊື່:</b></div></Grid>
                <Grid item xs={7}><div>{data.name !== 'None' ? <>{data.name} {data.surname}</> : '-'}</div></Grid>
                <Grid item xs={5}><div><b>ເພດ:</b></div></Grid>
                <Grid item xs={7}><div>{data.gender !== 'None' ? <>{data.gender === 'M' ? 'ຊາຍ' : data.gender === 'F' ? 'ຍິງ' : ''}</> : '-'}</div></Grid>
                <Grid item xs={5}><div><b>ທີ່ຢູ່:</b></div></Grid>
                <Grid item xs={7}><div>{data.address !== 'None' ? <>{data.address}</> : '-'}</div></Grid>
                <Grid item xs={5}><div><b>ເບີໂທ:</b></div></Grid>
                <Grid item xs={7}><div>{data.phone !== 'None' ? <>{data.phone}</> : '-'}</div></Grid>
                <Grid item xs={5}><div><b>ແຂວງ:</b></div></Grid>
                <Grid item xs={7}><div>{data.province !== 'None' ? <>{data.province}</> : '-'}</div></Grid>
                <Grid item xs={5}><div><b>ວັນເກີດ:</b></div></Grid>
                <Grid item xs={7}><div>{data.birthday !== 'None' ? <>{data.birthday}</> : '-'}</div></Grid>
                {data !== [] ? <><Grid item xs={5}><div><b>ລົງທະບຽນດ້ວຍ:</b></div></Grid>
                    <Grid item xs={7}>
                        <div>
                            {card.re}
                        </div>
                    </Grid>
                    <Grid item xs={5}><div><b>ໝາຍເລກ:</b></div></Grid>
                    <Grid item xs={7}>
                        <div>
                            {card.number}
                        </div>
                    </Grid></> : ''}
                <Grid item xs={12}>
                    <div className="hr-1"></div>
                </Grid>
            </Grid>
        </>
    )
}

export default Register3Gab
