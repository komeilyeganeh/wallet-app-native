export interface IEnableTwoFactor {
    enable: boolean;
    phoneNumber: string;
}

export interface IVerifyTwoFactor {
    code: string;
    backupCode?: string;
}