import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { TabContext, TabPanel } from '@mui/lab';
import UserEdit from './UserEdit';

export default function UserTab() {
  const [value, setValue] = React.useState('1')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <TabContext value={value}>
      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="ຈັດການຂໍ້ມູນຜູ້ໃຊ້" value={"1"} />
          <Tab label="ແກ້ໄຂຂໍມູນສ່ວນໂຕ" value={"2"} />
        </Tabs>
      </Box>
      <TabPanel value='1'>
        hi
      </TabPanel>
      <TabPanel value='2'>
        <UserEdit />
      </TabPanel>
    </TabContext>
  );
}


