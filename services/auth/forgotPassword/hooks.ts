import { useMutation } from "@tanstack/react-query"
import { forgotPasswordRequest, resetPassword } from "./actions"

export const useForgotPasswordRequest = () => {
    return useMutation({
        mutationKey: ["forgot_password_request"],
        mutationFn: forgotPasswordRequest
    })
}

export const useResetPassword = () => {
    return useMutation({
        mutationKey: ["reset_password"],
        mutationFn: resetPassword
    })
}