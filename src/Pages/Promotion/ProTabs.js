import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MyRouter from './Router';
import { useHistory } from 'react-router-dom'

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

export default function ProTabs() {
    const classes = useStyles()
    const [value, setValue] = React.useState(0)
    const history = useHistory()

    const handleChange = (event, newValue) => {
        setValue(newValue)
        if (newValue === 0) {
            history.push("/app/promotion")
        } else if (newValue === 1) {
            history.push("/app/promotion/upload")
        }
    }

    return (
        <div className={classes.root} style={{ backgroundColor: 'whitesmoke', height: '80vh'}}>
            <AppBar position="static" color="default" style={{backgroundColor: 'white'}}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                    // className="colorText"
                >
                    <Tab label="List of promotion" {...a11yProps(0)} />
                    <Tab label="Upload promotion" {...a11yProps(1)} />
                </Tabs>
            </AppBar>


            <div style={{ padding: 7, paddingBottom: 20, paddingTop: 20 }}>

                {/* Router */}
                <MyRouter />

            </div>

        </div>
    )
}
