import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import { Tab } from '@material-ui/core';
import LoadingLottie from '../../../../../../Components/LoadingLottie';
import MServiceTopup from './MServiceTopup'
import MServiceTransfer from './MServiceTransfer'
import { AxiosReq } from '../../../../../../Components/Axios';
import moment from 'moment';


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


export default function MServiceTab({ count }) {
    const classes = useStyles()
    const [value, setValue] = React.useState(0)
    const [stop, setStop] = React.useState(false)
    const [data, setData] = React.useState([])

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }
    React.useEffect(() => {
        setStop(false)
        var phone = localStorage.getItem("ONE_PHONE")
        AxiosReq.get("MServicesTopup?msisdn=" + phone + "&status=REQUEST").then((res) => {
            if (res.status === 200) {
                var num = 0;
                var update = res.data.map((row) => {
                    row.id_idx = num + 1;
                    row.recodeDate = moment(row.recodeDate).format(
                        "DD-MM-YYYY HH:mm:ss"
                    );
                    row.all_status = row.resultCode === '200' ? false : true
                    num = num + 1;
                    return row;
                });
                setData(update);
                setStop(true);
                // console.log(update)
            }
        }).catch((err) => {
            setStop(true);
        })
        // Doing({
        //     msisdn: Crypt({ type: "decrypt", value: localStorage.getItem("input-phone") }).text,
        //     username: Crypt({ type: "decrypt", value: localStorage.getItem("one_info") }).username,
        //     detail: 'check M-Service',
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
                        <Tab label="ເຕີມເງິນ" />
                        <Tab label="ໂອນເງິນ" />
                    </Tabs>
                </Paper>
                {/* ///////////////////////////////       Tab Sub */}
                <TabPanel value={value} index={0}>
                    <MServiceTopup query={data} />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <MServiceTransfer />
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
