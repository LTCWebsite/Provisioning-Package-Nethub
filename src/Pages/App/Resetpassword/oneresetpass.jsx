import React, { useState } from "react";
import { Grid, TextField, Button, Paper, Typography, InputAdornment, IconButton, Box } from "@mui/material";
import { Grid3x3, Grid4x4, GridViewRounded, Image, Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { AlertError, AlertSuccess, toast_error } from "../../../Components/Toast";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import LoadingLottie from "../../../Components/LoadingLottie";
import iso from '../../../Image/pngegg.png'
import RemarkComponent from "../../../Components/Remark";


const Newresetpass = () => {
    const [showNewPassword, setShowNewpassword] = useState(false);
    const [oldpass, setOldpass] = useState('');
    const [newpass, setNewpass] = useState('');
    const [confirmpass, setConfirmpass] = useState('');
    const history = useHistory();
    const [inputName, setInputName] = useState('');
    const [loading, setLoading] = React.useState({ use: false, lottie: false });
    setTimeout(() => {
        setLoading({ ...loading, lottie: true })
    }, 1000)

    const handleshowNewpass = () => {
        setShowNewpassword(!showNewPassword)
    }
    const localusername = localStorage.getItem('USERNAME');
    const expired = localStorage.getItem('PASSWORDEXPIRED');

    const defaultdata = () => {
        setOldpass('');
        setNewpass('');
        setConfirmpass('');
    }

    const ResetPassword = async () => {
        if (!newpass || !confirmpass) {
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
            const resetpass = await axios.patch(`http://172.28.14.49:3210/api/resetNewpassOnescreen`,
                {
                    "user_name": localusername,
                    "Password": confirmpass
                }
            )
            AlertSuccess({ text: 'ປ່ຽນລະຫັດຜ່ານສຳເລັດ' });
            defaultdata();
            if (expired === 'isExpired' || !expired) {
                history.push('/')
                localStorage.clear()
            }
        } catch (error) {
            console.log(error)
            if (error.response && error.response.status === 404) {
                toast_error({ text: "ຊື່ຜູ້ໃຊ້ບໍ່ຖືກຕ້ອງ" });
            } if (error.response && error.response.status === 401) {
                toast_error({ text: error.response.data.message })
            }
            else {
                AlertError({ text: "Server error" });
                console.error(error);
            }
        }
    }

    const PressBtn = (e) => {
        if (e.code === 'Enter' || e.code === 'NumpadEnter') {
            ResetPassword();
        }
    }

    return (
        <div>
            {!loading.lottie ? <LoadingLottie loadStop={loading.lottie} loadHeight={400} loadWidth={300} loadTop={"20vh"} /> : <>
                <div className='login-bg'></div>

                <Grid container justifyContent={'center'} display={'flex'} alignItems={'center'}
                    flexDirection={'column'}
                    sx={{ minHeight: "100vh", px: { xs: 2, sm: 4, md: 8, lg: 12 } }}>

                    <Grid item xs={12} sm={10} md={8} lg={6} xl={4}>
                        <Paper elevation={4}
                        className="otp-container"
                        
                            sx={{ p: { xs: 3, sm: 5 } ,mb:10 }}>
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
                                {/* {localusername === null &&
                                    (<Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            type={"text"}
                                            variant="outlined"
                                            label="User name"
                                            onChange={(e) => setInputName(e.target.value)}
                                            value={inputName}

                                        />
                                    </Grid>)
                                } */}

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
                                        onKeyUp={(e) => PressBtn(e)}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        color="error"
                                        sx={{ py: 1.5, fontSize: "16px", fontWeight: "bold" }}
                                        onClick={ResetPassword}
                                        onKeyUp={(e) => PressBtn(e)}

                                    >
                                        Reset Password
                                    </Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </>}
        </div >


    );
};

export default Newresetpass;
