import HeaderWrapper from "@/components/headerWrapper/HeaderWrapper";
import {
  ScrollView,
  View,
} from "react-native";
import styles from "./Language.styles";
import Languages from "./_components";

const LanguagesScreen = () => {
  // *** jsx ****
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <HeaderWrapper title="Language" />
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Languages />
        </ScrollView>
      </View>
    </View>
  );
};

export default LanguagesScreen;
