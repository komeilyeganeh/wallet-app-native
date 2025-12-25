import { useMutation, useQuery } from "@tanstack/react-query";
import {
  isTwoFactorEnabled,
  disableTwoFactor,
  enableTwoFactor,
  setupTwoFactor,
  verifyTwoFactor,
  completeLoginWith2FA,
} from "./actions";

export const useIsTwoFactorEnabled = () => {
  return useQuery({
    queryKey: ["is_enabled_2FA"],
    queryFn: isTwoFactorEnabled,
  });
};

export const useDisableTwoFactor = () => {
  return useMutation({
    mutationKey: ["disable_two_factor"],
    mutationFn: disableTwoFactor,
  });
};

export const useEnableTwoFactor = () => {
  return useMutation({
    mutationKey: ["enable_two_factor"],
    mutationFn: enableTwoFactor,
  });
};

export const useSetupTwoFactor = () => {
  return useMutation({
    mutationKey: ["setup_two_factor"],
    mutationFn: setupTwoFactor,
  });
};

export const useVerifyTwoFactor = () => {
    return useMutation({
        mutationKey: ["verify_two_factor"],
        mutationFn: verifyTwoFactor
    })
}

export const useCompleteLoginWith2FA = () => {
  return useMutation({
    mutationKey: ["complete_login_2fa"],
    mutationFn: completeLoginWith2FA
  })
}