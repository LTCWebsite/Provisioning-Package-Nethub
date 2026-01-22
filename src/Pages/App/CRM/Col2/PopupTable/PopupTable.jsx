import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { AxiosRerunFtth } from '../../../../../Components/Axios';
// Note: AxiosRerunFtth is still used for the rerun action in Row component
import { Grid, Skeleton } from '@mui/material';
import AutorenewIcon from '@mui/icons-material/Autorenew';


function Row(props) {
    const { row, allMsisdns } = props;
    const [open, setOpen] = useState(false);
    const [rerunDialogOpen, setRerunDialogOpen] = useState(false);
    const [selectedMsisdn, setSelectedMsisdn] = useState('');
    const [selectedPackageName, setSelectedPackageName] = useState('');
    const [selectedLogId, setSelectedLogId] = useState('');

    const handleRerunClick = (historyRow) => {
        setSelectedMsisdn(historyRow.Msisdn || '');
        setSelectedPackageName(historyRow.PackageName || '');
        setSelectedLogId(historyRow.ID);
        setRerunDialogOpen(true);
    };

    const handleRerunConfirm = async () => {
        try {
            const responseRerun = await AxiosRerunFtth.post(`/api/ftth-rerun`, {
                logId: selectedLogId
            });

            const { success, isdnMcare } = responseRerun.data;

            if (success === true) {
                alert(isdnMcare + " Rerun ສຳເລັດ");
                setRerunDialogOpen(false);
            } else {
                alert(isdnMcare + " Rerun ບໍ່ສຳເລັດ");
            }

        } catch (error) {
            console.error("API Error:", error);
            alert(error?.response?.data?.message || "Unknown error");
        }
    };


    const handleRerunCancel = () => {
        setRerunDialogOpen(false);
        setSelectedMsisdn('');
        setSelectedPackageName('');
        setSelectedLogId('');
    };

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.Ftth}
                </TableCell>
                {/* <TableCell>{row.LogDate}</TableCell> */}
                <TableCell>{String(row.LogDate).replace(/(\d{4})(\d{2})(\d{2})/g, "$1-$2-$3")}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                History
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>MSISDN</TableCell>
                                        <TableCell>PK Price</TableCell>
                                        <TableCell>Paid</TableCell>
                                        <TableCell>Package Name</TableCell>
                                        <TableCell>Result</TableCell>
                                        <TableCell>Date</TableCell>
                                        <TableCell>ACTION</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.Tbllogs && row.Tbllogs.map((historyRow, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{historyRow.Msisdn}</TableCell>
                                            <TableCell>{historyRow.PackageAmount}</TableCell>
                                            <TableCell>{historyRow.PaymentAmount}</TableCell>
                                            <TableCell>{historyRow.PackageName}</TableCell>
                                            <TableCell>{historyRow.ResultDesc}</TableCell>
                                            <TableCell>{historyRow.StartDate}</TableCell>
                                            <TableCell>
                                                <button
                                                    style={{
                                                        backgroundColor: historyRow.RerunStatus === false ? '#ccc' : '#4CAF50',
                                                        color: historyRow.RerunStatus === false ? '#666' : 'white',
                                                        padding: '5px 15px',
                                                        border: 'none',
                                                        borderRadius: '4px',
                                                        cursor: historyRow.RerunStatus === false ? 'not-allowed' : 'pointer',
                                                        fontSize: '12px'
                                                    }}
                                                    onClick={() => handleRerunClick(historyRow)}
                                                    disabled={historyRow.RerunStatus === false}
                                                >
                                                    Rerun
                                                </button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>

            {/* Rerun Confirmation Dialog */}
            <Dialog open={rerunDialogOpen} onClose={handleRerunCancel} maxWidth="sm" fullWidth>
                <DialogTitle>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        Confirm Rerun
                        <IconButton onClick={handleRerunCancel} size="small">
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </DialogTitle>
                <DialogContent dividers>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, py: 1 }}>
                        <TextField
                            fullWidth
                            label="MSISDN"
                            value={selectedMsisdn}
                            InputProps={{
                                readOnly: true,
                            }}
                            variant="outlined"
                        />
                        <TextField
                            fullWidth
                            label="Package Name"
                            value={selectedPackageName}
                            InputProps={{
                                readOnly: true,
                            }}
                            variant="outlined"
                        />
                    </Box>
                </DialogContent>
                <DialogActions sx={{ px: 3, py: 2 }}>
                    <Button
                        variant="outlined"
                        color="inherit"
                        onClick={handleRerunCancel}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        color="success"
                        onClick={handleRerunConfirm}
                    >
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment >
    );
}

export default function PopupTable({ rows = [], loading = false, error = null, fetchData }) {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (fetchData) {
            fetchData();
        }
    }, [fetchData]);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => setOpen(false);

    // Collect all unique Msisdn values from all rows
    const getAllMsisdns = () => {
        const msisdnSet = new Set();
        rows.forEach(row => {
            if (row.Tbllogs && Array.isArray(row.Tbllogs)) {
                row.Tbllogs.forEach(log => {
                    if (log.Msisdn) {
                        msisdnSet.add(log.Msisdn);
                    }
                });
            }
        });
        return Array.from(msisdnSet);
    };

    const allMsisdns = getAllMsisdns();

    return (
        <>
            {/* <button
                style={{
                    backgroundColor: '#dce775',
                    color: 'black',
                    padding: '10px 20px',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    width: '100%',
                    marginTop: '10px'
                }}
                onClick={handleOpen}
            >
                ກົດປຸ່ມ Rerun Package FTTH Bundle
            </button> */}
            <Grid container>
                <Grid item xs={12} container className='link-box-pointer' onClick={handleOpen}>
                    <Grid item xs={2}><AutorenewIcon /></Grid>
                    <Grid item xs={6}>ລາຍການ Rerun </Grid>
                    <Grid item xs={4}>
                        {loading ? <Skeleton animation="wave" /> : <div className={rows.length > 0 ? 'text-right bage-success' : 'text-right bage-error'}><u>{rows.length}</u></div>}
                    </Grid>
                </Grid>
            </Grid>
            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                <DialogTitle>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        Rerun Package FTTH Bundle
                        <IconButton onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </DialogTitle>
            <DialogContent dividers>
                {loading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" py={4}>
                        <CircularProgress />
                    </Box>
                ) : error ? (
                    <Box display="flex" justifyContent="center" alignItems="center" py={4}>
                        <Typography color="error">{error}</Typography>
                    </Box>
                ) : rows.length === 0 ? (
                    <Box display="flex" justifyContent="center" alignItems="center" py={4}>
                        <Typography>No Data</Typography>
                    </Box>
                ) : (
                    <TableContainer component={Paper}>
                        <Table aria-label="collapsible table">
                            <TableHead>
                                <TableRow>
                                    <TableCell />
                                    <TableCell>PHONE</TableCell>
                                    <TableCell>DATE</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row, index) => (
                                    <Row key={index} row={row} allMsisdns={allMsisdns} />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </DialogContent>
        </Dialog>
        </>
    );
}
