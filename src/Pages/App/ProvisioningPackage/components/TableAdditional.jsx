import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import Visibility from '@material-ui/icons/Visibility';
import Edit from '@material-ui/icons/Edit';
import CrudTable from './CrudTable';
import AdditionalFormDialog from './AdditionalFormDialog';
import AdditionalViewDialog from './AdditionalViewDialog';
import AdditionalEditDialog from './AdditionalEditDialog';
import { AxiosReq3 } from '../../../../Components/Axios';

export default function TableAdditional() {
  const [openForm, setOpenForm] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
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
        disableInlineEdit={true}
        actions={[
          {
            icon: () => <Edit style={{ color: '#f57c00' }} />,
            tooltip: 'ແກ້ໄຂ (Edit)',
            onClick: handleEdit,
          },
          {
            icon: () => <Visibility style={{ color: '#388e3c' }} />,
            tooltip: 'ເບິ່ງລາຍລະອຽດ (View Detail)',
            onClick: handleView,
          }
        ]}
      />
      <AdditionalFormDialog
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSuccess={handleSuccess}
      />
      <AdditionalViewDialog
        open={openView}
        onClose={() => setOpenView(false)}
        data={selectedRow}
      />
      <AdditionalEditDialog
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        onSuccess={handleSuccess}
        data={selectedRow}
      />
    </Box>
  );
}
