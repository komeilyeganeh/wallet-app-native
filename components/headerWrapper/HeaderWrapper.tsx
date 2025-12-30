import { HeaderWrapperPropsType } from "@/types/components/headerWrapper";
import { AntDesign } from "@expo/vector-icons";
import { Link } from "expo-router";
import { FC } from "react";
import { Text, View } from "react-native";
import styles from "./HeaderWrapper.styles";

const HeaderWrapper: FC<HeaderWrapperPropsType> = ({
  href = "..",
  title,
  icon,
}) => {
  // **** jsx ****
  return (
    <View style={styles.headerWrapper}>
      <View style={styles.headerLeft}>
        <Link href={href}>
          <AntDesign name="left" color="#343434" size={20} />
        </Link>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
      {icon && icon}
    </View>
  );
};

export default HeaderWrapper;
