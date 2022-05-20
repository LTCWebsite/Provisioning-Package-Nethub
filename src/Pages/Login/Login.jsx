import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { TextField } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import logo from '../../Image/logo-2.png'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Alert } from '@material-ui/lab'
import Crypt from '../../Components/Crypt'
import Auth from '../../Components/Auth'
import axios from 'axios'
import Cookies from 'js-cookie'
import { Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom'
import LoadingLottie from '../../Components/LoadingLottie';
import FadeIn from 'react-fade-in';


const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(1, 0, 1),
    },
}));

export default function Login() {
    const classes = useStyles()
    const history = useHistory()
    const [username, setUsername] = React.useState({ text: '', alert: false })
    const [otp, setOtp] = React.useState({ text: '', alert: false })
    const [alert, setAlert] = React.useState({ text: '', use: false, sendOTP: false })
    const [loading, setLoading] = React.useState({ use: false, lottie: false })
    const [btn, setBtn] = React.useState({ otp: false, c_otp: false })

    setTimeout(() => {
        setLoading({ ...loading, lottie: true })
    }, 1000)

    const SendOTP = () => {
        if (username.text === "") {
            setUsername({ ...username, alert: true })
        } else {
            setBtn({ ...btn, otp: true })
            setAlert({ ...alert, use: false, sendOTP: false })
            let sendData = {
                "empIDNo": username.text,
                "device_token": ""
            }
            axios.post("http://172.28.14.48:3001/get-otp", sendData, {
                auth: {
                    username: "isd",
                    password: "#Ltc1qaz2wsx@isd"
                }
            }).then(res => {
                if (res.status === 200 && res.data.status === "true") {
                    setAlert({ ...alert, use: false, text: "", sendOTP: true })
                } else {
                    setAlert({ ...alert, use: true, text: "ບໍ່ສາມາດສົ່ງ OTP" })
                }
                setBtn({ ...btn, otp: false })
            }).catch(err => {
                setBtn({ ...btn, otp: false })
                setAlert({ ...alert, use: true, text: "API OTP error !!" })
            })
        }
    }

    const Login = () => {
        setBtn({ ...btn, c_otp: true })
        if (username.text === "") {
            setUsername({ ...username, alert: true })
            setBtn({ ...btn, c_otp: false })
        } else if (alert.sendOTP === false) {
            setAlert({ ...alert, text: "ກະລຸນາສົ່ງ OTP", use: true })
            setBtn({ ...btn, c_otp: false })
        } else if (otp.text === "") {
            setOtp({ ...otp, alert: true })
            setBtn({ ...btn, c_otp: false })
        } else {
            setAlert({ ...alert, use: false })
            let sendData = {
                "empIDNo": username.text,
                "password": otp.text,
            }
            axios.post("http://172.28.14.48:3001/confirm-otp", sendData, {
                auth: {
                    username: "isd",
                    password: "#Ltc1qaz2wsx@isd"
                }
            }).then(res => {
                if (res.status === 200 && res.data.responseActive === true) {
                    let user_detail = res.data.employeeDetail.empDetail
                    let token = res.data.tokenActive.token
                    Auth.login(() => {
                        Cookies.set("ONE_TOKEN", token, { expires: 8 / 24 })
                        localStorage.setItem("ONE_DETAIL", Crypt({ Type: "crypt", Value: JSON.stringify(user_detail) }))
                        setTimeout(() => {
                            history.push("/app")
                        }, 1000)
                    })
                } else {
                    setAlert({ ...alert, text: "ລະຫັດ OTP ຜິດພາດ !!", use: true })
                    setBtn({ ...btn, c_otp: false })
                }
            }).catch(er => {
                setAlert({ ...alert, use: true, text: "API Confirm OTP error !!" })
                setBtn({ ...btn, c_otp: false })
            })
        }
    }

    const PressBtn = (e) => {
        if (e.code === 'Enter' || e.code === 'NumpadEnter') {
            Login()
        }
    }

    return (
        <div>
            {!loading.lottie ? <LoadingLottie loadStop={loading.lottie} loadHeight={400} loadWidth={300} loadTop={"20vh"} /> : <>
                <div className='login-bg'></div>
                <FadeIn transitionDuration={700}>
                    <Container component="main" maxWidth="sm">
                        <CssBaseline />
                        <div className={classes.paper}>
                            <div className='login-container'>
                                <img src={logo} className="logo-image" alt='logo' />
                                <h1 className="logo-text grey">ເຂົ້າສູ່ລະບົບ</h1>
                                <Grid container>
                                    <Grid item xs={9}>
                                        <TextField
                                            variant="standard"
                                            margin="normal"
                                            fullWidth
                                            label="ລະຫັດພະນັກງານ"
                                            name="username"
                                            placeholder='ປ້ອນລະຫັດພະນັກງານ...'
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onKeyPress={(e) => PressBtn(e)}
                                            value={username.text}
                                            onChange={(e) => {
                                                setUsername({ ...username, text: e.target.value, alert: e.target.value.length > 0 ? false : true })
                                            }}
                                            error={username.alert}
                                            helperText={username.alert && 'ກະລຸນາປ້ອນລະຫັດພະນັກງານ'}
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <div className='btn-otp'>
                                            <Button
                                                variant='outlined'
                                                fullWidth
                                                color='secondary'
                                                onClick={SendOTP}
                                                disabled={btn.otp}
                                            ><b>{btn.otp ? <CircularProgress size={17} color="secondary" /> : 'ຂໍ OTP'}</b></Button>
                                        </div>
                                    </Grid>
                                </Grid>
                                <TextField
                                    fullWidth
                                    variant='standard'
                                    margin='normal'
                                    label="ລະຫັດ OTP"
                                    placeholder='ປ້ອນລະຫັດ OTP'
                                    onKeyUp={(e) => PressBtn(e)}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    disabled={
                                        !alert.sendOTP
                                    }
                                    value={otp.text}
                                    onChange={(e) => {
                                        setOtp({ ...otp, text: e.target.value, alert: e.target.value.length > 0 ? false : true })
                                    }}
                                    error={otp.alert}
                                    helperText={otp.alert && 'ກະລຸນາປ້ອນລະຫັດ OTP'}
                                />

                                <Button
                                    style={{ marginTop: 20 }}
                                    fullWidth
                                    variant="contained"
                                    color="secondary"
                                    className="btn-danger btn-login"
                                    disabled={btn.c_otp}
                                    onClick={Login}
                                >
                                    {btn.c_otp ? <>ກໍາລັງກວດສອບ&nbsp;&nbsp;<CircularProgress /></> : "ເຂົ້າສູ່ລະບົບ"}
                                </Button>
                                {alert.use && <Alert variant="outlined" style={{ marginTop: 20 }} severity="error">
                                    {alert.text}
                                </Alert>}
                            </div>
                        </div>
                    </Container>
                </FadeIn>
            </>}
        </div>
    );
}