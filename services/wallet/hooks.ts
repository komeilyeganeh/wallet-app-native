import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteWallet,
  getMyWallets,
  getWallet,
  newWallet,
  updateWallet,
} from "./actions";

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
    queryKey: ["get_wallet", id], // id باید در queryKey باشد
    queryFn: () => {
      if (!id) throw new Error("Wallet ID is required");
      return getWallet(id);
    },
    enabled: !!id,
    staleTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    refetchIntervalInBackground: false,
    retry: 1,
  });
};

// ---- hook delete wallet ----
export const useDeleteWallet = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete_wallet", id],
    mutationFn: deleteWallet,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["get_wallets"],
        refetchType: "all",
      });
      queryClient.invalidateQueries({ queryKey: ["wallet"] });
      queryClient.removeQueries({ queryKey: ["get_wallet", id] });
    },
    onError: (error, variables) => {
      console.error(`Error deleting wallet ${variables}:`, error);
    },
  });
};

// ---- hook update wallet ----
export const useUpdateWallet = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update_wallet", id],
    mutationFn: (updateData: {
      bankName?: string;
      cardNumber?: string;
      balance?: number;
      accountHolderName?: string;
      currencyId?: number;
      iban?: string;
      userId?: number;
    }) =>
      updateWallet({
        id: parseInt(id),
        ...updateData,
      }),
     onSuccess: (responseData) => {
      if (responseData?.data?.data) {
        queryClient.setQueryData(["get_wallet", id], responseData);
      }
      queryClient.invalidateQueries({ 
        queryKey: ["get_wallets"],
        refetchType: "active"
      });
      setTimeout(() => {
        queryClient.invalidateQueries({
          queryKey: ["get_wallet", id],
          refetchType: "active"
        });
      }, 100);
    },
    onError: (error) => {
      console.error(`Error updating wallet ${id}:`, error.message);
    },
  });
};
