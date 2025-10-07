export type TransactionType = {
  destinationWallet: {
    id: number;
    userId: number;
    currencyId: number;
    balance: number;
    accountHolderName: string;
    iban: string;
    cardNumber: string;
    bankName: string;
  };
  sourceWallet: {
    id: number;
    userId: number;
    currencyId: number;
    balance: number;
    accountHolderName: string;
    iban: string;
    cardNumber: string;
    bankName: string;
  };
  id: number;
  sourceWalletId: number;
  destinationWalletId: number;
  amount: number;
  currencyCode: string;
  type: number;
  status: number;
  exchangeRate: any;
  timestamp: string;
};
