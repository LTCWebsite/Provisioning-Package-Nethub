import React, { useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";
import { Grid, Skeleton } from "@mui/material";
import PaymentIcon from "@mui/icons-material/Payment";

export default function PopupFtthMcarePayment({
  paymentRows = [],
  paymentLoading = false,
  error = null,
  fetchPaymentData,
}) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    if (fetchPaymentData) {
      fetchPaymentData();
    }
  };
  const handleClose = () => setOpen(false);

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      timeZone: "UTC",
    });
  };

  const rows = Array.isArray(paymentRows) ? paymentRows : [];
  const getCreatedDate = (row) => {
    const v =
      row.created_date ?? row.CreatedDate ?? row.CreateDate ?? row.create_date;
    return v ? new Date(v).getTime() : 0;
  };
  const displayRows = [...rows]
    .sort((a, b) => getCreatedDate(b) - getCreatedDate(a))
    .slice(0, 15);
  const columns =
    displayRows.length > 0 &&
    typeof displayRows[0] === "object" &&
    displayRows[0] !== null
      ? Object.keys(displayRows[0])
      : [];

  const formatCell = (key, value) => {
    if (value == null) return "-";
    const keyLower = key.toLowerCase();
    if (keyLower.includes("date") && !isNaN(Date.parse(value))) {
      return formatDate(value);
    }
    const num = Number(value);
    if (
      !isNaN(num) &&
      (keyLower.includes("amount") ||
        keyLower.includes("pay") ||
        keyLower.includes("price") ||
        keyLower.includes("total") ||
        keyLower.includes("sum"))
    ) {
      return num.toLocaleString();
    }
    return value;
  };

  return (
    <>
      <Grid container>
        <Grid
          item
          xs={12}
          container
          className="link-box-pointer"
          onClick={handleOpen}
        >
          <Grid item xs={2}>
            <PaymentIcon />
          </Grid>
          <Grid item xs={6}>
            FTTH Mcare Payment
          </Grid>
        </Grid>
      </Grid>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            FTTH Mcare Payment List
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          {paymentLoading ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              py={4}
            >
              <CircularProgress />
            </Box>
          ) : error ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              py={4}
            >
              <Typography color="error">{error}</Typography>
            </Box>
          ) : displayRows.length === 0 ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              py={4}
            >
              <Typography>No Data</Typography>
            </Box>
          ) : (
            <TableContainer component={Paper}>
              <Table aria-label="ftth payment list table">
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    {columns.map((col) => (
                      <TableCell key={col}>{col}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {displayRows.map((row, index) => (
                    <TableRow key={row.Id ?? row.id ?? index}>
                      <TableCell>{index + 1}</TableCell>
                      {columns.map((col) => (
                        <TableCell key={col}>
                          {formatCell(col, row[col])}
                        </TableCell>
                      ))}
                    </TableRow>
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
