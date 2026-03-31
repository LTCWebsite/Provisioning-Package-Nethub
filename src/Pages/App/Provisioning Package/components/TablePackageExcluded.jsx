import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import CrudTable from './CrudTable';
import PackageExcludedFormDialog from './PackageExcludedFormDialog';
import { AxiosReq3 } from '../../../../Components/Axios';

export default function TablePackageExcluded() {
  const [openForm, setOpenForm] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const columns = [
    { title: 'ID', field: 'id' },
    { title: 'Package ID', field: 'packageId' },
    { title: 'Counter Name', field: 'counterName' },
    { title: 'Error Message', field: 'errorMessage' },
    { title: 'Min Data', field: 'minData' },
    { title: 'Expiry Check', field: 'requireExpiryCheck', type: 'boolean' },
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
          ເພີ່ມຂໍ້ມູນ Package Excluded
        </Button>
      </Box>
      <CrudTable
        key={refreshKey}
        title="Package Excluded"
        endpoint="/PackageExcludedNethub"
        columns={columns}
        idField="id"
        axiosInstance={AxiosReq3}
      />
      <PackageExcludedFormDialog
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSuccess={handleSuccess}
      />
    </Box>
  );
}
