import { CheckBox, Save } from '@mui/icons-material'
import { Button, CircularProgress, Grid, TextField } from '@mui/material'
import React from 'react'
import { MyCrypt } from '../../../Components/MyCrypt'
import FadeIn from 'react-fade-in/lib/FadeIn'

function UserEdit() {
    const [top, setTop] = React.useState({ data: [] })
    const [loading, setLoading] = React.useState({ btn: false })

    React.useEffect(() => {
        setTop({ ...top, data: MyCrypt("de", localStorage.getItem("ONE_USER_ROLE")) })
    }, [])

    const Change = (value, id, type) => {
        if (type === 'username') {
            top.data.map(row => {
                if (row.ID === id) {
                    row.Username = value
                }
            })
        } else {
            top.data.map(row => {
                if (row.ID === id) {
                    row.Password = value
                }
            })
        }
    }

    const SaveUserRole = () => {
        setLoading({ ...loading, btn: true })
        localStorage.setItem("ONE_USER_ROLE", MyCrypt("en", JSON.stringify(top.data)))
        setTimeout(() => {
            setLoading({ ...loading, btn: false })
        }, 1000)
    }

    return (
        <FadeIn>
            <Grid container>
                {top.data?.map((row, idx) => {
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
                                            InputLabelProps={{
                                                shrink: true
                                            }}
                                            value={top.data[idx].Password}
                                            onChange={(e) => Change(e.target.value, row.ID, "password")}
                                        />
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                    )
                })}
                <Grid item xs={12}>
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
                </Grid>
            </Grid>
        </FadeIn>
    )
}

export default UserEdit