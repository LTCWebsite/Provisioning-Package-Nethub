import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, Button, Grid, TextField,
  Typography, Box, Divider, IconButton, MenuItem, Select, FormControl
} from '@mui/material';
import { AxiosReq3 } from '../../../../Components/Axios';
import cookie from 'js-cookie';
import { toast_error, toast_success } from '../../../../Components/Toast';
import { Close as CloseIcon } from '@mui/icons-material';

export default function WhitelistEditDialog({ open, onClose, onSuccess, data }) {
  const username = localStorage.getItem("USERNAME") || '';
  
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
        id: data.id,
        msisdn: data.msisdn || '',
        startTime: data.startTime ? data.startTime.slice(0, 16) : '',
        endTime: data.endTime ? data.endTime.slice(0, 16) : '',
        packageId: data.packageId || '',
        packageCodes: data.packageCodes || '',
      });
    }
  }, [data, open]);

  const fetchPackages = async () => {
    try {
      const res = await AxiosReq3.get('/WhiteListNethub/packages', {
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

  const handleSubmit = async () => {
    setLoading(true);
    try {
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
        id: formData.id,
        msisdn: formData.msisdn,
        packageId: formData.packageId ? parseInt(formData.packageId, 10) : 0,
        packageCodes: formData.packageCodes,
        startTime: formatDate(formData.startTime),
        endTime: formatDate(formData.endTime),
        updatedAt: new Date().toISOString(),
        updatedBy: username,
      };

      const res = await AxiosReq3.put(`/WhiteListNethub/${formData.id}`, payload, {
        headers: { Authorization: "Bearer " + cookie.get("ONE_TOKEN") },
      });
      
      if (res && (res.status === 200 || res.status === 201)) {
        toast_success({ text: "ແກ້ໄຂຂໍ້ມູນສຳເລັດ (Edited Successfully)" });
        onSuccess();
        onClose();
      }
    } catch (error) {
      console.error("Submit error:", error);
      toast_error({ text: "ເກີດຂໍ້ຜິດພາດ: " + (error.response?.data?.message || error.message) });
    } finally {
      setLoading(false);
    }
  };

  const formFields = [
    { name: 'msisdn', label: 'ເບີໂທລະສັບ (msisdn)', type: 'text' },
    { name: 'packageCodes', label: 'Package Codes', type: 'text' },
    { name: 'packageId', label: 'Package ID', type: 'text' },
    { name: 'startTime', label: 'Start Time', type: 'datetime-local' },
    { name: 'endTime', label: 'End Time', type: 'datetime-local' }
  ];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, bgcolor: '#f5f5f5' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>ແກ້ໄຂ Whitelist</Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      <DialogContent sx={{ p: 4 }}>
        <Grid container spacing={3}>
          {formFields.map((field, idx) => (
            <Grid item xs={12} sm={6} md={4} key={idx}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="body2" sx={{ fontWeight: 500, color: '#333', mb: 1 }}>
                  {field.label}
                </Typography>
                {field.name === 'packageCodes' ? (
                  <FormControl fullWidth size="small">
                    <Select
                      name="packageCodes"
                      value={formData.packageCodes || ''}
                      onChange={handleChange}
                      displayEmpty
                      sx={{ bgcolor: '#ffffff' }}
                      renderValue={(selected) => {
                        if (!selected) {
                          return <Typography sx={{ color: '#999' }}>ເລືອກ Package Code</Typography>;
                        }
                        return selected;
                      }}
                    >
                      <MenuItem value="" disabled>ເລືອກ Package Code</MenuItem>
                      {packages.map((pkg, pIdx) => (
                        <MenuItem key={pIdx} value={pkg.code}>
                          {pkg.code}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                ) : (
                  <TextField
                    fullWidth
                    size="small"
                    name={field.name}
                    type={field.type}
                    value={formData[field.name] || ''}
                    onChange={handleChange}
                    disabled={field.name === 'packageId'}
                    InputLabelProps={{ shrink: true }}
                    sx={{ '& .MuiOutlinedInput-root': { bgcolor: '#ffffff' } }}
                  />
                )}
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
            sx={{ width: '20%', py: 2, textTransform: 'none', fontSize: '20px' }}
          >
            {loading ? 'ກຳລັງບັນທຶກ...' : 'ບັນທຶກ (Save)'}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
