import { AllInbox, Close, Done } from '@mui/icons-material'
import { Button, CircularProgress, Dialog, DialogTitle, Grid, IconButton, Slide } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { AxiosReq2 } from '../../../../../../Components/Axios'
import { MyCrypt } from '../../../../../../Components/MyCrypt'
import MyTable from '../../../../../../Components/MyTable'
import cookie from 'js-cookie'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function BuyPackage101({ open, cb, done, ifdone, count }) {
    const [data, setData] = useState([])
    const [pkCode, setPkCode] = React.useState('')
    // const [pkSrv, setPkSrv] = React.useState('')
    const [isShowConfirm, setIsShowConfirm] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)
    const [bkData, setBkData] = React.useState({})
    const [isShowSuccess, setIsShowSuccess] = React.useState(false)
    // const [bssNetworkType, setBssNetworkType] = React.useState()
    // const [productType, setProductType] = React.useState()
   

    const columns = [
        { title: 'No', field: 'id_idx', maxWidth: 50, sorting: false },
        //{ title: 'ລະຫັດແພັກເກັດ', field: 'pK_CODE', minWidth: 100, sorting: false },
        { title: 'ຊື່ແພັກເກັດ', field: 'counterName', minWidth: 250 },
        { title: 'ມື້', field: 'days' , minWidth: 100 },
        { title: 'ຈຳນວນດາຕ້າ', field: 'volumn', minWidth: 100, sorting: false },
        { title: 'ຈຳນວນເງີນ', field: 'balance', minWidth: 100, render: row => row?.balance?.toLocaleString() },
        { title: 'ຈັດການ', field: 'action', minWidth: 200, align: 'center' },
    ]

    useEffect(() => {
        ifdone(done)
        count(0)
        //let network = MyCrypt("de", localStorage.getItem("ONE_NETWORK"))
        //setBssNetworkType(network?.NETWORK_CODE)
        AxiosReq2.get("Package101",{ headers: { 'Authorization': 'Bearer ' + cookie.get("ONE_TOKEN") } }).then(res => {
            if (res.status === 200) {
                var num = 0
                var newUpdate = res.data.map(row => {
                    row.id_idx = num + 1
                    num = num + 1
                    row.action =
                        <Button variant="contained" color="error" className='btn-primary' fullWidth style={{ height: 39, marginTop: 5 }} onClick={() => {
                            setPkCode(row.ussdCode)
                            //  console.log("Lorng bug bg :", row.ussdCode)
                            //setPkSrv(row.srV_NAME)
                            //setProductType(row.signonE_PK)
                            setIsShowConfirm(!isShowConfirm)
                        }}>
                            <a>ຊື້ແພັກເກັດ</a>
                        </Button>
                    return row
                })
                count(num)
                ifdone(!done)
                setData(newUpdate)
                // console.log(newUpdate)
            }
        }).catch(er => {
            setData([])
            count(0)
        })
    }, [])

    const _onBuyPackage = () => {
        setIsLoading(!isLoading)
        let phone = localStorage.getItem("ONE_PHONE")
        const datas = {
            "msisdnSender": phone,
            "msisdnRecip": phone,
            "ussdCode": pkCode,
        }
        //console.log("Bg body pk :", datas)
        AxiosReq2.post("Package101/buy", datas,{ headers: { 'Authorization': 'Bearer ' + cookie.get("ONE_TOKEN") } }).then(res => {
            if (res.status === 200 && res?.data?.code === "200") {
                setBkData(res.data)
                setIsShowSuccess(!isShowSuccess)
                setIsShowConfirm(isShowConfirm)
                setIsLoading(isLoading)
            } else {
                setBkData(res.data)
                setIsShowSuccess(!isShowSuccess)
                setIsShowConfirm(!isShowConfirm)
                setIsLoading(!isLoading)
            }
        }).catch(err => {
            console.log({ err })
        })
    }
    
    return (
        <>
            <Dialog
                open={open}
                onClose={() => cb(!open)}
                maxWidth={1200}
            >
                <Grid container>
                    <Grid item xs={3}></Grid>
                    <Grid item xs={6}>
                        <DialogTitle className='center'>ຊື້ແພັກເກັດ</DialogTitle>
                    </Grid>
                    <Grid item xs={3}>
                        <div className='right'><Close className='icon' onClick={() => cb(!open)} /></div>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12} style={{ width: 1200 }}>
                        <MyTable tTitle={"Buy Package 101"} tData={data} tColumns={columns} />
                    </Grid>
                </Grid>
            </Dialog>

            <Dialog
                maxWidth="xl"
                open={isShowConfirm}
                onClose={() => setIsShowConfirm(!isShowConfirm)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                TransitionComponent={Transition}
            >
                <Grid container>
                    <Grid item container xs={12}>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={8}><div className="center"><h1>ຢືນຢັນການຊື້ແພັກເກັດ</h1></div></Grid>
                        <Grid item xs={2}>
                            <div className="right">
                                <IconButton aria-label="delete" onClick={() => setIsShowConfirm(!isShowConfirm)}>
                                    <Close />
                                </IconButton>
                            </div>
                        </Grid>
                        <Grid item xs={6} >
                            <div className="center"><Button variant="contained" color="primary" className='btn-defualt' fullWidth style={{ height: 39, marginTop: 5 }} aria-label="delete" onClick={() => setIsShowConfirm(!isShowConfirm)}>
                                <a>ຍົກເລີກ</a>
                            </Button></div>

                        </Grid>
                        <Grid item xs={6}>
                            <div className="center">
                                {<Button disabled={isLoading} variant="contained" color="primary" className='btn-success' fullWidth style={{ height: 39, marginTop: 5 }} aria-label="delete" onClick={_onBuyPackage}>
                                    {isLoading ? <>ກຳລັງກວດສອບ &nbsp;&nbsp;<CircularProgress size={25} /></> : <>ຕົກລົງ</>}
                                </Button>}
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </Dialog>

            <Dialog
                maxWidth="xl"
                open={isShowSuccess}
                onClose={() => setIsShowSuccess(!isShowSuccess)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                TransitionComponent={Transition}
            >
                <Grid container>
                    <Grid item container xs={12} style={{ width: 600 }}>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={10}>
                            <div className="center">
                                <h1>Status : {bkData?.code}</h1>
                                <h3>{bkData?.message}</h3>
                            </div>
                        </Grid>
                        <Grid item xs={1}>
                            <div className="right">
                                <IconButton aria-label="delete" onClick={() => setIsShowSuccess(!isShowSuccess)}>
                                    <Close />
                                </IconButton>
                            </div>
                        </Grid>  
                    </Grid>
                </Grid>
            </Dialog>

        </>
    )
}

export default BuyPackage101