import React, { useState } from "react";
import { Grid, TextField, Button, Paper, Typography, InputAdornment, IconButton, Box } from "@mui/material";
import { Grid3x3, Grid4x4, GridViewRounded, Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { AlertError, AlertSuccess, toast_error } from "../../../Components/Toast";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import RemarkComponent from "../../../Components/Remark";
import iso from '../../../Image/pngegg.png'


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

        if (!/[0-9]/.test(newpass)) {
            return toast_error({
                text: 'ລະຫັດຜ່ານຕ້ອງມີໂຕເລກ 0-9'
            });
        }
        if (newpass.length < 8) {
            return toast_error({
                text: 'ລະຫັດຜ່ານຕ້ອງຍາວຫຼາຍກວ່າ 8 ຕົວ'
            });
        }
        if (!/[A-Z]/.test(newpass)
        ) {
            return toast_error({
                text: 'ລະຫັດຜ່ານຕ້ອງມີຕົວພິມໃຫຍ່'
            });
        }
        if (
            !/[a-z]/.test(newpass)
        ) {
            return toast_error({
                text: 'ລະຫັດຜ່ານຕ້ອງມີຕົວພິມນ້ອຍ'
            });
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(newpass)
        ) {
            return toast_error({
                text: 'ລະຫັດຜ່ານຕ້ອງມີເຄື່ອງໝາຍພິເສດ'
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
            if (error.response && error.response.status === 401) {
                toast_error({ text: error.response.data.message })
            }
            if (error.response && error.response.status === 400) {
                toast_error({ text: error.response.data.message });
            }
            else {
                AlertError({ text: "Server error" });
                console.error(error);
            }
        }
    }

    return (
        <Grid container
            justifyContent={'center'}
            display={'flex'}
            alignItems={'center'}
            flexDirection={'column'}
            sx={{ height: '90vh', px: { xs: 2, sm: 2, md: 4, lg: 4 } }}>
            <Grid item xs={12} sm={10} md={8} lg={6} xl={4}>
                <Paper elevation={4} sx={{ p: { xs: 3, sm: 5 }, borderRadius: 3 }}>
                    <Box display='flex' justifyContent='space-between'>
                        <Box width={'10vh'} />
                        <Typography
                            variant="h5"
                            gutterBottom
                            align="center"
                            sx={{ fontWeight: "bold" }}
                        >
                            ແກ້ໄຂລະຫັດຜ່ານ

                        </Typography>
                        <Box
                            color={'blue'}
                            component='img'
                            src={iso}
                            height={45}
                            sx={{
                                objectFit: 'cover'
                            }}>

                        </Box>
                    </Box>

                    <RemarkComponent />

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
                                color="error"
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
