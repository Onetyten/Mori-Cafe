import { Dimensions, StyleSheet } from "react-native";

export const colors = {
  primary: "#588159",
  secondary: "#395a3f",
  light: "#a2b18a",
  brown: "#6f4e37",
  muted: "#a89487",
  background: "#e9d5ca",
  danger: "#e00b00",
  warning: "#f59e0b",
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
  mono: "Mono",
  monoBold: "Mono_Bold",
};



const {width} = Dimensions.get("window")
export const isSmall = width < 360;
export const isPhone = width >= 360 && width < 600;
export const isTablet = width >= 600 && width < 900;
export const isLargeTablet = width >= 900;

const scale = (size:number) => (width/412) * size
export const clamp = (size:number,min:number,max:number)=>Math.min(Math.max(scale(size),min),max)

const font = {
  h1: { fontSize: clamp(36,32,40), lineHeight: clamp(44,40,48) },
  h2: { fontSize: clamp(28, 24, 32), lineHeight: clamp(36, 30, 40)},
  button: { fontSize: clamp(24, 20, 26), lineHeight: clamp(30, 26, 34) },
  body: { fontSize: clamp(18, 16, 20), lineHeight: clamp(28, 24, 32) },
  small: { fontSize: clamp(14, 12, 16), lineHeight: clamp(20, 18, 22) },
};

export const GlobalStyle = StyleSheet.create({
  squada_h1: { fontFamily: fontFamily.Squada, ...font.h1 },
  squada_h2: { fontFamily: fontFamily.Squada, ...font.h2 },
  squada_button: { fontFamily: fontFamily.Squada, ...font.button },
  squada_body: { fontFamily: fontFamily.Squada, ...font.body },
  squada_small: { fontFamily: fontFamily.Squada, ...font.small },

  Outfit_Regular_h1: { fontFamily: fontFamily.outfitRegular, ...font.h1 },
  Outfit_Regular_h2: { fontFamily: fontFamily.outfitRegular, ...font.h2 },
  Outfit_Regular_button: {
    fontFamily: fontFamily.outfitRegular,
    ...font.button,
  },
  Outfit_Regular_body: { fontFamily: fontFamily.outfitRegular, ...font.body },
  Outfit_Regular_small: { fontFamily: fontFamily.outfitRegular, ...font.small },

  Outfit_Bold_h1: { fontFamily: fontFamily.outfitBold, ...font.h1 },
  Outfit_Bold_h2: { fontFamily: fontFamily.outfitBold, ...font.h2 },
  Outfit_Bold_button: { fontFamily: fontFamily.outfitBold, ...font.button },
  Outfit_Bold_body: { fontFamily: fontFamily.outfitBold, ...font.body },
  Outfit_Bold_small: { fontFamily: fontFamily.outfitBold, ...font.small },

  Outfit_Extrabold_h1: { fontFamily: fontFamily.outfitExtrabold, ...font.h1 },
  Outfit_Extrabold_h2: { fontFamily: fontFamily.outfitExtrabold, ...font.h2 },
  Outfit_Extrabold_button: {
    fontFamily: fontFamily.outfitExtrabold,
    ...font.button,
  },
  Outfit_Extrabold_body: {
    fontFamily: fontFamily.outfitExtrabold,
    ...font.body,
  },
  Outfit_Extrabold_small: {
    fontFamily: fontFamily.outfitExtrabold,
    ...font.small,
  },

  Outfit_Black_h1: { fontFamily: fontFamily.outfitBlack, ...font.h1 },
  Outfit_Black_h2: { fontFamily: fontFamily.outfitBlack, ...font.h2 },
  Outfit_Black_button: { fontFamily: fontFamily.outfitBlack, ...font.button },
  Outfit_Black_body: { fontFamily: fontFamily.outfitBlack, ...font.body },
  Outfit_Black_small: { fontFamily: fontFamily.outfitBlack, ...font.small },

  Outfit_Extralight_h1: { fontFamily: fontFamily.outfitExtralight, ...font.h1 },
  Outfit_Extralight_h2: { fontFamily: fontFamily.outfitExtralight, ...font.h2 },
  Outfit_Extralight_button: {
    fontFamily: fontFamily.outfitExtralight,
    ...font.button,
  },
  Outfit_Extralight_body: {
    fontFamily: fontFamily.outfitExtralight,
    ...font.body,
  },
  Outfit_Extralight_small: {
    fontFamily: fontFamily.outfitExtralight,
    ...font.small,
  },

  Outfit_Light_h1: { fontFamily: fontFamily.outfitLight, ...font.h1 },
  Outfit_Light_h2: { fontFamily: fontFamily.outfitLight, ...font.h2 },
  Outfit_Light_button: { fontFamily: fontFamily.outfitLight, ...font.button },
  Outfit_Light_body: { fontFamily: fontFamily.outfitLight, ...font.body },
  Outfit_Light_small: { fontFamily: fontFamily.outfitLight, ...font.small },

  Outfit_Medium_h1: { fontFamily: fontFamily.outfitMedium, ...font.h1 },
  Outfit_Medium_h2: { fontFamily: fontFamily.outfitMedium, ...font.h2 },
  Outfit_Medium_button: { fontFamily: fontFamily.outfitMedium, ...font.button },
  Outfit_Medium_body: { fontFamily: fontFamily.outfitMedium, ...font.body },
  Outfit_Medium_small: { fontFamily: fontFamily.outfitMedium, ...font.small },

  Outfit_Semibold_h1: { fontFamily: fontFamily.outfitSemibold, ...font.h1 },
  Outfit_Semibold_h2: { fontFamily: fontFamily.outfitSemibold, ...font.h2 },
  Outfit_Semibold_button: {
    fontFamily: fontFamily.outfitSemibold,
    ...font.button,
  },
  Outfit_Semibold_body: { fontFamily: fontFamily.outfitSemibold, ...font.body },
  Outfit_Semibold_small: {
    fontFamily: fontFamily.outfitSemibold,
    ...font.small,
  },

  Outfit_Thin_h1: { fontFamily: fontFamily.outfitThin, ...font.h1 },
  Outfit_Thin_h2: { fontFamily: fontFamily.outfitThin, ...font.h2 },
  Outfit_Thin_button: { fontFamily: fontFamily.outfitThin, ...font.button },
  Outfit_Thin_body: { fontFamily: fontFamily.outfitThin, ...font.body },
  Outfit_Thin_small: { fontFamily: fontFamily.outfitThin, ...font.small },

  Mono_h1: { fontFamily: fontFamily.mono, ...font.h1 },
  Mono_h2: { fontFamily: fontFamily.mono, ...font.h2 },
  Mono_button: { fontFamily: fontFamily.mono, ...font.button },
  Mono_body: { fontFamily: fontFamily.mono, ...font.body },
  Mono_small: { fontFamily: fontFamily.mono, ...font.small },

  Mono_Bold_h1: { fontFamily: fontFamily.monoBold, ...font.h1 },
  Mono_Bold_h2: { fontFamily: fontFamily.monoBold, ...font.h2 },
  Mono_Bold_button: { fontFamily: fontFamily.monoBold, ...font.button },
  Mono_Bold_body: { fontFamily: fontFamily.monoBold, ...font.body },
  Mono_Bold_small: { fontFamily: fontFamily.monoBold, ...font.small },
});
