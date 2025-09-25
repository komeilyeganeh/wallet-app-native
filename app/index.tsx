import { useAuth } from "@/lib/hooks/useAuth";
import { Redirect } from "expo-router";

export default function Index() {
    const { isAuth } = useAuth();

    if (!isAuth) {
        return <Redirect href="/(auth)/login" />
    } else {
        return <Redirect href="/(main)/(tabs)/home" />
    }
}