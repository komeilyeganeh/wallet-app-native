import { Redirect } from "expo-router";

export default function Index() {
    const isAuth = false;

    if (!isAuth) {
        return <Redirect href="/(auth)/login" />
    } else {
        return <Redirect href="/(main)/(tabs)/home" />
    }
}