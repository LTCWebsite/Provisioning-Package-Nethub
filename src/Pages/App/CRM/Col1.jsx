import { PhoneIphone } from '@material-ui/icons'
import { CheckCircle, PersonOutline } from '@mui/icons-material'
import { Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Register3Grab from './Col1/3grab/Register3Grab'
import Balance from './Col1/Balance'
import Debit from './Col1/Debit'
import BlackList from './Col1/BlackList/BlackList'
import BssRegister from './Col1/Bss/BssRegister'
import LifeCycle from './Col1/LifeCycle'
import MobileService from './Col1/MobileService/MobileService'
import Network from './Col1/Network'
import { AxiosReq } from '../../../Components/Axios'
import useFtthInfo from '../../../hooks/useFtthInfo'
import VAS from './Col1/VAS/VAS'
import Application from './Col1/Application/Application'
import Ocs from './Col1/Ocs/Ocs'
import cookie from 'js-cookie'
import { MyCrypt } from "../../../Components/MyCrypt"
import ResetPassCBS from './Col1/Ocs/ResetPassCBS'
import CusFtthInfo from './Col1/Ocs/cusftthInfo'
import FtthBundleMsisdn from './Col1/Bundle/FtthBundle'
import PopupTable from './Col2/PopupTable/PopupTable'
import PopupFtthFreeMsisdn from './Col2/PopupTable/PopupFtthFreeMsisdn'


function Col1() {
    const phone = localStorage.getItem("ONE_PHONE")
    let type = MyCrypt("de", localStorage.getItem("ONE_NETWORK"))
    const [check, setCheck] = useState({ n_3g: false, n_4g: false, rbt: false, ir_call: false, ir_data: false, load: true })
    const [is5G, setIs5G] = useState(false)
    const [bss, setBSS] = useState('')
    const [backlist, setBacklist] = useState('')
    const [load, setLoad] = useState(true)
    const [cus, setCus] = useState()
    const [ocs, setOcs] = useState('')
    const [ocsSt, setOcsSt] = useState('')
    const { ftthData, ftthShow, ftthFreeMsisdn, ftthFreeMsisdnShow, ftthBookingList, ftthBookingShow, rerunRows, rerunLoading, rerunError, fetchRerunList, fetchFtthBookingList, fetchFtthData } = useFtthInfo(type?.NETWORK_CODE)

    useEffect(() => {
        let phone = localStorage.getItem("ONE_PHONE")
        AxiosReq.get("QueryHLRInfo?msisdn=" + phone, { headers: { 'Authorization': 'Bearer ' + cookie.get("ONE_TOKEN") } }).then(res => {
            if (res.status === 200) {
                // console.log(res.data)
                setCheck({
                    ...check,
                    n_3g: res.data?.queryServiceResult?.open3G === '1' ? true : false,
                    n_4g: res.data?.queryServiceResult?.open4G === '1' ? true : false,
                    rbt: res.data?.queryServiceResult?.openRBT === '1' ? true : false,
                    ir_call: res.data?.queryServiceResult?.irCall === '1' ? true : false,
                    ir_data: res.data?.queryServiceResult?.irData === '1' ? true : false,
                    load: false
                })
            }
        }).catch(er => {
            console.log(er)
        })
    }, [])

    useEffect(() => {
        let phone = localStorage.getItem("ONE_PHONE")
        AxiosReq.get("api/Network5g?Msisdn=" + phone, { headers: { 'Authorization': 'Bearer ' + cookie.get("ONE_TOKEN") } }).then(res => {
            if (res.status === 200) {
                // console.log(res.data)
                setIs5G(res?.data?.is5G)
            }
        }).catch(er => {
            console.log(er)
        })
    }, [])

    return (
        <>
            <Grid container
            >
                <Grid item xs={12} md={12} lg={`${type?.NETWORK_CODE === 'F' ? 6 : 6}`} className={`box-crm`}>
                    <Grid item xs={12} md={12} lg={`${type?.NETWORK_CODE === 'F' ? 12 : 12}`}>
                        <Grid item xs={12}><h2 className='blue'>Info</h2></Grid>
                        {type?.NETWORK_CODE === 'F' ?
                            <CusFtthInfo data={ftthData} show={ftthShow} /> :
                            <Register3Grab />}

                        {/* <BssRegister cb={(e) => setBSS(e)} /> */}

                        {/* <Grid item container xs={12} className='link-box'>
                            <Grid item xs={4}><PhoneIphone /></Grid>
                            <Grid item xs={8}><div className='text-right'>{phone}</div></Grid>
                        </Grid>
                        <Grid item container xs={12} className='link-box'>
                            <Grid item xs={4}><PersonOutline /></Grid>
                            <Grid item xs={8}><div className='text-right'>{bss?.name !== "" ? bss.name : "---"}</div></Grid>
                        </Grid> */}
                        <Network />
                        {type?.NETWORK_CODE === 'G' || type?.NETWORK_CODE === 'A' || type?.NETWORK_CODE === 'P' || type?.NETWORK_CODE === 'F' || type?.NETWORK_CODE === 'WP' || type?.NETWORK_CODE === 'L' || type?.NETWORK_CODE === 'DR' ? <Debit /> : null}
                    </Grid>

                    <Grid item xs={12} md={12} lg={`${type?.NETWORK_CODE === 'F' ? 12 : 12}`}>
                        <Ocs load={load} st={backlist?.currentStatus} cus={cus} />

                        {type?.NETWORK_CODE === 'M' || type?.NETWORK_CODE === 'H' || type?.NETWORK_CODE === 'W' ? <Balance /> : null}
                        <BlackList data={backlist} load={load} />
                        {/* <Grid item container xs={12} className='link-box'>
                        <Grid item xs={4}><p>ResetPasswordCBS</p></Grid>

                    </Grid> */}
                        <ResetPassCBS />

                        <h2 className='blue'>Value Add Service ປິດໄວ້ຊົ່ວຄາວ</h2>
                        {/* <VAS /> */}
                    </Grid>

                </Grid>

                {type?.NETWORK_CODE !== 'F' && (<Grid item xs={12} md={12} lg={6} className="box-crm">
                    <h2 className='blue'>Life Cycle</h2>
                    <LifeCycle cb={(e) => setBacklist(e)} load={(e) => setLoad(e)} cbCus={(e) => setCus(e)} />
                    <h2 className='blue'>Mobile Service Data</h2>
                    <MobileService check={check} is5G={is5G} cb={(e) => setCheck(e)} cbis5G={(e) => { setIs5G(e) }} />
                    <h2 className='blue'>Application</h2>
                    <Application />
                </Grid>)}

                {type?.NETWORK_CODE === 'F' && (<Grid item xs={12} md={12} lg={6} className="box-crm">
                    <h2 className='blue'>FTTH Bundle (MCare)</h2>
                    <FtthBundleMsisdn data={ftthData} show={ftthShow} />
                    <h2 className='blue'>FTTH Rerun</h2>
                    <PopupTable 
                        rows={rerunRows} 
                        loading={rerunLoading} 
                        error={rerunError} 
                        fetchData={fetchRerunList}
                        onRefreshFtth={fetchFtthData}
                    />
                    <h2 className='blue'>FTTH Free Number</h2>
                    <PopupFtthFreeMsisdn 
                        rows={ftthFreeMsisdn || []} 
                        loading={!ftthFreeMsisdnShow} 
                        bookingRows={ftthBookingList || []}
                        bookingLoading={!ftthBookingShow}
                        fetchBookingData={fetchFtthBookingList}
                    />
                </Grid>)}

            </Grid>
        </>
    )
}

export default Col1