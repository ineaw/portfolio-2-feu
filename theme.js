import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

const fonts = { mono: `'Menlo', monospace` };

const breakpoints = createBreakpoints({
  sm: "41rem",
  md: "64rem",
  lg: "70rem",
  xl: "80rem",
});

const theme = extendTheme({
  semanticTokens: {
    colors: {
      text: {
        default: "#16161D",
        _dark: "#ade3b8",
      },
      heroGradientStart: {
        default: "#6e64e7",
        _dark: "#e3a7f9",
      },
      heroGradientEnd: {
        default: "#8c366c",
        _dark: "#fbec8f",
      },
    },
  },
  colors: {
    black: "#16161D",
  },
  fonts,
  breakpoints,
});

export default theme;
