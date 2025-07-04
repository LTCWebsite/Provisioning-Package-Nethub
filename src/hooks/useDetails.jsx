import { useEffect, useState } from "react";
import { AxiosSpecialRedeem } from "../Components/Axios";

const useDetails = () => {
  const [details, setDetails] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await AxiosSpecialRedeem("rewards/details");
        const items = response.data.data;
        setDetails(items);
      } catch (error) {
        console.error("Error fetching details:", error);
      }
    };
    fetchDetails();
  }, []);

  return details;
};

export default useDetails;
