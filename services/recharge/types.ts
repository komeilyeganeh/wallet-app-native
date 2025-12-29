export interface IMobileRecharge {
  walletId: number;
  operator: string;
  phoneNumber: string;
  amount: number;
  description?: string;
}
