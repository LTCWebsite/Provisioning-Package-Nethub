import * as React from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { Button, Grid } from '@mui/material';
import { Paid, Search } from '@mui/icons-material';

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
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack>
                    <Grid container spacing={2}>
                        <Grid item xs={5}>
                            <DesktopDatePicker
                                label="Date Start"
                                inputFormat="dd-MM-yyyy"
                                className='date-sm'
                                value={value}
                                onChange={handleChange}
                                renderInput={(params) => <TextField fullWidth variant='standard' {...params} />}
                            />
                        </Grid>
                        <Grid item xs={5}>
                            <DesktopDatePicker
                                label="Date End"
                                inputFormat="dd-MM-yyyy"
                                className='date-sm'
                                value={value}
                                onChange={handleChange}
                                renderInput={(params) => <TextField fullWidth variant='standard' {...params} />}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <Button
                                style={{ marginTop: 10 }}
                                fullWidth
                                variant='contained'
                            >
                                <Search />
                            </Button>
                        </Grid>
                    </Grid>
                </Stack>
            </LocalizationProvider>
            <Grid container>
                {list.map((row, idx) => {
                    return (
                        <Grid container item xs={6} lg={4} className="link-box-dev-amount next" key={idx}>

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
