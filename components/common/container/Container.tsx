import { FC } from "react";
import { View } from "react-native";
import styles from "./Container.styles";
import { IContainer } from "@/types/components/common/container.types";

const Container: FC<IContainer> = ({
  withWrapper = false,
  wrapperStyles,
  containerStyles,
  children,
}) => {
  if (withWrapper) {
    return (
      <View style={[styles.container, containerStyles]}>
        <View style={[styles.wrapper, wrapperStyles]}>{children}</View>
      </View>
    );
  }
  return <View style={[styles.container, containerStyles]}>{children}</View>;
};

export default Container;
