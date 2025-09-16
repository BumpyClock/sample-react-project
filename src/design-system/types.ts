// ABOUTME: Type definitions for the Windows 11 design token system

// Token metadata for generation
export interface TokenMeta {
  _generate?: boolean;
  _description?: string;
  _category?: string;
}

// Typography types
export interface TypeRampToken {
  fontSize: string;
  lineHeight: string;
  fontWeight: number;
  fontFamily: 'text' | 'small' | 'display' | 'mono';
}

export interface TypographyTokens {
  fontFamily: {
    text: string;
    small: string;
    display: string;
    mono: string;
  };
  fontSize?: Record<string, string>;
  lineHeight?: Record<string, string>;
  fontWeight: {
    regular: number;
    semibold: number;
  };
  typeRamp: {
    caption: TypeRampToken;
    body: TypeRampToken;
    bodyStrong: TypeRampToken;
    bodyLarge: TypeRampToken;
    bodyLargeStrong: TypeRampToken;
    subtitle: TypeRampToken;
    title: TypeRampToken;
    titleLarge: TypeRampToken;
    display: TypeRampToken;
  };
}

// Motion/Animation types
export interface AnimationToken {
  duration: string;
  easing: string;
  _description?: string;
}

export interface MotionTokens {
  duration: {
    fast: string;      // 83ms
    normal: string;    // 167ms
    slow: string;      // 333ms
    slower: string;    // 500ms
    slowest: string;   // 667ms
  };
  easing: {
    fastInvoke: string;
    strongInvoke: string;
    fastDismiss: string;
    softDismiss: string;
    pointToPoint: string;
    linear: string;
  };
  animation: {
    fastInvoke: AnimationToken;
    fastInvokeMedium: AnimationToken;
    fastInvokeSlow: AnimationToken;
    strongInvoke: AnimationToken;
    fastDismiss: AnimationToken;
    fastDismissMedium: AnimationToken;
    fastDismissSlow: AnimationToken;
    softDismiss: AnimationToken;
    pointToPoint: AnimationToken;
    pointToPointMedium: AnimationToken;
    pointToPointSlow: AnimationToken;
    fadeIn: AnimationToken;
    fadeOut: AnimationToken;
  };
}

// Spacing types
export interface SpacingTokens {
  base: string;  // 4px
  scale: {
    0: string;
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
    6: string;
    8: string;
    10: string;
    12: string;
    16: string;
    20: string;
    24: string;
    32: string;
    40: string;
    48: string;
  };
}

// Border radius types
export interface RadiiTokens {
  none: string;
  small: string;    // 2px
  medium: string;   // 4px
  large: string;    // 8px
  xlarge: string;   // 12px
  circular: string; // 999px
}

// Stroke/Border types
export interface StrokeTokens {
  width: {
    thin: string;      // 1px
    thick: string;     // 2px
    thicker: string;   // 4px
  };
  focusWidth: string;  // 2px
}

// Color types
export interface ColorScale {
  base: string;
  alt: string;
  tertiary?: string;
  quaternary?: string;
}

export interface ColorTokens {
  // Text colors
  text: {
    primary: string;
    secondary: string;
    tertiary: string;
    disabled: string;
    onAccent: {
      primary: string;
      secondary: string;
      disabled: string;
    };
  };
  
  // Fill colors
  fill: {
    text: {
      primary: string;
      secondary: string;
      tertiary: string;
      disabled: string;
    };
    accentText: {
      primary: string;
      secondary: string;
      tertiary: string;
      disabled: string;
    };
    control: {
      default: string;
      secondary: string;
      tertiary: string;
      disabled: string;
      transparent: string;
      inputActive: string;
    };
    accent: {
      default: string;
      secondary: string;
      tertiary: string;
      disabled: string;
    };
    system: {
      critical: string;
      success: string;
      attention: string;
      caution: string;
    };
    solid: {
      background: string;
      backgroundAlt: string;
      backgroundTertiary: string;
      backgroundQuarternary: string;
    };
  };
  
  // Stroke colors
  stroke: {
    control: {
      default: string;
      secondary: string;
      onAccentDefault: string;
      onAccentSecondary: string;
      onAccentTertiary: string;
      onAccentDisabled: string;
      forStrongFillWhenOnImage: string;
    };
    surface: {
      default: string;
      flyout: string;
      card: string;
    };
    divider: {
      default: string;
    };
    focus: {
      outer: string;
      inner: string;
    };
  };
  
  // Background colors
  background: {
    layer: {
      default: string;
      alt: string;
      flyout: string;
      card: string;
      cardAlt: string;
      acrylicDefault: string;
      acrylicBase: string;
      acrylicCard: string;
      overlay: string;
      contentBackground: string;
      appSurface: string;
    };
    solid: {
      base: string;
      secondary: string;
      tertiary: string;
      quarternary: string;
    };
  };
}

// Elevation types
export interface ElevationToken {
  boxShadow: string;
  _description?: string;
}

export interface ElevationTokens {
  low: ElevationToken;
  medium: ElevationToken;
  high: ElevationToken;
  flyout: ElevationToken;
  dialog: ElevationToken;
  card: ElevationToken;
  tooltip: ElevationToken;
}

// Base tokens (non-themeable)
export interface BaseTokens {
  typography: TypographyTokens;
  motion: MotionTokens;
  spacing: SpacingTokens;
  radii: RadiiTokens;
  stroke: StrokeTokens;
}

// Theme tokens (themeable)
export interface ThemeTokens {
  colors: ColorTokens;
  elevation: ElevationTokens;
}

// Complete token structure
export interface DesignTokens {
  base: BaseTokens;
  themes: {
    light: ThemeTokens;
    dark: ThemeTokens;
    contrast: ThemeTokens;
  };
}

// Theme type
export type ThemeMode = 'light' | 'dark' | 'contrast';

// Token path helper types
export type TokenPath = string;
export type TokenValue = string | number | object;