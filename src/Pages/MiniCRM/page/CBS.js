import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import { Tab } from '@material-ui/core';
import LoadingLottie from '../../Components/LoadingLottie';
import OCSRefill from './OCSRefill'
import OCSSubfering from './OCSSubfering'
import AllFree from './AllFree'
import Crypt from '../../Components/Crypt'
import Doing from '../../Components/Doing'
import Offering from './Offering';
import cookie from 'js-cookie'
import MyTable from '../Table/Table'
import Axios from '../../Components/Axios'
import GetPhoneNumber from '../../Components/GetPhoneNumber'
import moment from 'moment';
// import { da } from 'date-fns/locale';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});


export default function CBS() {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)
  const [stop, setStop] = React.useState(false)
  const [data, setData] = React.useState([])
  React.useEffect(() => {
    setStop(true)
    Doing({
      msisdn: Crypt({ type: "decrypt", value: localStorage.getItem("input-phone") }).text,
      username: Crypt({ type: "decrypt", value: localStorage.getItem("one_info") }).username,
      detail: 'check CBS',
      resualt: 'Operation successed.',
    })
  }, [])


  React.useEffect(() => {
    var phone = GetPhoneNumber()
    Axios.get("CbsRechargeLog?msisdn=" + phone, { headers: { 'Authorization': 'Bearer ' + cookie.get("one_session") } }).then(res => {
      if (res.status === 200) {
        let data = res.data.QueryRechargeLogResultMsg
        if (data?.QueryRechargeLogResult) {
          if (!Array.isArray(data?.QueryRechargeLogResult?.Record_ItemGroup)) {
            data.QueryRechargeLogResult.Record_ItemGroup = [data.QueryRechargeLogResult.Record_ItemGroup]
          }
          var num = 0
          let update = []
          for (let i = 0; i < data?.QueryRechargeLogResult?.Record_ItemGroup?.length; i++) {
            let row = data?.QueryRechargeLogResult?.Record_ItemGroup[i]
            if (row?.SerialNo) {
              let tradeTime = row.TradeTime.toString()
              row.id_idx = num + 1
              row.FaceValue = row?.FaceValue?.toLocaleString()
              row.TradeTime = tradeTime.substring(6, 8) + "/" + tradeTime.substring(4, 6) + "/" + tradeTime.substring(0, 4) + " " + tradeTime.substring(8, 10) + ":" + tradeTime.substring(10, 12) + ":" + tradeTime.substring(12, 14)
              num = num + 1
              update.push(row)
            }
          }
          setData(update)
        }
      }
    }).catch(err => {
    })
  }, [])
  const columns = [
    { title: 'No', field: 'id_idx', maxWidth: 50 },
    { title: 'RechargeNumber', field: 'RechargeNumber' },
    { title: 'SerialNo', field: 'SerialNo' },
    { title: 'TradeTime', field: 'TradeTime' },
    { title: 'FaceValue', field: 'FaceValue' }
  ]

  function ShowData() {
    return (
      <>
        <MyTable tTitle={"CBSRecharge"} tData={data} tColumns={columns} />
      </>
    )
  }


  return (
    <>
      {!stop ? <LoadingLottie loadStop={stop} loadHeight={800} /> : <ShowData />}
    </>
  )
}
