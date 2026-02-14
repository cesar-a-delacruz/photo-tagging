import requestHandler from "@/utils/requestHandler";
import { useEffect, useState } from "react";

export default function useGetData(endpoint = "") {
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      const responseData = await requestHandler.get(endpoint);
      setData(responseData);
    })();
  }, []);

  const setRelatedData = (relatedField, newRelatedData) => {
    if (!Array.isArray(data))
      setData({ ...data, [relatedField]: newRelatedData });
  };

  return [data, setData, setRelatedData];
}
