import React from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import iso from '../Image/pngegg.png'

export default function RemarkComponent() {
    return (

        <Box
            sx={{
                maxWidth: 600,
                mx: 'auto',
                my: 1
            }}
        >
            <Paper
                elevation={1}
                sx={{
                    backgroundColor: '#eff6ff', // blue-50
                    borderLeft: '4px solid #3b82f6', // blue-500
                    pt: 1.5,
                    borderRadius: '0 8px 8px 0',
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                    <InfoIcon
                        sx={{
                            width: 20,
                            height: 20,
                            color: '#2563eb', // blue-600
                            mt: 'px',
                            ml: 0.5,

                            flexShrink: 0,
                        }}
                    />
                    <Box>
                        <Typography
                            variant="body2"
                            sx={{
                                ml: 1,
                                color: '#1e3a8a', // blue-900
                                fontWeight: 'bold',
                            }}
                        >
                            ໝາຍເຫດ: ອີງໃສ່ມາດຕະຖານ ISO 27001 ຕ້ອງໃສ່ລະຫັດຜ່ານປະກອບດ້ວຍ:
                        </Typography>

                        <List dense sx={{
                            color: '#1e40af', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)'

                        }} >
                            <ListItem sx={{ display: 'flex', alignItems: 'flex-start', py: 0.2 }}>
                                <ListItemIcon sx={{
                                    minWidth: 18, color: '#1e40af', fontSize: '10'
                                }}>•</ListItemIcon>
                                <ListItemText primary="ຈຳນວນຢ່າງໜ້ອຍ 8 ໂຕຂຶ້ນໄປ" />
                            </ListItem>
                            <ListItem sx={{ display: 'flex', alignItems: 'flex-start', py: 0.2 }}>
                                <ListItemIcon sx={{ minWidth: 18, color: '#1e40af' }}>•</ListItemIcon>
                                <ListItemText primary="ອັກສອນພາສາອັງກິດໃຫຍ່ A-Z" />
                            </ListItem>
                            <ListItem sx={{ display: 'flex', alignItems: 'flex-start', py: 0.2 }}>
                                <ListItemIcon sx={{ minWidth: 18, color: '#1e40af' }}>•</ListItemIcon>
                                <ListItemText primary="ອັກສອນພາສາອັງກິດນ້ອຍ a-z" />
                            </ListItem>
                            <ListItem sx={{ display: 'flex', alignItems: 'flex-start', py: 0.2 }}>
                                <ListItemIcon sx={{ minWidth: 18, color: '#1e40af' }}>•</ListItemIcon>
                                <ListItemText primary="ໂຕເລກ 0-9" />
                            </ListItem>
                            <ListItem sx={{ display: 'flex', alignItems: 'flex-start', py: 0.2 }}>
                                <ListItemIcon sx={{ minWidth: 18, color: '#1e40af' }}>•</ListItemIcon>
                                <ListItemText primary="ໂຕອັກສອນພີເສດ !@#$%^&*" />
                            </ListItem>

                        </List>
                    </Box>
                </Box >
            </Paper >
        </Box >
    );
}
