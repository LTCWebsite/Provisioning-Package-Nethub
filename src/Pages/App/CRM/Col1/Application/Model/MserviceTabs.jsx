import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import { Tab } from '@material-ui/core';
import TableMservice from './TableMservice'
import { Tooltip } from '@mui/material';
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


export default function MServiceTab() {
    const classes = useStyles()
    const [value, setValue] = React.useState(0)
    const [stop, setStop] = React.useState(false)
    const [data, setData] = React.useState([])

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    const column = [
        { title: 'ເບີຕົ້ນທາງ', field: 'msisdnDest' },
        { title: 'ເບີປາຍທາງ', field: 'msisdnRequest' },
        { title: 'DateApplied', field: 'appliedDate', render: row => moment(row?.appliedDate).format("DD-MM-YYYY HH:mm:ss") },
        { title: 'DeviceModel', field: 'deviceModel' },
        { title: 'RequestType', field: 'requestType' },
        { title: 'PackageKey', field: 'packageKey', maxWidth: 100 },
        { title: 'Balance', field: 'balance', type: "numeric", render: row => row?.balance?.toLocaleString() },
        { title: 'ResultDesc', field: 'transactionName', render: row => row?.transactionName?.length <= 25 ? row?.transactionName : <Tooltip title={row?.transactionName}><div>{row?.transactionName?.substring(0, 25)}...</div></Tooltip> },
        { title: 'Message', field: 'message', render: row => row?.message?.length <= 25 ? row?.message : <Tooltip title={row?.message}><div>{row?.message?.substring(0, 25)}...</div></Tooltip> },
    ]
    const columnTopup = [
        { title: 'ເບີຕົ້ນທາງ', field: 'msisdnRequest' },
        { title: 'ເບີປາຍທາງ', field: 'msisdnSource' },
        { title: 'RecodeDate', field: 'recodeDate', render: row => moment(row?.recodeDate).format("DD-MM-YYYY HH:mm:ss") },
        { title: 'DeviceModel', field: 'deviceModel' },
        { title: 'IsBarcode', field: 'isBarcode' },
        { title: 'currentBalance', field: 'currentBalance', render: row => row?.currentBalance?.toLocaleString() },
        { title: 'Amount', field: 'amount', type: "numeric", render: row => row?.amount?.toLocaleString() },
        { title: 'ResultDesc', field: 'resultDesc', render: row => row?.resultDesc?.length <= 25 ? row?.resultDesc : <Tooltip title={row?.resultDesc}><div>{row?.resultDesc?.substring(0, 25)}...</div></Tooltip> },
        { title: 'Message', field: 'resultMessage', render: row => row?.resultMessage?.length <= 25 ? row?.resultMessage : <Tooltip title={row?.resultMessage}><div>{row?.resultMessage?.substring(0, 25)}...</div></Tooltip> },
    ]
    const columnTrans = [
        { title: 'ເບີຕົ້ນທາງ', field: 'msisdnRequest' },
        { title: 'ເບີປາຍທາງ', field: 'msisdnSource' },
        { title: 'RecodeDate', field: 'recodeDate', render: row => moment(row?.recodeDate).format("DD-MM-YYYY HH:mm:ss") },
        { title: 'DeviceModel', field: 'deviceModel' },
        // { title: 'IsBarcode', field: 'isBarcode' },
        // { title: 'currentBalance', field: 'currentBalance', render: row => row?.currentBalance?.toLocaleString() },
        { title: 'Amount', field: 'amount', type: "numeric", render: row => row?.amount?.toLocaleString() },
        { title: 'ResultDesc', field: 'resultDesc', render: row => row?.resultDesc?.length <= 25 ? row?.resultDesc : <Tooltip title={row?.resultDesc}><div>{row?.resultDesc?.substring(0, 25)}...</div></Tooltip> },
        { title: 'Message', field: 'resultMessage', render: row => row?.resultMessage?.length <= 25 ? row?.resultMessage : <Tooltip title={row?.resultMessage}><div>{row?.resultMessage?.substring(0, 25)}...</div></Tooltip> },
    ]

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
                        <Tab label="ຊື້ແພັກເກັດ" />
                        <Tab label="ເຕີມເງິນ" />
                        <Tab label="ໂອນເງິນ" />
                    </Tabs>
                </Paper>
                {/* ///////////////////////////////       Tab Sub */}
                <TabPanel value={value} index={0}>
                    <TableMservice
                        url={"NewMsPackage?msisdn=" + localStorage.getItem("ONE_PHONE")}
                        title={"ຊື້ແພັກເກັດ"}
                        columns={column}
                        sl={true}
                    />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <TableMservice
                        url={"NewMsRefill?msisdn=" + localStorage.getItem("ONE_PHONE")}
                        title={"ເຕີມເງິນ"}
                        columns={columnTopup}
                        sl={true}
                    />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <TableMservice
                        url={"NewMsTransfer?msisdn=" + localStorage.getItem("ONE_PHONE")}
                        title={"ໂອນເງິນ"}
                        columns={columnTrans}
                        sl={true}
                    />
                </TabPanel>
                {/* ///////////////////////////////////       end tab Sub */}
            </>
        )
    }

    return (
        <>
            <ShowData />
        </>
    )
}
