import { Grid, Button, CircularProgress } from '@material-ui/core'
import { Save } from '@material-ui/icons'
import { Alert } from '@material-ui/lab'
import React from 'react'
import Axios from '../../Components/Axios'

function ProUpload() {
    const [pdf, setPdf] = React.useState(null)
    const [pro, setPro] = React.useState({ detail: '', solution: '' })
    const [alert, setAlert] = React.useState({ detail: '', solution: '', success: false, error: false, use: false })
    const [btn, setBtn] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const saveFile = (e) => {
        setPdf(e)
    }
    const savePro = () => {
        setBtn(true)
        setLoading(true)
        const data = new FormData()
        data.append('file', pdf)
        data.append('detail', pro.detail)
        data.append('solution', pro.solution)
        var sendData = {
            file: data,
            detail: pro.detail,
            solution: pro.solution,
        }
        var count = 0
        Object.keys(sendData).forEach(function (key) {
            if (sendData[key] === '') {
                count = count + 1
            }
        })
        if (count === 0) {
            Axios.post("upload/pdf", data).then(res => {
                if (res.status === 200) {
                    // console.log(res.data)
                    setAlert({ ...alert, success: true })
                    setLoading(false)
                } else {
                    setAlert({ ...alert, error: true })
                    setLoading(false)
                }
            }).catch(err => {
                setAlert({ ...alert, error: true })
                setLoading(false)
            })
        } else {
            setLoading(false)
        }
    }
    return (
        <div>
            <Grid container>
                <Grid item md={3} lg={4}></Grid>
                <Grid container item xs={12} md={6} lg={4} spacing={2}>
                    <Grid item xs={12}>
                        <input className="input" type="file" accept=".pdf" onChange={(e) => saveFile(e.target.files[0])} />
                    </Grid>
                    <Grid item xs={12}>
                        <textarea className="input" style={{ height: 100 }} placeholder="ລາຍລະອຽດຂໍ້ມູນໂປຼໂມຊັ້ນ..." onChange={(e) => {
                            setAlert({ ...alert, detail: e.target.value.length > 0 ? false : true })
                            setPro({ ...pro, detail: e.target.value })
                        }} />
                        {alert.detail || (btn && pro.detail === '') ? <div className="text-error">ກະລຸນາປ້ອນລາຍລະອຽດຂໍ້ມູນໂປຼໂມຊັ້ນ</div> : null}
                    </Grid>
                    <Grid item xs={12}>
                        <textarea className="input" style={{ height: 150 }} placeholder="ວິທີແກ້ໄຂບັນຫາ..." onChange={(e) => {
                            setAlert({ ...alert, solution: e.target.value.length > 0 ? false : true })
                            setPro({ ...pro, solution: e.target.value })
                        }} />
                        {alert.solution || (btn && pro.solution === '') ? <div className="text-error">ກະລຸນາປ້ອນວິທີແກ້ໄຂບັນຫາ</div> : null}
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" className="btn-primary" onClick={savePro} disabled={loading}>
                            {loading ? <CircularProgress size={25} /> : <Save />} &nbsp;ບັນທຶກ
                        </Button>
                        {alert.use && <Alert variant="outlined" severity={alert.success ? 'success' : 'error'} draggable={true} style={{ marginTop: 20 }}>
                            {alert.success ? 'ບັນທຶກຂໍ້ມູນສຳເລັດ' : 'ບໍ່ສາມາດມາດບັນທຶກຂໍ້ມູນໄດ້ !!'}
                        </Alert>}
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default ProUpload
