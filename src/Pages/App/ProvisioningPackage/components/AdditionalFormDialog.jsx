import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogContent, Button, Grid, TextField,
  Typography, Box, Divider, IconButton, MenuItem, Select, FormControl,
  OutlinedInput, CircularProgress
} from '@mui/material';
import { AxiosReq3 } from '../../../../Components/Axios';
import cookie from 'js-cookie';
import { toast_error, toast_success } from '../../../../Components/Toast';
import { Close as CloseIcon } from '@mui/icons-material';

export default function AdditionalFormDialog({ open, onClose, onSuccess }) {
  const username = localStorage.getItem('USERNAME');
  const initialState = {
    packageId: '',
    counterName: '',
    refillStopDay: '',
    sms: '',
    startTime: new Date().toLocaleString('sv-SE', {
      timeZone: 'Asia/Bangkok',
      hour12: false
    }).slice(0, 16).replace(' ', 'T'),
    endTime: new Date().toLocaleString('sv-SE', {
      timeZone: 'Asia/Bangkok',
      hour12: false
    }).slice(0, 16).replace(' ', 'T'),
    createdAt: new Date().toISOString().slice(0, 16),
    createdBy: username || '',
    updatedAt: new Date().toISOString().slice(0, 16),
    updatedBy: username || ''
  };

  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [packages, setPackages] = useState([]);
  const [subCosOptions, setSubCosOptions] = useState([]);
  const [loadingSubCos, setLoadingSubCos] = useState(false);
  const [loadingPackages, setLoadingPackages] = useState(false);

  useEffect(() => {
    if (open) {
      fetchPackages();
      fetchSubCos();
    }
  }, [open]);


  const fetchPackages = async () => {
    setLoadingPackages(true);
    const token = cookie.get("ONE_TOKEN");
    if (!token) return;

    try {
      const res = await AxiosReq3.get('/AdditionalNethub/counternames', {
        headers: { Authorization: `Bearer ${token}` },
      });
      //console.log("Ku yark hu sue2 va song y ma", res.data);
      if (res.data.data && Array.isArray(res.data.data)) {
        setPackages(res.data.data);
      }
    } catch (error) {
      console.error('Error fetching packages:', error);
    } finally {
      setLoadingPackages(false);
    }
  };

  const fetchSubCos = async () => {
    setLoadingSubCos(true);
    try {
      const res = await AxiosReq3.get('/WhiteListNethub/subcos', {
        headers: {
          Authorization: "Bearer " + cookie.get("ONE_TOKEN"),
          'Content-Type': 'application/json'
        },
      });
      const data = res.data?.data ?? res.data ?? [];
      const options = data.map((item) => ({
        value: item.subcos,
        label: item.offeringName,
      }));
      setSubCosOptions(options);
    } catch (err) {
      console.error('Failed to fetch subCos:', err);
      setSubCosOptions([]);
    } finally {
      setLoadingSubCos(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const formatDate = (val) => {
    if (!val) return null;
    let dateStr = val.includes('T') ? val : val.replace(' ', 'T');
    if (dateStr.length === 16) dateStr += ':00';
    return dateStr;
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const username = localStorage.getItem("USERNAME") || '';
      const payload = {
        ...formData,
        packageId: parseInt(formData.packageId) || 0,
        refillStopDay: parseInt(formData.refillStopDay) || 0,
        startTime: formatDate(formData.startTime),
        endTime: formatDate(formData.endTime),
        createdAt: new Date().toISOString(),
        createdBy: username,
        updatedAt: new Date().toISOString(),
        updatedBy: username,
      };

      //console.log("Sending payload:", payload);

      const res = await AxiosReq3.post('/AdditionalNethub', payload, {
        headers: { Authorization: "Bearer " + cookie.get("ONE_TOKEN") },
      });

      if (res.status === 200 || res.status === 201) {
        toast_success({ text: "ບັນທຶກຂໍ້ມູນສຳເລັດ (Saved Successfully)" });
        onSuccess();
        handleClose();
      }
    } catch (error) {
      console.error("Error response:", error.response?.data);
      toast_error({ text: "ເກີດຂໍ້ຜິດພາດ: " + (error.response?.data?.message || error.response?.data || error.message) });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData(initialState);
    onClose();
  };

  const formFields = [
    { name: 'counterName', label: 'Counter Name', type: 'text' },
    { name: 'refillStopDay', label: 'Refill Stop Day', type: 'number' },
    { name: 'sms', label: 'SMS', type: 'text' },
    { name: 'startTime', label: 'Start Time', type: 'datetime-local' },
    { name: 'endTime', label: 'End Time', type: 'datetime-local' },
    // { name: 'createdBy', label: 'Created By', type: 'text' },
    // { name: 'updatedBy', label: 'Updated By', type: 'text' },
    // { name: 'createdAt', label: 'Created At', type: 'datetime-local' },
    // { name: 'updatedAt', label: 'Updated At', type: 'datetime-local' },
  ];

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, bgcolor: '#f5f5f5' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>ເພີ່ມຂໍ້ມູນ Additional</Typography>
        <IconButton onClick={handleClose} size="small">
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      <DialogContent sx={{ p: 4 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1a237e', mb: 2, pb: 0.5, borderBottom: '2px solid #e8eaf6' }}>
          📋 ຂໍ້ມູນທົ່ວໄປ (General Information)
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="body2" sx={{ fontWeight: 500, color: '#333', mb: 1 }}>
                Package (ID)
              </Typography>
              <FormControl fullWidth size="small">
                {loadingPackages || loadingSubCos ? (
                  <CircularProgress size={20} />
                ) : (
                  <Select
                    name="packageId"
                    value={formData.packageId}
                    onChange={handleChange}
                    displayEmpty
                    input={<OutlinedInput />}
                    renderValue={(selected) => {
                      if (!selected) {
                        return <em style={{ color: '#aaa' }}>ເລືອກ Id Package</em>;
                      }
                      const selectedPkg = packages.find(p => p.id === selected);
                      return selectedPkg ? `${selectedPkg.id} - ${selectedPkg.counterName}` : selected;
                    }}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          maxHeight: 400,
                          '& .MuiList-root': {
                            display: 'flex',
                            flexDirection: 'column',
                          },
                          '& .MuiMenuItem-root': {
                            display: 'flex',
                            padding: '8px 16px',
                          },
                        },
                      },
                    }}
                    sx={{ bgcolor: '#ffffff' }}
                  >
                    <MenuItem value="" disabled>
                      <em>ເລືອກ Id Package</em>
                    </MenuItem>
                    {(() => {
                      // Group packages by subCos
                      const grouped = {};
                      packages.forEach((pkg) => {
                        const subCosKey = pkg.subCos || 'Other';
                        if (!grouped[subCosKey]) grouped[subCosKey] = [];
                        grouped[subCosKey].push(pkg);
                      });

                      const items = [];
                      Object.keys(grouped).forEach((subCosKey) => {
                        // Find subCos label from options
                        const subCosOpt = subCosOptions.find(o => o.value === subCosKey);
                        const subCosLabel = subCosOpt ? subCosOpt.label : subCosKey;

                        // Add subCos group header
                        items.push(
                          <MenuItem
                            key={`header-${subCosKey}`}
                            disabled
                            sx={{
                              bgcolor: '#e3f2fd',
                              fontWeight: 'bold',
                              fontSize: '0.85rem',
                              color: '#1565c0',
                              borderBottom: '1px solid #bbdefb',
                              py: 1,
                              '&.Mui-disabled': {
                                opacity: 1,
                              },
                            }}
                          >
                            📦 {subCosLabel}
                          </MenuItem>
                        );

                        // Add packages under this subCos
                        grouped[subCosKey].forEach((pkg) => {
                          items.push(
                            <MenuItem
                              key={pkg.id}
                              value={pkg.id}
                              sx={{
                                pl: 4,
                                borderBottom: '1px solid #f0f0f0',
                              }}
                            >
                              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                  ID: {pkg.id} - {pkg.counterName}
                                </Typography>
                              </Box>
                            </MenuItem>
                          );
                        });
                      });

                      return items;
                    })()}
                  </Select>
                )}
              </FormControl>
            </Box>
          </Grid>

          {formFields.map((field, idx) => (
            <Grid item xs={12} sm={6} md={4} key={idx}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="body2" sx={{ fontWeight: 500, color: '#333', mb: 1 }}>
                  {field.label}
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  name={field.name}
                  type={field.type}
                  value={formData[field.name]}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  sx={{ '& .MuiOutlinedInput-root': { bgcolor: '#ffffff' } }}
                />
              </Box>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            disabled={loading}
            sx={{ width: '25%', py: 1.5, textTransform: 'none', fontSize: '18px', borderRadius: '50px' }}
          >
            {loading ? 'ກຳລັງບັນທຶກ...' : 'ບັນທຶກ (Save)'}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
