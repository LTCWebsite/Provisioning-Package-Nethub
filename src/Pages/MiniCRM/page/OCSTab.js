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
        <div>{children}</div>
      )}
    </div>
  );
}


export default function OCSTab() {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)
  const [stop, setStop] = React.useState(false)
  React.useEffect(() => {
    setStop(true)
    Doing({
      msisdn: Crypt({ type: "decrypt", value: localStorage.getItem("input-phone") }).text,
      username: Crypt({ type: "decrypt", value: localStorage.getItem("one_info") }).username,
      detail: 'check OCS',
      resualt: 'Operation successed.',
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
            <Tab label="All Free" />
            <Tab label="Refill" />
            {/* <Tab label="Subfering" /> */}
            <Tab label="Offering" />
          </Tabs>
        </Paper>
        {/* ///////////////////////////////       Tab Sub */}
        <TabPanel value={value} index={0}>
          <AllFree />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <OCSRefill />
        </TabPanel>
        {/* <TabPanel value={value} index={2}>
          <OCSSubfering />
        </TabPanel> */}
        <TabPanel value={value} index={2}>
          <Offering />
        </TabPanel>
      </>
    )
  }


  return (
    <>
      {!stop ? <LoadingLottie loadStop={stop} loadHeight={800} /> : <ShowData />}
    </>
  )
}
