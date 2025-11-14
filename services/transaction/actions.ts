import { clientAxios } from "@/lib/http"

export const getTransactions = async (filters?: any) => {
  const defaultFilters = {
    filters: [],
    orderBy: "timestamp DESC",
    includeProperies: ""
  };

  const finalFilters = filters || defaultFilters;
  const res = await clientAxios.post("/Transaction/Filter", finalFilters);
  return res;
};