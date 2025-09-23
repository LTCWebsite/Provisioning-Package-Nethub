import React, { useState } from "react";
import { Grid, TextField, Button, Paper, Typography, InputAdornment, IconButton } from "@mui/material";
import { Grid3x3, Grid4x4, GridViewRounded, Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { AlertError, AlertSuccess, toast_error } from "../../../Components/Toast";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Resetpass = () => {
    const [showPassword, setShowpassword] = useState(false);
    const [showNewPassword, setShowNewpassword] = useState(false);
    const [oldpass, setOldpass] = useState('');
    const [newpass, setNewpass] = useState('');
    const [confirmpass, setConfirmpass] = useState('');
    const history = useHistory();


    const handleshowpass = () => {
        setShowpassword(!showPassword)
    }
    const handleshowNewpass = () => {
        setShowNewpassword(!showNewPassword)
    }
    const username = localStorage.getItem('USERNAME');
    const expired = localStorage.getItem('PASSWORDEXPIRED');


    const defaultdata = () => {
        setOldpass('');
        setNewpass('');
        setConfirmpass('');
    }

    const ResetPassword = async () => {
        if (!oldpass || !newpass || !confirmpass) {
            return toast_error({ text: 'ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບຖ້ວນ' })
        }
        if (newpass != confirmpass) {
            return toast_error({ text: 'ຢືນຢັນລະຫັດຜ່ານບໍ່ຕົງກັນ' })
        }
        if (newpass.length < 8 || !/[A-Z]/.test(newpass)) {
        return toast_error({
            text: 'ລະຫັດຜ່ານຕ້ອງຍາວຫຼາຍກວ່າ 8 ຕົວ ແລະ ມີຕົວພິມໃຫຍ່'
        });
    }
        try {
            const resetpass = await axios.patch(`http://172.28.14.49:3210/api/resetpasswordOnescreen`,
                {
                    "user_name": username,
                    "oldpass": oldpass,
                    "Password": confirmpass
                }
            )
            AlertSuccess({ text: 'ປ່ຽນລະຫັດສຳເລັດ' });
            defaultdata();
            if (expired === 'isExpired') {
                history.push('/')
            }
        } catch (error) {
            console.log(error)
            if (error.response && error.response.status === 400) {
                toast_error({ text: "ລະຫັດຜ່ານເກົ່າບໍ່ຖືກຕ້ອງ" });
                console.log("reset pass failed");
            } else {
                AlertError({ text: "Server error" });
                console.error(error);
            }
        }
    }

    return (
        <Grid container justifyContent="center" marginTop="10px" sx={{ px: { xs: 2, sm: 4, md: 8, lg: 12 } }}>
            <Grid item xs={12} sm={10} md={8} lg={6} xl={4}>
                <Paper elevation={4} sx={{ p: { xs: 3, sm: 5 }, borderRadius: 3 }}>
                    <Typography
                        variant="h5"
                        gutterBottom
                        align="center"
                        sx={{ fontWeight: "bold", mb: 3 }}
                    >
                        ແກ້ໄຂລະຫັດຜ່ານ
                    </Typography>

                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                type={showPassword ? "text" : "password"}
                                variant="outlined"
                                label="ລະຫັດຜ່ານເກົ່າ"
                                onChange={(e) => setOldpass(e.target.value)}
                                value={oldpass}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={handleshowpass}>
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                type={showNewPassword ? "text" : "password"}
                                variant="outlined"
                                label="ລະຫັດຜ່ານໃໝ່"
                                onChange={(e) => setNewpass(e.target.value)}
                                value={newpass}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={handleshowNewpass}>
                                                {showNewPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                type={showNewPassword ? "text" : "password"}
                                variant="outlined"
                                label="ຢືນຢັນລະຫັດຜ່ານ"
                                onChange={(e) => setConfirmpass(e.target.value)}
                                value={confirmpass}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={handleshowNewpass}>
                                                {showNewPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                fullWidth
                                variant="contained"
                                color="success"
                                sx={{ py: 1.5, fontSize: "16px", fontWeight: "bold" }}
                                onClick={ResetPassword}
                            >
                                Reset Password
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>

    );
};

export default Resetpass;
