import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogContent, Button, Grid, TextField,
  Typography, Box, Divider, IconButton, MenuItem, Select, FormControl, FormControlLabel, Checkbox
} from '@mui/material';
import { AxiosReq3 } from '../../../../Components/Axios';
import cookie from 'js-cookie';
import { toast_error, toast_success } from '../../../../Components/Toast';
import { Close as CloseIcon } from '@mui/icons-material';

export default function PackageExcludedEditDialog({ open, onClose, onSuccess, data }) {
  const username = localStorage.getItem('USERNAME');

  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    if (open) {
      fetchPackages();
    }
  }, [open]);

  useEffect(() => {
    if (data && open) {
      setFormData({
        ...data,
        packageId: data.packageId || '',
        counterName: data.counterName || '',
        errorMessage: data.errorMessage || '',
        minData: data.minData || 0,
        requireExpiryCheck: !!data.requireExpiryCheck,
      });
    }
  }, [data, open]);

  const fetchPackages = async () => {
    try {
      const res = await AxiosReq3.get('/PackageExcludedNethub/packages', {
        headers: { Authorization: "Bearer " + cookie.get("ONE_TOKEN") },
      });
      if (res.data.data) {
        setPackages(res.data.data);
      }
    } catch (error) {
      console.error('Error fetching packages:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'packageId') {
      const selectedPkg = packages.find(pkg => pkg.id === value || pkg.code === value);
      setFormData(prev => ({
        ...prev,
        packageId: value,
        counterName: selectedPkg ? selectedPkg.counterName : ''
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const payload = {
        id: formData.id,
        packageId: formData.packageId,
        counterName: formData.counterName,
        errorMessage: formData.errorMessage,
        minData: Number(formData.minData) || 0,
        requireExpiryCheck: !!formData.requireExpiryCheck,
        updatedAt: new Date().toISOString(),
        updatedBy: username || '',
      };

      const res = await AxiosReq3.put(`/PackageExcludedNethub/${formData.id}`, payload, {
        headers: { Authorization: "Bearer " + cookie.get("ONE_TOKEN") },
      });

      if (res.status === 200 || res.status === 201) {
        toast_success({ text: "ແກ້ໄຂຂໍ້ມູນສຳເລັດ (Edited Successfully)" });
        onSuccess();
        onClose();
      }
    } catch (error) {
      toast_error({ text: "ເກີດຂໍ້ຜິດພາດ: " + (error.response?.data?.message || error.message) });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, bgcolor: '#f5f5f5' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>ແກ້ໄຂ Package Excluded</Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      <DialogContent sx={{ p: 4 }}>
        <Grid container spacing={3}>
          {/* packageId Dropdown */}
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="body2" sx={{ fontWeight: 500, color: '#333', mb: 1 }}>
                Package (ID)
              </Typography>
              <FormControl fullWidth size="small">
                <Select
                  name="packageId"
                  value={formData.packageId || ''}
                  onChange={handleChange}
                  displayEmpty
                  sx={{ bgcolor: '#ffffff' }}
                  renderValue={(selected) => {
                    if (!selected) {
                      return "ເລືອກ Package";
                    }
                    return selected;
                  }}
                >
                  <MenuItem value="" disabled>ເລືອກ Package</MenuItem>
                  {packages.map((pkg) => (
                    <MenuItem key={pkg.id} value={pkg.id}>
                      {pkg.id}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Grid>

          {/* counterName Dropdown */}
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="body2" sx={{ fontWeight: 500, color: '#333', mb: 1 }}>
                Counter Name
              </Typography>
              <FormControl fullWidth size="small">
                <Select
                  name="counterName"
                  value={formData.counterName || ''}
                  onChange={handleChange}
                  displayEmpty
                  sx={{ bgcolor: '#ffffff' }}
                  renderValue={(selected) => {
                    if (!selected) {
                      return "ເລືອກ Counter Name";
                    }
                    return selected;
                  }}
                >
                  <MenuItem value="" disabled>ເລືອກ Counter Name</MenuItem>
                  {[...new Set(packages.map(pkg => pkg.counterName))].filter(Boolean).map((name) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Grid>

          {/* errorMessage */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="body2" sx={{ fontWeight: 500, color: '#333', mb: 1 }}>
                Error Message
              </Typography>
              <TextField
                fullWidth
                size="small"
                name="errorMessage"
                value={formData.errorMessage || ''}
                onChange={handleChange}
                sx={{ '& .MuiOutlinedInput-root': { bgcolor: '#ffffff' } }}
              />
            </Box>
          </Grid>

          {/* minData */}
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="body2" sx={{ fontWeight: 500, color: '#333', mb: 1 }}>
                Min Data
              </Typography>
              <TextField
                fullWidth
                size="small"
                type="number"
                name="minData"
                value={formData.minData || ''}
                onChange={handleChange}
                sx={{ '& .MuiOutlinedInput-root': { bgcolor: '#ffffff' } }}
              />
            </Box>
          </Grid>

          {/* requireExpiryCheck */}
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', height: '100%', pt: 3 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={!!formData.requireExpiryCheck}
                    onChange={handleCheckboxChange}
                    name="requireExpiryCheck"
                    color="primary"
                  />
                }
                label="Require Expiry Check"
              />
            </Box>
          </Grid>
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
