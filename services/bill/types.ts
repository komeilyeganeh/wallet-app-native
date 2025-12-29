export interface IInquireBill {
  billType: string;
  billId: string;
  billNumber: string;
}

export interface IPayBill {
  walletId: number;
  billType: string;
  billId: string;
  billNumber: string;
  amount: number;
  description: string | undefined;
  providerName: string;
}
