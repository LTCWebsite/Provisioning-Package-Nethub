import { useState } from "react";
import { AxiosSpecialRedeem } from "../Components/Axios";

function useRedeem() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const username = localStorage.getItem("USERNAME");

  const redeemCode = async (payload) => {
    setLoading(true);
    setError("");
    const body = { ...payload, username: username };

    try {
      const response = await AxiosSpecialRedeem.post("rewards/redeem", body);
      setData(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return { redeemCode, data, loading, error };
}

export default useRedeem;
