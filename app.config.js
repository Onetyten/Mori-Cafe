import "dotenv/config"

export default{
  expo: {
    name: "Mori Cafe",
    slug: "Mori-Cafe",
    version: "1.0.0",
    orientation: "default",
    icon: "./assets/images/appIcon.png",
    scheme: "moricafe",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      config: {
        googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY
      },
      supportsTablet: true
    },
    android: {
      config: {
        googleMaps: {
          apiKey: process.env.GOOGLE_MAPS_API_KEY
        }
      },
      adaptiveIcon: {
        backgroundColor: "#395a3f",
        foregroundImage: "./assets/images/appIcon-foreground.png",
        backgroundImage: "./assets/images/appIcon-background.png",
        monochromeImage: "./assets/images/appIcon-monochrome.png"
      },
      permissions: [
        "ACCESS_FINE_LOCATION",
        "ACCESS_COARSE_LOCATION"
      ],
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
      package: "com.onetyten.MoriCafe"
    },
    web: {
      output: "static",
      favicon: "./assets/images/favicon.png"
    },
    splash: {
      image: "./assets/images/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#395a3f"
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#395a3f",
          dark: {
            backgroundColor: "#395a3f"
          }
        }
      ],
      [
        "expo-location",
        {
          locationWhenInUsePermission: "Show current location on map."
        }
      ]
    ],
    experiments: {
      typedRoutes: true,
      reactCompiler: true
    },
    extra: {
      PUBLIC_PAYSTACK_KEY: process.env.PUBLIC_PAYSTACK_KEY,
      router: {},
      eas: {
        projectId: "bf1ca019-d99a-4255-af27-96db95ddb86c"
      }
    }
  }
}
