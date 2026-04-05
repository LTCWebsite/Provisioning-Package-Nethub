import React, { useState, useEffect, forwardRef } from 'react';
import MaterialTable from 'material-table';
import { AxiosReq, AxiosReq3 } from '../../../../Components/Axios';
import cookie from 'js-cookie';
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
import { toast_error, toast_success } from '../../../../Components/Toast';

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

export default function CrudTable({ title, endpoint, columns, idField = "id", axiosInstance = AxiosReq3, refresh, actions = [], disableInlineEdit = false }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(endpoint, {
        headers: { Authorization: "Bearer " + cookie.get("ONE_TOKEN") },
      });
      if (res.status === 200) {
        // Handle cases where response is directly an array or inside a data property
        if (Array.isArray(res.data)) {
          setData(res.data);
        } else if (res.data && Array.isArray(res.data.data)) {
          setData(res.data.data);
        } else {
          setData([]);
        }
      }
    } catch (er) {
      console.log(er);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [endpoint, refresh]);

  const handleCreate = async (newData) => {
    try {
      const res = await axiosInstance.post(endpoint, newData, {
        headers: { Authorization: "Bearer " + cookie.get("ONE_TOKEN") },
      });
      if (res.status === 200 || res.status === 201) {
        toast_success({ text: "ບັນທຶກສຳເລັດ" });
        fetchData();
      }
    } catch (er) {
      toast_error({ text: "ເກີດຂໍ້ຜິດພາດ: " + er.message });
    }
  };

  const handleUpdate = async (newData, oldData) => {
    try {
      const id = oldData[idField];
      const updateEndpoint = id ? `${endpoint}/${id}` : endpoint;
      const res = await axiosInstance.put(updateEndpoint, newData, {
        headers: { Authorization: "Bearer " + cookie.get("ONE_TOKEN") },
      });
      if (res.status === 200) {
        toast_success({ text: "ແກ້ໄຂສຳເລັດ" });
        fetchData();
      }
    } catch (er) {
      toast_error({ text: "ເກີດຂໍ້ຜິດພາດ: " + er.message });
    }
  };

  const handleDelete = async (oldData) => {
    try {
      const id = oldData[idField];
      const deleteEndpoint = id ? `${endpoint}/${id}` : `${endpoint}`;

      const res = await axiosInstance.delete(deleteEndpoint, {
        headers: { Authorization: "Bearer " + cookie.get("ONE_TOKEN") },
        data: oldData // In case API expects body for delete
      });
      if (res.status === 200) {
        toast_success({ text: "ລົບສຳເລັດ" });
        fetchData();
      }
    } catch (er) {
      toast_error({ text: "ເກີດຂໍ້ຜິດພາດ: " + er.message });
    }
  };

  return (
    <MaterialTable
      title={title}
      icons={tableIcons}
      columns={columns}
      data={data}
      isLoading={loading}
      options={{
        sorting: true,
        exportButton: true,
        pageSize: 10,
        pageSizeOptions: [10, 20, 50],
        actionsColumnIndex: -1
      }}
      actions={actions}
      editable={{
        onRowAdd: (newData) => handleCreate(newData),
        ...(disableInlineEdit ? {} : { onRowUpdate: (newData, oldData) => handleUpdate(newData, oldData) }),
        onRowDelete: (oldData) => handleDelete(oldData),
      }}
    />
  );
}
