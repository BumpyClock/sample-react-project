// ABOUTME: Windows 11 dark theme design tokens implementation based on official design specifications
// This file contains all color and elevation tokens for the dark theme variant

import type { ThemeTokens } from '../../../types';

export const darkTheme: ThemeTokens = {
  colors: {
    // Text colors
    text: {
      primary: 'rgba(255, 255, 255, 1.0)',        // White 100%
      secondary: 'rgba(255, 255, 255, 0.786)',     // White 78.6%
      tertiary: 'rgba(255, 255, 255, 0.544)',      // White 54.4%
      disabled: 'rgba(255, 255, 255, 0.363)',      // White 36.3%
      onAccent: {
        primary: 'rgba(0, 0, 0, 1.0)',           // Black 100%
        secondary: 'rgba(0, 0, 0, 0.5)',         // Black 50%
        disabled: 'rgba(255, 255, 255, 0.544)',  // White 54.4%
      },
    },
    
    // Fill colors
    fill: {
      text: {
        primary: 'rgba(255, 255, 255, 1.0)',      // White 100%
        secondary: 'rgba(255, 255, 255, 0.786)',  // White 78.6%
        tertiary: 'rgba(255, 255, 255, 0.544)',   // White 54.4%
        disabled: 'rgba(255, 255, 255, 0.363)',   // White 36.3%
      },
      accentText: {
        primary: '#99EBFF',                       // Light Blue (Accent text primary)
        secondary: '#99EBFF',                     // Light Blue (Accent text secondary)
        tertiary: '#60CDFF',                      // Accent Blue
        disabled: 'rgba(255, 255, 255, 0.363)',   // White 36.3%
      },
      control: {
        default: 'rgba(255, 255, 255, 0.063)',    // White 6.3%
        secondary: 'rgba(255, 255, 255, 0.083)',  // White 8.3%
        tertiary: 'rgba(255, 255, 255, 0.031)',   // White 3.1%
        disabled: 'rgba(255, 255, 255, 0.042)',   // White 4.2%
        transparent: 'transparent',
        inputActive: 'rgba(30, 30, 30, 0.7)',     // #1E1E1E 70%
      },
      accent: {
        default: '#60CDFF',                       // Accent Blue (matches Figma)
        secondary: '#60CDFF',                     // Accent Blue (matches Figma)
        tertiary: '#60CDFF',                      // Accent Blue (matches Figma)
        disabled: 'rgba(255, 255, 255, 0.158)',   // White 15.8%
      },
      system: {
        critical: '#FF99A4',                      // Light Red
        success: '#6CCB5F',                       // Light Green
        attention: '#60CDFF',                     // Accent Blue (matches Figma)
        caution: '#FCE100',                       // Yellow (matches Figma)
      },
      solid: {
        background: '#202020',                    // Solid Background
        backgroundAlt: '#1C1C1C',                 // Solid Background Alt
        backgroundTertiary: '#282828',            // Solid Background Tertiary
        backgroundQuarternary: '#2C2C2C',         // Solid Background Quarternary
      },
    },
    
    // Stroke colors
    stroke: {
      control: {
        default: 'rgba(255, 255, 255, 0.069)',           // White 6.9%
        secondary: 'rgba(255, 255, 255, 0.093)',         // White 9.3%
        onAccentDefault: 'rgba(0, 0, 0, 0.094)',         // Black 9.4%
        onAccentSecondary: 'rgba(0, 0, 0, 0.4)',         // Black 40%
        onAccentTertiary: 'rgba(0, 0, 0, 0.217)',        // Black 21.7%
        onAccentDisabled: 'rgba(0, 0, 0, 0)',            // Transparent
        forStrongFillWhenOnImage: 'rgba(255, 255, 255, 0.545)', // White 54.5%
      },
      surface: {
        default: 'rgba(117, 117, 117, 0.4)',              // #757575 40%
        flyout: 'rgba(0, 0, 0, 0.2)',                    // Black 20%
        card: 'rgba(0, 0, 0, 0.1)',                      // Black 10%
      },
      divider: {
        default: 'rgba(255, 255, 255, 0.083)',            // White 8.3%
      },
      focus: {
        outer: 'rgba(255, 255, 255, 1.0)',               // White 100%
        inner: 'rgba(0, 0, 0, 0.7)',                     // Black 70%
      },
    },
    
    // Background colors
    background: {
      layer: {
        default: 'rgba(58, 58, 58, 0.3)',                // #3A3A3A 30%
        alt: 'rgba(255, 255, 255, 0.054)',               // White 5.4%
        flyout: '#2C2C2C',                               // Solid flyout background
        card: '#1C1C1C',                                 // Card background
        cardAlt: '#202020',                              // Card background alt
        acrylicDefault: 'rgba(44, 44, 44, 0.96)',        // #2C2C2C 96%
        acrylicBase: 'rgba(32, 32, 32, 0.96)',           // #202020 96%
        acrylicCard: 'rgba(28, 28, 28, 0.85)',           // #1C1C1C 85%
        overlay: 'rgba(0, 0, 0, 0.5)',                   // Black 50%
      },
      solid: {
        base: '#202020',                                  // Solid base
        secondary: '#1C1C1C',                             // Solid secondary
        tertiary: '#282828',                              // Solid tertiary
        quarternary: '#2C2C2C',                           // Solid quarternary
      },
    },
  },
  
  // Elevation tokens for dark theme
  elevation: {
    low: {
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.26), 0 0 2px rgba(0, 0, 0, 0.13)',
      _description: 'Low elevation - Directional opacity 26%, Ambient opacity 13%',
    },
    medium: {
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.26), 0 0 2px rgba(0, 0, 0, 0.13)',
      _description: 'Medium elevation - Directional opacity 26%, Ambient opacity 13%',
    },
    high: {
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.37), 0 0 2px rgba(0, 0, 0, 0.13)',
      _description: 'High elevation - Directional opacity 37%, Ambient opacity 13%',
    },
    flyout: {
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.26), 0 0 2px rgba(0, 0, 0, 0.13)',
      _description: 'Flyout elevation - For menus and flyouts',
    },
    dialog: {
      boxShadow: '0 16px 32px rgba(0, 0, 0, 0.37), 0 0 2px rgba(0, 0, 0, 0.13)',
      _description: 'Dialog elevation - For modal dialogs',
    },
    card: {
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.10)',
      _description: 'Card elevation - Very low elevation with 10% opacity',
    },
    tooltip: {
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.26), 0 0 2px rgba(0, 0, 0, 0.13)',
      _description: 'Tooltip elevation',
    },
  },
};

// Export as default as well for convenience
export default darkTheme;