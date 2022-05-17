import { Button, Dialog, Grid, IconButton, Slide } from '@material-ui/core'
import { Close } from '@mui/icons-material';
import React from 'react'
import NavLoad from '../Components/NavLoad'
import MyTable from '../../../Pages/MiniCRM/Table/Table';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

function Package({ allData: pk }) {
    const [stop, setStop] = React.useState(false)
    const [open, setOpen] = React.useState({ pk: false })
    React.useEffect(() => {
        setTimeout(() => {
            setStop(true)
        }, 300)
    }, [])
    const columns = [
        { title: 'No', field: 'id_idx', maxWidth: 50, sorting: false },
        { title: 'MSISDN', field: 'msisdn', maxWidth: 140, sorting: false },
        { title: 'ຊື່ແພັກເກັດ', field: 'counterName', sorting: false },
        { title: 'ເລີ່ມວັນທີ', field: 'date_start', minWidth: 200 },
        { title: 'ໝົດອາຍຸ', field: 'date_expire', minWidth: 200 },
        { title: 'Priority', field: 'priority' },
        { title: 'Remaining', field: 'remaining', render: row => parseInt(row.remaining).toLocaleString() },
    ]
    return (
        <>
            <NavLoad height={170} use={!stop} />
            <Grid item xs={8}><div><b>ຊື່ແພັກເກັດ</b></div></Grid>
            <Grid item xs={4}><span>Remaining</span></Grid>
            {pk?.map((row, idx) => {
                return (
                    <Grid container item xs={12} key={idx}>
                        <Grid item xs={8}><b>{row.counterName}</b></Grid>
                        <Grid item xs={4}><span>{parseInt(row.remaining).toLocaleString()}</span></Grid>
                    </Grid>
                )
            })}
            <Grid item xs={12}>
                <div className='center'>
                    <Button
                        variant='contained'
                        fullWidth
                        size='small'
                        onClick={() => setOpen({ pk: true })}
                    >ເບີ່ງລາຍລະອຽດເພີ່ມເຕີມ</Button>
                </div>
                <div className='hr-1'></div>
            </Grid>

            <Dialog
                maxWidth="xl"
                open={open.pk}
                onClose={() => setOpen({ ...open, pk: false })}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                TransitionComponent={Transition}
            >
                <Grid container>
                    <Grid item container xs={12}>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={10}><div className="center"><h1>ດາຕ້າແພັກເກັດ</h1></div></Grid>
                        <Grid item xs={1}>
                            <div className="right">
                                <IconButton aria-label="delete" onClick={() => setOpen({ ...open, pk: false })}>
                                    <Close />
                                </IconButton>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <MyTable tTitle={"Package"} tData={pk} tColumns={columns} />
                        </Grid>
                    </Grid>
                </Grid>
            </Dialog>
        </>
    )
}

export default Package
