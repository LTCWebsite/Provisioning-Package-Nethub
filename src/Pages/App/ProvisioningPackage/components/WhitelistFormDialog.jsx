import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogContent, Button, Grid, TextField,
  Typography, Box, Divider, IconButton, MenuItem, Select, FormControl,
  OutlinedInput, CircularProgress
} from '@mui/material';
import { AxiosReq3 } from '../../../../Components/Axios';
import cookie from 'js-cookie';
import { toast_error, toast_success } from '../../../../Components/Toast';
import { CloudUpload as CloudUploadIcon, Close as CloseIcon } from '@mui/icons-material';

export default function WhitelistFormDialog({ open, onClose, onSuccess }) {
  const username = localStorage.getItem("USERNAME") || '';
  const initialState = {
    msisdn: '',
    startTime: new Date().toLocaleString('sv-SE', {
      timeZone: 'Asia/Bangkok',
      hour12: false
    }).slice(0, 16),
    endTime: new Date().toLocaleString('sv-SE', {
      timeZone: 'Asia/Bangkok',
      hour12: false
    }).slice(0, 16),
    packageId: '',
    createdBy: username,
    updatedBy: username,
    packageCodes: ''
  };

  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
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
    try {
      const res = await AxiosReq3.get('/WhiteListNethub/packages', {
        headers: { Authorization: "Bearer " + cookie.get("ONE_TOKEN") },
      });
      if (res.data.data) {
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
    if (name === 'packageCodes') {
      const selectedPkg = packages.find(pkg => pkg.code === value);
      setFormData(prev => ({
        ...prev,
        packageCodes: value,
        packageId: selectedPkg ? selectedPkg.id : prev.packageId
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      let res;

      if (file) {
        // ── Upload CSV ──────────────────────────────────────
        const uploadFormData = new FormData();
        uploadFormData.append('file', file);
        res = await AxiosReq3.post('/WhiteListNethub/import-csv', uploadFormData, {
          headers: {
            Authorization: "Bearer " + cookie.get("ONE_TOKEN"),
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        // ── Insert ດ້ວຍ Form ─────────────────────────────────
        if (!formData.msisdn || !formData.packageCodes) {
          toast_error({ text: "ກະລຸນາປ້ອນ ເບີໂທ ແລະ Package Code" });
          setLoading(false);
          return;
        }

        const formatDate = (val) => {
          if (!val) return null;
          let dateStr = val.includes('T') ? val : val.replace(' ', 'T');
          if (dateStr.length === 16) dateStr += ':00';
          return dateStr;
        };

        const payload = {
          msisdn: formData.msisdn,
          packageId: formData.packageId ? parseInt(formData.packageId, 10) : 0,
          packageCodes: formData.packageCodes,
          startTime: formatDate(formData.startTime),
          endTime: formatDate(formData.endTime),
          createdAt: new Date().toISOString(),
          createdBy: formData.createdBy,
          updatedAt: new Date().toISOString(),
          updatedBy: formData.updatedBy,
        };

        console.log("Whitelist Payload:", payload);
        res = await AxiosReq3.post('/WhiteListNethub', payload, {
          headers: { Authorization: "Bearer " + cookie.get("ONE_TOKEN") },
        });
        console.log("Whitelist Response:", res.data);
      }

      if (res && (res.status === 200 || res.status === 201)) {
        toast_success({ text: "ບັນທຶກຂໍ້ມູນສຳເລັດ (Saved Successfully)" });
        onSuccess();
        handleClose();
      }

    } catch (error) {
      console.error("Submit error:", error);
      toast_error({ text: "ເກີດຂໍ້ຜິດພາດ: " + (error.response?.data?.message || error.message) });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData(initialState);
    setFile(null);
    onClose();
  };

  const formFields = [
    { name: 'msisdn', label: 'ເບີໂທລະສັບ (msisdn)', type: 'text' },
    { name: 'packageCodes', label: 'Package Codes', type: 'text' },
    { name: 'packageId', label: 'Package ID', type: 'text' },
    { name: 'startTime', label: 'Start Time', type: 'datetime-local' },
    { name: 'endTime', label: 'End Time', type: 'datetime-local' }
  ];

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, bgcolor: '#f5f5f5' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>ເພີ່ມເບີໂທລະສັບ Whitelist</Typography>
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
          {formFields.map((field, idx) => (
            <Grid item xs={12} sm={6} md={4} key={idx}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="body2" sx={{ fontWeight: 500, color: '#333', mb: 1 }}>
                  {field.label}
                </Typography>
                {field.name === 'packageCodes' ? (
                  <FormControl fullWidth size="small">
                    {loadingPackages || loadingSubCos ? (
                      <CircularProgress size={20} />
                    ) : (
                      <Select
                        name="packageCodes"
                        value={formData.packageCodes}
                        onChange={handleChange}
                        displayEmpty
                        input={<OutlinedInput />}
                        renderValue={(selected) => {
                          if (!selected) {
                            return <em style={{ color: '#aaa' }}>ເລືອກ Package Code</em>;
                          }
                          return selected;
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
                          <em>ເລືອກ Package Code</em>
                        </MenuItem>
                        {(() => {
                          const grouped = {};
                          packages.forEach((pkg) => {
                            const subCosKey = pkg.subCos || 'Other';
                            if (!grouped[subCosKey]) grouped[subCosKey] = [];
                            grouped[subCosKey].push(pkg);
                          });

                          const items = [];
                          Object.keys(grouped).forEach((subCosKey) => {
                            const subCosOpt = subCosOptions.find(o => o.value === subCosKey);
                            const subCosLabel = subCosOpt ? subCosOpt.label : subCosKey;

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
                                  '&.Mui-disabled': { opacity: 1 },
                                }}
                              >
                                📦 {subCosLabel}
                              </MenuItem>
                            );

                            grouped[subCosKey].forEach((pkg) => {
                              items.push(
                                <MenuItem
                                  key={pkg.id}
                                  value={pkg.code}
                                  sx={{
                                    pl: 4,
                                    borderBottom: '1px solid #f0f0f0',
                                  }}
                                >
                                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                      {pkg.code} - ID: {pkg.id}
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
                ) : (
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
                )}
              </Box>
            </Grid>
          ))}

          <Grid item xs={12}>
            <Divider sx={{ my: 2 }}>
              <Typography variant="body2" color="textSecondary">ຫຼື (OR)</Typography>
            </Divider>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px dashed #ccc',
              borderRadius: 2,
              p: 3,
              textAlign: 'center',
              bgcolor: file ? '#e8f5e9' : '#fafafa',
              cursor: 'pointer',
              '&:hover': { bgcolor: '#f0f0f0' },
              minHeight: '50px'
            }} component="label">
              <input type="file" accept=".csv" hidden onChange={handleFileChange} />
              <CloudUploadIcon sx={{ fontSize: 40, color: '#666', mb: 1 }} />
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {file ? file.name : 'Browse file CSV ເຂົ້າ'}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                ຄລິກເພື່ອເລືອກໄຟລ໌ CSV
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            disabled={loading}
            sx={{ width: '20%', py: 2, textTransform: 'none', fontSize: '20px' }}
          >
            {loading ? 'ກຳລັງບັນທຶກ...' : 'ບັນທຶກ (Save)'}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
