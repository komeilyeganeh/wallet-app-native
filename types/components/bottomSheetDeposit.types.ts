import BottomSheet from "@gorhom/bottom-sheet";
import { RefObject } from "react";

export interface IBottomSheetDeposit {
    bottomSheetRef: RefObject<BottomSheet | null>;
    selectedWallet: any;
    handleSheetChanges: (index: number) => void;
    renderBackdrop: (props: any) => React.JSX.Element;
    handleCloseDepositSheet: () => void;
    onSubmit: (data: any) => void;
    isDepositing: boolean;
}