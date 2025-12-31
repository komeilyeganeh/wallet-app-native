import { ScrollView, View } from "react-native";
import Languages from "./_components";
import styles from "./Language.styles";
import HeaderWrapper from "@/components/headerWrapper";
import Container from "@/components/common/container";

const LanguagesScreen = () => {
  // *** jsx ****
  return (
    <Container withWrapper>
      <HeaderWrapper title="Language" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Languages />
      </ScrollView>
    </Container>
  );
};

export default LanguagesScreen;
