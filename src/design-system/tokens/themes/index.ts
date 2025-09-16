// ABOUTME: Theme tokens index - exports all theme-specific design tokens

import { lightTheme } from './light';
import { darkTheme } from './dark';
import { contrastTheme } from './contrast';
import type { ThemeTokens, ThemeMode } from '../../types';

export const themes: Record<ThemeMode, ThemeTokens> = {
  light: lightTheme,
  dark: darkTheme,
  contrast: contrastTheme,
};

export { lightTheme, darkTheme, contrastTheme };