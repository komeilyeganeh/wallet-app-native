export default ({ config }) => ({
  ...config,
  name: "wallet-app",
  owner: "kml00",
  slug: "wallet-app",
  extra: {
    ...config.extra,
    enableHttp: true,
    EXPO_PUBLIC_API_BASE_URL: process.env.EXPO_PUBLIC_API_BASE_URL,
    eas: {
      projectId: "1a87c17b-8f19-4ce9-b678-9d841b4c8ace",
    },
  },
  android: {
    ...config.android,
    package: "com.kml00.walletapp",
    permissions: ["INTERNET"],
    usesCleartextTraffic: true
  },
});
