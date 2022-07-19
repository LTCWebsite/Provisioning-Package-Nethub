import { Close } from '@mui/icons-material';
import { Dialog, DialogTitle, Grid } from '@mui/material';
import moment from 'moment';
import React, { useEffect } from 'react'
import { AxiosReq } from '../../../../../../Components/Axios';
import MyTable from '../../../../../../Components/MyTable';

function HappyCall({ open, cb, done, ifdone, count }) {
    const [happy, setHappy] = React.useState({ st: "", data: [] });
    const columns = [
        { title: "No", field: "id_idx", maxWidth: 50 },
        { title: "MSISDN", field: "msisdn" },
        { title: "ເວລາຢືມ", field: "date_buy", minWidth: 200 },
        { title: "UserID", field: "userId" },
        // { title: 'Chanel', field: 'chanel' },
        { title: "SrvType", field: "srvtype" },
        {
            title: "ເວລາເລີ່ມ",
            field: "startTime",
            minWidth: 200,
            render: (row) => moment(row.startTime).format("DD-MM-YYYY HH:mm:ss"),
        },
        {
            title: "ເວລາສິ້ນສຸດ",
            field: "stopTime",
            minWidth: 200,
            render: (row) => moment(row.stopTime).format("DD-MM-YYYY HH:mm:ss"),
        },
        {
            title: "ຈຳນວນເງິນ",
            field: "balance",
            type: "numeric",
            render: (row) =>
                row.balance > 0 ? row.balance.toLocaleString() : row.balance,
        },
        { title: "ສະຖານະ", field: "resultDesc" },
    ]

    useEffect(() => {
        let phone = localStorage.getItem("ONE_PHONE")
        ifdone(done)
        AxiosReq.get("HappyCallHappyCall?msisdn=" + phone).then((res) => {
            if (res.status === 200) {
                var num = 0
                var update = res.data.map((row) => {
                    row.id_idx = num + 1
                    row.date_buy = moment(row.recordDate).format("DD-MM-YYYY HH:mm:ss")
                    num = num + 1;
                    return row
                });
                setHappy({ st: num, data: update })
                ifdone(!done)
                count(num)
            }
        }).catch((err) => {
            setHappy({ st: "No", data: [] });
        });
    }, [])

    return (
        <>
            <Dialog
                open={open}
                onClose={() => cb(!open)}
                maxWidth={1400}
            >
                <Grid container>
                    <Grid item xs={3}></Grid>
                    <Grid item xs={6}>
                        <DialogTitle className='center'>Happy Call</DialogTitle>
                    </Grid>
                    <Grid item xs={3}>
                        <div className='right'><Close className='icon' onClick={() => cb(!open)} /></div>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12} style={{ width: 1400 }}>
                        <MyTable
                            tTitle={"happy Call"}
                            tData={happy.data}
                            tColumns={columns}
                        />
                    </Grid>
                </Grid>
            </Dialog>
        </>
    )
}

export default HappyCall