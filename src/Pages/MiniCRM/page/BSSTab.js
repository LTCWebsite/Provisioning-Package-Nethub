import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import { Grid, Tab } from '@material-ui/core';
import LoadingLottie from '../../Components/LoadingLottie';
// import GameLoft from './GameLoft'
import BSS from './BSS';
import Payment from './Payment'
import Crypt from '../../Components/Crypt'
import Doing from '../../Components/Doing'
import { Alert } from '@material-ui/lab';


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


export default function BSSTab() {
    const classes = useStyles()
    const [value, setValue] = React.useState(0)
    const [stop, setStop] = React.useState(false)

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }
    React.useEffect(() => {
        setStop(true)
        Doing({
            msisdn: Crypt({ type: "decrypt", value: localStorage.getItem("input-phone") }).text,
            username: Crypt({ type: "decrypt", value: localStorage.getItem("one_info") }).username,
            detail: 'check game',
            resualt: 'Operation successed.',
        })
    }, [])

    function ShowData() {
        return (
            <>
                <Grid container>
                    <Grid item md={2} lg={3} xl={4}></Grid>
                    <Grid item xs={12} md={8} lg={6} xl={4}>
                        <Alert variant="outlined" severity="info" style={{ marginTop: 10 }}>
                            ກໍລະນີທີ່ຕ້ອງການສະແດງຂໍ້ມູນຫຼາຍກ່ວາ 10 ລາຍການ ໃຫ້ຄຼິກໄປທີ່ More Detail ຢູ່ດ້ານລຸ່ມ
                        </Alert>
                    </Grid>
                </Grid>
                <Paper className={classes.root}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                    >
                        <Tab label="BSS" />
                        {/* <Tab label="Payment" /> */}
                    </Tabs>
                </Paper>
                {/* ///////////////////////////////       Tab Sub */}
                <TabPanel value={value} index={0}>
                    <BSS />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Payment />
                </TabPanel>
                {/* ///////////////////////////////////       end tab Sub */}
            </>
        )
    }

    return (
        <>
            {!stop ? <LoadingLottie loadStop={stop} loadHeight={800} /> : <ShowData />}
        </>
    )
}
