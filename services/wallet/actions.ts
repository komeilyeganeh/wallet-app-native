import { clientAxios } from "@/lib/http";
import { INewWallet } from "./types";

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

// ---- create new wallet ----
export const newWallet = async (data: INewWallet) => {
  const res = await clientAxios.post("/Wallet/Create", data);
  return res;
}

// ---- receive a wallet ----
export const getWallet = async (id: string) => {  
  const res = await clientAxios.get(`/Wallet/GetById/${id}`);
  return res;
}

// ---- delete a wallet ----
export const deleteWallet = async (id: string) => {
  const res = await clientAxios.delete(`/Wallet/Delete/${id}`);
  return res;
}
