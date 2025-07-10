import { useState } from "react";
import { AxiosSpecialRedeem } from "../Components/Axios";
import { AlertError, AlertSuccess } from "../Components/Toast";

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
      AlertSuccess({ text: "Redeem successful!" });
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong.");
      AlertError(err.response?.data?.error || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return { redeemCode, data, loading, error };
}

export default useRedeem;
