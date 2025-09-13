import { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Typography,
  CircularProgress,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import useDetails from "../../../hooks/useDetails";
import useRedeem from "../../../hooks/useRedeem";
import { ToastContainer } from "react-toastify";
import { AlertError } from "../../../Components/Toast";

const Redeem = () => {
  const [formData, setFormData] = useState({
    code: "",
    msisdn: "",
    detailId: "",
  });
  const [openConfirm, setOpenConfirm] = useState(false);
  const details = useDetails();
  const { redeemCode, loading } = useRedeem();
  const [error, setError] = useState(false);
  const [msisdnError, setMsisdnError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "detailId" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // setOpenConfirm(true);
    e.preventDefault();
    if (formData.msisdn.length !== 10 || !/^\d{10}$/.test(formData.msisdn)) {
      setMsisdnError(true);
       AlertError("ກະລຸນາປ້ອນໂຕໜັງສືໃຫ້ຄົບ 10 ຫລັກ!");
    }else if(formData?.detailId === "" || formData?.code === ""){
       AlertError("ກະລຸນາປ້ອນໃຫ້ຄົບ!");
    }else {
      setOpenConfirm(true);
    }
  };

  const handleConfirm = async (e) => {
    setOpenConfirm(false);
    await redeemCode(formData);

  };

  return (
    <Stack gap={2} sx={{ maxWidth: 400, mx: "auto", mt: 5 }}>
      <ToastContainer /> {/* ✅ Required for toasts to show */}
      <Typography variant="h5" gutterBottom>
        AIS Redeem
      </Typography>
      <Stack component="form" gap={2} onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Code"
          name="code"
          value={formData.code}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Phone Number (MSISDN)"
          name="msisdn"
          value={formData.msisdn}
          inputProps={{ maxLength: 10 }}
          onChange={handleChange}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="detailId-label">Detail</InputLabel>
          <Select
            labelId="detailId-label"
            name="detailId"
            value={formData.detailId}
            label="Detail"
            onChange={handleChange}
          >
            {details?.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Redeem"}
        </Button>
      </Stack>
      <Dialog
        maxWidth="sm"
        fullWidth
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
      >
        <DialogTitle>ກະລຸນາຢືນຢັນ</DialogTitle>
        <DialogContent>ທ່ານແນ່ໃຈບໍ່ວ່າຈະໃຊ້ໂຄດນີ້?</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirm(false)}>ຍົກເລີກ</Button>
          <Button
            onClick={handleConfirm}
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? <CircularProgress size={20} /> : "ຕົກລົງ"}
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
};

export default Redeem;
