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
import { Grid, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'


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

function PanelTable({ Title, Columns, Data }) {
    return (
        <>
            <MaterialTable
                title={Title}
                icons={tableIcons}
                columns={Columns}
                data={Data}
                options={{
                    sorting: true,
                    exportButton: true,
                    pageSize: Data.length >= 10 ? 10 : Data.length < 5 ? 5 : Data.length,
                    pageSizeOptions: Data.length <= 5 ? [5] :
                        Data.length <= 10 ? [5, Data.length] :
                            Data.length <= 25 ? [10, Data.length] :
                                Data.length <= 50 ? [10, 25, Data.length] : [10, 25, 50, 100],
                    columnsButton: true,
                }}
                detailPanel={rows => {
                    let panel = rows.amfCounterEntry
                    if (panel.length > 0) {
                        return (
                            <Table className='my-table'>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>CounterId</TableCell>
                                        <TableCell>ReplenishValue</TableCell>
                                        
                                        <TableCell>CounterValue</TableCell>
                                        <TableCell>Priority</TableCell>
                                        <TableCell>Reserve</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {panel.map((row, idx) => {
                                        return (
                                            <TableRow key={idx}>
                                                <TableCell>{row.counterId}</TableCell>
                                                <TableCell>{parseInt(row.replenishValue).toLocaleString()}</TableCell>
                                                <TableCell>{parseInt(row.counterValue).toLocaleString()}</TableCell>
                                                <TableCell>{row.priority}</TableCell>
                                                <TableCell>{row.amfReserve}</TableCell>
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        )
                    }
                }}
            />
        </>
    )
}
export default PanelTable