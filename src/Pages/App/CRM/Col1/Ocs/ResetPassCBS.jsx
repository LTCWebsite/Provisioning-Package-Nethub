import React from "react";
// import Dialog from "@material-ui/core/Dialog";
// import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
// import DialogContent from "@material-ui/core/DialogContent";
// import Button from "@material-ui/core/Button";
import { Input } from "@material-ui/core";
import { useState, useEffect} from "react";
import { Grid, Button, Dialog } from '@material-ui/core'
import { IconButton, Skeleton } from '@mui/material'
import cookie from 'js-cookie'
import { AxiosReq } from '../../../../../Components/Axios'
import {toast_error,toast_success} from '../../../../../Components/Toast'
import { Close, WarningAmber } from '@mui/icons-material'
import { MyCryptTry } from "../../../../../Components/MyCrypt";




function ResetPassCBS() {
const [open, setOpen] = React.useState(false);
// const [reason, setReason] = React.useState({ text: null, alert: false })
const [isShown, setIsSHown] = useState(false);
const [load, setLoad] = useState(false)
const [Oldpass_, setOldpass_] = useState('')
const [newpass_, setnewpass_] = useState('')
const [user_, setuser_] = useState('')



// const [option, setOption] = React.useState([])
// const [option7, setOption7] = React.useState([])
// const [data, setData] = React.useState('')
// const [st, setST] = React.useState(null)
const handleClickToOpen = () => {
	setOpen(true);
};

const handleToClose = () => {
	setOpen(false);
};
let data = MyCryptTry("de", localStorage.getItem("ONE_DETAIL"))
//console.log(data)
const ChangePsCBS = () => {


       
        let phone = localStorage.getItem("ONE_PHONE")
        let user_mail=data.value
        
        setLoad(true)
        let send = {
          msisdn: phone,
          oldPassword:Oldpass_,
          newPassword:newpass_,
          username:user_mail
        }
    
        AxiosReq.post("api/ChangePasswordCbs",send,{ headers: { 'Authorization': 'Bearer ' + cookie.get("ONE_TOKEN") } }).then(res => {
            if (res.data.resultCode === "0") {

                toast_success({text:"change password CBS success!"})
                setOldpass_('')
                setnewpass_('')
                user_('')
                handleToClose()
            } else {
                // console.log("Cannot success!")
                toast_error({text:"Cannot success!"})
                setOldpass_('')
                setnewpass_('')
                user_('')
                handleToClose()
            }

        }).catch(err => {
            

        })

}

return (
    <>
                    <Grid container>
                    
                    <Grid item xs={12} container className='link-box-pointer' onClick={handleClickToOpen}>
                    <Grid item xs={12}></Grid>
                    <Grid item xs={6}>Change Password CBS:</Grid>
                    </Grid>
                    </Grid>


    
	<Dialog open={open} onClose={handleToClose} 
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
    >
         <Grid container style={{ paddingLeft: 20, paddingRight: 20 }}>
         <Grid item container xs={12}>
        <Grid item xs={12}>
                            <div className="center"><h1>ຢືນຢັນການປຽ່ນລະຫັດຜ່ານ CBS</h1></div>
                        </Grid>
                        <Grid item xs={12}>
                            <div className="center">
                                <WarningAmber style={{ fontSize: 150, color: '#E74A3B' }} />
                            </div>
                       
                        </Grid>
                        <Grid item lg={2}></Grid>
        <Grid item xs={12} lg={12} style={{ marginBottom: 20 }}>
        <Input style={{ width: '90%', padding: '5px 10px', fontSize: 16 }} 
        placeholder="OldPassword" type={isShown ? "text" : "password"} 
         value={Oldpass_} onChange={(a) => setOldpass_(a.target.value)}>
            
         </Input>
        </Grid>

        <Grid item xs={12} lg={12} style={{ marginBottom: 20 }}>
        <Input style={{ width: '90%', padding: '5px 10px', fontSize: 16 }} 
        placeholder="NewPassword" type={isShown ? "text" : "password"} 
         value={newpass_} onChange={(a) => setnewpass_(a.target.value)}></Input>
        </Grid>

            <Grid item container xs={12} style={{ paddingBottom: 20 }}>
            <Grid item xs={6}>
           
            <div className="center"><Button variant="contained" color="primary" onClick={ChangePsCBS}>ຢືນຢັນ</Button></div>
            </Grid>
            <Grid item xs={6}>
            <div className="center"><Button color="primary" onClick={handleToClose}>ປີດ</Button></div>
            
            </Grid>
            </Grid>
        </Grid>
        </Grid>
	</Dialog>
    </>
	
);
}
export default ResetPassCBS
