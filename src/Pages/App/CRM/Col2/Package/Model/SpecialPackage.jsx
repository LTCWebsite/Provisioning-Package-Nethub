import { Close } from '@mui/icons-material';
import { Dialog, Grid, Slide } from '@mui/material'
import moment from 'moment';
import React, { useEffect } from 'react'
import { AxiosReq } from '../../../../../../Components/Axios';
import MyTable from '../../../../../../Components/MyTable';
import cookie from 'js-cookie'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function SpecialPackage({ open, cb, done, ifdone, count }) {
    const [sp, setSp] = React.useState({ data: [] })

    const columns_sp = [
        { title: "No", field: "id_idx", maxWidth: 50 },
        { title: "PromotionID", field: "prmtId", maxWidth: 200 },
        { title: "ເບີເລີ່ມຕົ້ນ", field: "start", maxWidth: 150 },
        { title: "ເບີສິ້ນສຸດ", field: "stop", maxWidth: 150 },
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
        { title: "Province", field: "province" },
    ];

    useEffect(() => {
        ifdone(done)
        let phone = localStorage.getItem("ONE_PHONE")
        AxiosReq.get("api/SpecialPackage?msisdn=" + phone,{ headers: { 'Authorization': 'Bearer ' + cookie.get("ONE_TOKEN") } }).then((res) => {
            if (res.status === 200) {
                var num = 0;
                var update = res.data.map((row) => {
                    row.id_idx = num + 1;
                    num = num + 1;
                    return row;
                })
                ifdone(!done)
                count(num)
                setSp({ ...sp, data: update });
            }
        }).catch((err) => {
            setSp({ ...sp, data: [] });
        })
    }, [])

    return (
        <>
            <Dialog
                maxWidth="lg"
                open={open}
                onClose={() => cb(!open)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                TransitionComponent={Transition}
            >
                <Grid container>
                    <Grid item container xs={12}>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={10}>
                            <div className="center">
                                <h1>Special Package</h1>
                            </div>
                        </Grid>
                        <Grid item xs={1}>
                            <div className='right'><Close className='icon' onClick={() => cb(!open)} /></div>
                        </Grid>
                        <Grid item md={2} lg={3} xl={4}></Grid>
                        <Grid item xs={12} className="center">
                            <MyTable
                                tTitle={"Special Package"}
                                tData={sp.data}
                                tColumns={columns_sp}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Dialog>
        </>
    )
}

export default SpecialPackage