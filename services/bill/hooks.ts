import { useMutation } from "@tanstack/react-query";
import { inquireBill, payBill } from "./actions";

export const useInquireBill = () => {
  return useMutation({
    mutationKey: ["inquire_bill"],
    mutationFn: inquireBill,
  });
};

export const usePayBill = () => {
  return useMutation({
    mutationKey: ["pay_bill"],
    mutationFn: payBill
  })
}