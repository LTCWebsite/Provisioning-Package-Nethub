import { Box, CircularProgress, Paper, TextField, Typography, Button, Container, Stack } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { AlertSuccess, toast_error } from '../../../Components/Toast';
import OTP from 'antd/es/input/OTP';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import LoadingLottie from '../../../Components/LoadingLottie';

export const VerifyOTP = () => {
    const [otp, setOtp] = useState('');
    // const [loading, setLoading] = useState(false);
    const [loading, setLoading] = React.useState({ use: false, lottie: false })
    const location = useLocation();
    const history = useHistory();
    const inputRef = useRef([]);
    const [resultcode, setResultCode] = useState({});
    const localusername = localStorage.getItem('USERNAME');


    setTimeout(() => {
        setLoading({ ...loading, lottie: true })
    }, 1000);

    const handleChange = (e, index) => {
        const value = e.target.value;
        if (/^\d$/.test(value) || value === "") {
            const otpArray = otp.split("");
            otpArray[index] = value;
            setOtp(otpArray.join(""));
            console.log(otp)

            if (value && index < 5) inputRef.current[index + 1].focus();
        }
    };
    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRef.current[index - 1].focus();
        }
    };
    useEffect(() => {
        if (otp.length === 6) {
            handleVerifyOTP();
        }
    }, [otp])
    // console.log(resultcode)


    const handleVerifyOTP = async () => {
        try {
            if (!otp) {
                toast_error({ text: 'ກະລຸນາປ້ອນ OTP' })
            }
            const result = await axios.post(`http://10.30.6.148:9999/ConfirmOTP?empcode=${localusername}&OTP=${otp}`,

            );
            // setResultCode(result.data.resultCode);
            if (result.data.resultcode === 200) {
                AlertSuccess({ text: 'ຢືນຢັນ OTP ສຳເລັດ' });
                history.push('/Newresetpassword')
            }
            if (result.data.resultcode === 400) {
                toast_error({ text: 'OTP ບໍ່ຖືກຕ້ອງ ຫຼື ໝົດອາຍຸ' });
            }
        } catch (error) {
            console.log(error)
        }
    }
    const PressBtn = (e) => {
        if (e.code === 'Enter' || e.code === 'NumpadEnter') {
            handleVerifyOTP()
        }
    }
    return (
        <div>
            {!loading.lottie ?
                <LoadingLottie
                    loadStop={loading.lottie}
                    loadHeight={400}
                    loadWidth={300}
                    loadTop={"20vh"}
                />
                : <>
                    <div className='login-bg'></div>

                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        minHeight="100vh"
                        bgcolor="#f9fafb"
                        px={2}
                    >
                        <Paper
                            elevation={4}
                            className='otp-container'
                            sx={{
                                p: 4,
                                width: "100%",
                                mb: 10,
                                maxWidth: 420,
                                textAlign: "center",
                                bgcolor: "white",
                            }}
                        >
                            <Typography
                                variant="h5"
                                mb={1}
                                fontWeight={600}
                                color="error.main"
                                fontStyle="initial"
                            >
                                ຢືນຢັນ OTP
                            </Typography>

                            <Typography color="text.secondary" mb={3}>
                                ກະລຸນາປ້ອນ OTP ທີ່ໄດ້ຮັບທາງ SMS
                            </Typography>

                            <Stack direction="row" gap={1}>
                                {[...Array(6)].map((_, i) => (
                                    <TextField
                                        key={i}
                                        autoFocus={i === 0}
                                        inputRef={(el) => (inputRef.current[i] = el)}
                                        value={otp[i] || ""}
                                        onChange={(e) => handleChange(e, i)}
                                        onKeyDown={(e) => handleKeyDown(e, i)}
                                        onKeyUp={(e) => PressBtn(e)}
                                        inputProps={{
                                            maxLength: 1,
                                            inputMode: "numeric",
                                            style: {
                                                textAlign: "center",
                                                fontSize: "24px",
                                                width: "45px",
                                                height: "55px",
                                            },
                                        }}
                                    />
                                ))}
                            </Stack>

                            <Stack spacing={2} mt={4}>
                                {/* <Button
                                variant="contained"
                                color="error"
                                size="large"
                                onClick={handleVerifyOTP}
                                onKeyUp={(e) => PressBtn(e)}
                                sx={{
                                    height: 45,
                                    fontSize: "16px",
                                    fontWeight: "bold",
                                    letterSpacing: 1,
                                }}
                            >
                                ຢືນຢັນ OTP
                            </Button> */}

                                {/* <Typography
                                variant="body2"
                                color="primary"
                                sx={{
                                    cursor: "pointer",
                                    textDecoration: "underline",
                                    "&:hover": { opacity: 0.8 },
                                }}
                                onClick={() => {
                                    // Add resend OTP logic
                                }}
                            >
                                ສົ່ງ OTP ໃໝ່?
                            </Typography> */}
                            </Stack>
                        </Paper>
                    </Box>
                </>}
        </div>
    )
}
