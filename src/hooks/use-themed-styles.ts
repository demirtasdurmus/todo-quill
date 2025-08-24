import { useMemo } from "react";
import type { Theme } from "../providers/ThemeProvider";

export const createThemedStyles = <T>(styleFactory: (_theme: Theme) => T) => {
  return (theme: Theme) => styleFactory(theme);
};

export const useThemedStyles = <T>(
  styleFactory: (_theme: Theme) => T,
  theme: Theme
): T => {
  return useMemo(() => createThemedStyles(styleFactory)(theme), [theme]);
};
