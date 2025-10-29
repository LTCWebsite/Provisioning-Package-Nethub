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
    Select,
    MenuItem,
    Button,
    Table,
    TableHead,
    TableBody,
    TableCell,
    TableRow,
    TableContainer,
    Paper,
    InputLabel,
    FormControl,
    Chip
} from "@mui/material";
import { Close } from "@mui/icons-material";

const QueryAdjustLog = ({ open, cb }) => {
    const [primaryIdentity, setPrimaryIdentity] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [fetchRowNum, setFetchRowNum] = useState("50");
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState([]);

    // Load primaryIdentity and default times on component mount
    useEffect(() => {
        const phone = localStorage.getItem("ONE_PHONE") || "";
        setPrimaryIdentity(phone);

        const now = moment();
        const thirtyDaysAgo = moment().subtract(30, "days");
        setEndTime(now.add(1, 'minute').format("YYYY-MM-DDTHH:mm"));
        setStartTime(thirtyDaysAgo.format("YYYY-MM-DDTHH:mm"));
    }, []);

    // helper function to format datetime-local to YYYYMMDDHHMMSS
    const formatDateTime = (value) => {
        if (!value) return "";
        return moment(value).format("YYYYMMDDHHmmss");
    };

    // format tradeTime using momentjs
    const formatTradeTime = (value) => {
        return value ? moment(value, "YYYYMMDDHHmmss").format("YYYY-MM-DD HH:mm:ss") : "";
    };

    const handleSearch = async () => {
        setLoading(true);
        try {
            const body = {
                primaryIdentity: primaryIdentity,
                payType: "1",
                startTime: formatDateTime(startTime),
                endTime: formatDateTime(endTime),
                fetchRowNum: fetchRowNum,
            };

            const { data } = await axios.post(
                "http://10.30.6.148:9999/QueryAdjustLog",
                body,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const adjustInfos = data.adjustInfos || [];
            setResults(adjustInfos);
        } catch (err) {
            console.error("REST API Error:", err);
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
                Query Adjust Log
                <IconButton
                    aria-label="close"
                    onClick={() => cb(false)}
                    sx={{ position: "absolute", right: 8, top: 8 }}
                >
                    <Close />
                </IconButton>
            </DialogTitle>

            <DialogContent sx={{ p: 2 }}>
                {/* Search Form */}
                <Grid spacing={2} sx={{ display: 'flex', mb: 3 }}>
                    <Grid item xs={3} sx={{ p: 1 }}>
                        <TextField
                            label="Primary Identity"
                            value={primaryIdentity}
                            fullWidth
                            InputProps={{ readOnly: true }}
                        />
                    </Grid>
                    <Grid item xs={3} sx={{ p: 1 }}>
                        <TextField
                            label="Start Time"
                            type="datetime-local"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                    <Grid item xs={3} sx={{ p: 1 }}>
                        <TextField
                            label="End Time"
                            type="datetime-local"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                    <Grid item xs={2} sx={{ p: 1 }}>
                        <FormControl fullWidth>
                            <InputLabel>Fetch Rows</InputLabel>
                            <Select
                                value={fetchRowNum}
                                onChange={(e) => setFetchRowNum(e.target.value)}
                                label="Fetch Rows"
                            >
                                <MenuItem value="10">10</MenuItem>
                                <MenuItem value="20">20</MenuItem>
                                <MenuItem value="50">50</MenuItem>
                                <MenuItem value="100">100</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={1} sx={{ p: 1 }} alignContent={"center"}>
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
                                <TableCell>Transaction ID</TableCell>
                                <TableCell>Trade Time</TableCell>
                                {/* <TableCell>Primary Identity</TableCell> */}
                                <TableCell>Login</TableCell>
                                <TableCell>Remark</TableCell>
                                <TableCell>ປະເພດ</TableCell>
                                <TableCell>ຈຳນວນເງິນ</TableCell>
                                <TableCell>ເງິນຍັງເຫຼືອ</TableCell>
                                <TableCell>ຖັງເງິນ</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {results.length > 0 ? (
                                results.map((r, i) => {
                                    const loginSystemCode = r.additionalProperties?.find(
                                        (p) => p.code === "C_LOGINSYSTEMCODE"
                                    )?.value;

                                    const adjustmentTypeText =
                                        r.balanceAdjustmentInfo?.adjustmentType === "1"
                                            ? "ເພີ່ມເງິນ"
                                            : r.balanceAdjustmentInfo?.adjustmentType === "2"
                                                ? "ຕັດເງິນ"
                                                : "";

                                    const adjustmentTypeColor =
                                        r.balanceAdjustmentInfo?.adjustmentType === "1"
                                            ? "success"
                                            : r.balanceAdjustmentInfo?.adjustmentType === "2"
                                                ? "error"
                                                : "default";

                                    return (
                                        <TableRow key={i}>
                                            <TableCell>{r.extTransID}</TableCell>
                                            <TableCell>{formatTradeTime(r.tradeTime)}</TableCell>
                                            {/* <TableCell>{r.primaryIdentity}</TableCell> */}
                                            <TableCell>{loginSystemCode || ""}</TableCell>
                                            <TableCell>{r.remark || ""}</TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={adjustmentTypeText}
                                                    color={adjustmentTypeColor}
                                                    size="small"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                {Number(r.balanceAdjustmentInfo?.adjustmentAmt || 0).toLocaleString()}
                                            </TableCell>
                                            <TableCell>
                                                {Number(r.balanceAdjustmentInfo?.curAmt || 0).toLocaleString()}
                                            </TableCell>
                                            <TableCell>{r.balanceAdjustmentInfo?.balanceType}</TableCell>

                                        </TableRow>
                                    );
                                })
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={9} align="center">
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

export default QueryAdjustLog;
