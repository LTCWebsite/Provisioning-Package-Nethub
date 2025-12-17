import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  TextField,
  InputAdornment,
  MenuItem,
  Pagination,
  Divider,
  CircularProgress,
} from "@mui/material";
import { Close, Search } from "@mui/icons-material";
import axios from "axios";
import cookie from "js-cookie";

// const mockPackages = Array.from({ length: 42 }).map((_, i) => ({
//   id: i + 1,
//   name: `Package ${i + 1}`,
//   days: [7, 15, 30][i % 3],
//   desc: "Unlimited Internet / Social / Game",
//   price: 10000 + i * 1000,
// }));

// ... (ส่วน import เหมือนเดิม)

const BuyPackage2 = ({ open, cb, ifdone, done }) => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [packages, setPackages] = useState([]);
  const [sortBy, setSortBy] = useState("days-asc");
  const [isLoading, setIsLoading] = useState(false);
  const [isShowSuccess, setIsShowSuccess] = useState(false);
  const [isShowConfirm, setIsShowConfirm] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [bkData, setBkData] = useState({});
  let phone = localStorage.getItem("ONE_PHONE");

  // fetch packages
  useEffect(() => {
    if (!open) return;
    ifdone(done);
    setIsLoading(true);
    axios
      .get(`http://10.30.6.148:9999/NetHub?msisdn=${phone}`, {
        headers: { Authorization: "Bearer " + cookie.get("ONE_TOKEN") },
      })
      .then((res) => {
        console.log({ res });
        if (res.status === 200) {
          const newUpdate = res.data.map((row) => ({
            ...row,
            code: row.code,
            name: row.counterName,
            price: row.price,
            days: row.refillStopDay,
            remaining_data: row.remark,
            topping: row.isTopping,
          }));
          setPackages(newUpdate);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setPackages([]);
      });
  }, [open]);

  const filtered = useMemo(() => {
    let result = packages.filter(
      (pk) =>
        pk.name?.toLowerCase().includes(search.toLowerCase()) ||
        pk.price?.toString().includes(search)
    );

    return [...result].sort((a, b) => {
      switch (sortBy) {
        case "days-asc":
          return a.days - b.days;
        case "days-desc":
          return b.days - a.days;
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        default:
          return 0;
      }
    });
  }, [packages, search, sortBy]);

  const totalPage = Math.ceil(filtered.length / pageSize);
  const paginatedData = filtered.slice((page - 1) * pageSize, page * pageSize);

  // ก่อน confirm
  const _onBuyPackage = (pk) => {
    setSelectedPackage(pk);
    setIsShowConfirm(true);
  };

  // confirm ซื้อจริง
  const _onConfirmBuy = () => {
    if (!selectedPackage) return;
    setIsLoading(true);

    const datas = {
      msisdn: phone,
      packageCode: selectedPackage.code,
    };

    axios
      .post(`http://10.30.6.148:9999/NetHub`, datas, {
        headers: { Authorization: "Bearer " + cookie.get("ONE_TOKEN") },
      })
      .then((res) => {
        setBkData(res.data);
        setIsShowSuccess(true);
        setIsShowConfirm(false);
      })
      .catch((err) => {
        console.error(err);
        setBkData({ resultDesc: "ຊື້ແພັກເກັດບໍ່ສຳເລັດ ກະລຸນາລອງໃໝ່ອີກຄັ້ງ" });
        setIsShowSuccess(true);
        setIsShowConfirm(false);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <Dialog open={open} onClose={() => cb(false)} maxWidth="xl" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" fontWeight={600}>
            ເລືອກແພັກເກັດ
          </Typography>
          <IconButton onClick={() => cb(false)}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        {/* Toolbar */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          gap={2}
          mb={2}
        >
          <TextField
            placeholder="ຄົ້ນຫາແພັກ..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            sx={{ minWidth: 280 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
          <Box display="flex" gap={2}>
            <TextField
              select
              label="ຮຽງຕາມ"
              size="small"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              sx={{ width: 180 }}
            >
              <MenuItem value="days-asc">ມື້ໜ້ອຍ → ຫຼາຍ</MenuItem>
              <MenuItem value="days-desc">ມື້ຫຼາຍ → ໜ້ອຍ</MenuItem>
              <MenuItem value="price-asc">ລາຄາຖືກ → ແພງ</MenuItem>
              <MenuItem value="price-desc">ລາຄາແພງ → ຖືກ</MenuItem>
            </TextField>
            <TextField
              select
              label="ຈຳນວນແພັກແສດງຕໍ່ໜ້າ"
              size="small"
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setPage(1);
              }}
              sx={{ width: 160 }}
            >
              <MenuItem value={3}>3 package</MenuItem>
              <MenuItem value={6}>6 package</MenuItem>
              <MenuItem value={9}>9 package</MenuItem>
              <MenuItem value={12}>12 package</MenuItem>
              <MenuItem value={20}>20 package</MenuItem>
            </TextField>
          </Box>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Package Grid */}
        <Grid container spacing={4}>
          {isLoading ? (
            <Box width="100%" display="flex" justifyContent="center" mt={4}>
              <CircularProgress />
            </Box>
          ) : (
            paginatedData.map((pk) => (
              <Grid item xs={12} sm={6} md={4} key={pk.code}>
                <Card
                  sx={{
                    borderRadius: 3,
                    border: "1px solid #e0e0e0",
                    height: "100%",
                    transition: "all 0.3s ease-in-out",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: 6,
                      borderColor: "#1976d2",
                    },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h7" fontWeight={600}>
                      {pk.name}
                    </Typography>
                    <Typography sx={{ mt: 1 }}>
                      ⏱{" "}
                      {pk.topping
                        ? "Topping"
                        : pk.days > 365
                        ? "Recurring"
                        : `${pk.days} ມື້`}
                    </Typography>
                    <Typography
                      color="text.secondary"
                      sx={{ mt: 1, fontSize: "0.65rem" }}
                    >
                      {pk.remaining_data || "-"}
                    </Typography>
                    <Typography color="text.secondary" sx={{ mt: 1 }}>
                      {pk.code || "-"}
                    </Typography>
                    <Typography
                      variant="h5"
                      fontWeight={700}
                      color="primary"
                      sx={{ mt: 2 }}
                    >
                      {pk.price?.toLocaleString() || "-"} ₭
                    </Typography>
                    <Button
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, borderRadius: 2 }}
                      onClick={() => _onBuyPackage(pk)}
                      disabled={isLoading && selectedPackage?.code === pk.code}
                    >
                      {isLoading && selectedPackage?.code === pk.code
                        ? "ກຳລັງຊື້..."
                        : "ຊື້ແພັກເກັດ"}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>

        {/* Confirm Dialog */}
        <Dialog
          open={isShowConfirm}
          onClose={() => setIsShowConfirm(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>ຢືນຢັນການຊື້</DialogTitle>
          <DialogContent>
            <Typography>
              ທ່ານຕ້ອງການຊື້ {selectedPackage?.name} ຫລືບໍ່?
            </Typography>
            <Typography sx={{ mt: 1 }}>
              ລາຄາ: {selectedPackage?.price?.toLocaleString()} ₭
            </Typography>
            <Box display="flex" justifyContent="space-between" mt={3} gap={2}>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => setIsShowConfirm(false)}
              >
                ຍົກເລີກ
              </Button>
              <Button
                variant="contained"
                fullWidth
                onClick={_onConfirmBuy}
                disabled={isLoading}
              >
                {isLoading ? <CircularProgress size={24} /> : "ຕົກລົງ"}
              </Button>
            </Box>
          </DialogContent>
        </Dialog>

        {/* Success Dialog */}
        <Dialog
          open={isShowSuccess}
          onClose={() => setIsShowSuccess(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            {bkData.code === "200" ? "ສຳເລັດ" : "ບໍ່ສຳເລັດ"}
          </DialogTitle>
          <DialogContent>
            <Typography sx={{ mb: 1 }}>
              {bkData.message || "ລະບົບມີບັນຫາ"}
            </Typography>
            {bkData.packageName && (
              <Typography>Package: {bkData.packageName}</Typography>
            )}
            {bkData.price && (
              <Typography>
                Price: {Number(bkData.price).toLocaleString()} ₭
              </Typography>
            )}
            {bkData.expireDate && (
              <Typography>Expire: {bkData.expireDate}</Typography>
            )}
          </DialogContent>
        </Dialog>

        {/* Pagination */}
        <Box display="flex" justifyContent="center" mt={4}>
          <Pagination
            count={totalPage}
            page={page}
            onChange={(_, value) => setPage(value)}
            color="primary"
            size="large"
          />
        </Box>

        {/* Info */}
        <Box textAlign="center" mt={2}>
          <Typography fontSize={14} color="text.secondary">
            ໜ້າ {page} ຈາກ {totalPage} ໜ້າ
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default BuyPackage2;
