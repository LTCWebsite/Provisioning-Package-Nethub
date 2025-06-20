import { AddCard, AddTask, AppShortcut, CurrencyExchange, Email, Gamepad, LocalPhone, Paid, PhoneCallback, SentimentSatisfiedAlt, SignalCellularAlt2Bar, StickyNote2, ThumbsUpDown, Toll } from '@mui/icons-material'
import { Badge, Grid, Skeleton } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Add from './Model/Add'
import All from './Model/All'
import BuyPackage from './Model/BuyPackage'
import Call from './Model/Call'
import Game from './Model/Game'
import HappyCall from './Model/HappyCall'
import Lotto from './Model/Lotto'
import Mmoney from './Model/Mmoney'
import Other from './Model/Other'
import Sms from './Model/Sms'
import Transfer from './Model/Transfer'
import VAS from './Model/VAS'
import Vote from './Model/Vote'

function BillQuery() {
  const [data, setData] = useState({ all: [], rbt: [], game: [], buy_package: [], mmoney: [], sms: [], call: [], transfer: [], add: [], vas: [], happyCall: [], vote: [], lotto: [], other: [] })
  const [count, setCount] = useState({ all: 0, rbt: 0, game: 0, buy_package: 0, mmoney: 0, sms: 0, call: 0, transfer: 0, add: 0, vas: 0, happyCall: 0, vote: 0, lotto: 0, other: 0 })
  const [load, setLoad] = useState(false)

  useEffect(() => {
    let phone = localStorage.getItem("ONE_PHONE")
    setLoad(true)
    let send = {
      msisdn: phone
    }
    axios.post("http://10.30.6.148:3000/cut_money", send, {
      auth: {
        username: "one",
        password: "#Ltc1qaz2wsx@one"
      }
    }).then(res => {
      if (res.status === 200) {
        let resp = res.data
        let all_count = 0
        let all_data = []
        // console.log(resp)
        //////////
        let sms = resp?.sms?.hits?.hits
        let sms_count = 0
        let sms_data = []
        sms?.map((row, idx) => {
          sms_data.push(row._source)
          sms_count = sms_count + parseInt(row._source.Charge)
          all_data.push({ ...row._source, type: "Sms" })
        })
        all_count = all_count + sms_count
        /////////
        let call = resp?.voice?.hits?.hits
        let call_count = 0
        let call_data = []
        call?.map(row => {
          call_data.push(row._source)
          call_count = call_count + parseInt(row._source.Charge)
          all_data.push({ ...row._source, type: "Call" })
        })
        all_count = all_count + call_count
        ////////
        let transfer = resp?.transfer?.hits?.hits
        let transfer_count = 0
        let transfer_data = []
        transfer?.map(row => {
          if (row._source?.HANDLING_CHARGE != 0) {
            transfer_data.push(row._source)
            transfer_count = transfer_count + parseInt(row._source.CHG_BALANCE)
            all_data.push({ ...row._source, type: "Transfer" })
          }
        })
        all_count = all_count + transfer_count
        ///////
        let add = resp?.vou?.hits?.hits
        let add_count = 0
        let add_data = []
        add?.map(row => {
          add_data.push(row._source)
          add_count = add_count + parseInt(row._source.CHG_BALANCE)
          all_data.push({ ...row._source, type: "Add" })
        })
        all_count = all_count - add_count

        //////////
        let adjustment = resp?.adjustment?.hits?.hits
        let pg_count = 0
        let pg_data = []
        let mmoney_count = 0
        let mmoney_data = []
        let game_count = 0
        let game_data = []
        let vas_count = 0
        let vas_data = []
        let other_count = 0
        let other_data = []
        let happyCall_count = 0
        let happyCall_data = []
        let vote_count = 0
        let vote_data = []
        let lotto_count = 0
        let lotto_data = []

        adjustment?.map(row => {
          if (row._source.extTransType === "1") {
            pg_data.push(row._source)
            pg_count = pg_count + parseInt(row._source.CHG_BALANCE)
            all_data.push({ ...row._source, type: "Package" })
          } else if (row._source.extTransType === "Mmoney") {
            mmoney_data.push(row._source)
            mmoney_count = mmoney_count + parseInt(row._source.adjustAmount)
            all_data.push({ ...row._source, type: "Mmoney" })
          } else if (row._source.extTransType === "vote") {
            vote_data.push(row._source)
            vote_count = vote_count + parseInt(row._source.CHG_BALANCE)
            all_data.push({ ...row._source, type: "Vote" })
          } else if (row._source.extTransType === "TEST") {
            happyCall_data.push(row._source)
            happyCall_count = happyCall_count + parseInt(row._source.CHG_BALANCE)
            all_data.push({ ...row._source, type: "happyCall" })
          } else if (row._source.extTransType === "NCCLOTTO") {
            lotto_data.push(row._source)
            lotto_count = lotto_count + parseInt(row._source.CHG_BALANCE)
            all_data.push({ ...row._source, type: "Lotto" })
          } else if (row._source.extTransType === "GRAMES") {
            game_data.push(row._source)
            game_count = game_count + parseInt(row._source.CHG_BALANCE)
            all_data.push({ ...row._source, type: "Game" })
          } else if (row._source.extTransType === "VASSRV") {
            vas_data.push(row._source)
            vas_count = vas_count + parseInt(row._source.CHG_BALANCE)
            all_data.push({ ...row._source, type: "VAS" })
          } else {
            other_data.push(row._source)
            other_count = other_count + parseInt(row?._source?.adjustAmount)
            all_data.push({ ...row._source, type: "Other" })
          }
        })
        let cc = pg_count + mmoney_count + vote_count + happyCall_count + lotto_count + game_count + other_count
        all_count = all_count + cc

        sortBy(all_data, { prop: "@timestamp", desc: true })
        // console.log(all_data)


        setData({ ...data, all: all_data, sms: sms_data, call: call_data, transfer: transfer_data, add: add_data, buy_package: pg_data, vas: vas_data, game: game_data, mmoney: mmoney_data, happyCall: happyCall_data, vote: vote_data, lotto: lotto_data, other: other_data })
        setCount({ ...count, all: all_count, sms: sms_count, call: call_count, transfer: transfer_count, add: add_count, buy_package: pg_count, vas: vas_count, game: game_count, mmoney: mmoney_count, happyCall: happyCall_count, vote: vote_count, lotto: lotto_count, other: other_count })

        setLoad(false)
      }
    }).catch(er => {
      console.log(er)
      setLoad(false)
    })
  }, [])


  var sortBy = (function () {
    var toString = Object.prototype.toString,
      // default parser function
      parse = function (x) { return x; },
      // gets the item to be sorted
      getItem = function (x) {
        var isObject = x != null && typeof x === "object";
        var isProp = isObject && this.prop in x;
        return this.parser(isProp ? x[this.prop] : x);
      };

    /**
     * Sorts an array of elements.
     *
     * @param  {Array} array: the collection to sort
     * @param  {Object} cfg: the configuration options
     * @property {String}   cfg.prop: property name (if it is an Array of objects)
     * @property {Boolean}  cfg.desc: determines whether the sort is descending
     * @property {Function} cfg.parser: function to parse the items to expected type
     * @return {Array}
     */
    return function sortby(array, cfg) {
      if (!(array instanceof Array && array.length)) return [];
      if (toString.call(cfg) !== "[object Object]") cfg = {};
      if (typeof cfg.parser !== "function") cfg.parser = parse;
      cfg.desc = !!cfg.desc ? -1 : 1;
      return array.sort(function (a, b) {
        a = getItem.call(cfg, a);
        b = getItem.call(cfg, b);
        return cfg.desc * (a < b ? -1 : +(a > b));
      });
    };

  }());

  const [open, setOpen] = useState({ all: false, sms: false, call: false, transfer: false, add: false, buy_package: false, vas: false, game: false, mmoney: false, happyCall: false, vote: false, lotto: false, other: false })
  const OpenALL = (e) => {
    if (e === "sms") {
      setOpen({ ...open, sms: true })
    } else if (e === "call") {
      setOpen({ ...open, call: true })
    } else if (e === "transfer") {
      setOpen({ ...open, transfer: true })
    } else if (e === "add") {
      setOpen({ ...open, add: true })
    } else if (e === "happyCall") {
      setOpen({ ...open, happyCall: true })
    } else if (e === "package") {
      setOpen({ ...open, buy_package: true })
    } else if (e === "vas") {
      setOpen({ ...open, vas: true })
    } else if (e === "game") {
      setOpen({ ...open, game: true })
    } else if (e === "mmoney") {
      setOpen({ ...open, mmoney: true })
    } else if (e === "vote") {
      setOpen({ ...open, vote: true })
    } else if (e === "lotto") {
      setOpen({ ...open, lotto: true })
    } else if (e === "other") {
      setOpen({ ...open, other: true })
    } else if (e === "all") {
      setOpen({ ...open, all: true })
    }
  }


  return (
    <>
      <Grid container>
        <Grid item xs={12} container>

          <Grid item xs={12} lg={12} container className='link-box-pointer' onClick={() => OpenALL("all")}>
            <Grid item xs={4} className="right">
              {/* <Badge badgeContent={data.all.length.toString()} color="primary"><Paid />&nbsp;&nbsp;</Badge>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
              <Paid />&nbsp;
            </Grid>
            <Grid item xs={3}>ALL :</Grid>
            <Grid item xs={5}>{load ? <Skeleton animation="wave" /> : count.all.toLocaleString()}</Grid>
          </Grid>
          <Grid item xs={12} lg={4} container className='link-box-pointer' onClick={() => OpenALL("package")}>
            <Grid item xs={2}>
              {/* <Badge badgeContent={data.buy_package.length.toString()} color="primary"><SignalCellularAlt2Bar /></Badge> */}
              <SignalCellularAlt2Bar />
            </Grid>
            <Grid item xs={5}>Package :</Grid>
            <Grid item xs={5} className="text-right">
              {load ? <Skeleton animation="wave" /> : count.buy_package.toLocaleString()}
            </Grid>
          </Grid>
          <Grid item xs={12} lg={4} container className='link-box-pointer' onClick={() => OpenALL("call")}>
            <Grid item xs={2}>
              {/* <Badge badgeContent={data.call.length.toString()} color="primary"><LocalPhone /></Badge> */}
              <LocalPhone />
            </Grid>
            <Grid item xs={5}>Call :</Grid>
            <Grid item xs={5} className="text-right">
              {load ? <Skeleton animation="wave" /> : count.call.toLocaleString()}
            </Grid>
          </Grid>
          <Grid item xs={12} lg={4} container className='link-box-pointer' onClick={() => OpenALL("sms")}>
            <Grid item xs={2}>
              {/* <Badge badgeContent={data.sms.length.toString()} color="primary"><Email /></Badge> */}
              <Email />
            </Grid>
            <Grid item xs={5}>SMS :</Grid>
            <Grid item xs={5} className="text-right">
              {load ? <Skeleton animation="wave" /> : count.sms.toLocaleString()}
            </Grid>
          </Grid>
          <Grid item xs={12} lg={4} container className='link-box-pointer' onClick={() => OpenALL("transfer")}>
            <Grid item xs={2}>
              {/* <Badge badgeContent={data.transfer.length.toString()} color="primary"><CurrencyExchange /></Badge> */}
              <CurrencyExchange />
            </Grid>
            <Grid item xs={5}>Transfer :</Grid>
            <Grid item xs={5} className="text-right">
              {load ? <Skeleton animation="wave" /> : count.transfer.toLocaleString()}
            </Grid>
          </Grid>

          <Grid item xs={12} lg={4} container className='link-box-pointer' onClick={() => OpenALL("vas")}>
            <Grid item xs={2}>
              {/* <Badge badgeContent={data.vas.length.toString()} color="primary"><Toll /></Badge> */}
              <Toll />
            </Grid>
            <Grid item xs={5}>VAS :</Grid>
            <Grid item xs={5} className="text-right">
              {load ? <Skeleton animation="wave" /> : count.vas.toLocaleString()}
            </Grid>
          </Grid>
          <Grid item xs={12} lg={4} container className='link-box-pointer' onClick={() => OpenALL("mmoney")}>
            <Grid item xs={2}>
              {/* <Badge badgeContent={data.mmoney.length.toString()} color="primary"><AddTask /></Badge> */}
              <AddTask />
            </Grid>
            <Grid item xs={5}>Mmoney :</Grid>
            <Grid item xs={5} className="text-right">
              {load ? <Skeleton animation="wave" /> : count.mmoney.toLocaleString()}
            </Grid>
          </Grid>
          <Grid item xs={12} lg={4} container className='link-box-pointer' onClick={() => OpenALL("game")}>
            <Grid item xs={2}>
              {/* <Badge badgeContent={data.game.length.toString()} color="primary"><Gamepad /></Badge> */}
              <Gamepad />
            </Grid>
            <Grid item xs={5}>Game :</Grid>
            <Grid item xs={5} className="text-right">
              {load ? <Skeleton animation="wave" /> : count.game.toLocaleString()}
            </Grid>
          </Grid>
          <Grid item xs={12} lg={4} container className='link-box-pointer' onClick={() => OpenALL("add")}>
            <Grid item xs={2}>
              {/* <Badge badgeContent={data.add.length.toString()} color="primary"><AddCard /></Badge> */}
              <AddCard />
            </Grid>
            <Grid item xs={5}>ເຕີມເງິນ :</Grid>
            <Grid item xs={5} className="text-right">
              {load ? <Skeleton animation="wave" /> : count.add.toLocaleString()}
            </Grid>
          </Grid>
          <Grid item xs={12} lg={4} container className='link-box-pointer' onClick={() => OpenALL("happyCall")}>
            <Grid item xs={2}>
              {/* <Badge badgeContent={data.happyCall.length.toString()} color="primary"><SentimentSatisfiedAlt /></Badge> */}
              <SentimentSatisfiedAlt />
            </Grid>
            <Grid item xs={8}>Debug Game</Grid>
            <Grid item xs={2} className="text-right">
              {load ? <Skeleton animation="wave" /> : count.happyCall.toLocaleString()}
            </Grid>
          </Grid>

          <Grid item xs={12} lg={4} container className='link-box-pointer' onClick={() => OpenALL("vote")}>
            <Grid item xs={2}>
              {/* <Badge badgeContent={data.vote.length.toString()} color="primary"><ThumbsUpDown /></Badge> */}
              <ThumbsUpDown />
            </Grid>
            <Grid item xs={5}>Vote :</Grid>
            <Grid item xs={5} className="text-right">
              {load ? <Skeleton animation="wave" /> : count.vote.toLocaleString()}
            </Grid>
          </Grid>
          <Grid item xs={12} lg={4} container className='link-box-pointer' onClick={() => OpenALL("lotto")}>
            <Grid item xs={2}>
              {/* <Badge badgeContent={data.lotto.length.toString()} color="primary"><StickyNote2 /></Badge> */}
              <StickyNote2 />
            </Grid>
            <Grid item xs={5}>Lotto :</Grid>
            <Grid item xs={5} className="text-right">
              {load ? <Skeleton animation="wave" /> : count.lotto.toLocaleString()}
            </Grid>
          </Grid>
          <Grid item xs={12} lg={4} container className='link-box-pointer' onClick={() => OpenALL("other")}>
            <Grid item xs={2}>
              {/* <Badge badgeContent={data.other.length.toString()} color="primary"><AppShortcut /></Badge> */}
              <AppShortcut />
            </Grid>
            <Grid item xs={5}>Other :</Grid>
            <Grid item xs={5} className="text-right">
              {load ? <Skeleton animation="wave" /> : count.other.toLocaleString()}
            </Grid>
          </Grid>

        </Grid>
        <Grid item xs={12}>
          <div className='center no-padd' style={{ padding: 0, marginTop: 10 }}>
            * ຂໍ້ມູນສະເພາະໄລຍະເວລາ 3 ເດືອນຍ້ອນຫລັງ *
          </div>
        </Grid>
      </Grid>

      <Sms open={open.sms} cb={(e) => setOpen({ ...open, sms: e })} data={data.sms} />
      <Call open={open.call} cb={(e) => setOpen({ ...open, call: e })} data={data.call} />
      <Transfer open={open.transfer} cb={(e) => setOpen({ ...open, transfer: e })} data={data.transfer} />
      <Add open={open.add} cb={(e) => setOpen({ ...open, add: e })} data={data.add} />
      <BuyPackage open={open.buy_package} cb={(e) => setOpen({ ...open, buy_package: e })} data={data.buy_package} />
      <VAS open={open.vas} cb={(e) => setOpen({ ...open, vas: e })} data={data.vas} />
      <Game open={open.game} cb={(e) => setOpen({ ...open, game: e })} data={data.game} />
      <Mmoney open={open.mmoney} cb={(e) => setOpen({ ...open, mmoney: e })} data={data.mmoney} />
      <HappyCall open={open.happyCall} cb={(e) => setOpen({ ...open, happyCall: e })} data={data.happyCall} />
      <Vote open={open.vote} cb={(e) => setOpen({ ...open, vote: e })} data={data.vote} />
      <Lotto open={open.lotto} cb={(e) => setOpen({ ...open, lotto: e })} data={data.lotto} />
      <Other open={open.other} cb={(e) => setOpen({ ...open, other: e })} data={data.other} />
      <All open={open.all} cb={(e) => setOpen({ ...open, all: e })} data={data.all} />
    </>
  )
}

export default BillQuery