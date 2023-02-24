import React from 'react'
import MyTable from '../../../../../Components/MyTable'
import { LoadingTable } from '../../../../../Components/TableLoading'
import axios from 'axios'
import cookie from 'js-cookie'

function ProductOffering() {
    const [stop, setStop] = React.useState(false)
    const [data, setData] = React.useState([])


    React.useEffect(() => {
        var phone = localStorage.getItem("ONE_PHONE")
        axios.get("http://10.30.6.148:5678/NewCustomerInfoCbs?msisdn=" + phone, { headers: { 'Authorization': 'Bearer ' + cookie.get("ONE_TOKEN") } }).then(res => {
            if (res.status === 200) {
                setData(res.data.offering)

                // console.log(res.data.offering)
                setStop(true)
            }
        }).catch(err => {
            setStop(true)
        })
    }, [])

    const columns = [
 

        { title: 'offeringID', field: 'offeringID'},
    
        {
            title: 'status', field: 'status', render: row => <u style={{
                backgroundColor: row.status == "1" ? "#7986CB":row.status == "2" ? "#4CAF50":row.status == "4" ? "#F44336":"#FFFFFF",
                color: '#fff',
                padding: '2px 10px'
            }}>{row.status == "1"?"idle" : row.status == "2"?"Normal":row.status=="4"?"suspend":"NULL"}</u>
        },
        { title: 'effectiveTime', field: 'effectiveTime' , minWidth: 180, render: row => row?.effectiveTime.toString().substr(0, 4) + '-' + row?.effectiveTime.toString().substr(4, 2) + '-' + row?.effectiveTime.toString().substr(6, 2) + ' ' + row?.effectiveTime.toString().substr(8, 2) + ':' + row?.effectiveTime.toString().substr(10, 2) + ':' + row?.effectiveTime.toString().substr(12, 2)},
        { title: 'expirationTime', field: 'expirationTime' , minWidth: 180, render: row => row?.expirationTime.toString().substr(0, 4) + '-' + row?.expirationTime.toString().substr(4, 2) + '-' + row?.expirationTime.toString().substr(6, 2) + ' ' + row?.expirationTime.toString().substr(8, 2) + ':' + row?.expirationTime.toString().substr(10, 2) + ':' + row?.expirationTime.toString().substr(12, 2)}

    ]
    function ShowData() {
        return (
            <>
                <MyTable tTitle={"ProductOffering"} tData={data} tColumns={columns} />
            </>
        )
    }
    return (
        <>
            {!stop ? <LoadingTable /> : <ShowData />}
        </>
    )
}

export default ProductOffering
