export default ({ config }) => ({
  ...config,
  name: "wallet-app",
  owner: "kml123",
  slug: "wallet-app",
  extra: {
    ...config.extra,
    EXPO_PUBLIC_API_BASE_URL: process.env.EXPO_PUBLIC_API_BASE_URL,
    eas: {
      projectId: "a2675b8d-7328-4bd4-858c-fa358af2260a",
    },
  },
  android: {
    ...config.android,
    package: "com.kml123.walletapp",
  },
});
