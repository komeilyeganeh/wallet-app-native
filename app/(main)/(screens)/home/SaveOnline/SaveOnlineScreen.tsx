import { Link } from "expo-router";
import { Image, Text, View } from "react-native";
import styles from "./SaveOnline.styles";
import HeaderWrapper from "@/components/headerWrapper";
import Container from "@/components/common/container";

const SaveOnlineScreen = () => {
    // **** jsx ****
  return (
    <Container withWrapper>
        <HeaderWrapper title="Save online" />
        <View style={styles.linksContainer}>
          <Link href="/(main)/(screens)/home/SaveOnline/_step/Form">
            <View style={styles.linkItem}>
              <View style={styles.linkTitleWrapper}>
                <Text style={styles.linkTitle}>Add</Text>
                <Text style={styles.linkSubTitle}>
                  Add new save online accoun
                </Text>
              </View>
              <Image
                source={require("../../../../../assets/images/save-online.webp")}
                style={{ width: 100, height: 78 }}
              />
            </View>
          </Link>
          <Link href="/(main)/(screens)/home/AccountManagement">
            <View style={styles.linkItem}>
              <View style={styles.linkTitleWrapper}>
                <Text style={styles.linkTitle}>Management</Text>
                <Text style={styles.linkSubTitle}>
                  Manage your save online account
                </Text>
              </View>
              <Image
                source={require("../../../../../assets/images/save-online-2.webp")}
                style={{ width: 100, height: 78 }}
              />
            </View>
          </Link>
        </View>
    </Container>
  );
};

export default SaveOnlineScreen;
