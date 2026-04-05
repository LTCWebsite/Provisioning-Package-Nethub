import React, { useState } from 'react';
import { Button, Box } from '@mui/material';
import Visibility from '@material-ui/icons/Visibility';
import Edit from '@material-ui/icons/Edit';
import CrudTable from './CrudTable';
import PackageFormDialog from './PackageFormDialog';
import PackageViewDialog from './PackageViewDialog';
import PackageEditDialog from './PackageEditDialog';
import { AxiosReq3 } from '../../../../Components/Axios';

export default function TablePackage() {
  const [openForm, setOpenForm] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const columns = [
    //{ title: 'ID', field: 'id' },
    { title: 'Code', field: 'code' },
    { title: 'Counter Name', field: 'counterName' },
    { title: 'Refill Stop Day', field: 'refillStopDay' },
    //{ title: 'Offering ID', field: 'offeringId' },
    //{ title: 'Service Code', field: 'serviceCode' },
    { title: 'Price', field: 'price', type: 'numeric' },
    { title: 'Validity Day', field: 'validityDay', type: 'numeric' },
    { title: 'Main Point', field: 'mainPoint', type: 'numeric' },
    { title: 'Start Time', field: 'startTime' },
    { title: 'End Time', field: 'endTime' },
    //{ title: 'Is IR', field: 'isIR', type: 'boolean' },
    //{ title: 'Is 5G', field: 'is5G', type: 'boolean' },
    //{ title: 'Remark', field: 'remark' },
    //{ title: 'Req. Counter', field: 'requiredCounterName' },
    //{ title: 'Excl. Counter', field: 'excludedCounterName' },
    { title: 'SMS', field: 'sms' },
    //{ title: 'Whitelist', field: 'whitelist' },
    //{ title: 'Extra', field: 'extra' },
    //{ title: 'Is Topping', field: 'isTopping', type: 'boolean' },
    { title: 'SMS LA', field: 'smsLa' },
    //{ title: 'Expiry Last Day', field: 'expiryLastDayOfMonth' },
    //{ title: 'Support 5G', field: 'isSupporting5G', type: 'boolean' },
    //{ title: 'Sub Cos', field: 'subCos' },
    //{ title: 'CBS Charge', field: 'isCbsCharge', type: 'boolean' },
    //{ title: 'Additional', field: 'isAdditional', type: 'boolean' },
    //{ title: 'Cancelable', field: 'cancelable', type: 'boolean' },
    //{ title: 'LMM', field: 'isLmm', type: 'boolean' },
    //{ title: 'Whitelist Add.', field: 'isWhitelistAdditional', type: 'boolean' },
    //{ title: 'FTTH Bundle', field: 'isFtthBundle', type: 'boolean' },
    //{ title: 'Location', field: 'isLocation', type: 'boolean' },
    //{ title: 'Needs Offering', field: 'needsOffering', type: 'boolean' },
    //{ title: 'Channels', field: 'channels' },
    { title: 'Created At', field: 'createdAt' },
    { title: 'Created By', field: 'createdBy' },
    //{ title: 'Updated At', field: 'updatedAt' },
    //{ title: 'Updated By', field: 'updatedBy' },
  ];

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
          ສ້າງ Package
        </Button>
      </Box>
      <CrudTable
        key={refreshKey}
        title="Package"
        endpoint="/PackageNethub"
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
            icon: () => <Visibility style={{ color: '#1a237e' }} />,
            tooltip: 'ເບິ່ງລາຍລະອຽດ (View Detail)',
            onClick: handleView,
          }
        ]}
      />
      <PackageFormDialog
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSuccess={() => setRefreshKey(prev => prev + 1)}
      />
      <PackageViewDialog
        open={openView}
        onClose={() => setOpenView(false)}
        data={selectedRow}
      />
      <PackageEditDialog
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        onSuccess={() => setRefreshKey(prev => prev + 1)}
        data={selectedRow}
      />
    </Box>
  );
}
