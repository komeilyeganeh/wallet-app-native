export const cardNumberFormat = (cardNumber: string) => {
  if (!cardNumber) return "---- ---- ---- ----";
  const firstFourDigits = cardNumber?.slice(0, 4);
  const lastFourDigits = cardNumber?.slice(-4);
  return `${firstFourDigits} **** **** ${lastFourDigits}`;
};
