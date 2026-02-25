import React from 'react'
import MaterialTable from 'material-table'
import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { AxiosElastic } from '../../../../../../Components/Axios'
import moment from 'moment'

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

function BorrowTableNew() {
    const tableRef = React.useRef()
    const columns = [
        { title: 'No', field: 'id_idx', maxWidth: 50, paging: false },
        { title: 'BorrowID', field: 'borrowId' },
        { title: 'MSISDN', field: 'msisdn' },
        { title: 'ເວລາຢືມ', field: 'date_buy', minWidth: 200 },
        { title: 'ຈຳນວນຢືມ ຫຼື Package', field: 'counterName', render: row => row.counterName !== null ? row.counterName : (row.borrowAmount > 0 ? row.borrowAmount.toLocaleString() : row.borrowAmount) },
        { title: 'ຕ້ອງຈ່າຍຄືນ', field: 'amount', type: 'numeric', render: row => row.amount > 0 ? row.amount.toLocaleString() : row.amount },
        { title: 'ປະເພດ', field: 'borrowType' },
        { title: 'ຂໍ້ຄວາມ', field: 'resultDesc', minWidth: 400 },
        {
            title: 'ສະຖານະ', field: 'resultCode', render: row => Number(row.resultCode) === 200 ?
                <div className='premium-status-badge status-success center'>Success</div> :
                <div className='premium-status-badge status-error center'>Error</div>
        },
    ]

    return (
        <MaterialTable
            title="Borrow"
            icons={tableIcons}
            columns={columns}
            tableRef={tableRef}
            data={query =>
                new Promise((resolve, reject) => {
                    var phone = localStorage.getItem("ONE_PHONE")
                    var sendData = {
                        "from": query.page * query.pageSize,
                        "size": query.pageSize,
                        "query": {
                            "match": {
                                "Msisdn": phone
                            }
                        },
                        "sort": [
                            { "CreateAt": { "order": "desc" } }
                        ]
                    }
                    AxiosElastic.post("borrow-log*/_search", sendData).then(res => {
                        if (res.status === 200) {
                            var num = query.page * query.pageSize
                            var update = res.data.hits.hits.map(row => {
                                var source = row._source
                                num = num + 1
                                return {
                                    id_idx: num,
                                    borrowId: source.TransectionId,
                                    msisdn: source.Msisdn,
                                    date_buy: moment(source.CreateAt).format("DD-MM-YYYY HH:mm:ss"),
                                    date_pay: "-",
                                    userId: "-",
                                    borrowType: source.ProductType,
                                    borrowAmount: source.Amount,
                                    persentAmount: source.Debit - source.Amount,
                                    amount: source.Debit,
                                    paid: 0,
                                    resultDesc: source.ResultDesc,
                                    resultCode: source.ResultCode,
                                    counterName: source.Countername
                                }
                            })
                            resolve({
                                data: update,
                                page: query.page,
                                totalCount: res.data.hits.total.value,
                            })
                        } else {
                            resolve({
                                data: [],
                                page: 0,
                                totalCount: 0,
                            })
                        }
                    }).catch(err => {
                        resolve({
                            data: [],
                            page: 0,
                            totalCount: 0,
                        })
                    })
                })
            }
            options={{
                sorting: false,
                exportButton: true,
                pageSize: 10,
                search: false,
                pageSizeOptions: [10, 25, 50],
                columnsButton: true,
            }}
        />
    )
}

export default BorrowTableNew
