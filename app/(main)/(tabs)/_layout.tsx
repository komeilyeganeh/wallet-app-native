import { lazy, Suspense } from "react";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View } from "react-native";
import { SkypeIndicator } from "react-native-indicators"

const Tab = createBottomTabNavigator();

const createLazyScreen = (importFunc: any) => {
  const LazyComponent = lazy(importFunc);

  return (props: any) => (
    <Suspense
      fallback={
        <SkypeIndicator color="#0000ff" size={40}/>
      }
    >
      <LazyComponent {...props} />
    </Suspense>
  );
};
const HomeScreen = createLazyScreen(() => import("@/app/(main)/(tabs)/home"));
const SearchScreen = createLazyScreen(
  () => import("@/app/(main)/(tabs)/search")
);
const MessagesScreen = createLazyScreen(
  () => import("@/app/(main)/(tabs)/message")
);
const SettingsScreen = createLazyScreen(
  () => import("@/app/(main)/(tabs)/setting")
);

export default function TabLayout() {
  // **** jsx ****
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          height: 60,
          paddingHorizontal: 20,
          paddingTop: 10,
          borderTopWidth: 0,
          boxShadow: "0 -5px 30px #291c9d1a",
        },
        tabBarIconStyle: {
          width: "auto",
        },
        headerShown: false,
        tabBarIcon: ({ focused }) => {
          let iconName: any;

          if (route.name === "home") {
            iconName = "home-outline";
          } else if (route.name === "search") {
            iconName = "search-outline";
          } else if (route.name === "message") {
            iconName = "mail-outline";
          } else if (route.name === "setting") {
            iconName = "settings-outline";
          }

          return (
            <View
              style={[
                styles.tabWrapper,
                {
                  backgroundColor: focused ? "#3629B7" : "#FFF",
                  width: focused ? 99 : "auto",
                },
              ]}
            >
              <Ionicons
                name={iconName}
                size={20}
                color={focused ? "#FFF" : "#898989"}
              />
              {focused && (
                <View style={styles.tabItemWrapper}>
                  <Text
                    style={{
                      color: "#FFF",
                      fontSize: 12,
                      textTransform: "capitalize",
                    }}
                  >
                    {route.name}
                  </Text>
                </View>
              )}
            </View>
          );
        },
        tabBarLabel: () => null,
      })}
    >
      <Tab.Screen name="home" component={HomeScreen} />
      <Tab.Screen name="search" component={SearchScreen} />
      <Tab.Screen name="message" component={MessagesScreen} />
      <Tab.Screen name="setting" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabWrapper: {
    height: 36,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
    paddingHorizontal: 12
  },
  tabItemWrapper: {
    padding: 5,
    borderRadius: 12,
  },
});
