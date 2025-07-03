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
} from "@mui/material";
import useDetails from "../../../hooks/useDetails";
import useRedeem from "../../../hooks/useRedeem";
import { AlertError, AlertSuccess } from "../../../Components/Toast";
import { ToastContainer } from "react-toastify";

const Redeem = () => {
  const [formData, setFormData] = useState({
    code: "",
    msisdn: "",
    detailId: "",
  });

  const details = useDetails();
  const { redeemCode, data: response, loading, error } = useRedeem();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "detailId" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await redeemCode(formData);
  };

  // ✅ Show toast on error or success
  useEffect(() => {
    if (error) AlertError(error);
    if (response) AlertSuccess({ text: "Redeem successful!" });
  }, [error, response]);

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
          {loading ? <CircularProgress size={24} color="inherit" /> : "Submit"}
        </Button>
      </Stack>
    </Stack>
  );
};

export default Redeem;
