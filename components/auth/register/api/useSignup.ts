import { useMutation } from "@tanstack/react-query"
import { SignUpFirstStep, SignUpLastStep } from "./actions"

export const useSignUpFirst = () => {
    return useMutation({
        mutationFn: SignUpFirstStep,
    })
}

export const useSignUpLast = () => {
    return useMutation({
        mutationFn: SignUpLastStep
    })
}