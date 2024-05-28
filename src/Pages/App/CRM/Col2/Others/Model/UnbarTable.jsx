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


const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} style={{ fontSize: 20, color: 'grey' }} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} style={{ fontSize: 20, color: 'grey' }} />),
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

function UnbarTable({ data, loading }) {
    const tableref = React.useRef()
    const columns = [
        { title: 'transection', field: 'messageseq_' },
        { title: 'ເບີໂທ', field: 'msisdn_' },
        { title: 'ເວລາ', field: 'create_date' },
        { title: 'ສະຖານະເກົ່າ', field: 'statusold_' },
        { title: 'ສະຖານະໃໝ່', field: 'statusnew_' },
        { title: 'ລາຍລະອຽດ', field: 'resultdesc_' },
        // { title: 'OrderType', field: 'order_type' },
    ]
    return (
        <>
            <MaterialTable
                title={"Query Unbar"}
                icons={tableIcons}
                columns={columns}
                tableRef={tableref}
                isLoading={loading}
                data={data}
                options={{
                    sorting: false,
                    exportButton: true,
                    pageSize: 10,
                    search: false,
                    pageSizeOptions: [10, 25, 50],
                    columnsButton: true,
                }}
            />
        </>
    )
}
export default UnbarTable