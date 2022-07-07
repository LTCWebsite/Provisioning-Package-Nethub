import React from 'react'
import MaterialTable from 'material-table'
import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { Dialog, DialogTitle, Grid, Table, TableBody, TableCell, TableHead, TableRow, Tooltip } from '@mui/material'
import { AxiosReq } from '../../../../../../Components/Axios';
import { Close, YoutubeSearchedFor } from '@mui/icons-material';


const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <YoutubeSearchedFor {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

export default function Tablepackage({ total }) {
  const TextToDate = (text) => {
    if (text.length > 0) {
      let me = text.substr(0, 4) + "-" + text.substr(4, 2) + "-" + text.substr(6, 2) + " " + text.substr(8, 2) + ":" + text.substr(10, 2) + ":" + text.substr(12, 2)
      return me
    }
  }
  const [option, setOption] = React.useState({ bss: [], ocs: [], hlr: [], offering: [], pcrf: [], point: [] })
  const [loadOp, setLoadOp] = React.useState({ load: false, id: '' })
  const Columns = [
    // { title: 'TransID', field: 'trans_id', maxWidth: 50, sorting: false, render: row => row.trans_id.length < 5 ? row.trans_id : <Tooltip title={row.trans_id}><div>...{row.trans_id?.substring(row.trans_id.length - 5, row.trans_id.length)}</div></Tooltip> },
    { title: 'Msisdn', field: 'msisdn', minWidth: 150, sorting: false, render: row => row.msisdn.length <= 10 ? <div>{row.msisdn}</div> : <Tooltip title={row.msisdn}><div>{row.msisdn?.substring(row.msisdn.length - 10, row.msisdn.length)}</div></Tooltip> },
    { title: 'StartDate', field: 'start_date', minWidth: 400, render: row => TextToDate(row.start_date) },
    { title: 'StopDate', field: 'stop_date', minWidth: 400, render: row => TextToDate(row.stop_date) },
    { title: 'UserID', field: 'user_id', minWidth: 100 },
    // { title: 'Chanel', field: 'chanel', maxWidth: 100 },
    // { title: 'DataCharging', field: 'data_charging', minWidth: 100 },
    { title: 'PkCode', field: 'pkcode', minWidth: 100 },
    { title: 'PkType', field: 'pktype', minWidth: 100 },
    { title: 'SrvType', field: 'srvtype', minWidth: 200 },
    { title: 'Amount', field: 'amount', minWidth: 200, type: 'numeric', render: row => row.amount?.toLocaleString() },
    // { title: 'ResultCode', field: 'resultCode', maxWidth: 200 },
    { title: 'ResultDesc', field: 'resultDesc', minWidth: 250, render: row => row.resultDesc.length <= 25 ? row.resultDesc : <Tooltip title={row.resultDesc}><div>{row.resultDesc?.substring(0, 25)}...</div></Tooltip> },
    { title: 'ResultMessage', field: 'resultMessage', minWidth: 200, render: row => row.resultMessage.length <= 25 ? row.resultMessage : <Tooltip title={row.resultMessage}><div>{row.resultMessage?.substring(0, 25)}...</div></Tooltip> },
  ]
  const [data, setData] = React.useState({ data: [], page: 1, limit: 10 })
  const [load, setLoad] = React.useState(false)
  const [show, setShow] = React.useState(false)
  const [tran, setTran] = React.useState('')
  React.useEffect(() => {
    let phone = localStorage.getItem("ONE_PHONE")
    setLoad(true)
    AxiosReq.get("New_PackageHistory?msisdn=" + phone + "&page=" + data.page + "&limit=" + data.limit + "&total=" + total).then(res => {
      if (res.status === 200) {
        setData({ ...data, data: res.data.data })
        // console.log(res.data)
        setLoad(false)
      }
    }).catch(er => {
      setLoad(false)
    })
  }, [])
  return (
    <>
      <MaterialTable
        title={"Package History"}
        icons={tableIcons}
        columns={Columns}
        data={data.data}
        isLoading={load}
        options={{
          sorting: true,
          exportButton: true,
          pageSize: data.limit,
          pageSizeOptions: [10, 20],
          // columnsButton: true,
          search: false
        }}
        actions={[
          {
            icon: tableIcons.Search,
            tooltip: 'View More',
            onClick: (event, rows) => {
              let trans = rows.trans_id
              console.log(trans)
              let month = rows.month
              setShow(true)
              setTran(trans)
              setLoadOp({ ...loadOp, load: true, id: trans })
              AxiosReq.get("New_PackageLog?trans_id=" + trans + "&month=" + month).then(res => {
                if (res.status === 200) {
                  let resp = res.data
                  setOption({
                    ...option,
                    bss: resp?.bss_log?.length > 0 ? resp.bss_log : [],
                    ocs: resp?.ocs_log?.length > 0 ? resp.ocs_log : [],
                    hlr: resp?.hlr_log?.length > 0 ? resp.hlr_log : [],
                    offering: resp?.offering_log?.length > 0 ? resp.offering_log : [],
                    pcrf: resp?.pcrf_log?.length > 0 ? resp.pcrf_log : [],
                    point: resp?.point_log?.length > 0 ? resp.point_log : []
                  })
                  console.log(res.data)
                  setLoadOp({ ...loadOp, load: false })
                }
              }).catch(er => {
                setLoadOp({ ...loadOp, load: false })
              })
            }
          }
        ]}
      />

      <Dialog
        open={show}
        onClose={() => setShow(false)}
        maxWidth={1000}
      >
        <Grid container>
          <Grid item xs={3}></Grid>
          <Grid item xs={6}>
            <DialogTitle className='center'>TransID : {tran}</DialogTitle>
          </Grid>
          <Grid item xs={3}>
            <div className='right'><Close className='icon' onClick={() => setShow(false)} /></div>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} style={{ width: 1000 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>TransID</TableCell>
                  <TableCell>Msisdn</TableCell>
                  <TableCell>Chanel</TableCell>
                  <TableCell>TransID</TableCell>
                  <TableCell>TransID</TableCell>
                  <TableCell>ResultCode</TableCell>
                  <TableCell>ResultDesc</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={7} className="head">OCS log</TableCell>
                </TableRow>
                {option?.ocs?.map((row, idx) => {
                  return (
                    <TableRow key={idx}>
                      <TableCell>{row.trans_id}</TableCell>
                      <TableCell>{row.msisdn.substr(row.msisdn.length - 10, row.msisdn.length)}</TableCell>
                      <TableCell>{row.chanel}</TableCell>
                      <TableCell>{row.main_product}</TableCell>
                      <TableCell>{row.resultCode}</TableCell>
                      <TableCell>{row.resultDesc}</TableCell>
                    </TableRow>
                  )
                })}

                <TableRow>
                  <TableCell colSpan={7} className="head">PCRF log</TableCell>
                </TableRow>
                {option?.pcrf?.map((row, idx) => {
                  return (
                    <TableRow key={idx}>
                      <TableCell>{row.trans_id}</TableCell>
                      <TableCell>{row.msisdn.substr(row.msisdn.length - 10, row.msisdn.length)}</TableCell>
                      <TableCell>{row.chanel}</TableCell>
                      <TableCell>{row.cm_type}</TableCell>
                      <TableCell>{row.detail}</TableCell>
                      <TableCell>{row.resultCode}</TableCell>
                      <TableCell>{row.resultDesc}</TableCell>
                    </TableRow>
                  )
                })}

                <TableRow>
                  <TableCell colSpan={7} className="head">Point log</TableCell>
                </TableRow>
                {option?.point?.map((row, idx) => {
                  return (
                    <TableRow key={idx}>
                      <TableCell>{row.trans_id}</TableCell>
                      <TableCell>{row.msisdn.substr(row.msisdn.length - 10, row.msisdn.length)}</TableCell>
                      <TableCell>{row.point}</TableCell>
                      <TableCell>{row.resultCode}</TableCell>
                      <TableCell>{row.resultDesc}</TableCell>
                    </TableRow>
                  )
                })}

              </TableBody>
            </Table>
          </Grid>
        </Grid>
      </Dialog>
    </>
  )
}