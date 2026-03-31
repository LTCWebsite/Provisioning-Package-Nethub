import React, { useState } from 'react';
import {
  Dialog, DialogContent, Button, Grid, TextField,
  Typography, Box, Divider, IconButton
} from '@mui/material';
import { AxiosReq } from '../../../../Components/Axios';
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
        const uploadFormData = new FormData();
        uploadFormData.append('file', file);
        // Assuming there's a bulk upload endpoint
        res = await AxiosReq.post('/PackageNethub/Whitelist/Upload', uploadFormData, {
          headers: {
            Authorization: "Bearer " + cookie.get("ONE_TOKEN"),
            'Content-Type': 'multipart/form-data'
          },
        });
      } else {
        res = await AxiosReq.post('/PackageNethub/Whitelist', formData, {
          headers: { Authorization: "Bearer " + cookie.get("ONE_TOKEN") },
        });
      }

      if (res.status === 200 || res.status === 201) {
        toast_success({ text: "ບັນທຶກຂໍ້ມູນສຳເລັດ (Saved Successfully)" });
        onSuccess();
        handleClose();
      }
    } catch (error) {
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
    { name: 'packageId', label: 'Package ID', type: 'text' },
    { name: 'packageCodes', label: 'Package Codes', type: 'text' },
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
        <Grid container spacing={3}>
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
