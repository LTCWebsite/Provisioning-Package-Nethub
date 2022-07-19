import * as React from 'react';
import { Grid } from '@mui/material';
import { Paid } from '@mui/icons-material';

export default function DateBillQuery() {
    const [value, setValue] = React.useState(new Date());

    const handleChange = (newValue) => {
        setValue(newValue);
    }
    const list = [
        { name: 'RBT', amount: 10000000 },
        { name: 'VAS', amount: 1000 },
        { name: 'DATA', amount: 1000 },
        { name: 'Package', amount: 1000 },
        { name: 'Call', amount: 1000 },
        { name: 'Transfer', amount: 1000 },
        { name: 'SMS', amount: 1000 },
        { name: 'Topup', amount: 1000 },
    ]

    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    <div className='center'>
                        <h4> * ຂໍ້ມູນສະເພາະໄລຍະເວລາ 3 ເດືອນຍ້ອນຫລັງ * </h4>
                    </div>
                </Grid>
                {list.map((row, idx) => {
                    return (
                        <Grid container item xs={6} lg={4} className="link-box-dev-amount" key={idx}>

                            <Grid item xs={2} className="center"><div><Paid /></div></Grid>
                            <Grid item xs={4}><div>{row.name} : </div></Grid>
                            <Grid item xs={6} className="text-right"><div>{row.amount.toLocaleString()}</div></Grid>

                        </Grid>
                    )
                })}
            </Grid>
        </>
    )
}
