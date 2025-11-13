import { clientAxios } from "@/lib/http";

export const getMyWallets = async (filters: any) => {
  const defaultFilters = {
    filters: [
      {
        property: "userId",
        operation: 1,
        values: [],
      },
    ],
    orderBy: "",
    includeProperies: "",
  };

  const finalFilters = filters || defaultFilters;

  const res = await clientAxios.post("/Wallet/Filter", finalFilters);
  return res;
};
