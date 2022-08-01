import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import { Tab, Grid, Table, TableBody, TableRow, TableCell } from '@material-ui/core';
import { AxiosReq } from '../../../../../../Components/Axios'
// import Doing from '../../Components/Doing'
import { LoadingTable } from '../../../../../../Components/TableLoading'

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Grid container>{children}</Grid>
      )}
    </div>
  );
}


export default function HLRtab() {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)
  const [sub, setSub] = React.useState([])
  const [dynSub, setdynSub] = React.useState([])
  const [cbar, setCbar] = React.useState([])
  const [stop, setStop] = React.useState(false)
  React.useEffect(() => {
    var phone = localStorage.getItem("ONE_PHONE")
    AxiosReq.post("QueryHLRInfo?msisdn=" + phone, {}).then(res => {
      if (res.status === 200) {
        var mySub = JSON.parse(res.data.listSub.replaceAll('@Name', 'AName')).Result.ResultData.Group
        var myCBAR = JSON.parse(res.data.listCBAR.replaceAll('@Name', 'AName')).Result.ResultData.Group
        var myDy = JSON.parse(res.data.listDYNSub.replaceAll('@Name', 'AName')).Result.ResultData.Group
        setSub(mySub)
        setdynSub(myDy)
        setCbar(myCBAR)
        // console.log(mySub)
        setStop(true)
        // setTimeout(() => {
        //   Doing({
        //     msisdn: Crypt({ type: "decrypt", value: localStorage.getItem("input-phone") }).text,
        //     username: Crypt({ type: "decrypt", value: localStorage.getItem("one_info") }).username,
        //     detail: 'check HLR',
        //     resualt: 'Operation successed.',
        //   })
          
        // }, 200)
      }
    })
  }, [])
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  function ShowData() {
    return (
      <>
        <Paper className={classes.root}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Sub" />
            <Tab label="Dynamic Subscriber" />
            <Tab label="CB Service" />
          </Tabs>
        </Paper>
        {/* ///////////////////////////////       Tab Sub */}
        <TabPanel value={value} index={0} style={{ paddingLeft: 100, paddingRight: 100 }}>
          <ShowALL data={sub} />
        </TabPanel>
        <TabPanel value={value} index={1} style={{ paddingLeft: 100, paddingRight: 100 }}>
          <ShowALL data={dynSub} />
        </TabPanel>
        <TabPanel value={value} index={2} style={{ paddingLeft: 100, paddingRight: 100 }}>
          <ShowALL data={cbar} />
        </TabPanel>
        {/* ///////////////////////////////////       end tab Sub */}
      </>
    )
  }
  function ShowALL({ data: Data }) {
    return (
      <>
        {Data?.length > 0 ?
          <Grid container item xs={12} lg={12} className="abc">
            <Table style={{ marginTop: 10 }}>
              <TableBody>
                {Data.map(row => {
                  return (
                    <>
                      {Object.keys(row).length > 0 && Object.keys(row).map(r =>
                        <>
                          {r !== 'AName' ?
                            r !== 'Group' ?
                              <>
                                <TableRow>
                                  <TableCell width={'40%'}></TableCell>
                                  <TableCell>{r} = {row[r]}</TableCell>
                                </TableRow>
                              </>
                              :
                              <>
                                {/* ////////////////////  Group */}
                                {row.Group.length > 0 ? row.Group.map(g =>
                                  <>
                                    {Object.keys(g).length > 0 && Object.keys(g).map(gkey =>
                                      <>
                                        {gkey !== 'AName' ?
                                          gkey !== 'TS' ?
                                            <>
                                              <TableRow>
                                                <TableCell width={'40%'}></TableCell>
                                                <TableCell>{gkey} = {g[gkey]}</TableCell>
                                              </TableRow>
                                            </>
                                            :
                                            <>
                                              {/* ///////////////////////// ///////////////   TS */}
                                              {g.TS && g.TS.map((t, i) =>
                                                <>
                                                  <TableRow>
                                                    <TableCell width={'40%'}></TableCell>
                                                    <TableCell>{i} = {t}</TableCell>
                                                  </TableRow>
                                                </>
                                              )}
                                            </>
                                          :
                                          <>
                                            {/* ////////////////////////////////////////    AName */}
                                            <TableRow>
                                              <TableCell width={'40%'}>{g[gkey]}</TableCell>
                                              <TableCell></TableCell>
                                            </TableRow>
                                          </>}
                                      </>
                                    )}

                                  </>
                                ) :
                                  <>
                                    {row.Group.TS.length > 0 && row.Group.TS.map((me, i) =>
                                      <>
                                        {row.Group.length < 0 && row.Group.TS.length > 0 && row.Group.TS.map((me, i) =>
                                          <>
                                            <TableRow>
                                              <TableCell width={'40%'}></TableCell>
                                              <TableCell>{i} = {me}</TableCell>
                                            </TableRow>
                                          </>
                                        )}
                                      </>
                                    )}
                                  </>
                                }
                              </>
                            :
                            <>
                              {/* ////////////////////    AName */}
                              <TableRow>
                                <TableCell width={'40%'}>{row[r]}</TableCell>
                                <TableCell></TableCell>
                              </TableRow>
                            </>}
                        </>
                      )}
                    </>
                  )
                }
                )}
              </TableBody>
            </Table>
          </Grid>
          : null}
      </>
    )
  }

  return (
    <>
      {!stop ? <LoadingTable md={true} /> : <ShowData />}
    </>
  )
}
