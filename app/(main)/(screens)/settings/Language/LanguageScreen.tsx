import {
  ScrollView,
  View,
} from "react-native";
import Languages from "./_components";
import styles from "./Language.styles";
import HeaderWrapper from "@/components/headerWrapper";


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
