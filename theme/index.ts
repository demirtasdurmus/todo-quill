import { colors } from "./colors";
import { shadows } from "./shadows";
import { borderRadius, spacing } from "./spacing";
import { typography } from "./typography";

export const globalStyles = {
  spacing,
  borderRadius,
  typography,
  shadows,
  colors,
} as const;
