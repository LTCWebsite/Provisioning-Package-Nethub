import React, { useState } from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    CircularProgress,
    Container,
    CssBaseline
} from '@mui/material';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { AlertSuccess, toast_error } from '../../../Components/Toast';
import LoadingLottie from '../../../Components/LoadingLottie';
import logo from '../../../Image/logo-2.png'
import { FadeIn } from 'react-fade-in';

export const RequestOTP = () => {
    // const [loading, setLoading] = useState(false);
    const [empcode, setEmpcode] = useState('');
    const [otpRes, setOtpRes] = useState([]);
    const history = useHistory();
    const [loading, setLoading] = React.useState({ use: false, lottie: false })

    setTimeout(() => {
        setLoading({ ...loading, lottie: true })
    }, 1000)

    const handleRequestOTP = async () => {
        try {
            if (!empcode) {
                toast_error({ text: 'ກະລຸນາປ້ອນ username' })
            }
            const result = await axios.post(`http://10.30.6.148:9999/RequestOTP?empcode=${empcode}`);
            if (result.data.resultcode === 200) {
                AlertSuccess({ text: `ຮ້ອງຂໍສຳເລັດ ກະລຸນາກວດສອບ OTP ຈາກເບີ ${result.data.msisdn}` });
                localStorage.setItem("USERNAME", result.data.username)
                history.push('/verifyOTP')
            } if (result.data.resultcode === 400) {
                toast_error({ text: 'username ບໍ່ຖຶກຕ້ອງ' })
            }
            if (result.data.resultcode === 401) {
                toast_error({ text: 'ບໍ່ພົບເບີຂອງຜູ້ໃຊ້ນີ້ ກະລຸນາແຈ້ງເບີໃຫ້ທີມງານ' })
            }

        } catch (error) {
            console.log(error)
        }
    };

    const PressBtn = (e) => {
        if (e.code === 'Enter' || e.code === 'NumpadEnter') {
            handleRequestOTP()
        }
    }

    return (
        <div>
            {!loading.lottie ? <LoadingLottie loadStop={loading.lottie} loadHeight={400} loadWidth={300} loadTop={"20vh"} /> : <>
                <div className='login-bg'></div>

                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="100vh"
                >
                    <Paper
                        elevation={3}
                        className="otp-container"
                        sx={{
                            // bgcolor:'blue',
                            p: 4,
                            width: 450,
                            mb: 10,
                            height: 250,
                            textAlign: 'center',
                            alignItems: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',

                        }}
                    >
                        <Container
                            maxWidth={false}
                            sx={{ width: "100%" }}
                        >
                            <Typography variant="h5" mb={2}
                                sx={{ fontWeight: "bold" }} >
                                ຮ້ອງຂໍ OTP
                            </Typography>
                            <Typography mb={2}

                            >
                                ກະລຸນາປ້ອນ username
                            </Typography>

                            <TextField
                                fullWidth
                                label="vtexxxx"
                                variant="outlined"
                                margin="normal"
                                onChange={(e) => setEmpcode(e.target.value)}
                                value={empcode}
                                sx={{ mt: 10, maxWidth: 400 }}
                                autoFocus
                                onKeyUp={(e) => PressBtn(e)}
                            />
                        </Container>

                        <Button
                            variant="contained"
                            color="error"
                            fullWidth
                            onClick={handleRequestOTP}
                            // disabled={loading}
                            sx={{ mt: 2, height: 45 }}
                            onKeyUp={(e) => PressBtn(e)}

                        >
                            ຂໍ OTP
                            {/* {loading ? <CircularProgress size={24} color="inherit" /> : 'ຂໍ OTP'} */}
                        </Button>
                    </Paper>

                </Box >

            </>}
        </div>

    );
};
