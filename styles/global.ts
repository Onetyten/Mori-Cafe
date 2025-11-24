import { StyleSheet } from "react-native";

export const colors = {
  primary: "#588159",
  secondary: "#395a3f",
  light: "#a2b18a",
  brown: "#6f4e37",
  muted: "#a89487",
  background: "#e9d5ca",
  danger: "#FA4032",
  warning:"#f59e0b",
  success: "#22c55e",
};


export const fontFamily = {
    Squada: "Squada_One",
    outfit: "Outfit",
    outfitBlack: "Outfit_Black",
    outfitBold: "Outfit_Bold",
    outfitExtrabold: "Outfit_ExtraBold",
    outfitExtralight: "Outfit_ExtraLight",
    outfitLight: "Outfit_Light",
    outfitMedium: "Outfit_Medium",
    outfitRegular: "Outfit_Regular",
    outfitSemibold: "Outfit_Semibold",
    outfitThin: "Outfit_Thin",
};

export const GlobalStyle = StyleSheet.create({
  h1: { fontSize: 36, lineHeight: 44 },
  h2: { fontSize: 28, lineHeight: 36 },
  button: { fontSize: 24, lineHeight: 30 },
  body: { fontSize: 20, lineHeight: 26 },
  small: { fontSize: 16, lineHeight: 20 },

  squada_h1: { fontFamily: fontFamily.Squada, fontSize: 36, lineHeight: 44 },
  squada_h2: { fontFamily: fontFamily.Squada, fontSize: 28, lineHeight: 36 },
  squada_button: { fontFamily: fontFamily.Squada, fontSize: 24, lineHeight: 30 },
  squada_body: { fontFamily: fontFamily.Squada, fontSize: 18, lineHeight: 22 },
  squada_small: { fontFamily: fontFamily.Squada, fontSize: 16, lineHeight: 20 },
  
  Outfit_Regular_h1: { fontFamily: fontFamily.outfitRegular, fontSize: 36, lineHeight: 44 },
  Outfit_Regular_h2: { fontFamily: fontFamily.outfitRegular, fontSize: 28, lineHeight: 36 },
  Outfit_Regular_button: { fontFamily: fontFamily.outfitRegular, fontSize: 24, lineHeight: 30 },
  Outfit_Regular_body: { fontFamily: fontFamily.outfitRegular, fontSize: 18, lineHeight: 30 },
  Outfit_Regular_small: { fontFamily: fontFamily.outfitRegular, fontSize: 16, lineHeight: 20 },
  
  Outfit_Bold_h1: { fontFamily: fontFamily.outfitBold, fontSize: 36, lineHeight: 44 },
  Outfit_Bold_h2: { fontFamily: fontFamily.outfitBold, fontSize: 28, lineHeight: 36 },
  Outfit_Bold_button: { fontFamily: fontFamily.outfitBold, fontSize: 24, lineHeight: 30 },
  Outfit_Bold_body: { fontFamily: fontFamily.outfitBold, fontSize: 18, lineHeight: 22 },
  Outfit_Bold_small: { fontFamily: fontFamily.outfitBold, fontSize: 16, lineHeight: 20 },

  Outfit_Extrabold_h1: { fontFamily: fontFamily.outfitExtrabold, fontSize: 36, lineHeight: 44 },
  Outfit_Extrabold_h2: { fontFamily: fontFamily.outfitExtrabold, fontSize: 28, lineHeight: 36 },
  Outfit_Extrabold_button: { fontFamily: fontFamily.outfitExtrabold, fontSize: 24, lineHeight: 30 },
  Outfit_Extrabold_body: { fontFamily: fontFamily.outfitExtrabold, fontSize: 18, lineHeight: 22 },
  Outfit_Extrabold_small: { fontFamily: fontFamily.outfitExtrabold, fontSize: 16, lineHeight: 20 },

  Outfit_Black_h1: { fontFamily: fontFamily.outfitBlack, fontSize: 36, lineHeight: 44 },
  Outfit_Black_h2: { fontFamily: fontFamily.outfitBlack, fontSize: 28, lineHeight: 36 },
  Outfit_Black_button: { fontFamily: fontFamily.outfitBlack, fontSize: 24, lineHeight: 30 },
  Outfit_Black_body: { fontFamily: fontFamily.outfitBlack, fontSize: 18, lineHeight: 22 },
  Outfit_Black_small: { fontFamily: fontFamily.outfitBlack, fontSize: 16, lineHeight: 20 },

  Outfit_Extralight_h1: { fontFamily: fontFamily.outfitExtralight, fontSize: 36, lineHeight: 44 },
  Outfit_Extralight_h2: { fontFamily: fontFamily.outfitExtralight, fontSize: 28, lineHeight: 36 },
  Outfit_Extralight_button: { fontFamily: fontFamily.outfitExtralight, fontSize: 24, lineHeight: 30 },
  Outfit_Extralight_body: { fontFamily: fontFamily.outfitExtralight, fontSize: 18, lineHeight: 22 },
  Outfit_Extralight_small: { fontFamily: fontFamily.outfitExtralight, fontSize: 16, lineHeight: 20 },
  
  Outfit_Light_h1: { fontFamily: fontFamily.outfitLight, fontSize: 36, lineHeight: 44 },
  Outfit_Light_h2: { fontFamily: fontFamily.outfitLight, fontSize: 28, lineHeight: 36 },
  Outfit_Light_button: { fontFamily: fontFamily.outfitLight, fontSize: 24, lineHeight: 30 },
  Outfit_Light_body: { fontFamily: fontFamily.outfitLight, fontSize: 18, lineHeight: 22 },
  Outfit_Light_small: { fontFamily: fontFamily.outfitLight, fontSize: 16, lineHeight: 20 },

  Outfit_Medium_h1: { fontFamily: fontFamily.outfitMedium, fontSize: 36, lineHeight: 44 },
  Outfit_Medium_h2: { fontFamily: fontFamily.outfitMedium, fontSize: 28, lineHeight: 36 },
  Outfit_Medium_button: { fontFamily: fontFamily.outfitMedium, fontSize: 24, lineHeight: 30 },
  Outfit_Medium_body: { fontFamily: fontFamily.outfitMedium, fontSize: 18, lineHeight: 22 },
  Outfit_Medium_small: { fontFamily: fontFamily.outfitMedium, fontSize: 16, lineHeight: 20 },

  Outfit_Semibold_h1: { fontFamily: fontFamily.outfitSemibold, fontSize: 36, lineHeight: 44 },
  Outfit_Semibold_h2: { fontFamily: fontFamily.outfitSemibold, fontSize: 28, lineHeight: 36 },
  Outfit_Semibold_button: { fontFamily: fontFamily.outfitSemibold, fontSize: 24, lineHeight: 30 },
  Outfit_Semibold_body: { fontFamily: fontFamily.outfitSemibold, fontSize: 18, lineHeight: 22 },
  Outfit_Semibold_small: { fontFamily: fontFamily.outfitSemibold, fontSize: 16, lineHeight: 20 },

  Outfit_Thin_h1: { fontFamily: fontFamily.outfitThin, fontSize: 36, lineHeight: 44 },
  Outfit_Thin_h2: { fontFamily: fontFamily.outfitThin, fontSize: 28, lineHeight: 36 },
  Outfit_Thin_button: { fontFamily: fontFamily.outfitThin, fontSize: 24, lineHeight: 30 },
  Outfit_Thin_body: { fontFamily: fontFamily.outfitThin, fontSize: 20, lineHeight: 26 },
  Outfit_Thin_small: { fontFamily: fontFamily.outfitThin, fontSize: 16, lineHeight: 20 },
});
