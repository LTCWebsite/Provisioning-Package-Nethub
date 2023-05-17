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


export default function MmoneyTabs() {
    const classes = useStyles()
    const [value, setValue] = React.useState(0)
    const [stop, setStop] = React.useState(false)
    const [data, setData] = React.useState([])

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    const column = [
        { title: 'ເບີຕົ້ນທາງ', field: 'telephone' },
        { title: 'ເບີປາຍທາງ', field: 'msisdn' },
        { title: 'CreateDate', field: 'createDate', render: row => moment(row?.createDate).format("DD-MM-YYYY HH:mm:ss") },
        { title: 'Operator', field: 'operator' },
        { title: 'Type', field: 'phoneType' },
        { title: 'PackageCode', field: 'packageCode', maxWidth: 120 },
        { title: 'Charge', field: 'pkChg', type: "numeric", render: row => row?.pkChg?.toLocaleString() },
        { title: 'CashIn', field: 'cashin', type: 'numeric', render: row => row?.cashin?.toLocaleString() },
        { title: 'ResultDesc', field: 'resultDesc', render: row => row?.resultDesc?.length <= 25 ? row?.resultDesc : <Tooltip title={row?.resultDesc}><div>{row?.resultDesc?.substring(0, 25)}...</div></Tooltip> },
        { title: 'Message', field: 'resultMsg', render: row => row?.resultMsg?.length <= 25 ? row?.resultMsg : <Tooltip title={row?.resultMsg}><div>{row?.resultMsg?.substring(0, 25)}...</div></Tooltip> },
    ]
    const columnTrans = [
        { title: 'ເບີຕົ້ນທາງ', field: 'telephone' },
        { title: 'ເບີປາຍທາງ', field: 'msisdn' },
        { title: 'CreateDate', field: 'createDate', minWidth: 160, render: row => moment(row?.createDate).format("DD-MM-YYYY HH:mm:ss") },
        { title: 'Operator', field: 'operator' },
        { title: 'PaymentType', field: 'paymentType' },
        { title: 'SpentTime', field: 'spentTime', maxWidth: 120 },
        { title: 'Charge', field: 'amount', type: "numeric", render: row => row?.amount?.toLocaleString() },
        { title: 'CashIn', field: 'cashIn', type: 'numeric', render: row => row?.cashIn?.toLocaleString() },
        { title: 'ResultDesc', field: 'resultDesc', render: row => row?.resultDesc?.length <= 25 ? row?.resultDesc : <Tooltip title={row?.resultDesc}><div>{row?.resultDesc?.substring(0, 25)}...</div></Tooltip> },
        // { title: 'Message', field: 'resultMsg', render: row => row?.resultMsg?.length <= 25 ? row?.resultMsg : <Tooltip title={row?.resultMsg}><div>{row?.resultMsg?.substring(0, 25)}...</div></Tooltip> },
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
                        <Tab label="ເຕີມເງິນ" />
                        <Tab label="ຊຳລະເງິນ" />
                    </Tabs>
                </Paper>
                {/* ///////////////////////////////       Tab Sub */}
                <TabPanel value={value} index={0}>
                    <TableMservice
                        url={"NewLmmPackage?msisdn=" + localStorage.getItem("ONE_PHONE")}
                        title={"ເຕີມເງິນ"}
                        columns={column}
                        sl={true}
                    />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <TableMservice
                        url={"NewLmmPayment?msisdn=" + localStorage.getItem("ONE_PHONE")}
                        title={"ຊຳລະເງິນ"}
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
