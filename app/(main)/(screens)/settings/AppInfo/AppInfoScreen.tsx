import { Text, View } from "react-native";
import styles from "./AppInfo.styles";
import HeaderWrapper from "@/components/headerWrapper";
import Container from "@/components/common/container";


const AppInfoScreen = () => {
    // **** jsx ****
  return (
    <Container withWrapper>
        <HeaderWrapper title="App information"/>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>CaBank E-mobile Banking</Text>
        </View>
        <View style={styles.links}>
          <View style={styles.linkItem}>
            <Text style={styles.linkText}>Date of manufacture</Text>
            <Text
              style={{ color: "#3629B7", fontWeight: "bold", fontSize: 16 }}
            >
              Dec 2019
            </Text>
          </View>
          <View style={styles.linkItem}>
            <Text style={styles.linkText}>Version</Text>
            <Text
              style={{ color: "#3629B7", fontWeight: "bold", fontSize: 16 }}
            >
              9.0.2
            </Text>
          </View>
          <View style={styles.linkItem}>
            <Text style={styles.linkText}>Language</Text>
            <Text
              style={{ color: "#3629B7", fontWeight: "bold", fontSize: 16 }}
            >
              English
            </Text>
          </View>
        </View>
    </Container>
  );
};

export default AppInfoScreen;
