import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Grid, Typography, Box, Chip, Divider, IconButton
} from '@mui/material';
import CloseIcon from '@material-ui/icons/Close';

export default function PackageViewDialog({ open, onClose, data }) {
  if (!data) return null;

  const generalFields = [
    { label: 'ID', value: data.id },
    { label: 'Code', value: data.code },
    { label: 'Counter Name', value: data.counterName },
    { label: 'Offering ID', value: data.offeringId },
    { label: 'Service Code', value: data.serviceCode },
    { label: 'Price', value: data.price },
    { label: 'Validity Day', value: data.validityDay },
    { label: 'Main Point', value: data.mainPoint },
    { label: 'Refill Stop Day', value: data.refillStopDay },
    { label: 'Start Time', value: data.startTime },
    { label: 'End Time', value: data.endTime },
  ];

  const detailFields = [
    { label: 'Remark', value: data.remark },
    { label: 'SMS', value: data.sms },
    { label: 'SMS LA', value: data.smsLa },
    { label: 'Sub Cos', value: data.subCos },
    { label: 'Channels', value: data.channels },
    { label: 'Extra', value: data.extra },
    { label: 'Expiry Last Day Of Month', value: data.expiryLastDayOfMonth },
    { label: 'Required Counter Name', value: data.requiredCounterName },
    { label: 'Excluded Counter Name', value: data.excludedCounterName },
  ];

  const booleanFields = [
    { label: 'Whitelist', value: data.whitelist },
    { label: 'Is IR', value: data.isIR || data.isIr },
    { label: 'Is 5G', value: data.is5G },
    { label: 'Is Topping', value: data.isTopping },
    { label: 'Supporting 5G', value: data.isSupporting5G },
    { label: 'CBS Charge', value: data.isCbsCharge },
    { label: 'Additional', value: data.isAdditional },
    { label: 'Cancelable', value: data.cancelable },
    { label: 'LMM', value: data.isLmm },
    { label: 'Whitelist Additional', value: data.isWhitelistAdditional },
    { label: 'FTTH Bundle', value: data.isFtthBundle },
    { label: 'Location', value: data.isLocation },
    { label: 'Needs Offering', value: data.needsOffering },
  ];

  const auditFields = [
    { label: 'Created At', value: data.createdAt },
    { label: 'Created By', value: data.createdBy },
    { label: 'Updated At', value: data.updatedAt },
    { label: 'Updated By', value: data.updatedBy },
  ];

  const renderValue = (val) => {
    if (val === null || val === undefined || val === '') return '—';
    return String(val);
  };

  const SectionTitle = ({ children }) => (
    <Typography
      variant="subtitle1"
      sx={{
        fontWeight: 700,
        color: '#1a237e',
        mb: 1.5,
        mt: 2,
        pb: 0.5,
        borderBottom: '2px solid #e8eaf6',
        display: 'flex',
        alignItems: 'center',
        gap: 1,
      }}
    >
      {children}
    </Typography>
  );

  const InfoRow = ({ label, value }) => (
    <Box sx={{ py: 0.8, display: 'flex', alignItems: 'flex-start' }}>
      <Typography
        variant="body2"
        sx={{ fontWeight: 600, color: '#546e7a', minWidth: 160, flexShrink: 0 }}
      >
        {label}
      </Typography>
      <Typography
        variant="body2"
        sx={{ color: '#263238', wordBreak: 'break-word' }}
      >
        {renderValue(value)}
      </Typography>
    </Box>
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          overflow: 'hidden',
        }
      }}
    >
      {/* Header */}
      <DialogTitle
        sx={{
          background: 'linear-gradient(135deg, #1a237e 0%, #283593 100%)',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          py: 2,
          px: 3,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: 0.5 }}>
            📦 Package Detail
          </Typography>
          {data.code && (
            <Chip
              label={data.code}
              size="small"
              sx={{
                bgcolor: 'rgba(255,255,255,0.2)',
                color: '#fff',
                fontWeight: 600,
                fontSize: '0.85rem',
              }}
            />
          )}
        </Box>
        <IconButton onClick={onClose} sx={{ color: '#fff' }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      {/* Content */}
      <DialogContent sx={{ p: 3, bgcolor: '#fafbfc' }}>
        {/* General Information */}
        <SectionTitle>📋 ຂໍ້ມູນທົ່ວໄປ (General Information)</SectionTitle>
        <Grid container spacing={2}>
          {generalFields.map((f, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Box
                sx={{
                  bgcolor: '#fff',
                  borderRadius: 2,
                  px: 2,
                  py: 1,
                  border: '1px solid #e0e0e0',
                  height: '100%',
                }}
              >
                <InfoRow label={f.label} value={f.value} />
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Detail Information */}
        {/* <SectionTitle>📝 ລາຍລະອຽດ (Details)</SectionTitle> */}
        <Grid container spacing={2}>
          {detailFields.map((f, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Box
                sx={{
                  bgcolor: '#fff',
                  borderRadius: 2,
                  px: 2,
                  py: 1,
                  border: '1px solid #e0e0e0',
                  height: '100%',
                }}
              >
                <InfoRow label={f.label} value={f.value} />
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Boolean Flags */}
        {/* <SectionTitle>⚙️ ການຕັ້ງຄ່າ (Settings)</SectionTitle> */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1,
            bgcolor: '#fff',
            borderRadius: 2,
            p: 2,
            border: '1px solid #e0e0e0',
          }}
        >
          {booleanFields.map((f, i) => (
            <Chip
              key={i}
              label={f.label}
              size="small"
              sx={{
                fontWeight: 600,
                fontSize: '0.8rem',
                bgcolor: f.value ? '#e8f5e9' : '#ffebee',
                color: f.value ? '#2e7d32' : '#c62828',
                border: `1px solid ${f.value ? '#a5d6a7' : '#ef9a9a'}`,
              }}
              icon={
                <span style={{ fontSize: '14px', marginLeft: '8px' }}>
                  {f.value ? '✅' : '❌'}
                </span>
              }
            />
          ))}
        </Box>

        {/* Audit Information */}
        <SectionTitle>🕐 ຂໍ້ມູນການບັນທຶກ (Audit Info)</SectionTitle>
        <Grid container spacing={2}>
          {auditFields.map((f, i) => (
            <Grid item xs={12} sm={6} md={3} key={i}>
              <Box
                sx={{
                  bgcolor: '#fff',
                  borderRadius: 2,
                  px: 2,
                  py: 1,
                  border: '1px solid #e0e0e0',
                  height: '100%',
                }}
              >
                <InfoRow label={f.label} value={f.value} />
              </Box>
            </Grid>
          ))}
        </Grid>
      </DialogContent>

      {/* Footer */}
      <DialogActions sx={{ px: 3, py: 2, bgcolor: '#fafbfc', borderTop: '1px solid #e0e0e0' }}>
        <Button
          onClick={onClose}
          variant="contained"
          sx={{
            textTransform: 'none',
            borderRadius: 2,
            px: 4,
            py: 1,
            bgcolor: '#1a237e',
            '&:hover': { bgcolor: '#283593' },
          }}
        >
          ປິດ (Close)
        </Button>
      </DialogActions>
    </Dialog>
  );
}
