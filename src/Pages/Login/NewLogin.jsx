import React, { useState } from 'react';
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
import Cookies from 'js-cookie'
import { useHistory } from 'react-router-dom'
import LoadingLottie from '../../Components/LoadingLottie';
import FadeIn from 'react-fade-in';
import { AxiosAPI, AxiosReq } from '../../Components/Axios';


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

export default function NewLogin() {
    const classes = useStyles()
    const history = useHistory()

    const [data, setdata] = useState({ username: '', password: '' })
    const [dalert, setdalert] = useState({ username: false, password: false })

    const [alert, setAlert] = React.useState({ text: '', use: false })

    const [loading, setLoading] = React.useState({ use: false, lottie: false })
    const [btn, setBtn] = React.useState(false)
    const [dbtn, setdbtn] = useState(false)

    setTimeout(() => {
        setLoading({ ...loading, lottie: true })
    }, 1000)

    const Login = () => {
        setBtn(true)
        setdbtn(true)
        let count = 0
        Object.keys(data).forEach(key => {
            if (data[key] === "") {
                count = count + 1
            }
        })

        if (count === 0) {
            setAlert({ ...alert, use: false })
            AxiosReq.post("Authenticate", data).then(res => {
                if (res.status === 200) {
                    setdbtn(false)
                    let user_detail = res.data?.user[0]
                    let token = res.data?.token
                    let sendData = {
                        staff_id: data.username,
                        token: token
                    }
                    loadTopMenu(sendData, (user_role) => {
                        Auth.login(() => {
                            Cookies.set("ONE_TOKEN", token, { expires: 8 / 24 })
                            localStorage.setItem("ONE_DETAIL", Crypt({ Type: "crypt", Value: JSON.stringify(user_detail) }))
                            localStorage.setItem("ONE_USER_ROLE", Crypt({ Type: "crypt", Value: JSON.stringify(user_role) }))
                            setTimeout(() => {
                                history.push("/app")
                            }, 1000)
                        })
                    })
                }
            }).catch(er => {
                setAlert({ text: "ລະຫັດພະນັກງານ ຫຼື ລະຫັດຜ່ານ ຜິດພາດ", use: true })
                setdbtn(false)
            })
        } else {
            setdbtn(false)
        }
    }

    const loadTopMenu = (sendData, cb) => {
        AxiosAPI.post("get-user-detail", sendData).then(res => {
            if (res.status === 200) {
                cb(res.data)
            }
        })
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
                                <div style={{ marginTop: 20 }}>
                                    <TextField
                                        fullWidth
                                        variant='standard'
                                        margin='normal'
                                        label="ລະຫັດພະນັກງານ"
                                        placeholder='ລະຫັດພະນັກງານ'
                                        onKeyUp={(e) => PressBtn(e)}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        value={data.username}
                                        onChange={(e) => {
                                            setdata({ ...data, username: e.target.value })
                                            setdalert({ ...dalert, username: e.target.value.length > 0 ? false : true })
                                        }}
                                        error={dalert.username}
                                    />
                                </div>
                                {dalert.username || (data.username === "" && btn) ? <div className='err'>ກະລຸນາປ້ອນລະຫັດພະນັກງານ</div> : null}
                                <div style={{ marginTop: 20 }}>
                                    <TextField
                                        fullWidth
                                        variant='standard'
                                        margin='normal'
                                        label="ລະຫັດຜ່ານ"
                                        placeholder='ລະຫັດຜ່ານ'
                                        onKeyUp={(e) => PressBtn(e)}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        type="password"
                                        value={data.password}
                                        onChange={(e) => {
                                            setdata({ ...data, password: e.target.value })
                                            setdalert({ ...dalert, password: e.target.value.length > 0 ? false : true })
                                        }}
                                        error={dalert.password}
                                    />
                                </div>
                                {dalert.password || (data.password === "" && btn) ? <div className='err'>ກະລຸນາປ້ອນລະຫັດຜ່ານ</div> : null}

                                <Button
                                    style={{ marginTop: 20 }}
                                    fullWidth
                                    variant="contained"
                                    color="secondary"
                                    className="btn-danger btn-login"
                                    onClick={Login}
                                    disabled={dbtn}
                                >
                                    {dbtn ? <>ກໍາລັງກວດສອບ&nbsp;&nbsp;<CircularProgress /></> : "ເຂົ້າສູ່ລະບົບ"}
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