import { forwardRef } from 'react';
import MaterialTable from 'material-table'
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


function MyTable({ tTitle: title, tColumns: columns, tData: data }) {
  const checkRows = (myLength) => {
    var length = myLength
    var result = []
    if (length <= 5) {
      result = [5]
    } else if (length <= 10) {
      result = [10]
    } else if (length <= 25) {
      result = [10, 25]
    } else if (length <= 50) {
      result = [10, 25, 50]
    } else if (length <= 100) {
      result = [10, 25, 50, 100]
    }
    return result
  }
  return (
    <MaterialTable
      title={title}
      icons={tableIcons}
      columns={columns}
      data={data}
      onPageChange={true}
      options={{
        sorting: true,
        exportButton: true,
        pageSize: data.length >= 10 ? 10 : data.length < 5 ? 5 : data.length,
        pageSizeOptions:
          data.length <= 5 ? [5] :
            data.length <= 10 ? [5, data.length] :
              data.length <= 25 ? [10, data.length] :
                data.length <= 50 ? [10, 25, data.length] : [10, 25, 50, 100],
        columnsButton: true,
        rowStyle: row =>
          row.all_status ? {
            backgroundColor: '#ffddd2'
          } : {}
      }}
    />
  )
}
export default MyTable
