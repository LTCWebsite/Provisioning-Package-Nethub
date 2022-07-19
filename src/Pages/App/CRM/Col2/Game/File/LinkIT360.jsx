import React from 'react'
// import LoadingLottie from '../../Components/LoadingLottie'
import MyTable from '../../../../../../Components/MyTable'
// import Axios from '../../Components/Axios'
import moment from 'moment'
import { Grid } from '@material-ui/core'
// import LinkIT360Dialog from '../page/LinkIT360Dialog'
// import cookie from 'js-cookie'
import axios from 'axios'
import { LoadingTable } from '../../../../../../Components/TableLoading'

function LinkIT360({ email }) {
    // console.log(email)
    const [stop, setStop] = React.useState(false)
    const [data, setData] = React.useState([])
    const [name, setName] = React.useState("CodaPay")
    React.useEffect(() => {
        var phone = localStorage.getItem("ONE_PHONE")
        axios.post("http://172.28.26.49:9200/tbl_sms_log*/_search?filter_path=hits.hits._source", {
            "query": {
                "bool": {
                    "must": [

                        {
                            "match": {
                                "msisdn": phone
                            }
                        },
                        {
                            "match": {
                                "email": email
                            }
                        }
                    ]
                }
            },
            "sort": [
                { "send_date": { "order": "desc" } }
            ]
        }, {
            auth: {
                username: "elastic",
                password: "#Ltc1qaz2wsx@es"
            }
        }).then(res => {
            if (res.status === 200) {
                var datas = []
                for (let i = 0; i < res?.data?.hits?.hits?.length; i++) {
                    datas.push(res.data.hits.hits[i]._source)
                }
                var num = 0
                var update = datas.map(row => {
                    row.id_idx = num + 1
                    row.send_date = moment(row.send_date).format("DD-MM-YYYY HH:mm:ss")
                    num = num + 1
                    return row
                })

                setData(update)
                setTimeout(() => {
                    setStop(true)
                }, 200)
            }
        }).catch(err => {
            setStop(true)
        })
    }, [email])
    const columns = [
        { title: 'No', field: 'id_idx', maxWidth: 50 },
        { title: 'ເວລາສົ່ງຂໍ້ຄວາມ', field: 'send_date', maxWidth: 150 },
        {
            title: 'ຂໍ້ຄວາມ', field: 'message', render: (row) =>
                row.message.startsWith("ໃສ່") ? row.message.substring(0, 3) + " XXX-XXX " + row.message.substring(7, row.message.length) : row.message, minWidth: 180
        },
        { title: 'ສະຖານະ', field: 'resultCode', maxWidth: 80 },
        { title: 'ຄຳອະທິບາຍ', field: 'resultDesc' },
    ]
    React.useEffect(() => {
        if (email == "product@codapayments.com") {
            setName("CodaPay")
        } else if (email == "ryan.hong@linkit360.com") {
            setName("LinkIT360")
        } else {
            setName("AirPay")
        }
    }, [email])
    function ShowData() {
        return (
            <>
                <MyTable tTitle={name} tData={data} tColumns={columns} />

                {/* <Grid container>
                    <Grid item xs={12} className="more">
                        <LinkIT360Dialog email={email}/>
                    </Grid>
                </Grid> */}
            </>
        )
    }
    return (
        <>
            {!stop ? <LoadingTable /> : <ShowData />}
        </>
    )
}

export default LinkIT360
