import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogContent, Button, Grid, TextField,
  Typography, Box, Divider, IconButton, MenuItem, Select, FormControl
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

  useEffect(() => {
    if (open) {
      fetchPackages();
    }
  }, [open]);


  const fetchPackages = async () => {
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
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="body2" sx={{ fontWeight: 500, color: '#333', mb: 1 }}>
                Package (ID)
              </Typography>
              <FormControl fullWidth size="small">
                <Select
                  name="packageId"
                  value={formData.packageId}
                  onChange={handleChange}
                  displayEmpty
                  sx={{ bgcolor: '#ffffff' }}
                  renderValue={(selected) => {
                    if (!selected) {
                      return "ເລືອກ Id Package";
                    }
                    const selectedPkg = packages.find(p => p.id === selected);
                    return selectedPkg ? `${selectedPkg.id} - ${selectedPkg.counterName}` : selected;
                  }}
                >
                  <MenuItem value="" disabled>ເລືອກ Id Package</MenuItem>
                  {packages.map((pkg) => (
                    <MenuItem key={pkg.id} value={pkg.id} sx={{ borderBottom: '1px solid #f0f0f0' }}>
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                          Package Id: {pkg.id} - {pkg.counterName}  ||
                        </Typography>
                        {/* <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                          Name: {pkg.counterName}
                        </Typography> */}
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
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
