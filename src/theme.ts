import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const customConfig = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: "#E0F2F1" },
          100: { value: "#B2DFDB" },
          200: { value: "#80CBC4" },
          300: { value: "#4DB6AC" },
          400: { value: "#26A69A" },
          500: { value: "#009688" },
          600: { value: "#00897B" },
          700: { value: "#00796B" },
          800: { value: "#00695C" },
          900: { value: "#004D40" },
        },
      },
    },
    semanticTokens: {
      colors: {
        bg: {
          DEFAULT: {
            value: { _light: "{colors.white}", _dark: "#020617" },
          },
          subtle: {
            value: { _light: "{colors.gray.50}", _dark: "#0f172a" },
          },
          muted: {
            value: { _light: "{colors.gray.100}", _dark: "#020617" },
          },
          panel: {
            value: { _light: "{colors.gray.100}", _dark: "#0f172a" },
          },
          surface: {
            value: { _light: "{colors.white}", _dark: "#0f172a" },
          },
        },
        fg: {
          DEFAULT: {
            value: { _light: "{colors.black}", _dark: "#f1f5f9" },
          },
          muted: {
            value: { _light: "{colors.gray.600}", _dark: "#64748b" },
          },
          subtle: {
            value: { _light: "{colors.gray.500}", _dark: "#495a6e" },
          },
        },
        border: {
          DEFAULT: {
            value: { _light: "{colors.gray.200}", _dark: "#1e293b" },
          },
          muted: {
            value: { _light: "{colors.gray.200}", _dark: "#1e293b" },
          },
          subtle: {
            value: { _light: "{colors.gray.200}", _dark: "#1e293b" },
          },
          panel: {
            value: { _light: "{colors.gray.200}", _dark: "#1e293b" },
          },
          surface: {
            value: { _light: "{colors.gray.200}", _dark: "#1e293b" },
          },
        },
        gray: {
          subtle: {
            value: { _light: "{colors.gray.50}", _dark: "#1e293b" },
          },
        },
        brand: {
          solid: { value: "{colors.brand.500}" },
          contrast: { value: "{colors.brand.100}" },
          fg: { value: "{colors.brand.700}" },
          muted: { value: "{colors.brand.100}" },
          subtle: { value: "{colors.brand.200}" },
          emphasized: { value: "{colors.brand.300}" },
          focusRing: { value: "{colors.brand.500}" },
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, customConfig);
