import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogContent, Button, Grid, TextField,
  FormControlLabel, Checkbox, Typography, Box, Divider,
  Select, MenuItem, OutlinedInput, Chip, CircularProgress
} from '@mui/material';
import { AxiosReq3 } from '../../../../Components/Axios';
import cookie from 'js-cookie';
import { toast_error, toast_success } from '../../../../Components/Toast';

// ✅ initialState ຕ້ອງຢູ່ນອກ component ຫຼື ກ່ອນ useState
const username = localStorage.getItem("USERNAME") || '';

const initialState = {
  id: 0,
  code: '',
  counterName: '',
  refillStopDay: 0,
  startTime: new Date().toLocaleString('sv-SE', {
    timeZone: 'Asia/Bangkok', hour12: false
  }).slice(0, 16).replace(' ', 'T'),
  endTime: new Date().toLocaleString('sv-SE', {
    timeZone: 'Asia/Bangkok', hour12: false
  }).slice(0, 16).replace(' ', 'T'),
  offeringId: '',
  serviceCode: '',
  validityDay: 0,
  mainPoint: 0,
  isIR: false,
  price: 0,
  is5G: false,
  remark: '',
  requiredCounterName: false,
  excludedCounterName: false,
  sms: '',
  whitelist: false,
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
  channels: [],     //  array ສຳລັບ multiselect
  createdBy: username,
  updatedBy: username,
};

export default function PackageFormDialog({ open, onClose, onSuccess }) {
  // hooks ທຸກຕົວຢູ່ເທິງສຸດ
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [subCosOptions, setSubCosOptions] = useState([]);
  const [loadingSubCos, setLoadingSubCos] = useState(false);
  const [channelsOptions, setChannelsOptions] = useState([]);
  const [loadingChannels, setLoadingChannels] = useState(false);

  useEffect(() => {
    fetchSubCos();
    fetchChannels();
  }, []);

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
      // Group by type, join all subcos values with '|'
      const grouped = {};
      data.forEach((item) => {
        const typeKey = item.offeringName || 'Other';
        if (!grouped[typeKey]) grouped[typeKey] = [];
        grouped[typeKey].push(item.subcos);
      });
      const options = Object.keys(grouped).map((type) => ({
        value: grouped[type].join('|'),  // ສົ່ງທັງໝົດ subcos ຂອງ type ນີ້ໄປ backend
        label: type,                      // ສະແດງຊື່ type (offeringName) ໃນ dropdown
      }));
      setSubCosOptions(options);
    } catch (err) {
      console.error('Failed to fetch subCos:', err);
      setSubCosOptions([]);
    } finally {
      setLoadingSubCos(false);
    }
  };

  const fetchChannels = async () => {
    setLoadingChannels(true);
    try {
      const res = await AxiosReq3.get('/WhiteListNethub/channels', {
        headers: {
          Authorization: "Bearer " + cookie.get("ONE_TOKEN"),
          'Content-Type': 'application/json'
        },
      });
      const data = res.data?.data ?? res.data ?? [];
      //console.log("channels data", data);
      const options = data.map((item) => ({
        value: item.channels,
        label: item.channels,
      }));
      setChannelsOptions(options);
    } catch (err) {
      console.error('Failed to fetch channels:', err);
      setChannelsOptions([]);
    } finally {
      setLoadingChannels(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleChecked = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  // multiselect handler
  const handleMultiSelect = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleClose = () => {
    setFormData(initialState);
    onClose();
  };

  const handleSubmit = async () => {
    setLoading(true);
    const username = localStorage.getItem("USERNAME") || '';
    const formatDate = (val) => {
      if (!val) return null;
      let dateStr = val.includes('T') ? val : val.replace(' ', 'T');
      if (dateStr.length === 16) dateStr += ':00';
      return dateStr;
    };

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
      channels: formData.channels.join('|') || '',
      createdBy: username,
    };

    try {
      const res = await AxiosReq3.post('/PackageNethub', payload, {
        headers: {
          Authorization: "Bearer " + cookie.get("ONE_TOKEN"),
          'Content-Type': 'application/json'
        },
      });
      if (res.status === 200 || res.status === 201) {
        toast_success({ text: "ສ້າງແພັກເກັດສຳເລັດ" });
        onSuccess();
        handleClose();
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
    { name: 'subCos', label: 'Sub Cos', type: 'select', options: subCosOptions, loading: loadingSubCos },
    { name: 'channels', label: 'Channels', type: 'multiselect', options: channelsOptions, loading: loadingChannels },
    { name: 'requiredCounterName', label: 'RequiredCounter', type: 'checkbox' },
    { name: 'excludedCounterName', label: 'ExcludedCounter', type: 'checkbox' },
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

  // renderField ຢູ່ໃນ component, ຮັບ field ເປັນ parameter
  const renderField = (field) => {
    if (field.type === 'checkbox') {
      return (
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
          label=""
          sx={{ m: 0 }}
        />
      );
    }

    if (field.type === 'select') {
      return field.loading ? (
        <CircularProgress size={20} />
      ) : (
        <Select
          size="small"
          fullWidth
          displayEmpty
          value={formData.subCos || ''}
          onChange={(e) => setFormData(prev => ({ ...prev, subCos: e.target.value }))}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            if (!selected) return <em style={{ color: '#aaa' }}>-- ເລືອກ --</em>;
            const opt = subCosOptions.find(o => o.value === selected);
            return opt?.label ?? selected;
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
          <MenuItem value=""><em>-- ເລືອກ --</em></MenuItem>
          {subCosOptions.map((opt) => (
            <MenuItem key={opt.label} value={opt.value}>
              📦 {opt.label}
            </MenuItem>
          ))}
        </Select>
      );
    }

    if (field.type === 'multiselect') {
      return field.loading ? (
        <CircularProgress size={20} />
      ) : (
        <Select
          multiple
          size="small"
          fullWidth
          value={formData[field.name] || []}
          onChange={(e) => handleMultiSelect(field.name, e.target.value)}
          input={<OutlinedInput />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((val) => {
                const opt = field.options.find(o => o.value === val);
                return <Chip key={val} label={opt?.label ?? val} size="small" />;
              })}
            </Box>
          )}
          MenuProps={{
            PaperProps: {
              sx: {
                maxHeight: 300,
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
          {field.options.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </Select>
      );
    }

    // text, number, datetime-local
    return (
      <TextField
        fullWidth
        size="small"
        name={field.name}
        type={field.type}
        value={formData[field.name] ?? ''}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        sx={{ '& .MuiOutlinedInput-root': { bgcolor: '#ffffff' } }}
      />
    );
  };

  const textFields = formFields.filter(f => f.type !== 'checkbox');
  const checkboxFields = formFields.filter(f => f.type === 'checkbox');

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xl" fullWidth
      PaperProps={{ sx: { bgcolor: '#f9fafb' } }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, bgcolor: '#f5f5f5' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>ເພີ່ມ Package</Typography>
      </Box>
      <DialogContent sx={{ p: 4, pt: 3 }}>
        {/* ===== ສ່ວນ Text / Input Fields ===== */}
        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1a237e', mb: 2, pb: 0.5, borderBottom: '2px solid #e8eaf6' }}>
          📋 ຂໍ້ມູນທົ່ວໄປ (General Information)
        </Typography>
        <Grid container spacing={3} sx={{ mb: 3 }}>
          {textFields.map((field, idx) => (
            <Grid item xs={12} sm={6} md={3} key={idx}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="body2" sx={{ fontWeight: 500, color: '#333', mb: 1 }}>
                  {field.label}
                </Typography>
                {renderField(field)}
              </Box>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 2 }} />

        {/* ===== ສ່ວນ Checkbox Fields ===== */}
        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1a237e', mb: 2, pb: 0.5, borderBottom: '2px solid #e8eaf6' }}>
          ⚙️ ການຕັ້ງຄ່າ (Settings)
        </Typography>
        <Grid container spacing={2}>
          {checkboxFields.map((field, idx) => (
            <Grid item xs={6} sm={4} md={2} key={idx}>
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                bgcolor: '#fff',
                borderRadius: 1,
                px: 1.5,
                py: 0.5,
                border: '1px solid #e0e0e0',
              }}>
                {renderField(field)}
                <Typography variant="body2" sx={{ fontWeight: 500, color: '#333', ml: 0.5 }}>
                  {field.label}
                </Typography>
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