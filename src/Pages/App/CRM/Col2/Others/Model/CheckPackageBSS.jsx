import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Grid,
    IconButton,
    TextField,
    Button,
    Table,
    TableHead,
    TableBody,
    TableCell,
    TableRow,
    TableContainer,
    Paper,
} from "@mui/material";
import { Close } from "@mui/icons-material";

const CheckPackageBSS = ({ open, cb }) => {
    const [msisdn, setMsisdn] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState([]);

    // Set default values on mount
    useEffect(() => {
        const phone = localStorage.getItem("ONE_PHONE") || "";
        setMsisdn(phone);

        const today = moment();
        const thirtyDaysAgo = moment().subtract(30, "days");
        setEndDate(today.format("YYYY-MM-DD"));
        setStartDate(thirtyDaysAgo.format("YYYY-MM-DD"));
    }, []);

    const handleSearch = async () => {
        setLoading(true);
        try {
            const body = {
                msisdn: msisdn,
                startDate: startDate,
                endDate: endDate,
            };

            const { data } = await axios.post(
                "http://10.30.6.148:9999/CheckPackageBSS",
                body,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            setResults(data || []);
        } catch (err) {
            console.error("CheckPackageBSS Error:", err);
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={() => cb(false)}
            maxWidth="lg"
            fullWidth
        >
            <DialogTitle>
                Check Package BSS
                <IconButton
                    aria-label="close"
                    onClick={() => cb(false)}
                    sx={{ position: "absolute", right: 8, top: 8 }}
                >
                    <Close />
                </IconButton>
            </DialogTitle>

            <DialogContent sx={{ pt: 3 }}>
                {/* Search Form */}
                <Grid container spacing={2} sx={{ mb: 2 }} alignItems="center">
                    <Grid item xs={4}>
                        <TextField
                            label="MSISDN"
                            value={msisdn}
                            fullWidth
                            InputProps={{ readOnly: true }}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            label="Start Date"
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            label="End Date"
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSearch}
                            disabled={loading}
                            fullWidth
                        >
                            {loading ? "Loading..." : "Search"}
                        </Button>
                    </Grid>
                </Grid>

                {/* Results Table */}
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Reg Date</TableCell>
                                <TableCell>Start Date</TableCell>
                                <TableCell>End Date</TableCell>
                                <TableCell>User Name</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Product ID</TableCell>
                                <TableCell>Package</TableCell>
                                <TableCell>Price</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {results.length > 0 ? (
                                results.map((r, i) => (
                                    <TableRow key={i}>
                                        <TableCell>
                                            {moment(r.regDate).format("YYYY-MM-DD HH:mm:ss")}
                                        </TableCell>
                                        <TableCell>
                                            {moment(r.startDate).format("YYYY-MM-DD HH:mm:ss")}
                                        </TableCell>
                                        <TableCell>
                                            {moment(r.endDate).format("YYYY-MM-DD HH:mm:ss")}
                                        </TableCell>
                                        <TableCell>{r.userName}</TableCell>
                                        <TableCell>{r.status}</TableCell>
                                        <TableCell>{r.productId}</TableCell>
                                        <TableCell>{r.package}</TableCell>
                                        <TableCell>{Number(r.price).toLocaleString()}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={8} align="center">
                                        No data found
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </DialogContent>
        </Dialog>
    );
};

export default CheckPackageBSS;
