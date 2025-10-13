import { FC, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Link } from "expo-router";
import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import { useLogOut } from "@/lib/hooks/useLogOut";
import Profile from "@/components/profile";

const SettingScreen: FC = () => {
  const [isEnabled, setIsEnabled] = useState(true);
  const { logOut } = useLogOut();
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  // **** jsx ****
  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <Link href="..">
          <AntDesign name="left" color="#FFF" size={20} />
        </Link>
        <Text style={styles.headerTitle}>Setting</Text>
      </View>
      <View style={styles.contentWrapper}>
        <Profile style={{ transform: "translateY(-70px)" }} />

        {/* links */}
        <View style={styles.links}>
          <Link href="/(main)/(screens)/settings/ChangePass/ChangePassScreen">
            <View style={styles.linkItem}>
              <Text>Password</Text>
              <AntDesign name="right" color="#DCDCDC" size={16} />
            </View>
          </Link>
          <View style={styles.linkItem}>
            <Text onPress={toggleSwitch}>Touch ID</Text>
            <Switch
              trackColor={{ false: "#ddd", true: "#3629B7" }}
              thumbColor={isEnabled ? "#FFF" : "#999"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
          <Link href="/(main)/(screens)/settings/Language/LanguageScreen">
            <View style={styles.linkItem}>
              <Text>Languages</Text>
              <AntDesign name="right" color="#DCDCDC" size={16} />
            </View>
          </Link>
          <Link href="/(main)/(screens)/settings/AppInfo/AppInfoScreen">
            <View style={styles.linkItem}>
              <Text>App information</Text>
              <AntDesign name="right" color="#DCDCDC" size={16} />
            </View>
          </Link>
          <View style={styles.linkItem}>
            <Text>Customer care</Text>
            <Text
              style={{ color: "#979797", fontWeight: "bold", fontSize: 12 }}
            >
              19008989
            </Text>
          </View>
          <TouchableOpacity onPress={logOut}>
            <Text style={{ color: "red" }}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3629B7",
  },
  headerWrapper: {
    height: 110,
    paddingTop: 8,
    paddingHorizontal: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    columnGap: 20,
  },
  contentWrapper: {
    backgroundColor: "#FFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flex: 1,
    padding: 24,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF",
  },
  links: {
    display: "flex",
    rowGap: 16,
    transform: "translateY(-32px)",
  },
  linkItem: {
    width: "100%",
    height: 43,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ECECEC",
  },
});

export default SettingScreen;
