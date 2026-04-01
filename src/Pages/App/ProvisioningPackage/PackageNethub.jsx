import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { TabContext, TabPanel } from '@mui/lab';
import TablePackage from './components/TablePackage';
import TableAdditional from './components/TableAdditional';
import TablePackageExcluded from './components/TablePackageExcluded';
import TablePackageRequired from './components/TablePackageRequired';
import TableWhitelist from './components/TableWhitelist';

export default function PackageNethub() {
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <h1>Provisioning Package - Nethub</h1>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} variant="fullWidth">
            <Tab label="ແພັກເກັດ (Package)" value="1" />
            <Tab label="ແພັກເກັດເພີ່ມເຕີມ (Additional)" value="2" />
            <Tab label="ແພັກເກັດທີ່ຖືກຍົກເວັ້ນ (Excluded)" value="3" />
            <Tab label="ແພັກເກັດທີ່ຕ້ອງການ (Required)" value="4" />
            <Tab label="ເບີລ໊ອດພິເສດ (Specialist)" value="5" />
          </Tabs>
        </Box>
        <TabPanel value="1" sx={{ padding: 0 }}>
          <TablePackage />
        </TabPanel>
        <TabPanel value="2" sx={{ padding: 0 }}>
          <TableAdditional />
        </TabPanel>
        <TabPanel value="3" sx={{ padding: 0 }}>
          <TablePackageExcluded />
        </TabPanel>
        <TabPanel value="4" sx={{ padding: 0 }}>
          <TablePackageRequired />
        </TabPanel>
        <TabPanel value="5" sx={{ padding: 0 }}>
          <TableWhitelist />
        </TabPanel>
      </TabContext>
    </div>
  );
}
