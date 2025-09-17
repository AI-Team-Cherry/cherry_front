import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

type ColorMode = "light" | "dark" | "system";

interface ThemeContextType {
  colorMode: ColorMode;
  setColorMode: (mode: ColorMode) => void;
  toggleColorMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// 🎨 Toss 컬러 팔레트
const tossColors = {
  primary: "#0064FF", // 블루
  secondary: "#00C896", // 민트
  accent: "#FF6B35", // 오렌지
  light: {
    background: "#F8F9FA",
    surface: "#FFFFFF",
    text: {
      primary: "#191F28",
      secondary: "#8B95A1",
    },
  },
  dark: {
    background: "#0E1419",
    surface: "#1A1F26",
    text: {
      primary: "#FFFFFF",
      secondary: "#8B95A1",
    },
  },
};

// 시스템 테마 감지
const getSystemTheme = (): "light" | "dark" => {
  if (typeof window !== "undefined") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  return "light";
};

// 커스텀 MUI 테마 생성
const createCustomTheme = (mode: ColorMode) => {
  const actualMode = mode === "system" ? getSystemTheme() : mode;
  const isDark = actualMode === "dark";
  const colors = isDark ? tossColors.dark : tossColors.light;

  return createTheme({
    palette: {
      mode: actualMode,
      primary: {
        main: tossColors.primary,
        light: "#3D82FF",
        dark: "#0051CC",
        contrastText: "#FFFFFF",
      },
      secondary: {
        main: tossColors.secondary,
        light: "#33D4AB",
        dark: "#00A076",
        contrastText: "#FFFFFF",
      },
      background: {
        default: colors.background,
        paper: colors.surface,
      },
      text: {
        primary: colors.text.primary,
        secondary: colors.text.secondary,
      },
      divider: isDark ? "rgba(255, 255, 255, 0.12)" : "#E5E8EB",
      action: {
        hover: isDark ? "rgba(255, 255, 255, 0.04)" : "rgba(0, 100, 255, 0.04)",
        selected: isDark
          ? "rgba(255, 255, 255, 0.08)"
          : "rgba(0, 100, 255, 0.08)",
      },
    },
    typography: {
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        "Apple SD Gothic Neo",
        "Pretendard Variable",
        "Pretendard",
        "Roboto",
        "Noto Sans KR",
        "Segoe UI",
        "Malgun Gothic",
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
        "sans-serif",
      ].join(","),
      h1: { fontWeight: 700 },
      h2: { fontWeight: 600 },
      h3: { fontWeight: 600 },
      h4: { fontWeight: 600 },
      h5: { fontWeight: 600 },
      h6: { fontWeight: 600 },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: isDark
              ? "0 1px 3px rgba(0, 0, 0, 0.3)"
              : "0 1px 3px rgba(0, 0, 0, 0.1)",
            border: isDark
              ? "1px solid rgba(255, 255, 255, 0.12)"
              : "1px solid #E5E8EB",
            borderRadius: 16,
            backgroundColor: colors.surface,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            textTransform: "none",
            fontWeight: 600,
            padding: "12px 24px",
          },
          contained: {
            boxShadow: "none",
            "&:hover": {
              boxShadow: isDark
                ? "0 2px 8px rgba(0, 100, 255, 0.4)"
                : "0 2px 8px rgba(0, 100, 255, 0.3)",
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow: isDark
              ? "0 1px 3px rgba(0, 0, 0, 0.3)"
              : "0 1px 3px rgba(0, 0, 0, 0.1)",
            backgroundColor: colors.surface,
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: colors.surface,
            color: colors.text.primary,
            boxShadow: isDark
              ? "0 1px 3px rgba(0, 0, 0, 0.3)"
              : "0 1px 3px rgba(0, 0, 0, 0.1)",
          },
        },
      },
    },
  });
};

interface ThemeProviderWrapperProps {
  children: ReactNode;
}

export const ThemeProviderWrapper: React.FC<ThemeProviderWrapperProps> = ({
  children,
}) => {
  const [colorMode, setColorMode] = useState<ColorMode>(() => {
    const saved = localStorage.getItem("colorMode");
    return (saved as ColorMode) || "light";
  });

  useEffect(() => {
    localStorage.setItem("colorMode", colorMode);
  }, [colorMode]);

  const toggleColorMode = () => {
    const modes: ColorMode[] = ["light", "dark", "system"];
    const currentIndex = modes.indexOf(colorMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    setColorMode(modes[nextIndex]);
  };

  const theme = createCustomTheme(colorMode);

  const contextValue = {
    colorMode,
    setColorMode,
    toggleColorMode,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

// ✅ 커스텀 훅
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProviderWrapper");
  }
  return context;
};
