import { HeaderWrapperPropsType } from "@/types/components/headerWrapper";
import { AntDesign } from "@expo/vector-icons";
import { Link } from "expo-router";
import { FC } from "react";
import { Text, View } from "react-native";
import styles from "./HeaderWrapper.styles";

const HeaderWrapper: FC<HeaderWrapperPropsType> = ({ href = "..", title }) => {
  // **** jsx ****
  return (
    <View style={styles.headerWrapper}>
      <Link href={href}>
        <AntDesign name="left" color="#343434" size={20} />
      </Link>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
};

export default HeaderWrapper;
