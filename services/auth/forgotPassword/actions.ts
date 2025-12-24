import { clientAxios } from "@/lib/http"
import { IForgotPasswordRequest, IResetPassword } from "./types"

export const forgotPasswordRequest = async (data: IForgotPasswordRequest) => {
    const res = await clientAxios.post("/Security/ForgotPasswordRequest", data);
    return res;
}

export const resetPassword = async (data: IResetPassword) => {
    const res = await clientAxios.post("/Security/ResetPassword", data);
    return res;
} 