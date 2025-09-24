import { clientAxios } from "@/lib/http"

export const SignUpFirstStep = async (data: any) => {
    const res = await clientAxios.post("/Security/RegisterFirstStep", data);
    return res.data;
}

export const SignUpLastStep = async (data: any) => {
    const res = await clientAxios.post("/Security/RegisterLastStep", data);
    return res;
}