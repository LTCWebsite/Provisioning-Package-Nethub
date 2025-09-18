import { Grid } from '@mui/material'
import { useState } from 'react'
import Banking from './Col2/Banking/Banking'
import BillQuery from './Col2/BillQuery/BillQuery'
import Game from './Col2/Game/Game'
import Others from './Col2/Others/Others'
import Packages from './Col2/Package/Packages'
import Packages101 from './Col2/Package101/Packages101'
import { MyCrypt } from '../../../Components/MyCrypt'
import OCS_invoice from './Col2/PaymentHistory/OCS_invoice'
import FtthBundle from './Col2/FtthBundle/FTTHBundleTap'
import { AxiosReq3 } from '../../../Components/Axios'
import { useEffect } from 'react'
import  cookie from 'js-cookie'

function Col2() {

  const [data, setData] = useState([])

  let type = MyCrypt("de", localStorage.getItem("ONE_NETWORK"))
  const username = localStorage.getItem("USERNAME")

  useEffect(() => {
    AxiosReq3.get("CheckUserName101/CheckUserName101?username=" + username,{ headers: { 'Authorization': 'Bearer ' + cookie.get("ONE_TOKEN") } })
      .then(res => {
        if (res.success !== true) {
          setData(res?.data)
        }
      }).catch(error => {
        //console.log("Maeng :", error.message)
      });
  }, []);


  return (
    <>
      <Grid container>
        <Grid container item xs={12} md={12} lg={12} className="box-crm">
          <Grid item xs={12}>
            {(type?.NETWORK_CODE === 'M' || type?.NETWORK_CODE === "H" || type?.NETWORK_CODE === 'W') ? <>
              <h2 className='blue'>ປະຫວັດການຕັດເງິນ</h2>
              <BillQuery />
            </>
              :
              <Grid container>
                <Grid item xs={12}>
                  <h2 className='blue'>ປະຫວັດເບີລາຍເດືອນ</h2>

                  <OCS_invoice />

                </Grid>
              </Grid>
            }

          </Grid>
        </Grid>
        <Grid container item xs={12} md={12} lg={6} className="box-crm">
          <Grid item xs={12}>
            <h2 className='blue'>ດາຕ້າແພັກເກັດ</h2>
            <Packages />
            <>
              {data?.success === true && (
                <>
                  <h2 className="blue">ດາຕ້າແພັກເກັດ 101</h2>
                  <Packages101 />
                </>
              )}
            </>
            <h2 className='blue'>Banking</h2>
            <Banking />

            <h2 className='blue'>FTTH Bundle</h2>
            <FtthBundle />
          </Grid>
        </Grid>
        <Grid container item xs={12} md={12} lg={6} className="box-crm">
          <Grid item xs={12}>

            <h2 className='blue'>ເກມ</h2>
            <Game />
            <h2 className='blue'>ອື່ນໆ</h2>
            <Others />

          </Grid>
        </Grid>

      </Grid>
    </>
  )
}

export default Col2