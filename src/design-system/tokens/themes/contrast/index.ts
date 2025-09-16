// ABOUTME: High contrast theme tokens for Windows 11 design system
// Provides maximum accessibility with pure black/white colors and border-based elevation

import type { ThemeTokens } from '../../../types';

export const contrastTheme: ThemeTokens = {
  colors: {
    // Text colors - maximum contrast
    text: {
      primary: '#FFFFFF',
      secondary: '#FFFFFF',
      tertiary: '#FFFFFF',
      disabled: '#3FF23F', // Green for disabled state in high contrast
      onAccent: {
        primary: '#000000',
        secondary: '#000000',
        disabled: '#000000',
      },
    },
    
    // Fill colors - high contrast variations
    fill: {
      text: {
        primary: '#FFFFFF',
        secondary: '#FFFFFF',
        tertiary: '#FFFFFF',
        disabled: '#3FF23F',
      },
      accentText: {
        primary: '#FFFF00', // Yellow for accent text
        secondary: '#FFFF00',
        tertiary: '#FFFF00',
        disabled: '#3FF23F',
      },
      control: {
        default: '#000000',
        secondary: '#000000',
        tertiary: '#000000',
        disabled: '#000000',
        transparent: 'transparent',
        inputActive: '#000000',
      },
      accent: {
        default: '#FFFF00', // Bright yellow for accent
        secondary: '#FFFF00',
        tertiary: '#FFFF00',
        disabled: '#3FF23F',
      },
      system: {
        critical: '#FF0000', // Bright red
        success: '#00FF00', // Bright green
        attention: '#FFFF00', // Bright yellow
        caution: '#FF9900', // Bright orange
      },
      solid: {
        background: '#000000',
        backgroundAlt: '#000000',
        backgroundTertiary: '#000000',
        backgroundQuarternary: '#000000',
      },
    },
    
    // Stroke colors - all white for visibility
    stroke: {
      control: {
        default: '#FFFFFF',
        secondary: '#FFFFFF',
        onAccentDefault: '#000000',
        onAccentSecondary: '#000000',
        onAccentTertiary: '#000000',
        onAccentDisabled: '#3FF23F',
        forStrongFillWhenOnImage: '#FFFFFF',
      },
      surface: {
        default: '#FFFFFF',
        flyout: '#FFFFFF',
        card: '#FFFFFF',
      },
      divider: {
        default: '#FFFFFF',
      },
      focus: {
        outer: '#FFFFFF',
        inner: '#000000',
      },
    },
    
    // Background colors - all black
    background: {
      layer: {
        default: '#000000',
        alt: '#000000',
        flyout: '#000000',
        card: '#000000',
        cardAlt: '#000000',
        acrylicDefault: '#000000', // No transparency in high contrast
        acrylicBase: '#000000',
        acrylicCard: '#000000',
        overlay: '#000000',
      },
      solid: {
        base: '#000000',
        secondary: '#000000',
        tertiary: '#000000',
        quarternary: '#000000',
      },
    },
  },
  
  // Elevation - no shadows, use borders instead
  elevation: {
    low: {
      boxShadow: 'none',
      _description: 'No shadow in high contrast mode',
    },
    medium: {
      boxShadow: 'none',
      _description: 'No shadow in high contrast mode',
    },
    high: {
      boxShadow: 'none',
      _description: 'No shadow in high contrast mode',
    },
    flyout: {
      boxShadow: 'none',
      _description: 'No shadow in high contrast mode - use 1px border instead',
    },
    dialog: {
      boxShadow: 'none',
      _description: 'No shadow in high contrast mode - use 2px border instead',
    },
    card: {
      boxShadow: 'none',
      _description: 'No shadow in high contrast mode - use 1px border instead',
    },
    tooltip: {
      boxShadow: 'none',
      _description: 'No shadow in high contrast mode - use 1px border instead',
    },
  },
};