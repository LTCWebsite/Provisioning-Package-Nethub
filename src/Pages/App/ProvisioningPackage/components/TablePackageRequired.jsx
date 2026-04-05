import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import Visibility from '@material-ui/icons/Visibility';
import Edit from '@material-ui/icons/Edit';
import CrudTable from './CrudTable';
import PackageRequiredFormDialog from './PackageRequiredFormDialog';
import PackageRequiredViewDialog from './PackageRequiredViewDialog';
import PackageRequiredEditDialog from './PackageRequiredEditDialog';
import { AxiosReq3 } from '../../../../Components/Axios';

export default function TablePackageRequired() {
  const [openForm, setOpenForm] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const columns = [
    { title: 'ID', field: 'id' },
    { title: 'Package ID', field: 'packageId' },
    { title: 'Counter Name', field: 'counterName' },
    { title: 'Error Message', field: 'errorMessage' },
    { title: 'Created At', field: 'createdAt' },
    { title: 'Created By', field: 'createdBy' },
  ];

  const handleSuccess = () => {
    setRefreshKey(prev => prev + 1);
  };

  const handleView = (event, rowData) => {
    setSelectedRow(rowData);
    setOpenView(true);
  };

  const handleEdit = (event, rowData) => {
    setSelectedRow(rowData);
    setOpenEdit(true);
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
          ເພີ່ມຂໍ້ມູນ Package Required
        </Button>
      </Box>
      <CrudTable
        key={refreshKey}
        title="Package Required"
        endpoint="/PackageRequiredNethub"
        columns={columns}
        idField="id"
        axiosInstance={AxiosReq3}
        disableInlineEdit={true}
        actions={[
          {
            icon: () => <Edit style={{ color: '#f57c00' }} />,
            tooltip: 'ແກ້ໄຂ (Edit)',
            onClick: handleEdit,
          },
          {
            icon: () => <Visibility style={{ color: '#1976d2' }} />,
            tooltip: 'ເບິ່ງລາຍລະອຽດ (View Detail)',
            onClick: handleView,
          }
        ]}
      />
      <PackageRequiredFormDialog
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSuccess={handleSuccess}
      />
      <PackageRequiredViewDialog
        open={openView}
        onClose={() => setOpenView(false)}
        data={selectedRow}
      />
      <PackageRequiredEditDialog
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        onSuccess={handleSuccess}
        data={selectedRow}
      />
    </Box>
  );
}
