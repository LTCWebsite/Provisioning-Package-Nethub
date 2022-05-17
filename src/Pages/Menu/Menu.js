import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import LTC from '../../Image/logo.ico'
import { Button, Grid } from '@material-ui/core'
import MiniCRM from '../MiniCRM/MiniCRM'
import { Img } from 'react-image'
import { Search } from '@material-ui/icons'
import { Switch, useHistory } from 'react-router-dom'
import { ProtectRoute } from '../Components/ProtectRoute'
import ProfileList from '../Components/ProfileList'
import IndexDetail from '../IndexDetail/IndexDetail'
import Crypt from '../Components/Crypt'
import { AlertWarning } from '../Components/Toast'
import CheckCardMenu from '../CheckCard/CheckCardMenu'
import Info178 from '../Menu178/Info178'
import Doing from '../Components/Doing'
import MasterSim from '../MasterSim/MasterSim';
import Other from './Other';
// import ProTabs from '../Promotion/ProTabs';


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function Menu() {
    const classes = useStyles()
    const [value, setValue] = React.useState(0)
    const history = useHistory()
    const [myphone, setPhone] = React.useState(null)
    React.useEffect(() => {
        try {
            var phone = Crypt({ type: "decrypt", value: localStorage.getItem("input-phone") })
            phone = phone.text
            setPhone(phone)
        } catch (err) {

        }
    }, [])

    // search phone number

    const changePhone = (e) => {
        setPhone(e)
        // console.log(e)
    }
    const checkKey = (e) => {
        if (e.code === 'Enter' || e.code === 'NumpadEnter') {
            searchPhoneNumber()
        }
    }
    const searchPhoneNumber = () => {
        var saveData = {
            text: myphone
        }
        localStorage.setItem("input-phone", Crypt({ type: "crypt", value: JSON.stringify(saveData) }))
        if (myphone === '' || myphone === null) {
            AlertWarning("ກະລຸນາປ້ອນເບີໂທ")
        } else {
            /////////////////////////////////////////////
            // mi ber
            history.push("/app")
            setTimeout(() => {
                Doing({
                    msisdn: Crypt({ type: "decrypt", value: localStorage.getItem("input-phone") }).text,
                    username: Crypt({ type: "decrypt", value: localStorage.getItem("one_info") }).username,
                    detail: 'searching',
                    resualt: 'Operation successed.',
                })
                history.push("/app/oneScreen")
            }, 300)
        }
    }
    const handleChange = (event, newValue) => {
        setValue(newValue)
        try {
            if (newValue === 0) {
                if (myphone === '' || myphone === null) {
                    AlertWarning("ກະລຸນາປ້ອນເບີໂທ")
                    history.push("/app")
                } else {
                    history.push("/app/oneScreen")
                }
            } else if (newValue === 1) {
                history.push("/app/checkcard")
            } else if (newValue === 2) {
                history.push("/app/info178")
            } else if (newValue === 3) {
                history.push("/app/mastersim")
            } else if (newValue === 4) {
                history.push("/app/other")
            } else if (newValue === 5) {
                history.push("/app/promotion")
            }
        } catch (err) {

        }
    }
    const clickLogo = () => {
        setValue(0)
        history.push("/app")
    }

    return (
        <div className={classes.root}>
            <AppBar position="static" style={{ position: 'fixed' }}>
                <Grid container style={{ backgroundColor: '#5a5c69' }}>
                    <Grid item xs={4} lg={1}>
                        <div className="center">
                            <Img src={LTC} className="icon-tab pointer" onClick={clickLogo} />
                        </div>
                    </Grid>

                    {/* Tab list */}
                    <Grid item xs={8} lg={8}>
                        <Tabs value={value} className="tab-tab" onChange={handleChange} aria-label="simple tabs example" style={{ margin: 0 }}>
                            <Tab className="bold" label={"One Screen"} {...a11yProps(0)} />
                            <Tab className="bold" label={"Check Card"} {...a11yProps(1)} />
                            <Tab className="bold" label={"Info 178"} {...a11yProps(2)} />
                            <Tab className="bold" label={"Master SIM"} {...a11yProps(3)} />
                            <Tab className="bold" label={"Other"} {...a11yProps(4)} />
                            {/* <Tab className="bold" label={"Promotion"} {...a11yProps(5)} /> */}
                        </Tabs>
                    </Grid>
                    {/* end Tab list */}

                    <Grid container item xs={12} lg={3}>
                        {value === 0 ? <>
                            <Grid item xs={4}>
                                <div style={{ position: 'absolute', right: 0, marginTop: 10 }}>

                                    {/* import profileList */}
                                    <ProfileList />

                                </div>
                            </Grid></> : <Grid item container xs={12} style={{ paddingBottom: 48 }}><Grid item xs={12}>
                                <div style={{ position: 'absolute', right: 0, marginTop: 10 }}>

                                    {/* import profileList */}
                                    <ProfileList />

                                </div>
                            </Grid></Grid>}
                    </Grid>
                </Grid>
            </AppBar>
            <Grid container className="menu-padding" style={{ backgroundColor: "whitesmoke" }}>
                {window.location.pathname === '/app' || window.location.pathname.indexOf('/app/oneScreen') === 0 ? <>
                <Grid item md={3} lg={4}></Grid>
                <Grid container item xs={12} md={6} lg={4} spacing={2} style={{ paddingTop: 15 }}>
                    <Grid item xs={9}>
                        <input
                            type="search"
                            className="input"
                            maxLength="10"
                            value={myphone}
                            placeholder="205xxxxxxx"
                            onChange={(e) => { changePhone(e.target.value) }}
                            onKeyPress={(e) => { checkKey(e) }}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Button variant="contained" className="btn-primary" fullWidth onClick={searchPhoneNumber}>
                            <Search />
                        </Button>
                    </Grid>
                </Grid>
                </> : null}
                
                <Grid container item xs={12} style={{ padding: 7 }}>

                    {/* Tab mini crm */}
                    <Switch>
                        <ProtectRoute path="/app" exact component={IndexDetail} />
                        <ProtectRoute path="/app/oneScreen" component={MiniCRM} />
                        <ProtectRoute path="/app/checkcard" component={CheckCardMenu} />
                        <ProtectRoute path="/app/info178" component={Info178} />
                        <ProtectRoute path="/app/mastersim" component={MasterSim} />
                        <ProtectRoute path="/app/other" component={Other} />
                        {/* <ProtectRoute path="/app/promotion" component={ProTabs} /> */}
                    </Switch>

                </Grid>
            </Grid>
            <Grid item xs={12} className="footer">One Screen Copy right LTC</Grid>
        </div>
    );
}
