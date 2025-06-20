import { Close, Search } from '@mui/icons-material'
import { Button, Dialog, DialogTitle, Grid, TextField } from '@mui/material'
import React, { useState } from 'react'
import { AxiosCBS } from '../../../../../../Components/Axios'
import UserBlacklistTable from './UserBlacklistTable'

function UserBlacklist({ open, cb }) {
    const [data, setdata] = useState([])
    const [loading, setloading] = useState(false)
    const [search, setsearch] = useState(null)
    const SearchUserBlacklist = () => {
        if (search !== null) {
            setloading(true)
            let sendData = {
                search: search
            }
            AxiosCBS.post("user_blacklist", sendData).then(res => {
                if (res.status === 200) {
                    setdata(res.data?.data)
                    setTimeout(() => {
                        setloading(false)
                    }, 500);
                }
            }).catch(er => {
                setloading(false)
            })
        } else {
            setloading(false)
        }
    }

    return (
        <>
            <Dialog
                open={open}
                onClose={() => cb(!open)}
                maxWidth={1000}
            >
                <Grid container>
                    <Grid item xs={3}></Grid>
                    <Grid item xs={6}>
                        <DialogTitle className='center'>User Blacklist</DialogTitle>
                    </Grid>
                    <Grid item xs={3}>
                        <div className='right'><Close className='icon' onClick={() => cb(!open)} /></div>
                    </Grid>
                    <Grid item xs={12} container spacing={2}>
                        <Grid item md={4}></Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                variant='standard'
                                fullWidth
                                placeholder='ປ້ອນຂໍ້ມູນເພື່ອຄົ້ນຫາ...'
                                onChange={(e) => setsearch(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Button
                                variant='contained'
                                color='primary'
                                onClick={SearchUserBlacklist}
                            >
                                <Search />
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12} style={{ width: 1400 }}>
                        <UserBlacklistTable
                            data={data}
                            loading={loading}
                        />
                    </Grid>
                </Grid>
            </Dialog>
        </>
    )
}

export default UserBlacklist