import { clientAxios } from "@/lib/http"
import { IEnableTwoFactor, IVerifyTwoFactor } from "./types";

export const isTwoFactorEnabled = async () => {
    const res = await clientAxios.get("/Security/IsTwoFactorEnabled");
    return res;
}

export const disableTwoFactor = async () => {
    const res = await clientAxios.post("/Security/DisableTwoFactor");
    return res;
}

export const enableTwoFactor = async (data: IEnableTwoFactor) => {
    const res = await clientAxios.post("/Security/EnableTwoFactor", data);
    return res;
}

export const completeLoginWith2FA = async (data: any) => {
    const res = await clientAxios.post("/Security/CompleteLoginWith2FA", data);
    return res;
}

export const setupTwoFactor = async () => {
    const res = await clientAxios.post("/Security/SetupTwoFactor");    
    return res;
}

export const verifyTwoFactor = async (data: IVerifyTwoFactor) => {
    const res = await clientAxios.post("/Security/VerifyTwoFactor", data);
    console.log(res?.data);
    
    return res;
}