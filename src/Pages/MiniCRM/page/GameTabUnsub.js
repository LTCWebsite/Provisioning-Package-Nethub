import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Tabs, Select, MenuItem } from "@material-ui/core";
import { Tab } from "@material-ui/core";
import LoadingLottie from "../../Components/LoadingLottie";
// import GameLoft from './GameLoft'
import Coda from "./Coda";
import LinkIT360 from "./LinkIT360";
import Crypt from "../../Components/Crypt";
import Doing from "../../Components/Doing";
import DebugGame from "./DebugGame";

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
      {value === index && <div>{children}</div>}
    </div>
  );
}

export default function GameTabUnsub() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [stop, setStop] = React.useState(false);
  const [gameSelected, setGameSelected] = React.useState("product@codapayments.com");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  React.useEffect(() => {
    setStop(true);
    Doing({
      msisdn: Crypt({
        type: "decrypt",
        value: localStorage.getItem("input-phone"),
      }).text,
      username: Crypt({
        type: "decrypt",
        value: localStorage.getItem("one_info"),
      }).username,
      detail: "check game",
      resualt: "Operation successed.",
    });
  }, []);

  const GAME_LIST = [
      {email:"product@codapayments.com",name:"CODA PAY"},
      {email:"ryan.hong@linkit360.com",name:"LinkIT360"},
      {email:"aldo.bangsawan@linkit360.com",name:"Airpay"}
  ]

//   React.useEffect(()=>{
//     console.log(gameSelected)
//   },[gameSelected])

  function ShowData() {
    return (
      <>
      <div style={{display:'flex',justifyContent:'center',padding:"10px 0"}}>
      <Select
          centered
          defaultValue={0}
          value={gameSelected}
          onChange={(e) => {
            setGameSelected(e.target.value);
          }}
        >
          <MenuItem value={0}>ຈຳນວນທີ່ຕ້ອງການຄົ້ນຫາ</MenuItem>
          {GAME_LIST.map((row) => (
            <MenuItem value={row.email}>{row.name}</MenuItem>
          )) ?? null}
        </Select>
      </div>
        
        <Paper className={classes.root}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="REQUEST" />
            {/* <Tab label="GameLoft" /> */}
            <Tab label="SMS" />
            <Tab label="ຕັດເງີນ" />
          </Tabs>
        </Paper>
        {/* ///////////////////////////////       Tab Sub */}
        <TabPanel value={value} index={0}>
          <Coda email={gameSelected} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <LinkIT360 email={gameSelected}/>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <DebugGame email={gameSelected}/>
        </TabPanel>
        {/* <TabPanel value={value} index={1}>
                    <GameLoft />
                </TabPanel> */}
        {/* ///////////////////////////////////       end tab Sub */}
      </>
    );
  }

  return (
    <>
      {!stop ? (
        <LoadingLottie loadStop={stop} loadHeight={800} />
      ) : (
        <ShowData />
      )}
    </>
  );
}
