import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Grid, Typography, Box, Chip, IconButton
} from '@mui/material';
import CloseIcon from '@material-ui/icons/Close';

/**
 * Reusable Detail View Dialog
 *
 * Props:
 *   - open: boolean
 *   - onClose: function
 *   - data: object (row data)
 *   - title: string (dialog title)
 *   - icon: string (emoji icon)
 *   - color: string (header gradient start color)
 *   - sections: array of { title, icon, fields }
 *       fields: array of { label, field, type }
 *       type: 'text' (default) | 'boolean'
 */
export default function DetailViewDialog({ open, onClose, data, title, icon = '📋', color = '#1a237e', sections = [] }) {
  if (!data) return null;

  const renderValue = (val) => {
    if (val === null || val === undefined || val === '') return '—';
    return String(val);
  };

  const SectionTitle = ({ children, sectionIcon }) => (
    <Typography
      variant="subtitle1"
      sx={{
        fontWeight: 700,
        color: color,
        mb: 1.5,
        mt: 2,
        pb: 0.5,
        borderBottom: `2px solid ${color}22`,
        display: 'flex',
        alignItems: 'center',
        gap: 1,
      }}
    >
      {sectionIcon} {children}
    </Typography>
  );

  const InfoRow = ({ label, value }) => (
    <Box sx={{ py: 0.8, display: 'flex', alignItems: 'flex-start' }}>
      <Typography
        variant="body2"
        sx={{ fontWeight: 600, color: '#546e7a', minWidth: 140, flexShrink: 0 }}
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
          background: `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`,
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
            {icon} {title}
          </Typography>
        </Box>
        <IconButton onClick={onClose} sx={{ color: '#fff' }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      {/* Content */}
      <DialogContent sx={{ p: 3, bgcolor: '#fafbfc' }}>
        {sections.map((section, sIdx) => (
          <Box key={sIdx}>
            <SectionTitle sectionIcon={section.icon}>{section.title}</SectionTitle>

            {/* Boolean section: render as chips */}
            {section.fields.every(f => f.type === 'boolean') ? (
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
                {section.fields.map((f, i) => {
                  const val = data[f.field];
                  return (
                    <Chip
                      key={i}
                      label={f.label}
                      size="small"
                      sx={{
                        fontWeight: 600,
                        fontSize: '0.8rem',
                        bgcolor: val ? '#e8f5e9' : '#ffebee',
                        color: val ? '#2e7d32' : '#c62828',
                        border: `1px solid ${val ? '#a5d6a7' : '#ef9a9a'}`,
                      }}
                      icon={
                        <span style={{ fontSize: '14px', marginLeft: '8px' }}>
                          {val ? '✅' : '❌'}
                        </span>
                      }
                    />
                  );
                })}
              </Box>
            ) : (
              /* Normal text fields: render as grid cards */
              <Grid container spacing={2}>
                {section.fields.map((f, i) => (
                  <Grid item xs={12} sm={6} md={section.fields.length <= 4 ? 3 : 4} key={i}>
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
                      <InfoRow label={f.label} value={data[f.field]} />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        ))}
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
            bgcolor: color,
            '&:hover': { bgcolor: `${color}dd` },
          }}
        >
          ປິດ (Close)
        </Button>
      </DialogActions>
    </Dialog>
  );
}
