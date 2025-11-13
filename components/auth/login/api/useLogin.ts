import { useMutation } from "@tanstack/react-query";
import { Login, LoginReq } from "./actions";

export const useLoginReq = () => {
  return useMutation({
    mutationFn: LoginReq,
  });
};

export const useLogin = () => {  
  return useMutation({
    mutationFn: Login,
  });
};
