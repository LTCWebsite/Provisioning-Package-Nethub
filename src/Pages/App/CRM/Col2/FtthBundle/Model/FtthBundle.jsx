import { Close } from '@mui/icons-material'
import { Dialog, Grid, Slide } from '@mui/material'
import cookie from 'js-cookie'
import React, { useState, useEffect } from 'react'
import { AxiosReq3 } from '../../../../../../Components/Axios'
import TableBundle from './TableBundle'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})

function FtthBundle({ open, cb, count }) {
    const [data, setData] = useState([])
    useEffect(() => {
        const phone = localStorage.getItem("ONE_PHONE")
        AxiosReq3.get(
            `CheckBundleList?number=${phone}`,
            {},
            {
                headers: {
                    'Authorization': `Bearer ${cookie.get("ONE_TOKEN")}`
                }
            }
        ).then(res => {
            if (res.status === 200) {
                const list = res?.data?.list || []
                const CountRow = list.length
                const Resp = list.map((item, idx) => ({
                    idx: idx + 1,
                    bundle: item.bundle,
                    latestDate: item.latestDate
                }))
                setData(Resp)
                count(CountRow)
                // console.log("Ku Lorng bug Count Row =",CountRow)         
            } else {
                setData([])
                count(0)
            }
        }).catch(err => {
            console.error(err)
        })
    }, [])

    return (
        <Dialog
            maxWidth="xl"
            open={open}
            onClose={() => cb(!open)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            TransitionComponent={Transition}
        >
            <Grid container style={{ width: 1400 }}>
                <Grid item container xs={12}>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={10}>
                        <div className="center"><h1>FTTH Bundle</h1></div>
                    </Grid>
                    <Grid item xs={1}>
                        <div className='right'>
                            <Close className='icon' onClick={() => cb(!open)} />
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <TableBundle FtthData={data} />
                    </Grid>
                </Grid>
            </Grid>
        </Dialog>
    )
}

export default FtthBundle
