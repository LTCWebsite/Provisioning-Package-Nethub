import {
  AccountTree,
  FactCheck,
  FiberNew,
  NetworkCell,
  Password,
  Store,
} from "@mui/icons-material";
import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Skeleton,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { AxiosElastic, AxiosReq } from "../../../../../Components/Axios";
// import BuyPackage from "./Model/BuyPackage";
import BuyPackage2 from "./Model/BuyPackage2";
import RestoreIcon from "@mui/icons-material/Restore";
import PackageHistory from "./Model/PackageHistory";
import QueryPackage from "./Model/QueryPackage";
import SpecialPackage from "./Model/SpecialPackage";
import PhonelinkEraseIcon from "@mui/icons-material/PhonelinkErase";
import cookie from "js-cookie";
import PackageHistoryNew from "./Model/PackageHistoryNew";
import axios from "axios";
import { Button } from "antd";
import HistoryCancelPackage from "./Model/HistoryCancelPackage";
function Packages() {
  const [ph, setPh] = useState({
    data: [],
    load: false,
    count: 0,
    show: false,
  });
  const [packageHistoryNew, setPackageHistoryNew] = useState({
    data: [],
    load: false,
    count: 0,
    show: false,
  });
  const [pk, setPk] = useState({
    data: [],
    load: false,
    count: 0,
    show: false,
  });
  // const [buy, setBuy] = useState({ load: true, show: false, count: 0 });
  // const [buyC, setBuyC] = useState(0);
  const [sp, setSP] = useState({ load: true, show: false, count: 0 });
  const [spC, setSPC] = useState(0);
  const [buyPackage, setBuyPackage] = useState({
    load: true,
    show: false,
    count: 0,
  });
  const usernaemLocal = localStorage.getItem("USERNAME");
  const phone = localStorage.getItem("ONE_PHONE");
  const [openFormHistoryPackage, setOpenFormHistoryPackage] = useState(false);
  const [openResultCanclePack, setOpenResultCancelPack] = useState(false);
  const [resultMessageCancle, setResultMessageCancle] = useState("");
  // const [buyCf, setBuyCf] = useState(0);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let phone = localStorage.getItem("ONE_PHONE");

    setPh({ ...ph, count: 0, load: true });
    AxiosReq.get("/New_PackageHistoryCount/count?msisdn=" + phone, {
      headers: { Authorization: "Bearer " + cookie.get("ONE_TOKEN") },
    })
      .then((res) => {
        if (res.status === 200 && res.data.resultCode === 200) {
          setPh({ ...ph, count: parseInt(res.data.total), load: false });
        } else {
          setPh({ ...ph, count: 0, load: false });
        }
      })
      .catch((er) => {
        setPh({ ...ph, count: 0, load: false });
      });

    setPackageHistoryNew({ ...packageHistoryNew, count: 0, load: true });

    AxiosElastic.post("ltc-ussd-*/_count", {
      query: {
        match: {
          msisdnRecipient: phone,
        },
      },
    })
      .then((res) => {
        if (res.status === 200) {
          setPackageHistoryNew({
            ...packageHistoryNew,
            count: parseInt(res.data.count),
            load: false,
          });
        } else {
          setPackageHistoryNew({ ...packageHistoryNew, count: 0, load: false });
        }
      })
      .catch((er) => {
        setPackageHistoryNew({ ...packageHistoryNew, count: 0, load: false });
      });

    setPk({ ...pk, load: true, count: 0 });
    AxiosReq.get("NewQueryPackage?msisdn=" + phone, {
      headers: { Authorization: "Bearer " + cookie.get("ONE_TOKEN") },
    })
      .then((res) => {
        if (res.status === 200) {
          // let update = res.data.filter(row => row.remaining_data > 0).map((row, idx) => {
          //     row.idx = idx + 1
          //     return row
          // })
          let update = res.data?.map((row, idx) => {
            row.idx = idx + 1;
            return row;
          });
          console.log("row", res.data);
          setPk({
            ...pk,
            load: false,
            count: parseInt(res.data.length),
            data: update,
          });
        } else {
          setPk({ ...pk, load: false, count: 0 });
        }
      })
      .catch((er) => {
        setPk({ ...pk, load: false, count: 0 });
      });
  }, []);
  const handleCancelPackage = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `http://172.28.26.128:3000/api/cancel/`,
        {
          packageCode: `${usernaemLocal}`,
          msisdn: `${phone}`,
        },
        {
          auth: {
            username: "1screen",
            password: "#Screen1qaz2wsx@101",
          },
        }
      );
      setResultMessageCancle(response.data.message || "");
      setOpen(false);
      setOpenResultCancelPack(true);
    } catch (error) {
      console.log("Cancle Error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container>
      <Grid
        item
        xs={12}
        container
        className="link-box-pointer"
        onClick={() => setPk({ ...pk, show: true })}
      >
        <Grid item xs={2}>
          <NetworkCell />
        </Grid>
        <Grid item xs={6}>
          ດາຕ້າແພັກເກັດ :
        </Grid>
        <Grid item xs={4}>
          {pk.load ? (
            <Skeleton animation="wave" />
          ) : (
            <div
              className={
                pk.count > 0
                  ? "text-right bage-success"
                  : "text-right bage-error"
              }
            >
              <u>{pk.count}</u>
            </div>
          )}
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        container
        className="link-box-pointer"
        onClick={() => setPh({ ...ph, show: true })}
      >
        <Grid item xs={2}>
          <AccountTree />
        </Grid>
        <Grid item xs={6}>
          Package History :
        </Grid>
        <Grid item xs={4}>
          {ph.load ? (
            <Skeleton animation="wave" />
          ) : (
            <div
              className={
                ph.count > 0
                  ? "text-right bage-success"
                  : "text-right bage-error"
              }
            >
              <u>{ph.count}</u>
            </div>
          )}
        </Grid>
      </Grid>

      <Grid
        item
        xs={12}
        container
        className="link-box-pointer"
        onClick={() =>
          setPackageHistoryNew({ ...packageHistoryNew, show: true })
        }
      >
        <Grid item xs={2}>
          <AccountTree />
        </Grid>
        <Grid item xs={6}>
          Package History (New) :
        </Grid>
        <Grid item xs={4}>
          {packageHistoryNew.load ? (
            <Skeleton animation="wave" />
          ) : (
            <div
              className={
                packageHistoryNew.count > 0
                  ? "text-right bage-success"
                  : "text-right bage-error"
              }
            >
              <u>{packageHistoryNew.count}</u>
            </div>
          )}
        </Grid>
      </Grid>

      <Grid
        item
        xs={12}
        container
        className="link-box-pointer"
        onClick={() => setBuyPackage({ ...buyPackage, show: true })}
      >
        <Grid item xs={2}>
          <Store />
        </Grid>
        <Grid item xs={6}>
          ຊື້ແພັກເກັດໃຫ້ລູກຄ້າ
        </Grid>
      </Grid>

      <Grid
        item
        xs={12}
        container
        className="link-box-pointer"
        onClick={() => setSP({ ...sp, show: true })}
      >
        <Grid item xs={2}>
          <FactCheck />
        </Grid>
        <Grid item xs={6}>
          Special Package
        </Grid>
        <Grid item xs={4}>
          {sp.load ? (
            <Skeleton animation="wave" />
          ) : (
            <div
              className={
                spC > 0 ? "text-right bage-success" : "text-right bage-error"
              }
            >
              <u>{spC}</u>
            </div>
          )}
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        container
        className="link-box-pointer"
        onClick={() => setOpen(true)}
      >
        <Grid item xs={2}>
          <PhonelinkEraseIcon />
        </Grid>
        <Grid item xs={6}>
          ຍົກເລີກແພັກເກັດ
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        container
        className="link-box-pointer"
        onClick={() => setOpenFormHistoryPackage(true)}
      >
        <Grid item xs={2}>
          <RestoreIcon />
        </Grid>
        <Grid item xs={6}>
          ປະຫວັດການຍົກເລີກແພັກເກັດ
        </Grid>
      </Grid>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3, p: 2, backgroundColor: "#fafafa" },
        }}
      >
        <DialogTitle sx={{ fontSize: 24, fontWeight: 700 }}>
          ຢືນຢັນການຍົກເລີກ
        </DialogTitle>

        <DialogContent>
          <DialogContentText sx={{ fontSize: 18 }}>
            ທ່ານຕ້ອງການຍົກເລີກແພັກເກັດ ຫຼື ບໍ່?
          </DialogContentText>
        </DialogContent>

        <DialogActions
          sx={{
            flexDirection: "column",
            gap: 2,
            p: 2,
            pr: 4,
            alignItems: "baseline",
          }}
        >
          <button
            onClick={handleCancelPackage}
            disabled={loading}
            style={{
              height: 56,
              fontSize: 18,
              backgroundColor: "#2196f3",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              cursor: loading ? "not-allowed" : "pointer",
              fontWeight: 600,
              width: "100%",
              opacity: loading ? 0.6 : 1,
            }}
          >
            {loading ? "ກຳລັງຍົກເລີກ..." : "ຢືນຢັນ"}
          </button>

          <button
            onClick={() => setOpen(false)}
            style={{
              height: 56,
              fontSize: 18,
              backgroundColor: "#f44336",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              fontWeight: 600,
              width: "100%",
            }}
          >
            ປິດ
          </button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openResultCanclePack}
        onClose={() => setOpenResultCancelPack(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3, p: 3, backgroundColor: "#fafafa" },
        }}
      >
        <DialogContent>
          <DialogContentText sx={{ fontSize: 18 }}>
            {resultMessageCancle}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", py: 2 }}>
          <Button
            onClick={() => setOpenResultCancelPack(false)}
            variant="contained"
            sx={{
              minWidth: 120,
              minHeight: 50,
              fontSize: 18,
              fontWeight: 600,
              backgroundColor: "#1976d2",
              color: "#fff",
              borderRadius: 2,
              "&:hover": { backgroundColor: "#1565c0" },
            }}
          >
            ປິດ
          </Button>
        </DialogActions>
      </Dialog>
      <PackageHistory
        open={ph.show}
        cb={(e) => setPh({ ...ph, show: e })}
        total={ph.count}
      />
      <PackageHistoryNew
        open={packageHistoryNew.show}
        cb={(e) => setPackageHistoryNew({ ...packageHistoryNew, show: e })}
        total={packageHistoryNew.count}
      />
      <QueryPackage
        open={pk.show}
        cb={(e) => setPk({ ...pk, show: e })}
        data={pk.data}
      />
      {/* <BuyPackage
        open={buy.show}
        cb={(e) => setBuy({ ...buy, show: e })}
        done={buy.load}
        ifdone={(e) => setBuy({ ...buy, load: e })}
        count={(e) => setBuyC(e)}
      /> */}

      <BuyPackage2
        open={buyPackage.show}
        cb={(e) => setBuyPackage({ ...buyPackage, show: e })}
        done={buyPackage.load}
        ifdone={(e) => setBuyPackage({ ...buyPackage, load: e })}
      />

      <SpecialPackage
        open={sp.show}
        cb={(e) => setSP({ ...sp, show: e })}
        done={sp.load}
        ifdone={(e) => setSP({ ...sp, load: e })}
        count={(e) => setSPC(e)}
      />
      <HistoryCancelPackage
        open={openFormHistoryPackage}
        onClose={() => setOpenFormHistoryPackage(false)}
      />
    </Grid>
  );
}

export default Packages;
