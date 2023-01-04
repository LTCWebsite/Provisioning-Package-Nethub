import { Grid } from '@mui/material'
import React from 'react'
import { MyCrypt } from "../../../../Components/MyCrypt"

function Network() {
    let type = MyCrypt("de", localStorage.getItem("ONE_NETWORK"))
    return (
        <Grid item xs={12} container className=''>
            <Grid item container xs={12} className='link-box'>
                <Grid item xs={6}><div>Network Name : </div></Grid>
                <Grid item xs={6}><div className='text-right'>{type?.NETWORK_NAME}</div></Grid>
            </Grid>
            <Grid item container xs={12} className='link-box'>
                <Grid item xs={6}><div>Product Type : </div></Grid>
                <Grid item xs={6}><div className='text-right'>
                    {
                    type?.NETWORK_CODE === 'M' ? 'ເບີປະເພດຕື່ມເງິນ' : 
                    type?.NETWORK_CODE === 'H' ? 'ເບີປະເພດເນັດຊິມ' :
                    type?.NETWORK_CODE === 'W' ? 'ເບີປະເພດ Winphone ຕື່ມເງິນ' :
                    type?.NETWORK_CODE === 'G' ? 'ເບີປະເພດລາຍເດືອນ' : 
                    type?.NETWORK_CODE === 'F' ? 'ເບີປະເພດ FTTH' : 
                    type?.NETWORK_CODE === 'A' ? 'ເບີປະເພດ ADSL' :
                    type?.NETWORK_CODE === 'L' ? 'ເບີປະເພດ Leadline' :
                    type?.NETWORK_CODE === 'P' ? 'ເບີປະເພດ PSTN' :
                    type?.NETWORK_CODE === 'WP' ? 'ເບີປະເພດ Winphone ລາຍເດືອນ' :
                    type?.NETWORK_CODE
                    }
                </div></Grid>
            </Grid>
        </Grid>
    )
}

export default Network