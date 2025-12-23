import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Dialog,
  DialogContent,
  TextField,
  MenuItem,
  Pagination,
  Divider,
  CircularProgress,
  Button,
} from "@mui/material";
import axios from "axios";

const HistoryCancelPackage = ({ open, onClose }) => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [datas, setDatas] = useState([]);
  const [sortBy, setSortBy] = useState("days-desc");
  const [isLoading, setIsLoading] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  let phone = localStorage.getItem("ONE_PHONE");

  useEffect(() => {
    if (!open) return;
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await axios.post(
          `http://172.28.26.97:9200/cancel-logs-*/_search`,
          {
            query: {
              match: {
                msisdn: `${phone}`,
              },
            },
          }
        );
        setDatas(res.data.hits.hits);
      } catch (err) {
        console.error(err);
        setDatas([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [open, phone]);

  const filtered = useMemo(() => {
    let result = datas.filter((clpk) => {
      // Filter by search text
      const matchSearch =
        clpk._source?.counterName
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        clpk._source?.msisdn?.toString().includes(search) ||
        clpk._source?.resultCode?.toString().includes(search);

      // Filter by date range
      const itemDate = new Date(clpk._source.createdAt);
      const matchStartDate = startDate ? itemDate >= new Date(startDate) : true;
      const matchEndDate = endDate
        ? itemDate <= new Date(endDate + "T23:59:59")
        : true;

      return matchSearch && matchStartDate && matchEndDate;
    });

    // Sort by date
    return [...result].sort((a, b) => {
      const dateA = new Date(a._source.createdAt);
      const dateB = new Date(b._source.createdAt);

      switch (sortBy) {
        case "days-asc":
          return dateA - dateB; // เก่าสุด → ล่าสุด
        case "days-desc":
          return dateB - dateA; // ล่าสุด → เก่าสุด
        default:
          return 0;
      }
    });
  }, [datas, search, sortBy, startDate, endDate]);

  const totalPage = Math.ceil(filtered.length / pageSize);
  const paginatedData = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xl" fullWidth>
      <DialogContent>
        {/* Header with Title and Close Button */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Typography variant="h5" fontWeight={700}>
            ປະຫວັດການຍົກເລີກແພັກເກັກ
          </Typography>
          <Button onClick={onClose} variant="outlined" size="small">
            ປິດ
          </Button>
        </Box>

        {/* Filters */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          gap={2}
          mb={2}
        >
          <Box display="flex" gap={2} flexWrap="wrap">
            <TextField
              select
              label="ຮຽງຕາມ"
              size="small"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              sx={{ width: 200 }}
            >
              <MenuItem value="days-desc">📅 ປັດຈຸບັນ → ອາດີດ</MenuItem>
              <MenuItem value="days-asc">📅 ອາດີດ → ປັດຈຸບັນ</MenuItem>
            </TextField>

            <TextField
              label="ວັນທີເລີ່ມຕົ້ນ"
              type="date"
              size="small"
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
                setPage(1);
              }}
              InputLabelProps={{ shrink: true }}
              sx={{ width: 180 }}
            />

            <TextField
              label="ວັນທີສິ້ນສຸດ"
              type="date"
              size="small"
              value={endDate}
              onChange={(e) => {
                setEndDate(e.target.value);
                setPage(1);
              }}
              InputLabelProps={{ shrink: true }}
              sx={{ width: 180 }}
            />

            <TextField
              select
              label="ຈຳນວນແສດງຕໍ່ໜ້າ"
              size="small"
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setPage(1);
              }}
              sx={{ width: 160 }}
            >
              <MenuItem value={6}>6 ຂໍ້ມູນ</MenuItem>
              <MenuItem value={9}>9 ຂໍ້ມູນ</MenuItem>
              <MenuItem value={12}>12 ຂໍ້ມູນ</MenuItem>
              <MenuItem value={20}>20 ຂໍ້ມູນ</MenuItem>
            </TextField>
          </Box>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Package Grid */}
        <Grid container spacing={3}>
          {isLoading ? (
            <Box width="100%" display="flex" justifyContent="center" mt={4}>
              <CircularProgress />
            </Box>
          ) : paginatedData.length === 0 ? (
            <Box width="100%" textAlign="center" mt={4}>
              <Typography color="text.secondary" variant="h6">
                ບໍ່ມີປະຫວັດການຍົກເລີກແພັກເກັກ
              </Typography>
              {(startDate || endDate) && (
                <Typography color="text.secondary" variant="body2" mt={1}>
                  ລອງປັບຊ່ວງວັນທີໃໝ່
                </Typography>
              )}
            </Box>
          ) : (
            paginatedData.map((ClPack, index) => (
              <Grid item xs={12} sm={6} md={4} key={ClPack._id || index}>
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
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                      {ClPack._source.counterName}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      📅{" "}
                      {new Date(ClPack._source.createdAt).toLocaleString(
                        "lo-LA",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </Typography>

                    <Typography
                      variant="body2"
                      fontWeight={600}
                      sx={{
                        mt: 1,
                        color:
                          ClPack._source.resultCode === "200"
                            ? "success.main"
                            : "error.main",
                      }}
                    >
                      {ClPack._source.resultCode === "200"
                        ? "✅ ສຳເລັດ"
                        : "❌ ຜິດພາດ"}
                    </Typography>

                    {ClPack._source.resultDesc && (
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ mt: 1, display: "block" }}
                      >
                        {ClPack._source.resultDesc}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>

        {/* Pagination */}
        {!isLoading && paginatedData.length > 0 && (
          <>
            <Box display="flex" justifyContent="center" mt={4}>
              <Pagination
                count={totalPage}
                page={page}
                onChange={(_, value) => setPage(value)}
                color="primary"
                size="large"
              />
            </Box>

            <Box textAlign="center" mt={2}>
              <Typography fontSize={14} color="text.secondary">
                ໜ້າ {page} ຈາກ {totalPage} ໜ້າ (ທັງໝົດ {filtered.length} ລາຍການ)
              </Typography>
            </Box>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default HistoryCancelPackage;
