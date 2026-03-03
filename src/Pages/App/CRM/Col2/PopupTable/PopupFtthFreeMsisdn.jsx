import React, { useState } from "react";
import { AxiosFtth } from "../../../../../Components/Axios";
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
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Grid, Skeleton } from "@mui/material";
import SimCardIcon from "@mui/icons-material/SimCard";
import { toast_success, toast_error } from "../../../../../Components/Toast";

export default function PopupFtthFreeMsisdn({
  rows = [],
  loading = false,
  error = null,
  bookingRows = [],
  bookingLoading = false,
  fetchBookingData,
  unbookFtth,
}) {
  const [open, setOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [unbookConfirmOpen, setUnbookConfirmOpen] = useState(false);
  const [unbookRow, setUnbookRow] = useState(null);
  const [chooseMsisdnConfirmOpen, setChooseMsisdnConfirmOpen] = useState(false);
  const [chosenMsisdn, setChosenMsisdn] = useState(null);

  const handleOpen = () => {
    setOpen(true);
    if (fetchBookingData) {
      fetchBookingData();
    }
  };
  const handleClose = () => setOpen(false);

  const handleSelectClick = (row) => {
    setSelectedRow(row);
    setConfirmDialogOpen(true);
  };

  const handleConfirmClose = () => {
    setConfirmDialogOpen(false);
    setSelectedRow(null);
    setChooseMsisdnConfirmOpen(false);
    setChosenMsisdn(null);
  };

  const handleChooseMsisdnConfirmOpen = (msisdn) => {
    setChosenMsisdn(msisdn);
    setChooseMsisdnConfirmOpen(true);
  };

  const handleChooseMsisdnConfirmClose = () => {
    setChooseMsisdnConfirmOpen(false);
    setChosenMsisdn(null);
  };

  const handleChooseMsisdnConfirm = async () => {
    if (!chosenMsisdn) return;
    await handleChooseMsisdn(chosenMsisdn);
    handleChooseMsisdnConfirmClose();
  };

  const handleChooseMsisdn = async (msisdn) => {
    try {
      console.log("Selected booking row:", selectedRow);
      console.log("Chosen MSISDN:", msisdn);

      const response = await AxiosFtth.post("/api/ftth-book", {
        bookId: selectedRow?.Id,
        freeMsisdn: msisdn.Msisdn,
      });

      console.log("API Response:", response.data);
      toast_success({ text: "ເລືອກເບີ: " + msisdn.Msisdn + " ສຳເລັດ" });
      setConfirmDialogOpen(false);
      setSelectedRow(null);
      fetchBookingData?.();
    } catch (error) {
      console.error("API Error:", error);
      toast_error({
        text:
          "ເກີດຂໍ້ຜິດພາດ: " + (error.response?.data?.message || error.message),
      });
    }
  };

  const handleUnbook = async (row) => {
    if (!unbookFtth) return;
    try {
      const result = await unbookFtth(String(row.Id));
      if (result?.success) {
        toast_success({ text: result.description || "ປົດເບີສຳເລັດ" });
        fetchBookingData?.();
      } else {
        toast_error({ text: result?.description || "ປົດເບີບໍ່ສຳເລັດ" });
      }
    } catch (err) {
      toast_error({
        text: "ເກີດຂໍ້ຜິດພາດ: " + (err.response?.data?.message || err.message),
      });
    }
  };

  const handleUnbookConfirmOpen = (row) => {
    setUnbookRow(row);
    setUnbookConfirmOpen(true);
  };

  const handleUnbookConfirmClose = () => {
    setUnbookConfirmOpen(false);
    setUnbookRow(null);
  };

  const handleUnbookConfirm = async () => {
    if (!unbookRow) return;
    await handleUnbook(unbookRow);
    handleUnbookConfirmClose();
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
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
            <SimCardIcon />
          </Grid>
          <Grid item xs={6}>
            ເບີແຖມຟຣີ
          </Grid>
          <Grid item xs={4}>
            {loading ? (
              <Skeleton animation="wave" />
            ) : (
              <div
                className={
                  rows.length > 0
                    ? "text-right bage-success"
                    : "text-right bage-error"
                }
              >
                <u>{rows.length}</u>
              </div>
            )}
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
            FTTH Free MSISDN List
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          {bookingLoading ? (
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
          ) : bookingRows.length === 0 ? (
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
              <Table aria-label="ftth booking list table">
                <TableHead>
                  <TableRow>
                    <TableCell>Seq</TableCell>
                    <TableCell>FTTH</TableCell>
                    <TableCell>MSISDN</TableCell>
                    <TableCell>Modify Date</TableCell>
                    <TableCell>ACTION</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {bookingRows.map((row, index) => (
                    <TableRow key={row.Id || index}>
                      <TableCell>{row.Seq || index + 1}</TableCell>
                      <TableCell>{row.FTTH || "-"}</TableCell>
                      <TableCell>{row.Msisdn || "-"}</TableCell>
                      <TableCell>{formatDate(row.ModifyDate)}</TableCell>
                      <TableCell>
                        <button
                          style={{
                            backgroundColor:
                              row.bookStatus === true ? "#4CAF50" : "#f57c00",
                            color: "white",
                            padding: "5px 15px",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontSize: "12px",
                          }}
                          onClick={() =>
                            row.bookStatus === true
                              ? handleSelectClick(row)
                              : handleUnbookConfirmOpen(row)
                          }
                        >
                          {row.bookStatus === true ? "ຮັບເບີ" : "ປົດເບີ"}
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </DialogContent>
      </Dialog>

      {/* Unbook confirm Dialog */}
      <Dialog
        open={unbookConfirmOpen}
        onClose={handleUnbookConfirmClose}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>ຢືນຢັນປົດເບີ</DialogTitle>
        <DialogContent>
          <Typography>
            ທ່ານແນ່ໃຈບໍ່ວ່າຕ້ອງການປົດເບີ{" "}
            {unbookRow
              ? `(${unbookRow.Msisdn || "-"}, FTTH: ${unbookRow.FTTH || "-"})`
              : ""}
            ?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button
            variant="outlined"
            color="inherit"
            onClick={handleUnbookConfirmClose}
          >
            ບໍ່
          </Button>
          <Button
            variant="contained"
            color="warning"
            onClick={handleUnbookConfirm}
          >
            ຕົກລົງປົດເບີ
          </Button>
        </DialogActions>
      </Dialog>

      {/* Choose MSISDN confirm Dialog */}
      <Dialog
        open={chooseMsisdnConfirmOpen}
        onClose={handleChooseMsisdnConfirmClose}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>ຢືນຢັນເລືອກເບີ</DialogTitle>
        <DialogContent>
          <Typography>
            ທ່ານແນ່ໃຈບໍ່ວ່າຕ້ອງການເລືອກເບີ{" "}
            {chosenMsisdn ? <strong>{chosenMsisdn.Msisdn}</strong> : ""} ?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button
            variant="outlined"
            color="inherit"
            onClick={handleChooseMsisdnConfirmClose}
          >
            ບໍ່
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleChooseMsisdnConfirm}
          >
            ຕົກລົງເລືອກເບີ
          </Button>
        </DialogActions>
      </Dialog>

      {/* MSISDN Selection Dialog */}
      <Dialog
        open={confirmDialogOpen}
        onClose={handleConfirmClose}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: { minHeight: "60vh" },
        }}
      >
        <DialogTitle>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            ເລືອກເບີ MSISDN {selectedRow?.Id ? `(ID: ${selectedRow.Id})` : ""}
            <IconButton onClick={handleConfirmClose} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          {rows.length === 0 ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              py={4}
            >
              <Typography>ບໍ່ມີເບີໃຫ້ເລືອກ</Typography>
            </Box>
          ) : (
            <Box sx={{ maxHeight: "50vh", overflowY: "auto" }}>
              <Grid container spacing={1}>
                {rows
                  .filter((item) => item.Msisdn && item.Msisdn.trim() !== "")
                  .map((msisdn, index) => (
                    <Grid
                      item
                      xs={6}
                      sm={4}
                      md={3}
                      lg={2.4}
                      xl={2}
                      key={msisdn.ID || index}
                    >
                      <Box
                        onClick={() => handleChooseMsisdnConfirmOpen(msisdn)}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          px: 1.5,
                          py: 3,
                          border: "1px solid #e0e0e0",
                          borderRadius: 1,
                          cursor: "pointer",
                          "&:hover": {
                            backgroundColor: "#4CAF50",
                            color: "white",
                            borderColor: "#4CAF50",
                          },
                        }}
                      >
                        <Typography variant="body2" fontWeight="medium">
                          {msisdn.Msisdn}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button
            variant="outlined"
            color="inherit"
            onClick={handleConfirmClose}
          >
            ປິດ
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
