import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { deleteWallet, getMyWallets, getWallet, newWallet } from "./actions";

const queryClient = new QueryClient();

export const useGetMyWallets = (userId?: string | null) => {
  return useQuery({
    queryKey: ["get_wallets", userId],
    queryFn: () => {
      const filters = userId
        ? {
            filters: [
              {
                property: "userId",
                operation: 5,
                values: [userId],
              },
            ],
            orderBy: "",
            includeProperies: "",
          }
        : undefined;

      return getMyWallets(filters);
    },
    enabled: !!userId,
  });
};

// ---- new wallet hook ----
export const useNewWallet = () => {
  return useMutation({
    mutationKey: ["create_wallet"],
    mutationFn: newWallet,
  });
};

// ---- hook receiving wallet ----
export const useGetWallet = (id: string) => {
  return useQuery({
    queryKey: ["get_wallet", id],
    queryFn: () => {
      if (!id) throw new Error("Wallet ID is required");
      return getWallet(id);
    },
    enabled: !!id,
  });
};

// ---- hook delete wallet ----
export const useDeleteWallet = (id: string) => {
  return useMutation({
    mutationKey: ["delete_wallet", id],
    mutationFn: deleteWallet,
    onSuccess: (data, variables) => {
      queryClient.removeQueries({ queryKey: ["wallet", variables] });
      queryClient.invalidateQueries({ queryKey: ["get_wallets"] });
    },
    onError: (error, variables) => {
      console.error(`Error deleting wallet ${variables}:`, error);
    },
  });
};
