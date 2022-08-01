import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import { Tab } from '@material-ui/core';
import { LoadingTable } from '../../../../../../Components/TableLoading';
import LTCWifiHistory from './LTCWifiHistory'
import PinLTCWifiHistory from './PinLTCWifiHistory';


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


export default function WifiTab() {
    const classes = useStyles()
    const [value, setValue] = React.useState(0)
    const [stop, setStop] = React.useState(false)

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }
    React.useEffect(() => {
        setStop(true)
        // Doing({
        //     msisdn: Crypt({ type: "decrypt", value: localStorage.getItem("input-phone") }).text,
        //     username: Crypt({ type: "decrypt", value: localStorage.getItem("one_info") }).username,
        //     detail: 'check LTC wifi',
        //     resualt: 'Operation successed.',
        // })
    }, [])

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
                        <Tab label="LTC Wifi History" />
                        <Tab label="Pin LTC Wifi History" />
                    </Tabs>
                </Paper>
                {/* ///////////////////////////////       Tab Sub */}
                <TabPanel value={value} index={0}>
                    <LTCWifiHistory />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <PinLTCWifiHistory />
                </TabPanel>
                {/* ///////////////////////////////////       end tab Sub */}
            </>
        )
    }

    return (
        <>
            {!stop ? <LoadingTable /> : <ShowData />}
        </>
    )
}
