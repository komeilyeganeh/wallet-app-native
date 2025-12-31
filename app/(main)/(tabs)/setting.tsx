import { FC, useState, useEffect, useCallback } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Link, useFocusEffect } from "expo-router";
import {
  Switch,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { useLogOut } from "@/lib/hooks/useLogOut";
import Profile from "@/components/profile";
import styles from "@/assets/styles/tabs/setting.styles";
import { useIsTwoFactorEnabled } from "@/services/auth/twoFactor/hooks";
import Container from "@/components/common/container";

const SettingScreen: FC = () => {
  const { logOut } = useLogOut();
  const { data: twoFactorData, isLoading, refetch } = useIsTwoFactorEnabled();

  const isTwoFactorEnabled = twoFactorData?.data?.data || false;

  useFocusEffect(
    useCallback(() => {
      refetch();
      return () => {};
    }, [refetch])
  );

  // **** jsx ****
  return (
    <Container containerStyles={{backgroundColor: "#3629B7",}}>
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

          <Link href="/(main)/(screens)/settings/TwoFactor" asChild>
            <TouchableOpacity>
              <View style={styles.linkItem}>
                <Text>Two Factor Authentication</Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  {isLoading ? (
                    <ActivityIndicator size="small" color="#3629B7" />
                  ) : (
                    <Text
                      style={{
                        color: isTwoFactorEnabled ? "#4CAF50" : "#ff1414ff",
                        fontSize: 12,
                        marginRight: 8,
                      }}
                    >
                      {isTwoFactorEnabled ? "Enabled" : "Disabled"}
                    </Text>
                  )}
                  <AntDesign name="right" color="#DCDCDC" size={16} />
                </View>
              </View>
            </TouchableOpacity>
          </Link>

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

          <TouchableOpacity onPress={logOut} style={styles.buttonLogout}>
            <Text style={styles.buttonLogoutText}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
};

export default SettingScreen;
