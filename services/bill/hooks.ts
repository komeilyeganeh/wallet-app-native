import { useMutation, useQuery } from "@tanstack/react-query";
import { getMyBillPayments, inquireBill, payBill } from "./actions";

export const useInquireBill = () => {
  return useMutation({
    mutationKey: ["inquire_bill"],
    mutationFn: inquireBill,
  });
};

export const usePayBill = () => {
  return useMutation({
    mutationKey: ["pay_bill"],
    mutationFn: payBill,
  });
};

export const useGetBillPayments = () => {
  return useQuery({
    queryKey: ["get_bill_payments"],
    queryFn: getMyBillPayments,
  });
};
