import { Grid } from '@mui/material'
import React from 'react'
import Banking from './Col2/Banking/Banking'
import BillQuery from './Col2/BillQuery/BillQuery'
import Game from './Col2/Game/Game'
import Others from './Col2/Others/Others'
import Packages from './Col2/Package/Packages'
import { MyCrypt } from '../../../Components/MyCrypt'
import OCS_invoice from './Col2/PaymentHistory/OCS_invoice'
import FtthBundle from './Col2/FtthBundle/FTTHBundleTap'

function Col2() {
  let type = MyCrypt("de", localStorage.getItem("ONE_NETWORK"))
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