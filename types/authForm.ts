export type RegisterFormType = {
  name: string;
  userName: string;
  phoneNumber?: string;
  password: string;
  email?: string;
  family?: string;
  displayCurrencyCode?: string;
};
export type LoginFormType = {
  username: string;
  password: string;
  remember: boolean;
};
export type ForgotFormType = {
  username: string;
};
export type ForgotCodeFormType = {
  otp: string;
  newPassword: string;
  confirmPassword: string;
};
export type ResetPasswordFormType = {
  password: string;
  confirmPassword: string;
};
export type ChangePasswordFormType = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};
