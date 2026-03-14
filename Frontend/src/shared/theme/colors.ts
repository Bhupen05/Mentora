export const COLORS = {
  // Primary
  primary: "#6366f1",
  primaryDark: "#4f46e5",
  primaryLight: "#818cf8",

  // Secondary
  secondary: "#ec4899",
  secondaryDark: "#db2777",
  secondaryLight: "#f472b6",

  // Neutrals
  dark: "#1f2937",
  gray900: "#111827",
  gray800: "#1f2937",
  gray700: "#374151",
  gray600: "#4b5563",
  gray500: "#6b7280",
  gray400: "#9ca3af",
  gray300: "#d1d5db",
  gray200: "#e5e7eb",
  gray100: "#f3f4f6",
  light: "#f9fafb",
  white: "#ffffff",

  // Status Colors
  success: "#10b981",
  error: "#ef4444",
  warning: "#f59e0b",
  info: "#3b82f6",

  // Transparent
  backdrop: "rgba(0, 0, 0, 0.5)",
  overlay: "rgba(0, 0, 0, 0.25)",
};

export type ColorKey = keyof typeof COLORS;
