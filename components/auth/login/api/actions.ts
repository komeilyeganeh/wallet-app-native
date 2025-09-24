import { clientAxios } from "@/lib/http"

export const LoginReq = async (data: any) => {
    const res = await clientAxios.post("/Security/LoginRequest", data);
    return res;
}

export const Login = async (data: any) => {
    const res = await clientAxios.post("/Security/Login", data);
    return res;
}