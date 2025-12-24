import { useMutation } from "@tanstack/react-query";
import { changePAssword } from "./actions";

export const useChangePassword = () => {
  return useMutation({
    mutationKey: ["change_password"],
    mutationFn: changePAssword,
  });
};
