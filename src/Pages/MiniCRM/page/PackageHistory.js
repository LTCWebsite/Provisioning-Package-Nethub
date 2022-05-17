import React from 'react'
import LoadingLottie from '../../Components/LoadingLottie'
import MyTable from '../Table/Table'
import Axios from '../../Components/Axios'
import GetPhoneNumber from '../../Components/GetPhoneNumber'
import moment from 'moment'
import Doing from '../../Components/Doing'
import cookie from 'js-cookie'
import Crypt from '../../Components/Crypt'

function PackageHistory() {
    const [stop, setStop] = React.useState(false)
    const [data, setData] = React.useState([])
    React.useEffect(() => {
        // var SortBy = sortBy()
        var phone = GetPhoneNumber()
        
        Axios.get("QueryHistoryPackage?msisdn=" + phone, { headers: { 'Authorization': 'Bearer ' + cookie.get("one_session") } }).then(res => {
            if (res.status === 200) {
                var update = res.data.map(row => {
                    var initial = row.recordDate.split(/\//)
                    var n = [initial[1], initial[0], initial[2]].join('/')
                    row.date = n
                    return row
                })
                var newData = sortBy(update, { prop: "date", desc: true })
                var num = 0
                var newUpdate = newData.map(row => {
                    row.id_idx = num + 1
                    row.date = moment(row.date).format("DD-MM-YYYY HH:mm:ss")
                    row.all_status = row.result_desc === 'Operation successed.' ? false : true
                    num = num + 1
                    return row
                })
                setData(newUpdate)
                setTimeout(() => {
                    setStop(true)
                }, 10)
                // console.log(newUpdate)
                Doing({
                    msisdn: Crypt({ type: "decrypt", value: localStorage.getItem("input-phone") }).text,
                    username: Crypt({ type: "decrypt", value: localStorage.getItem("one_info") }).username,
                    detail: 'check package history',
                    resualt: 'Operation successed.',
                })
            }
        }).catch(err => {
            setStop(true)
        })
    }, [])
    const columns = [
        { title: 'No', field: 'id_idx', maxWidth: 50 },
        { title: 'ເວລາຊື້', field: 'date', minWidth: 180 },
        { title: 'MSISDN', field: 'msisdn', maxWidth: 140 },
        // { title: 'Type', field: 'srvtype', maxWidth: 100 },
        // { title: 'Chanel', field: 'chanel' },
        // { title: 'Charging', field: 'data_charging' },
        { title: 'PKCode', field: 'pkcode' },
        { title: 'PKType', field: 'pktype' },
        { title: 'UserID', field: 'user_id' },
        { title: 'ມູນຄ່າ', field: 'charge_amt', type: 'numeric', render: row => row.charge_amt > 0 ? parseInt(row.charge_amt).toLocaleString() : row.charge_amt },
        { title: 'ສະຖານະ', field: 'result_desc', minWidth: 200, render: row => <u className={row.all_status && 'dis_active'}>{row.result_desc}</u> },
    ]
    function ShowData() {
        return (
            <>
                <MyTable tTitle={"Package History"} tData={data} tColumns={columns} />

                {/* <Grid container>
                    <Grid item xs={12} className="more">
                        <GameLoftDialog />
                    </Grid>
                </Grid> */}
            </>
        )
    }

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
         * @param {Array} array: the collection to sort
         * @param {Object} cfg: the configuration options
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


    return (
        <>
            {!stop ? <LoadingLottie loadStop={stop} loadHeight={800} /> : <ShowData />}
        </>
    )
}

export default PackageHistory
