import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import { Tab } from '@material-ui/core';
import { LoadingTable } from '../../../../../../Components/TableLoading';
import BorrowTableNew from './BorrowTableNew';
import DeductNew from './DeductNew'

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


export default function BorrowAndDeductTabNew() {
    const classes = useStyles()
    const [value, setValue] = React.useState(0)
    const [stop, setStop] = React.useState(false)

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }
    React.useEffect(() => {
        setStop(true)
    }, [])

    function ShowData() {
        return (
            <>
                <Paper className={classes.root} style={{ marginBottom: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                        style={{ padding: '4px' }}
                    >
                        <Tab label="ຢືມເງິນ-ດາຕ້າ" style={{ fontWeight: 'bold', fontSize: '16px' }} />
                        <Tab label="ຕັດເງິນ" style={{ fontWeight: 'bold', fontSize: '16px' }} />
                    </Tabs>
                </Paper>
                {/* ///////////////////////////////       Tab Sub */}
                <TabPanel value={value} index={0}>
                    <BorrowTableNew />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <DeductNew />
                </TabPanel>
            </>
        )
    }


    return (
        <>
            {!stop ? <LoadingTable /> : <ShowData />}
        </>
    )
}
