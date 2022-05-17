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
import Axios from '../../../Pages/Components/Axios'


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

function MuiTable({ Title, Columns, URL, SL, method, sendData }) {
    React.useEffect(() => {
        tableref.current.onQueryChange()
    }, [SL])
    const tableref = React.useRef()
    return (
        <>
            <MaterialTable
                title={Title}
                icons={tableIcons}
                columns={Columns}
                tableRef={tableref}
                data={query =>
                    new Promise((resolve, reject) => {
                        if (method === 'get') {
                            // Axios.get(URL + "?limit=" + query.pageSize + "&page=" + (query.page + 1) + '&offset=' + query.pageSize * query.page + sort + search + role).then(res => {
                            //     if (res.status === 200) {
                            //         resolve({
                            //             data: res.data.data,
                            //             page: res.data.page - 1,
                            //             totalCount: res.data.total,
                            //         })
                            //     } else {
                            //         resolve()
                            //     }
                            // }).catch(err => {
                            //     resolve()
                            // })
                        } else {
                            Axios.post(URL, sendData).then(res => {
                                if (res.status === 200) {
                                    // console.log(res.data)
                                    if(res.data.length === undefined){
                                        resolve({
                                            data: [],
                                            page: 0,
                                            totalCount: 10,
                                        })
                                    }else{
                                        let num = parseInt(sendData.begin) + 1
                                        var update = res.data.map((row, idx) => {
                                            row.id_idx = (idx + 1) * num
                                            return row
                                        })
                                        resolve({
                                            data: update,
                                            page: parseInt(sendData.begin),
                                            totalCount: 100,
                                        })
                                    }
                                }
                            }).catch(err => {
                                resolve()
                            })
                        }

                    })
                }
                options={{
                    sorting: true,
                    exportButton: true,
                    pageSize: 10,
                    pageSizeOptions: [10],
                    columnsButton: true,
                }}
            />
        </>
    )
}
export default MuiTable