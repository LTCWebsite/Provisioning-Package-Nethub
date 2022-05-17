import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import logo from '../../Image/logo-2.png'
import { Img } from 'react-image'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useHistory } from 'react-router-dom'
import { Alert } from '@material-ui/lab'
import Crypt from '../Components/Crypt'
import Auth from '../Components/Auth'
import axios from 'axios'
import cookie from 'js-cookie'
import { Grid, Card, CardContent, InputAdornment, IconButton, FormControl, InputLabel, Input } from '@material-ui/core';
import { MusicNote, EventNote, MeetingRoom, ControlPointDuplicate, BarChart, Poll, Games, SportsEsports, VideogameAsset, Visibility, VisibilityOff } from '@material-ui/icons'


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
    const history = useHistory()
    const classes = useStyles()
    const [err, setErr] = React.useState(false)
    const [showPassword, setShowPassword] = React.useState(false)
    const [username, setUsername] = React.useState({ text: '', alert: false })
    const [password, setPassword] = React.useState({ text: '', alert: false })

    const links = [
        { link: "http://10.0.6.26:8180/cs", name: "RBT", icon: <MusicNote className="danger-link" /> },
        // { link: "http://172.28.12.62/sipcc", name: "ບັນທຶກ ການຂາຍ RBT", icon: <MenuBook className="danger-link" /> },
        { link: "http://10.30.3.14/maximo", name: "Trouble Ticket", icon: <EventNote className="danger-link" /> },
        // { link: "http://www.sod.laotel.com/alarm_dashboard/V2/index.html", name: "SOD", icon: <Map className="danger-link" /> },
        { link: "http://172.28.16.100:5000/", name: "SignONE", icon: <MeetingRoom className="danger-link" /> },
        { link: "http://10.30.6.98:3434/", name: "M-Topup Plus", icon: <ControlPointDuplicate className="danger-link" /> },
        { link: "https://online.codapayments.com/operator/", name: "Coda Payment", icon: <Games className="danger-link" /> },
        { link: "http://platform.linkit360.ru/main/login", name: "Game LinkIT360", icon: <SportsEsports className="danger-link" /> },
        { link: "https://secure.gameloft.com/supporttool/", name: "Gameloft", icon: <VideogameAsset className="danger-link" /> },
        { link: "http://10.30.6.98:9798/", name: "Monitor Topup", icon: <BarChart className="danger-link" /> },
        { link: "http://10.30.6.98:5152/", name: "FTTH Bundle", icon: <Poll className="danger-link" /> },
    ]
    const Login = () => {
        setLoading(true)
        setErr(false)
        if (username.text === '' || username.alert || password.text === '' || password.alert) {
            if (username.text === '') {
                setUsername({ ...username, alert: true })
            }
            if (password.text === '') {
                setPassword({ ...password, alert: true })
            }
            setLoading(false)
        } else {
            var values = {
                username: username.text,
                password: password.text,
            }
            setTimeout(() => {
                axios.post("http://10.30.6.148:28899/Authenticate", values).then(res => {
                    if (res.status === 200) {
                        Auth.login(() => {
                            cookie.set("one_session", res.data.token, { expires: 8 / 24 })
                            if (values.username.match("@laotel.com")) {
                                localStorage.setItem("one_info", Crypt({ type: 'crypt', value: JSON.stringify(values) }))
                            } else {
                                let new_save = {
                                    username: values.username + "@laotel.com",
                                    password: values.password
                                }
                                localStorage.setItem("one_info", Crypt({ type: 'crypt', value: JSON.stringify(new_save) }))
                            }
                            history.push("/v2")
                        })
                    } else {
                        setLoading(false)
                        setErr(true)
                    }
                }).catch(err => {
                    setLoading(false)
                    setErr(true)
                })
            }, 500)
        }
    }

    const PressBtn = (e) => {
        if (e.code === 'Enter' || e.code === 'NumpadEnter') {
            Login()
        }
    }

    const [loading, setLoading] = React.useState(false)

    return (
        <div>
            <div className='login-bg'></div>
            <Container component="main" maxWidth="sm">
                <CssBaseline />
                <div className={classes.paper}>
                    <div className='login-container'>
                        <Img src={logo} className="logo-image" />
                        <h1 className="logo-text grey">ເຂົ້າສູ່ລະບົບ</h1>
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
                        {/* <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                name="password"
                                label="ລະຫັດຜ່ານ"
                                type={showPassword ? 'text' : 'password'}
                                placeholder='ປ້ອນລະຫັດຜ່ານ...'
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                autoComplete="current-password"
                                value={formik.password}
                                onChange={formik.handleChange}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
                            /> */}
                        <FormControl variant="standard" fullWidth margin='normal'>
                            <InputLabel htmlFor="standard-adornment-password" shrink><div className={password.alert && 'error-input'}>ລະຫັດຜ່ານ</div></InputLabel>
                            <Input
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                value={password.text}
                                onChange={(e) => {
                                    setPassword({ ...password, text: e.target.value, alert: e.target.value.length > 0 ? false : true })
                                }}
                                fullWidth
                                onKeyPress={(e) => PressBtn(e)}
                                error={password.alert}
                                placeholder='ປ້ອນລະຫັດຜ່ານ...'
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => setShowPassword(!showPassword)}
                                            edge="end"
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                labelWidth={70}
                            />
                            {password.alert ? <div className='error-alert'>ກະລຸນາປ້ອນລະຫັດຜ່ານ</div> : null}
                        </FormControl>
                        <div className='left' style={{ marginTop: 10 }}>
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="ຈົດຈຳຂ້ອຍ"
                            />
                        </div>
                        <Button
                            style={{ marginTop: 10 }}
                            fullWidth
                            variant="contained"
                            color="primary"
                            className="btn-danger btn-login"
                            disabled={loading}
                            onClick={Login}
                        >
                            {loading ? <>ກຳລັງກວດສອບ &nbsp;&nbsp;<CircularProgress /></> : <>ເຂົ້າລະບົບ</>}
                        </Button>
                        {err && <Alert variant="outlined" style={{ marginTop: 15 }} severity="error">
                            ຊື່ເຂົ້າໃຊ້ ຫຼື ລະຫັດຜ່ານ ຜິດພາດ !!
                        </Alert>}
                    </div>
                </div>
            </Container>
            <Container maxWidth="md">
                <div>
                    <Grid container style={{ marginTop: 20 }}>
                        {links.map((x) => {
                            return (
                                <Grid item xs={3} md={2} onClick={() => window.open(x.link)} style={{ cursor: "pointer" }}>
                                    <Card elevation={0} className="box-link login-icon">
                                        <CardContent className="content-1-link" style={{ display: 'flex' }}>
                                            {x?.icon}&nbsp;&nbsp;
                                            <div>{x.name}</div>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            )

                        })}
                        <Grid item xs={12}>
                            <div style={{ marginBottom: 50 }}></div>
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </div>
    );
}