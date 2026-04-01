import React, { useState } from 'react';
import {
  Dialog, DialogContent, Button, Grid, TextField,
  FormControlLabel, Checkbox, Typography, Box
} from '@mui/material';
import { AxiosReq, AxiosReq3 } from '../../../../Components/Axios';
import cookie from 'js-cookie';
import { toast_error, toast_success } from '../../../../Components/Toast';

export default function PackageFormDialog({ open, onClose, onSuccess }) {
  const username = localStorage.getItem("USERNAME") || '';
  const initialState = {
    id: 0,
    code: '',
    counterName: '',
    refillStopDay: 0,
    startTime: new Date().toLocaleString('sv-SE', {
      timeZone: 'Asia/Bangkok',
      hour12: false
    }).slice(0, 16).replace(' ', 'T'),
    endTime: new Date().toLocaleString('sv-SE', {
      timeZone: 'Asia/Bangkok',
      hour12: false
    }).slice(0, 16).replace(' ', 'T'),
    offeringId: '',
    serviceCode: '',
    validityDay: 0,
    mainPoint: 0,
    isIR: false,
    price: 0,
    is5G: false,
    remark: '',
    requiredCounterName: '',
    excludedCounterName: '',
    sms: '',
    whitelist: '',
    extra: 0,
    isTopping: false,
    smsLa: '',
    expiryLastDayOfMonth: 0,
    isSupporting5G: false,
    subCos: '',
    isCbsCharge: false,
    isAdditional: false,
    cancelable: false,
    isLmm: false,
    isWhitelistAdditional: false,
    isFtthBundle: false,
    isLocation: false,
    needsOffering: false,
    channels: '',
    createdBy: username,
    updatedBy: username,
    createdAt: new Date().toLocaleString('sv-SE', {
      timeZone: 'Asia/Bangkok',
      hour12: false
    }).slice(0, 16),
    updatedAt: new Date().toLocaleString('sv-SE', {
      timeZone: 'Asia/Bangkok',
      hour12: false
    }).slice(0, 16)
  };

  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleChecked = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async () => {
    setLoading(true);

    //const currentUser = cookie.get("ONE_USER") || "admin";
    const username = localStorage.getItem("USERNAME") || '';
    // Format datetime fields - keep ISO 8601 'T' separator for C# System.Text.Json
    const formatDate = (val) => {
      if (!val) return null;
      let dateStr = val.includes('T') ? val : val.replace(' ', 'T');
      if (dateStr.length === 16) dateStr += ':00';
      return dateStr;
    };

    // Build payload matching backend PackageInsertRequest exactly
    const payload = {
      code: formData.code || '',
      counterName: formData.counterName || '',
      refillStopDay: Number(formData.refillStopDay) || 0,
      startTime: formatDate(formData.startTime),
      endTime: formatDate(formData.endTime),
      offeringId: formData.offeringId || '',
      serviceCode: formData.serviceCode || '',
      validityDay: Number(formData.validityDay) || 0,
      mainPoint: Number(formData.mainPoint) || 0,
      isIr: !!formData.isIR,
      price: Number(formData.price) || 0,
      is5G: !!formData.is5G,
      remark: formData.remark || '',
      requiredCounterName: !!formData.requiredCounterName,
      excludedCounterName: !!formData.excludedCounterName,
      sms: formData.sms || '',
      smsLa: formData.smsLa || '',
      whitelist: !!formData.whitelist,
      extra: !!formData.extra,
      isTopping: !!formData.isTopping,
      expiryLastDayOfMonth: !!formData.expiryLastDayOfMonth,
      isSupporting5G: !!formData.isSupporting5G,
      subCos: formData.subCos || '',
      isCbsCharge: !!formData.isCbsCharge,
      isAdditional: !!formData.isAdditional,
      cancelable: !!formData.cancelable,
      isLmm: !!formData.isLmm,
      isWhitelistAdditional: !!formData.isWhitelistAdditional,
      isFtthBundle: !!formData.isFtthBundle,
      isLocation: !!formData.isLocation,
      needsOffering: !!formData.needsOffering,
      channels: formData.channels || '',
      createdBy: username,
    };

    console.log("Submitting Payload:", payload);
    try {
      const res = await AxiosReq3.post('/PackageNethub', payload, {
        headers: {
          Authorization: "Bearer " + cookie.get("ONE_TOKEN"),
          'Content-Type': 'application/json'
        },
      });
      console.log("API Response:", res);
      if (res.status === 200 || res.status === 201) {
        toast_success({ text: "ສ້າງແພັກເກັດສຳເລັດ (Created Successfully)" });
        onSuccess();
        handleClose();
      }
    } catch (error) {
      console.error("API Error Object:", error);
      console.error("API Error Response Data:", error.response?.data);
      toast_error({ text: "ເກີດຂໍ້ຜິດພາດ: " + (error.response?.data?.message || error.message) });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData(initialState);
    onClose();
  };

  const formFields = [
    { name: 'code', label: 'Code', type: 'text' },
    { name: 'counterName', label: 'Counter Name', type: 'text' },
    { name: 'offeringId', label: 'Offering ID', type: 'text' },
    { name: 'serviceCode', label: 'Service Code', type: 'text' },
    { name: 'price', label: 'Price', type: 'number' },
    { name: 'validityDay', label: 'Validity Day', type: 'number' },
    { name: 'mainPoint', label: 'Main Point', type: 'number' },
    { name: 'refillStopDay', label: 'Refill Stop Day', type: 'number' },
    { name: 'startTime', label: 'Start Time', type: 'datetime-local' },
    { name: 'endTime', label: 'End Time', type: 'datetime-local' },
    { name: 'expiryLastDayOfMonth', label: 'Expiry Last Day', type: 'number' },
    { name: 'extra', label: 'Extra', type: 'number' },
    { name: 'remark', label: 'Remark', type: 'text' },
    { name: 'sms', label: 'SMS', type: 'text' },
    { name: 'smsLa', label: 'SMS LA', type: 'text' },
    { name: 'subCos', label: 'Sub Cos', type: 'text' },
    { name: 'channels', label: 'Channels', type: 'text' },
    { name: 'requiredCounterName', label: 'Req. Counter', type: 'text' },
    { name: 'excludedCounterName', label: 'Excl. Counter', type: 'text' },
    { name: 'whitelist', label: 'Whitelist', type: 'text' },
    { name: 'isIR', label: 'Is IR', type: 'checkbox' },
    { name: 'is5G', label: 'Is 5G', type: 'checkbox' },
    { name: 'isTopping', label: 'Is Topping', type: 'checkbox' },
    { name: 'isSupporting5G', label: 'Support 5G', type: 'checkbox' },
    { name: 'isCbsCharge', label: 'CBS Charge', type: 'checkbox' },
    { name: 'isAdditional', label: 'Additional', type: 'checkbox' },
    { name: 'cancelable', label: 'Cancelable', type: 'checkbox' },
    { name: 'isLmm', label: 'LMM', type: 'checkbox' },
    { name: 'isWhitelistAdditional', label: 'Whitelist Add.', type: 'checkbox' },
    { name: 'isFtthBundle', label: 'FTTH Bundle', type: 'checkbox' },
    { name: 'isLocation', label: 'Location', type: 'checkbox' },
    { name: 'needsOffering', label: 'Needs Offering', type: 'checkbox' },
  ];

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xl" fullWidth PaperProps={{ sx: { bgcolor: '#f9fafb' } }}>
      <DialogContent sx={{ p: 4, pt: 5 }}>
        <Grid container spacing={4} sx={{ mb: 2 }}>
          {formFields.map((field, idx) => (
            <Grid item xs={12} sm={6} md={3} key={idx}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="body2" sx={{ fontWeight: 500, color: '#333', mb: 1 }}>
                  {field.label}
                </Typography>
                {field.type === 'checkbox' ? (
                  <FormControlLabel
                    control={
                      <Checkbox
                        size="small"
                        checked={formData[field.name]}
                        onChange={handleChecked}
                        name={field.name}
                        color="primary"
                        sx={{ py: 0 }}
                      />
                    }
                    label={<Typography variant="body2" color="textSecondary">{field.checkboxLabel}</Typography>}
                    sx={{ m: 0 }}
                  />
                ) : (
                  <TextField
                    fullWidth
                    size="small"
                    name={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                    value={formData[field.name]}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                    sx={{
                      '& .MuiOutlinedInput-root': { bgcolor: '#ffffff' }
                    }}
                  />
                )}
              </Box>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 1 }}>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            disabled={loading}
            sx={{ width: '10%', py: 2, textTransform: 'none', fontSize: '20px' }}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
