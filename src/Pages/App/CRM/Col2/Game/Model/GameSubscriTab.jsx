import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Tabs, Select, MenuItem } from "@material-ui/core";
import { Tab } from "@material-ui/core";
import LoadingLottie from "../../../../../../Components/LoadingLottie";
import SubScriberGame from "../File/SubScriberGame";
// import Crypt from "../../Components/Crypt";
// import Doing from "../../Components/Doing";
import DebugGame from "../File/DebugGame";

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
            {value === index && <div>{children}</div>}
        </div>
    );
}

export default function GameSubscriTab() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [stop, setStop] = React.useState(false);
    //const [gameSelected, setGameSelected] = React.useState("product@codapayments.com");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    React.useEffect(() => {
        setStop(true);
    }, []);

    function ShowData() {
        return (
            <>
                {/* <div style={{ display: 'flex', justifyContent: 'center', padding: "10px 0" }}>
                  
                </div> */}

                <TabPanel value={value} index={0}>
                    <SubScriberGame />
                </TabPanel>
            </>
        );
    }

    return (
        <>
            {!stop ? (
                <LoadingLottie loadStop={stop} loadHeight={800} />
            ) : (
                <ShowData />
            )}
        </>
    );
}
