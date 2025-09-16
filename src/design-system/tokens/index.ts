// ABOUTME: Main tokens export - combines base and theme tokens into complete design system

import { baseTokens } from './base';
import { themes } from './themes';
import type { DesignTokens } from '../types';

export const tokens: DesignTokens = {
  base: baseTokens,
  themes: themes,
};

// Re-export for convenience
export { baseTokens } from './base';
export { themes, lightTheme, darkTheme, contrastTheme } from './themes';
export type { DesignTokens, ThemeMode } from '../types';