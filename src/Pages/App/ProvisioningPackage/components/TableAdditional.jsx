import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import CrudTable from './CrudTable';
import AdditionalFormDialog from './AdditionalFormDialog';
import { AxiosReq3 } from '../../../../Components/Axios';

export default function TableAdditional() {
  const [openForm, setOpenForm] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const columns = [
    { title: 'Package ID', field: 'packageId' },
    { title: 'Counter Name', field: 'counterName' },
    { title: 'Refill Stop Day', field: 'refillStopDay' },
    { title: 'SMS', field: 'sms' },
    { title: 'Start Time', field: 'startTime' },
    { title: 'End Time', field: 'endTime' },
    { title: 'Created At', field: 'createdAt' },
    { title: 'Created By', field: 'createdBy' },
  ];

  const handleSuccess = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button
          variant="contained"
          onClick={() => setOpenForm(true)}
          sx={{
            minWidth: '200px',
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
          ເພີ່ມຂໍ້ມູນ Additional
        </Button>
      </Box>
      <CrudTable
        key={refreshKey}
        title="Additional"
        endpoint="/AdditionalNethub"
        columns={columns}
        idField="id"
        axiosInstance={AxiosReq3}
      />
      <AdditionalFormDialog
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSuccess={handleSuccess}
      />
    </Box>
  );
}
