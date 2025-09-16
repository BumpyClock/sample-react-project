// ABOUTME: Main design system export - provides unified access to all design system features

// Export tokens
export { tokens, baseTokens, themes, lightTheme, darkTheme, contrastTheme } from './tokens';
export type { DesignTokens, ThemeMode, ThemeTokens, BaseTokens } from './types';

// Export runtime utilities
export {
  getCurrentTheme,
  setTheme,
  subscribeToTheme,
  initializeTheme,
  getCSSVariable,
  setCSSVariable,
  getTokenValue,
  updateTokens,
  getResponsiveToken,
} from './runtime';

// Export React hooks
export {
  useTheme,
  useToken,
  useTokens,
  useCSSVariable,
  useDesignTokens,
  useResponsiveToken,
  useAnimation,
  useElevation,
} from './hooks';

// Export generator utilities (for build tools)
export { generateCSS, generateTailwindExtensions } from './generator';

// Initialize design system on import
import './runtime';