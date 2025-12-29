import { clientAxios } from "@/lib/http"
import { IInquireBill, IPayBill } from "./types";

export const inquireBill = async (data: IInquireBill) => {    
    const res = await clientAxios.post("/BillPayment/InquireBill/Inquire", data);
    return res;
}

export const payBill = async (data: IPayBill) => {
    const res = await clientAxios.post("/BillPayment/PayBill", data);
    return res;
}