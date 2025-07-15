import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import SubscriberGame from "../File/SubScriberGame";
import Members from "../File/Members";
import { Grid } from "@mui/material";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function TabSubscriNew() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          style={{ padding: "15px", marginLeft: "10px", fontSize: "14px" }}
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            style={{ marginRight: "10px", color: "grey" }}
            label="Members"
            {...a11yProps(0)}
          />
          <Tab
            style={{ color: "grey" }}
            label="SubScriber"
            {...a11yProps(1)}
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <SubscriberGame />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Members />
      </CustomTabPanel>
    </Box>
  );
}
