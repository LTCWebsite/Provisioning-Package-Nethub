import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination,
    CircularProgress,
    Chip,
    Button,
} from "@mui/material";

export default function ElasticSearchTable() {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [total, setTotal] = useState(0);
    const [expandedRows, setExpandedRows] = useState({}); // track expanded state per row

    const fetchData = async (pageNumber, pageSize) => {
        setLoading(true);
        try {
            const phone = localStorage.getItem("ONE_PHONE")
            const from = pageNumber * pageSize;
            const response = await axios.post(
                "http://172.28.26.97:9200/ltc-ussd-*/_search",
                {
                    from,
                    size: pageSize,
                    query: {
                        match: {
                            msisdnRecipient: phone,
                        },
                    },
                    sort: [{ createdAt: { order: "desc" } }],
                },
                {
                    headers: { "Content-Type": "application/json" },
                }
            );

            const hits = response.data.hits.hits;
            setRows(hits);
            setTotal(response.data.hits.total.value);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(page, rowsPerPage);
    }, [page, rowsPerPage]);

    const handleChangePage = (_event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const toggleExpand = (id) => {
        setExpandedRows((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    return (
        <Paper sx={{ width: "100%", overflow: "hidden", p: 2, display: "flex", justifyContent: "center", alignItems: "center", minHeight: 400 }}>
            {loading ? (
                <CircularProgress />
            ) : (
                <div style={{ width: "100%" }}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    {/* <TableCell>MSISDN Sender</TableCell> */}
                                    <TableCell>Recipient</TableCell>
                                    <TableCell>Package Code</TableCell>
                                    <TableCell>Transaction ID</TableCell>
                                    <TableCell>Counter Name</TableCell>
                                    <TableCell>Price</TableCell>
                                    <TableCell>Created At</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Result Desc</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((hit) => {
                                    const status =
                                        hit._source.resultCode === "200" ? "Success" : "Error";
                                    const color =
                                        hit._source.resultCode === "200" ? "success" : "error";

                                    const isExpanded = expandedRows[hit._id] || false;
                                    const desc = hit._source.resultDesc || "";

                                    return (
                                        <TableRow key={hit._id}>
                                            {/* <TableCell>{hit._source.msisdnSender}</TableCell> */}
                                            <TableCell>{hit._source.msisdnRecipient}</TableCell>
                                            <TableCell>{hit._source.packageCode}</TableCell>
                                            <TableCell>{hit._source.transactionId}</TableCell>
                                            <TableCell>{hit._source.counterName}</TableCell>
                                            <TableCell>
                                                {new Intl.NumberFormat("en-US").format(hit._source.price)}
                                            </TableCell>

                                            <TableCell>
                                                {new Date(hit._source.createdAt).toLocaleString()}
                                            </TableCell>
                                            <TableCell>
                                                <Chip label={status} color={color} size="small" />
                                            </TableCell>
                                            <TableCell style={{ maxWidth: 250 }}>
                                                <div
                                                    style={{
                                                        display: "-webkit-box",
                                                        WebkitLineClamp: isExpanded ? "unset" : 2,
                                                        WebkitBoxOrient: "vertical",
                                                        overflow: "hidden",
                                                        textOverflow: "ellipsis",
                                                    }}
                                                >
                                                    {desc}
                                                </div>
                                                {desc.length > 80 && ( // show button only for long text
                                                    <Button
                                                        size="small"
                                                        onClick={() => toggleExpand(hit._id)}
                                                    >
                                                        {isExpanded ? "Show less" : "Show more"}
                                                    </Button>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <TablePagination
                        component="div"
                        count={total}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        rowsPerPageOptions={[5, 10, 20, 30, 40, 50, 100]}
                    />
                </div>
            )}
        </Paper>
    );
}
