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

  return [data, setData];
}
