import React, { useState, useEffect } from 'react';
import { Button, Box, Typography } from '@mui/material';
import Visibility from '@material-ui/icons/Visibility';
import Edit from '@material-ui/icons/Edit';
import CrudTable from './CrudTable';
import PackageFormDialog from './PackageFormDialog';
import PackageViewDialog from './PackageViewDialog';
import PackageEditDialog from './PackageEditDialog';
import { AxiosReq3 } from '../../../../Components/Axios';
import cookie from 'js-cookie';

export default function TablePackage() {
  const [openForm, setOpenForm] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [subCosMapping, setSubCosMapping] = useState([]);

  useEffect(() => {
    fetchSubCosMapping();
  }, []);

  const fetchSubCosMapping = async () => {
    try {
      const res = await AxiosReq3.get('/WhiteListNethub/subcos', {
        headers: {
          Authorization: "Bearer " + cookie.get("ONE_TOKEN"),
          'Content-Type': 'application/json'
        },
      });
      const data = res.data?.data ?? res.data ?? [];
      setSubCosMapping(data);
    } catch (err) {
      console.error('Failed to fetch subCos mapping:', err);
    }
  };

  const getSubCosDisplayText = (subCosValue) => {
    if (!subCosValue) return '—';
    const values = String(subCosValue).split(/\||,/).map(v => v.trim()).filter(Boolean);

    // Group values by Type for table cell display
    const groupedByOffering = {};
    values.forEach(val => {
      const found = subCosMapping.find(item => String(item.subcos) === String(val));
      const offName = found?.offeringName || found?.type || 'Other';
      if (!groupedByOffering[offName]) groupedByOffering[offName] = [];
      groupedByOffering[offName].push(val);
    });

    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        {Object.keys(groupedByOffering).map(offName => (
          <Typography key={offName} variant="caption" sx={{ display: 'block', fontSize: '11px', lineHeight: 1.2 }}>
            <span style={{ fontWeight: 'bold', color: '#1a237e' }}>{offName}:</span> {groupedByOffering[offName].join(', ')}
          </Typography>
        ))}
      </Box>
    );
  };

  const columns = [
    //{ title: 'ID', field: 'id' },
    { title: 'Code', field: 'code' },
    { title: 'Counter Name', field: 'counterName' },
    { title: 'Offering ID', field: 'offeringId' },
    { title: 'Service Code', field: 'serviceCode' },
    { title: 'Price', field: 'price', type: 'numeric' },
    //{ title: 'Payment Type', field: 'paymentType' },
    { title: 'Validity Day', field: 'validityDay', type: 'numeric' },
    { title: 'Main Point', field: 'mainPoint', type: 'numeric' },
    { title: 'Refill Stop Day', field: 'refillStopDay' },
    { title: 'Start Time', field: 'startTime' },
    { title: 'End Time', field: 'endTime' },
    { title: 'SMS', field: 'sms' },
    { title: 'SMS LA', field: 'smsLa' },
    // { 
    //   title: 'Sub Cos (Type & Subcos)', 
    //   field: 'subCos',
    //   render: rowData => getSubCosDisplayText(rowData.subCos),
    //   cellStyle: { minWidth: '250px' }
    // },
    // { title: 'Remark', field: 'remark' },
    // { title: 'Is IR', field: 'isIR', type: 'boolean' },
    // { title: 'Is 5G', field: 'is5G', type: 'boolean' },
    // { title: 'Is Topping', field: 'isTopping', type: 'boolean' },
    // { title: 'Support 5G', field: 'isSupporting5G', type: 'boolean' },
    // { title: 'CBS Charge', field: 'isCbsCharge', type: 'boolean' },
    // { title: 'Additional', field: 'isAdditional', type: 'boolean' },
    // { title: 'Cancelable', field: 'cancelable', type: 'boolean' },
    // { title: 'LMM', field: 'isLmm', type: 'boolean' },
    // { title: 'Created At', field: 'createdAt' },
    // { title: 'Created By', field: 'createdBy' },
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
