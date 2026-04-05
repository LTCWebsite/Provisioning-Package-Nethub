import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import Visibility from '@material-ui/icons/Visibility';
import Edit from '@material-ui/icons/Edit';
import CrudTable from './CrudTable';
import WhitelistFormDialog from './WhitelistFormDialog';
import WhitelistViewDialog from './WhitelistViewDialog';
import WhitelistEditDialog from './WhitelistEditDialog';
import { AxiosReq3 } from '../../../../Components/Axios';

export default function TableWhitelist() {
  const [openForm, setOpenForm] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
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
        disableInlineEdit={true}
        actions={[
          {
            icon: () => <Edit style={{ color: '#f57c00' }} />,
            tooltip: 'ແກ້ໄຂ (Edit)',
            onClick: handleEdit,
          },
          {
            icon: () => <Visibility style={{ color: '#00695c' }} />,
            tooltip: 'ເບິ່ງລາຍລະອຽດ (View Detail)',
            onClick: handleView,
          }
        ]}
      />

      <WhitelistFormDialog
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSuccess={handleSuccess}
      />

      <WhitelistViewDialog
        open={openView}
        onClose={() => setOpenView(false)}
        data={selectedRow}
      />

      <WhitelistEditDialog
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        onSuccess={handleSuccess}
        data={selectedRow}
      />
    </Box>
  );
}
