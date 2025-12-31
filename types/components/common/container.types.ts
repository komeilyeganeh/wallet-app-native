import { ReactNode } from "react";
import { ViewStyle } from "react-native";

export interface IContainer {
    withWrapper?: boolean;
    wrapperStyles?: ViewStyle;
    containerStyles?: ViewStyle;
    children: ReactNode;
}