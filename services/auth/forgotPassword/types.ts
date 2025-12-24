export interface IForgotPasswordRequest {
    username: string;
    email?: string;
}

export interface IResetPassword {
    token: string;
    otp: string;
    newPassword: string;
    confirmPassword: string;
}