import { Dialog, Grid, FormControl, InputLabel, Select, MenuItem, Button, CircularProgress } from '@material-ui/core'
import Axios from '../../../../Pages/Components/Axios'
import Cookies from 'js-cookie';
import React from 'react'
import Crypt from '../../../../Pages/Components/Crypt';
import { AlertSuccess, AlertError, AlertInfo } from '../../../../Pages/Components/Toast'
import Doing from '../../../../Pages/Components/Doing'

function CancelGame({ use, cb }) {
    const [select, setSelect] = React.useState('')
    const [reason, setReason] = React.useState({ text: '', alert: false })
    const [game, setGame] = React.useState({ data: [], alert: false })
    const [btn, setBtn] = React.useState({ send: false, alert: false })
    React.useEffect(() => {
        Axios.get("HeaderNameGame", { headers: { 'Authorization': 'Bearer ' + Cookies.get("one_session") } }).then(res => {
            if (res.status === 200) {
                setGame({ ...game, data: res.data })
                // console.log(res.data)
            }
        })
    }, [])
    const SaveGame = () => {
        setBtn({ send: true, alert: true })
        var sendData = {
            msisdn: Crypt({ type: "decrypt", value: localStorage.getItem("input-phone") }).text,
            ussdCode: select,
            reason: reason.text,
        }
        var num = 0
        Object.keys(sendData).forEach(row => {
            if (sendData[row] === '' || sendData[row] === null) {
                num = num + 1
            }
        })
        if (num === 0) {
            Axios.post("UnSubScribeGame", {
                msisdn: sendData.msisdn,
                ussdCode: sendData.ussdCode,
            }, { headers: { 'Authorization': 'Bearer ' + Cookies.get("one_session") } }).then(res => {
                if (res.status === 200) {
                    if(res.data.resultCode === "100"){
                        AlertInfo(res.data.resultDesc)
                        Doing({
                            msisdn: Crypt({ type: "decrypt", value: localStorage.getItem("input-phone") }).text,
                            username: Crypt({ type: "decrypt", value: localStorage.getItem("one_info") }).username,
                            detail: 'unsubscribe game',
                            info: reason.text,
                            resualt: 'error',
                        })
                    }else{
                        AlertSuccess(res.data.resultDesc)
                        Doing({
                            msisdn: Crypt({ type: "decrypt", value: localStorage.getItem("input-phone") }).text,
                            username: Crypt({ type: "decrypt", value: localStorage.getItem("one_info") }).username,
                            detail: 'unsubscribe game',
                            info: reason.text,
                            resualt: 'sucess',
                        })
                    }
                } else {
                    AlertError(res.data.resultDesc)
                    Doing({
                        msisdn: Crypt({ type: "decrypt", value: localStorage.getItem("input-phone") }).text,
                        username: Crypt({ type: "decrypt", value: localStorage.getItem("one_info") }).username,
                        detail: 'unsubscribe game',
                        info: reason.text,
                        resualt: 'error',
                    })
                }
                setBtn({ send: false, alert: false })
                cb(!use)
                clear()
            }).catch(err => {
                setBtn({ send: false, alert: false })
                AlertError("Network error")
                Doing({
                    msisdn: Crypt({ type: "decrypt", value: localStorage.getItem("input-phone") }).text,
                    username: Crypt({ type: "decrypt", value: localStorage.getItem("one_info") }).username,
                    detail: 'unsubscribe game',
                    info: reason.text,
                    resualt: 'error network',
                })
            })
        } else {
            setBtn({ send: false, alert: true })
        }
    }
    const clear = () => {
        setSelect('')
        setReason({ text: '', alert: false })
    }
    return (
        <div>
            <Dialog
                open={use}
                onClose={!use}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth="md"
            >
                <Grid container style={{ paddingLeft: 20, paddingRight: 20, width: 500 }}>
                    <Grid item container xs={12}>
                        <Grid item xs={12}><div className="center"><h1>ຍົກເລີກບໍລິການເກມ</h1></div></Grid>
                        <Grid item xs={12} style={{ marginBottom: 20 }}>
                            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} fullWidth>
                                <InputLabel id="demo-simple-select-filled-label" shrink>ເລືອກເກມທີ່ຕ້ອງການຍົກເລີກ</InputLabel>
                                <Select
                                    fullWidth
                                    labelId="demo-simple-select-filled-label"
                                    id="demo-simple-select-filled"
                                    value={select}
                                    onChange={(e) => setSelect(e.target.value)}
                                    error={(select === '' && btn.alert)}
                                >
                                    {game.data?.map(row => {
                                        return (
                                            <MenuItem value={row.ussdcode}>{row.gamename}</MenuItem>
                                        )
                                    })}
                                </Select>
                                {(select === '' && btn.alert) ? <div className="red">ກະລຸນາເລືອກເກມທີ່ຕ້ອງການຍົກເລີກ</div> : null}
                            </FormControl>
                            <textarea style={{ width: '95%', padding: '5px 10px', fontSize: 16, marginTop: 20 }} placeholder="ເຫດຜົນ" onChange={(e) => { setReason({ ...reason, text: e.target.value, alert: e.target.value.length > 0 ? false : true }) }}></textarea>
                            {reason.alert || (btn.alert && reason.text === '') ? <div className="red">ກະລຸນາປ້ອນເຫດຜົນ</div> : null}
                        </Grid>
                        <Grid item xs={12} container style={{ marginBottom: 20 }}>
                            <Grid item xs={3}>
                                <Button variant='contained' color="inherit" fullWidth onClick={() => {
                                    cb(!use)
                                    clear()
                                    }}>
                                    Cancle
                                </Button>
                            </Grid>
                            <Grid item xs={6}></Grid>
                            <Grid item xs={3}>
                                <Button variant='contained' color="primary" fullWidth onClick={SaveGame} disabled={btn.send}>
                                    {btn.send ? <CircularProgress size={25} /> : <div>Save</div>}
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Dialog>
        </div>
    )
}

export default CancelGame
