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
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';
import { AxiosRerunFtth } from '../../../../../Components/Axios';

function Row(props) {
    const { row } = props;
    const [open, setOpen] = useState(false);

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
                                                        backgroundColor: '#4CAF50',
                                                        color: 'white',
                                                        padding: '5px 15px',
                                                        border: 'none',
                                                        borderRadius: '4px',
                                                        cursor: 'pointer',
                                                        fontSize: '12px'
                                                    }}
                                                    onClick={() => {
                                                        console.log("Rerun clicked for:", historyRow);
                                                        //Add rerun API call here
                                                    }}
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
        </React.Fragment>
    );
}

export default function PopupTable({ open, onClose }) {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (open) {
            fetchData();
        }
    }, [open]);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const phone = localStorage.getItem("ONE_PHONE");
            console.log("Fetching data for phone:", phone);
            if (!phone) {
                setError("Cannot find phone number");
                setLoading(false);
                return;
            }
            const response = await AxiosRerunFtth.get(`/api/ftth-rerun-list/${phone}`);
            let data = response.data;
            if (data && Array.isArray(data)) {
                setRows(data);
            } else if (data && data.data && Array.isArray(data.data)) {
                setRows(data.data);
            } else if (data && typeof data === 'object' && !Array.isArray(data)) {
                setRows([data]);
            } else {
                setRows([]);
            }
        } catch (err) {
            setError("Error cannot fetch data " + (err.message || "Unknown error"));
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    Rerun Package FTTH Bundle
                    <IconButton onClick={onClose}>
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
                                    <Row key={index} row={row} />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </DialogContent>
        </Dialog>
    );
}
