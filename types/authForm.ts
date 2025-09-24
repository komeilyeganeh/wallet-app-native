export type RegisterFormType = {
    name: string;
    userName: string;
    phoneNumber?: string;
    password: string;
    email?: string;
    family?: string;
    displayCurrencyCode?: string;
}
export type LoginFormType = {
    username: string;
    password: string;
    remember: boolean;
}
export type ForgotFormType = {
    phoneNumber: string;
}
export type ForgotCodeFormType = {
    code: string;
}
export type ResetPasswordFormType = {
    password: string;
    confirmPassword: string;
}
export type ChangePasswordFormType = {
    recentPassword: string;
    newPassword: string;
    confirmPassword: string;
}