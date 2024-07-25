export default {
  expo: {
    name: "WHAT-todo",
    slug: "tkhwang-whattodo",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/images/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    ios: {
      googleServicesFile: process.env.GOOGLE_SERVICE_INFO_PLIST || "./GoogleService-Info.plist",
      supportsTablet: true,
      bundleIdentifier: "me.tkhwang.whattodo",
      usesAppleSignIn: true
    },
    android: {
      googleServicesFile: process.env.GOOGLE_SERVICES_JSON || "./android/app/google-services.json",
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      package: "me.tkhwang.whattodo"
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png"
    },
    plugins: [
      "expo-router",
      "expo-apple-authentication",
      "expo-localization",
      "expo-font",
      "@react-native-firebase/app",
      "@react-native-firebase/auth"
    ],
    experiments: {
      typedRoutes: true
    },
    extra: {
      router: {
        origin: false
      },
      eas: {
        projectId: "690f3975-9901-447c-90ac-b18b7a7a4c74"
      }
    },
    owner: "tkhwang",
    runtimeVersion: "1.0.0",
    updates: {
      url: "https://u.expo.dev/690f3975-9901-447c-90ac-b18b7a7a4c74"
    }
  }
};
