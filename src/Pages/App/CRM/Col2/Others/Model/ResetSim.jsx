import { Close, WarningAmber } from '@mui/icons-material';
import { Button, Dialog, Grid, IconButton, Slide } from '@mui/material';
import React, { useEffect } from 'react'
import { AxiosReq } from '../../../../../../Components/Axios'
import { AlertError, AlertSuccess } from '../../../../../../Components/Toast'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function ResetSim({ show, cb }) {
    const [reason, setReason] = React.useState({ text: "", alert: false });
    const [open, setOpen] = React.useState({
        happy: false,
        reset: false,
        sp: false,
        sms_ticket: false,
    });
    const [ph, setPh] = React.useState("");
    useEffect(() => {
        let phone = localStorage.getItem("ONE_PHONE")
        setPh(phone)
    }, [])
    const SaveReset = () => {
        if (reason.text === "") {
            setReason({ ...reason, alert: true });
        } else {
            AxiosReq.post(
                "ResetSim?msisdn=" + ph,
                {},
                // { headers: { Authorization: "Bearer " + Cookies.get("one_session") } }
            ).then((res) => {
                if (res.status === 200) {
                    var respone =
                        res.data["SOAP-ENV:Envelope"]["SOAP-ENV:Body"][
                        "SND_CANCELCResponse"
                        ]["Result"];
                    // console.log(respone)
                    if (respone.ResultCode === "0") {
                        AlertSuccess(respone.ResultDesc);
                    } else {
                        AlertError(respone.ResultDesc);
                    }
                    setOpen({ ...open, reset: false });
                    setReason({ ...reason, text: "" });
                    // Doing({
                    //     msisdn: Crypt({
                    //         type: "decrypt",
                    //         value: localStorage.getItem("input-phone"),
                    //     }).text,
                    //     username: Crypt({
                    //         type: "decrypt",
                    //         value: localStorage.getItem("one_info"),
                    //     }).username,
                    //     detail: "reset sim ",
                    //     info: reason.text,
                    //     resualt: respone.ResultDesc,
                    // })
                }
            });
        }
    };

    return (
        <>
            <Dialog
                open={show}
                onClose={() => cb(!show)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                TransitionComponent={Transition}
            >
                <Grid container>
                    <Grid
                        item
                        container
                        xs={12}
                        style={{ paddingLeft: 50, paddingRight: 50 }}
                    >
                        <Grid item xs={12}>
                            <div className="center">
                                <h1>ຢືນຢັນການນຳໃຊ້</h1>
                            </div>
                        </Grid>
                        <Grid item md={2} lg={3} xl={4}></Grid>
                        <Grid item xs={12} className="center">
                            <div className="center">
                                <WarningAmber style={{ fontSize: 150, color: "#E74A3B" }} />
                            </div>
                            <h2>ຕ້ອງການ Reset Sim ( {ph} ) ?</h2>
                            <textarea
                                style={{ width: "90%", padding: "5px 10px", fontSize: 16 }}
                                placeholder="ເຫດຜົນ"
                                onChange={(e) => {
                                    setReason({
                                        ...reason,
                                        text: e.target.value,
                                        alert: e.target.value.length > 0 ? false : true,
                                    });
                                }}
                            ></textarea>
                            {reason.alert && (
                                <div className="red left" style={{ marginLeft: 15 }}>
                                    ກະລຸນາປ້ອນເຫດຜົນ
                                </div>
                            )}
                        </Grid>
                        <Grid
                            item
                            container
                            xs={12}
                            style={{ paddingBottom: 30, marginTop: 20, paddingLeft: 13, paddingRight: 13 }}
                        >
                            <Grid item xs={4}>
                                <div className="center">
                                    <Button
                                        color="primary"
                                        fullWidth
                                        onClick={() => cb(!show)}
                                    >
                                        No
                                    </Button>
                                </div>
                            </Grid>
                            <Grid item xs={4}></Grid>
                            <Grid item xs={4}>
                                <div className="center">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        className='btn-primary'
                                        onClick={SaveReset}
                                    >
                                        Yes
                                    </Button>
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Dialog>
        </>
    )
}

export default ResetSim