export type RegisterFormType = {
    name: string;
    phoneNumber: string;
    password: string;
}
export type LoginFormType = {
    phoneNumber: string;
    password: string;
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