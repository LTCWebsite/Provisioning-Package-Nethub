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

export default function TabShowDetail() {
    const classes = useStyles()
    const [value, setValue] = React.useState(0)
    const history = useHistory()

    const handleChange = (event, newValue) => {
        setValue(newValue)
        if (newValue === 0) {
            history.push("/app/checkcard/checkserial")
        } 
        // else if (newValue === 1) {
        //     history.push("/app/checkcard/checkmultiserial")
        // } 
        else if (newValue === 1) {
            history.push("/app/checkcard/checkluckydraw")
        } else if(newValue === 2){
            history.push("/app/checkcard/checkpin")
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
                    <Tab label="Check Serial" {...a11yProps(0)} style={{ textTransform: 'none'}} />
                    {/* <Tab label="Check Multiple Serial" {...a11yProps(1)} style={{ textTransform: 'none'}} /> */}
                    <Tab label="Check Lucky Draw" {...a11yProps(1)} style={{ textTransform: 'none'}} />
                    <Tab label="Check PIN" {...a11yProps(2)} style={{ textTransform: 'none'}} />
                </Tabs>
            </AppBar>


            <div style={{ padding: 7, paddingBottom: 20, paddingTop: 20 }}>

                {/* Router */}
                <MyRouter />

            </div>

        </div>
    )
}
