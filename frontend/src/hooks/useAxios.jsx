import { useEffect, useState } from "react";
import axios from "axios";
import apiClient from "../services/api-config.js"


const useAxios = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await apiClient.get(url);
        setData(response.data)
        setError(null)
        console.log(response);
      } catch (e) {
        setError(e);
        console.log("Error while fetching " + e);
      }finally{
        setLoading(false)
      }
    }
    
  }, [url]);
  return { data,loading,error};
};

export default useAxios;
