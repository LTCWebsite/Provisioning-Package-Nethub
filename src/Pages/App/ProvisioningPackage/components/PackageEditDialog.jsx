import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogContent, Button, Grid, TextField,
  FormControlLabel, Checkbox, Typography, Box, IconButton, Divider
} from '@mui/material';
import { AxiosReq3 } from '../../../../Components/Axios';
import cookie from 'js-cookie';
import { toast_error, toast_success } from '../../../../Components/Toast';
import { Close as CloseIcon } from '@mui/icons-material';

export default function PackageEditDialog({ open, onClose, onSuccess, data }) {
  const username = localStorage.getItem("USERNAME") || '';
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data && open) {
      setFormData({
        ...data,
        refillStopDay: data.refillStopDay || 0,
        startTime: data.startTime ? data.startTime.slice(0, 16).replace(' ', 'T') : '',
        endTime: data.endTime ? data.endTime.slice(0, 16).replace(' ', 'T') : '',
        validityDay: data.validityDay || 0,
        mainPoint: data.mainPoint || 0,
        price: data.price || 0,
        isIR: !!data.isIr,
        is5G: !!data.is5G,
        requiredCounterName: !!data.requiredCounterName,
        excludedCounterName: !!data.excludedCounterName,
        whitelist: !!data.whitelist,
        extra: !!data.extra,
        isTopping: !!data.isTopping,
        expiryLastDayOfMonth: !!data.expiryLastDayOfMonth,
        isSupporting5G: !!data.isSupporting5G,
        isCbsCharge: !!data.isCbsCharge,
        isAdditional: !!data.isAdditional,
        cancelable: !!data.cancelable,
        isLmm: !!data.isLmm,
        isWhitelistAdditional: !!data.isWhitelistAdditional,
        isFtthBundle: !!data.isFtthBundle,
        isLocation: !!data.isLocation,
        needsOffering: !!data.needsOffering,
      });
    }
  }, [data, open]);

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

    const formatDate = (val) => {
      if (!val) return null;
      let dateStr = val.includes('T') ? val : val.replace(' ', 'T');
      if (dateStr.length === 16) dateStr += ':00';
      return dateStr;
    };

    const payload = {
      id: formData.id,
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
      updatedBy: username,
      updatedAt: new Date().toISOString()
    };

    try {
      const res = await AxiosReq3.put(`/PackageNethub/${formData.id}`, payload, {
        headers: {
          Authorization: "Bearer " + cookie.get("ONE_TOKEN"),
          'Content-Type': 'application/json'
        },
      });
      if (res.status === 200 || res.status === 201) {
        toast_success({ text: "ແກ້ໄຂແພັດເກັດສຳເລັດ (Edited Successfully)" });
        onSuccess();
        onClose();
      }
    } catch (error) {
      toast_error({ text: "ເກີດຂໍ້ຜິດພາດ: " + (error.response?.data?.message || error.message) });
    } finally {
      setLoading(false);
    }
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
    { name: 'whitelist', label: 'Whitelist', type: 'checkbox' },
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
    <Dialog open={open} onClose={onClose} maxWidth="xl" fullWidth PaperProps={{ sx: { bgcolor: '#f9fafb' } }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, bgcolor: '#f5f5f5' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>ແກ້ໄຂ Package</Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
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
                        checked={!!formData[field.name]}
                        onChange={handleChecked}
                        name={field.name}
                        color="primary"
                        sx={{ py: 0 }}
                      />
                    }
                    label={<Typography variant="body2" color="textSecondary">{field.label}</Typography>}
                    sx={{ m: 0 }}
                  />
                ) : (
                  <TextField
                    fullWidth
                    size="small"
                    name={field.name}
                    type={field.type}
                    value={formData[field.name] || ''}
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
