import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import CheckSerial from './pages/CheckSerial'
import CheckLuckyDraw from './pages/CheckLuckyDraw'
import CheckPIN from './pages/CheckPIN'
import CheckLuckyDrawNew from './pages/checkluckyDrawNew';
import cookie from 'js-cookie'

function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        marginTop: 10,
        backgroundColor: theme.palette.background.paper,
    },
}));

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
                <div style={{ marginTop: 20 }}>{children}</div>
            )}
        </div>
    );
}

export default function Card() {
    const classes = useStyles()
    const [value, setValue] = React.useState(0)

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    return (
        <div className={classes.root} style={{ backgroundColor: 'whitesmoke', height: '80vh' }}>
            <AppBar position="static" color="default" style={{ backgroundColor: 'white' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                >
                    <Tab label="Check Serial" {...a11yProps(0)} style={{ textTransform: 'none' }} />
                    <Tab label="Check Lucky Draw" {...a11yProps(1)} style={{ textTransform: 'none' }} />
                    <Tab label="Check Pin" {...a11yProps(2)} style={{ textTransform: 'none' }} />
                    {/* <Tab label="TEST" {...a11yProps(3)} style={{ textTransform: 'none' }} /> */}
                </Tabs>
            </AppBar>

            <TabPanel value={value} index={0}>
                <CheckSerial />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <CheckLuckyDrawNew />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <CheckPIN />
            </TabPanel>
            {/* <TabPanel value={value} index={3}>
                <CheckLuckyDrawNew />
            </TabPanel> */}


        </div>
    )
}
