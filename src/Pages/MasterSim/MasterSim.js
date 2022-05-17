import React from 'react'
// import LoadingLottie from '../Components/LoadingLottie'
import MyTable from '../MiniCRM/Table/Table'
import cookie from 'js-cookie'
import Doing from '../Components/Doing'
import Axios from '../Components/Axios'
import { Grid } from '@material-ui/core'
import Crypt from '../Components/Crypt'
import { LoadingTable } from '../../Loading/TableLoading'

function MasterSim() {
    const [data, setData] = React.useState({ text: [], load: false })
    React.useEffect(() => {
        Axios.post("CheckMasterSim", {}, { headers: { 'Authorization': 'Bearer ' + cookie.get("one_session") } }).then(res => {
            if (res.status === 200) {
                var update = res.data.map((row, idx) => {
                    if (row.balance <= 50000000 && row.balance > 5000 && row.tier_ === "Platinum" && row.status === true) {
                        row.dex = 1
                    } else if (row.balance > 50000000 && row.tier_ === "Platinum" && row.status === true) {
                        row.dex = 2
                    } else if (row.balance <= 5000000 && row.balance > 5000 && row.tier_ === "Gold" && row.status === true) {
                        row.dex = 1
                    } else if (row.balance > 5000000 && row.tier_ === "Gold" && row.status === true) {
                        row.dex = 2
                    } else if (row.balance <= 500000 && row.balance > 5000 && row.tier_ === "Silver" && row.status === true) {
                        row.dex = 1
                    } else if (row.balance > 500000 && row.tier_ === "Silver" && row.status === true) {
                        row.dex = 2
                    } else if (row.balance <= 5000 && row.status === true) {
                        row.dex = 3
                    }
                    row.id = idx + 1
                    return row
                })
                update.sort(sort_by('dex', false, parseInt))
                var newUpdate = update.map((row, idx) => {
                    row.idx = idx + 1
                    return row
                })
                setData({ load: true, text: newUpdate })
                Doing({
                    msisdn: Crypt({ type: "decrypt", value: localStorage.getItem("input-phone") }).text,
                    username: Crypt({ type: "decrypt", value: localStorage.getItem("one_info") }).username,
                    detail: 'check master sim',
                    resualt: 'Operation successed.',
                })
            }
        }).catch(err => {
            console.log(err)
            Doing({
                msisdn: Crypt({ type: "decrypt", value: localStorage.getItem("input-phone") }).text,
                username: Crypt({ type: "decrypt", value: localStorage.getItem("one_info") }).username,
                detail: 'check master sim',
                resualt: 'error',
            })
        })
    }, [])
    const sort_by = (field, reverse, primer) => {

        const key = primer ?
            function (x) {
                return primer(x[field])
            } :
            function (x) {
                return x[field]
            };

        reverse = !reverse ? 1 : -1;

        return function (a, b) {
            return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
        }
    }
    const checkStatus = (Balance, tier_, Status) => {
        if (Balance <= 50000000 && Balance > 5000 && tier_ === "Platinum" && Status === true) {
            return <u className="warn_active">ເງີນໃກ້ຈະໝົດແລ້ວ</u>
        } else if (Balance > 50000000 && tier_ === "Platinum" && Status === true) {
            return <u className="active">ປົກກະຕິ</u>
        } else if (Balance <= 5000000 && Balance > 5000 && tier_ === "Gold" && Status === true) {
            return <u className="warn_active">ເງີນໃກ້ຈະໝົດແລ້ວ</u>
        } else if (Balance > 5000000 && tier_ === "Gold" && Status === true) {
            return <u className="active">ປົກກະຕິ</u>
        } else if (Balance <= 500000 && Balance > 5000 && tier_ === "Silver" && Status === true) {
            return <u className="warn_active">ເງີນໃກ້ຈະໝົດແລ້ວ</u>
        } else if (Balance > 500000 && tier_ === "Silver" && Status === true) {
            return <u className="active">ປົກກະຕິ</u>
        } else if (Balance <= 5000 && Status === true) {
            return <u className="dis_active">ເງີນໝົດແລ້ວ</u>
        }
    }
    const columns = [
        { title: 'No', field: 'idx', maxWidth: 50 },
        { title: 'ເບີໂທ', field: 'msisdn' },
        { title: 'ປະເພດ', field: 'type' },
        { title: 'Vendor', field: 'vendor' },
        { title: 'Tier', field: 'tier_' },
        { title: 'ຖັງເງິນ', field: 'balance', type: 'numeric', render: row => row.balance > 0 ? parseInt(row.balance).toLocaleString() : row.balance },
        {
            title: 'ສະຖານະ', field: 'status', type: 'numeric', render: row => checkStatus(row.balance, row.tier_, row.status)
        },
        // { title: 'ຄຳອະທິບາຍ', field: 'dex', minWidth: 350 },
    ]

    return (
        <>
            {!data.load ? <Grid container>
                <Grid item xs={12} style={{ height: 550, backgroundColor: 'white', padding: 20 }}>
                    <LoadingTable />
                </Grid>
            </Grid> :
                <Grid container>
                    <Grid item xs={12} style={{ backgroundColor: 'red', width: '100%' }}>
                        <MyTable tTitle={"Master SIM"} tData={data.text} tColumns={columns} />
                    </Grid>
                </Grid>}
        </>
    )
}

export default MasterSim
