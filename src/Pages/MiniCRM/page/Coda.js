import React from 'react'
// import LoadingLottie from '../../Components/LoadingLottie'
import MyTable from '../Table/Table'
// import Axios from '../../Components/Axios'
import axios from 'axios'
import GetPhoneNumber from '../../Components/GetPhoneNumber'
import moment from 'moment'
import { Grid } from '@material-ui/core'
import CodaDialog from '../page/CodaDialog'
// import cookie from 'js-cookie'
import { LoadingTable } from '../../../Loading/TableLoading'

function Coda({email}) {
    // console.log(email)
    const [stop, setStop] = React.useState(false)
    const [data, setData] = React.useState([])
    const [name,setName] = React.useState("CodaPay")
    React.useEffect(() => {
        var phone = GetPhoneNumber()
        axios.post("http://172.28.26.49:9200/tbl_request_log*/_search?filter_path=hits.hits._source", {
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
            "sort" : [
                {"resultDate": {"order" : "desc"}}
             ]
        },{
            auth: {
              username: "elastic",
              password: "#Ltc1qaz2wsx@es"
            }
          }).then(res => {
            if (res.status === 200) {
                var datas = []
                for(let i =0; i<res?.data?.hits?.hits?.length;i++){
                    datas.push(res.data.hits.hits[i]._source)
                }
                var num = 0
                var update = datas.map(row => {
                    row.id_idx = num + 1
                    row.resultDate = moment(row.resultDate).format("DD-MM-YYYY HH:mm:ss")
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
        { title: 'ເວລາ Request', field: 'resultDate', minWidth: 200 },
        { title: 'ປະເພດ', field: 'cardType', minWidth: 180 },
        { title: 'ຊື່ເກມ', field: 'gameName' },
        { title: 'ມູນຄ່າ', field: 'paidAmount', type: 'numeric', render: row => row.paidAmount > 0 ? row.paidAmount.toLocaleString() : row.paidAmount },
        { title: 'ສະຖານະ', field: 'resultCode' },
        { title: 'ຄຳອະທິບາຍ', field: 'resultDesc' },
    ]
    React.useEffect(()=>{
        if(email == "product@codapayments.com"){
            setName("CodaPay")
        }else if(email == "ryan.hong@linkit360.com"){
            setName("LinkIT360")
        }else{
            setName("AirPay")
        }
      },[email])
    function ShowData() {
        return (
            <>
                <MyTable tTitle={name} tData={data} tColumns={columns} />

                <Grid container>
                    <Grid item xs={12} className="more">
                        <CodaDialog email={email}/>
                    </Grid>
                </Grid>
            </>
        )
    }
    return (
        <>
            {!stop ? <LoadingTable /> : <ShowData />}
        </>
    )
}

export default Coda
