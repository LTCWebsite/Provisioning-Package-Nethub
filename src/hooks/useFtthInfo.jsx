import { useEffect, useState, useCallback } from "react";
import { AxiosFtth, AxiosRerunFtth } from "../Components/Axios";

const useFtthInfo = (networkCode) => {
    const [ftthData, setFtthData] = useState(null);
    const [ftthShow, setFtthShow] = useState(false);
    
    // Rerun list state
    const [rerunRows, setRerunRows] = useState([]);
    const [rerunLoading, setRerunLoading] = useState(false);
    const [rerunError, setRerunError] = useState(null);

    useEffect(() => {
        if (networkCode === 'F') {
            setFtthShow(false);
            AxiosFtth.post("api/ftth", {
                "msisdn": localStorage.getItem("ONE_PHONE"),
                "bussinessCode": "onescreen",
                "transactionId": "ftth1234",
                "username": "APISUPERAPP",
                "password": "sQQF82VgLz8YOqcDrQhrkteKEQdoPlzQAiYqmtbeChwYaF2eqTcdHw/0r+U+lXM4"
            }).then(res => {
                if (res.status === 200) {
                    setFtthData(res.data.customer_info);
                    setFtthShow(true);
                }
            }).catch(er => {
                console.log(er);
            });
        }
    }, [networkCode]);

    const fetchRerunList = useCallback(async () => {
        if (networkCode !== 'F') {
            return;
        }
        setRerunLoading(true);
        setRerunError(null);
        try {
            const phone = localStorage.getItem("ONE_PHONE");
            if (!phone) {
                setRerunError("Cannot find phone number");
                setRerunLoading(false);
                return;
            }
            const roles = JSON.parse(localStorage.getItem("ONE_ROLES") || "[]");
            const responseInfo = await AxiosRerunFtth.post(`/api/ftth-rerun-list`, {
                ftth: phone,
                roles: roles
            });
            let data = responseInfo.data;
            if (data && Array.isArray(data)) {
                setRerunRows(data);
            } else if (data && data.data && Array.isArray(data.data)) {
                setRerunRows(data.data);
            } else if (data && typeof data === 'object' && !Array.isArray(data)) {
                setRerunRows([data]);
            } else {
                setRerunRows([]);
            }
        } catch (err) {
            setRerunError("Error cannot fetch data " + (err.message || "Unknown error"));
        } finally {
            setRerunLoading(false);
        }
    }, [networkCode]);

    return { ftthData, ftthShow, rerunRows, rerunLoading, rerunError, fetchRerunList };
};

export default useFtthInfo;
