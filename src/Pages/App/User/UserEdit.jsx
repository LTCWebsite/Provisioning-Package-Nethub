import { CheckBox, Save } from '@mui/icons-material'
import { Button, CircularProgress, Grid, TextField } from '@mui/material'
import React from 'react'
import { MyCryptTry } from '../../../Components/MyCrypt'
import FadeIn from 'react-fade-in/lib/FadeIn'
import { UserID } from '../../../Components/AutoFC'
import { AxiosAPI } from '../../../Components/Axios'
import { toast_error, toast_success } from '../../../Components/Toast'

function UserEdit() {
    const [top, setTop] = React.useState({ data: [] })
    const [loading, setLoading] = React.useState({ btn: false, data: false })

    const loadTop = () => {
        setLoading({ ...loading, data: false })
        let data = MyCryptTry("de", localStorage.getItem("ONE_USER_ROLE"))
        let new_data = data?.map(row => {
            row.password = row.Password === null || row.Password === '' ? '' : MyCryptTry("de", row.Password)
            row.Username = row.Username === 'null' || row.Username === null ? '' : row.Username
            return row
        })
        setTop({ ...top, data: new_data })
        setLoading({ ...loading, data: true })
    }

    React.useEffect(() => {
        loadTop()
    }, [])

    const Change = (value, id, type) => {
        if (type === 'username') {
            let new_data = top.data.map(row => {
                if (row.ID === id) {
                    row.Username = value
                }
                return row
            })
            setTop({ ...top, data: new_data })
        } else {
            let new_data = top.data.map(row => {
                if (row.ID === id) {
                    row.Password = MyCryptTry("en", JSON.stringify(value))
                    row.password = value
                }
                return row
            })
            setTop({ ...top, data: new_data })
        }
    }

    const SaveUserRole = () => {
        setLoading({ ...loading, btn: true })
        localStorage.setItem("ONE_USER_ROLE", MyCryptTry("en", JSON.stringify(top.data)))
        try {
            let s_data = top.data.map(row => {
                delete row.password
                return row
            })
            let sendData = {
                staff_id: UserID(),
                users: s_data
            }
            AxiosAPI.post("insert-user", sendData).then(res => {
                if (res.status === 200) {
                    setTimeout(() => {
                        setLoading({ ...loading, btn: false })
                        toast_success({ text: res.data.message })
                    }, 500)
                }
            }).catch(er => {
                setTimeout(() => {
                    setLoading({ ...loading, btn: false })
                    toast_error({ text: "API Error" })
                }, 1000)
            })
        } catch (error) {

        }
    }

    return (
        <FadeIn>
            <Grid container>
                {loading.data && top?.data?.map((row, idx) => {
                    return (
                        <Grid item lg={6} xs={12} key={idx}>
                            <div className="padd">
                                <CheckBox color='primary' style={{ marginTop: 5 }} /> &nbsp;&nbsp;
                                <u>{row.Name}</u>
                            </div>
                            <Grid container spacing={2} item xs={12}>
                                <Grid item xs={6}>
                                    <div className='textInput'>
                                        <TextField
                                            fullWidth
                                            variant='standard'
                                            margin='dense'
                                            color='primary'
                                            label={"username ( " + row.Name + " )"}
                                            InputLabelProps={{
                                                shrink: true
                                            }}
                                            value={top.data[idx].Username}
                                            onChange={(e) => Change(e.target.value, row.ID, "username")}
                                        />
                                    </div>
                                </Grid>
                                <Grid item xs={6}>
                                    <div className='textInput'>
                                        <TextField
                                            fullWidth
                                            variant='standard'
                                            color='primary'
                                            margin='dense'
                                            label={"password ( " + row.Name + " )"}
                                            // type={"password"}
                                            InputLabelProps={{
                                                shrink: true
                                            }}
                                            value={top.data[idx].password}
                                            onChange={(e) => Change(e.target.value, row.ID, "password")}
                                        />
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                    )
                })}
                <Grid item xs={12}>
                    {loading.data && <>
                        <div style={{ marginTop: 20, marginBottom: 30, textAlign: 'right', paddingRight: 30 }}>
                            <Button
                                variant='contained'
                                color='success'
                                onClick={SaveUserRole}
                                disabled={loading.btn}
                            >
                                {loading.btn ? <CircularProgress size={25} /> : <>ບັນທຶກ <Save /></>}
                            </Button>
                        </div>
                    </>}
                </Grid>
            </Grid>
        </FadeIn>
    )
}

export default UserEdit