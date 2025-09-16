// ABOUTME: Windows 11 corner radius tokens
// Defines standard corner radius values used throughout Windows 11 UI

import type { RadiiTokens } from '../../types';

export const radii: RadiiTokens = {
  none: '0px',
  small: '2px',
  medium: '4px', // Most common in Windows 11
  large: '7px', // Window corners per Figma specification
  xlarge: '12px',
  circular: '999px', // For pills and circular elements
};