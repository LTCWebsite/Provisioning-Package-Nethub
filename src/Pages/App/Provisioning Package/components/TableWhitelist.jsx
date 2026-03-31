import React, { useState } from 'react';
import CrudTable from './CrudTable';
import { Box, Button } from '@mui/material';
import WhitelistFormDialog from './WhitelistFormDialog';
import { AxiosReq3 } from '../../../../Components/Axios';

export default function TableWhitelist() {

  const [openForm, setOpenForm] = useState(false);
  const [refresh, setRefresh] = useState(0);

  const columns = [
    { title: 'MSISDN', field: 'msisdn' },
    { title: 'Start Time', field: 'startTime' },
    { title: 'End Time', field: 'endTime' },
    { title: 'Package ID', field: 'packageId' },
    { title: 'Created At', field: 'createdAt' },
    { title: 'Created By', field: 'createdBy' },
    { title: 'Updated At', field: 'updatedAt' },
    { title: 'Updated By', field: 'updatedBy' },
    { title: 'Package Codes', field: 'packageCodes' },
  ];

  const handleSuccess = () => {
    setRefresh(prev => prev + 1);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button
          variant="contained"
          onClick={() => setOpenForm(true)}
          sx={{
            minWidth: '250px',
            py: 2,
            fontSize: '18px',
            textTransform: 'none',
            borderRadius: '50px',
            backgroundColor: '#81C784',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#81C784'
            }
          }}
        >
          ເພີ່ມເບີໂທລະສັບ Whitelist
        </Button>
      </Box>
      <CrudTable
        title="Whitelist"
        endpoint="/WhiteListNethub"
        columns={columns}
        idField="id"
        refresh={refresh}
        axiosInstance={AxiosReq3}
      />

      <WhitelistFormDialog
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSuccess={handleSuccess}
      />
    </Box>
  );
}
