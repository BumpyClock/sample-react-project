// ABOUTME: Windows 11 light theme tokens defining colors and elevation for the light color scheme

import type { ThemeTokens } from '../../../types';

export const lightTheme: ThemeTokens = {
  colors: {
    // Text colors
    text: {
      primary: '#000000', // Exact Figma specification
      secondary: 'rgba(0, 0, 0, 0.61)', // Exact Figma specification
      tertiary: 'rgba(0, 0, 0, 0.4458)', // ~#00000072
      disabled: 'rgba(0, 0, 0, 0.3614)', // ~#0000005C
      onAccent: {
        primary: '#FFFFFF',
        secondary: 'rgba(255, 255, 255, 0.7)', // ~#FFFFFFB3
        disabled: 'rgba(255, 255, 255, 0.5302)', // ~#FFFFFF87
      },
    },
    
    // Fill colors
    fill: {
      text: {
        primary: '#000000', // Exact Figma specification
        secondary: 'rgba(0, 0, 0, 0.61)', // Exact Figma specification
        tertiary: 'rgba(0, 0, 0, 0.4458)', // ~#00000072
        disabled: 'rgba(0, 0, 0, 0.3614)', // ~#0000005C
      },
      accentText: {
        primary: '#003E92', // Accent text primary
        secondary: '#001A68', // Accent text secondary
        tertiary: '#005FB8', // Accent text tertiary (matches Figma)
        disabled: 'rgba(0, 0, 0, 0.3614)', // ~#0000005C
      },
      control: {
        default: 'rgba(255, 255, 255, 0.7)', // ~#FFFFFFB3
        secondary: 'rgba(249, 249, 249, 0.5)', // ~#F9F9F980
        tertiary: 'rgba(249, 249, 249, 0.3)', // ~#F9F9F94D
        disabled: 'rgba(249, 249, 249, 0.3)', // ~#F9F9F94D
        transparent: 'transparent',
        inputActive: '#FFFFFF',
      },
      accent: {
        default: '#005FB8', // Accent default (matches Figma)
        secondary: '#005FB8', // Accent secondary (matches Figma)
        tertiary: '#005FB8', // Accent tertiary (matches Figma)
        disabled: 'rgba(0, 0, 0, 0.2169)', // ~#00000037
      },
      system: {
        critical: '#C42B1C', // Error/Critical
        success: '#0F7B0F', // Success
        attention: '#005FB7', // Information/Attention (matches Figma)
        caution: '#9D5D00', // Warning/Caution (matches Figma)
      },
      solid: {
        background: '#F3F3F3', // Solid background
        backgroundAlt: '#EBEBEB', // Alternative solid background
        backgroundTertiary: '#F9F9F9', // Tertiary solid
        backgroundQuarternary: '#FFFFFF', // Quarternary solid
      },
    },
    
    // Stroke colors
    stroke: {
      control: {
        default: 'rgba(0, 0, 0, 0.0578)', // ~#0000000F
        secondary: 'rgba(0, 0, 0, 0.0241)', // ~#00000006
        onAccentDefault: 'rgba(255, 255, 255, 0.08)', // ~#FFFFFF14
        onAccentSecondary: 'rgba(0, 0, 0, 0.14)', // ~#00000024
        onAccentTertiary: 'rgba(0, 0, 0, 0.2169)', // ~#00000037
        onAccentDisabled: 'rgba(0, 0, 0, 0)', // Transparent
        forStrongFillWhenOnImage: 'rgba(255, 255, 255, 0.35)', // ~#FFFFFF59
      },
      surface: {
        default: 'rgba(117, 117, 117, 0.4)', // ~#75757566
        flyout: 'rgba(0, 0, 0, 0.0578)', // ~#0000000F
        card: 'rgba(0, 0, 0, 0.0578)', // ~#0000000F
      },
      divider: {
        default: 'rgba(0, 0, 0, 0.08)', // Exact Figma specification
      },
      focus: {
        outer: '#000000', // Focus outer stroke
        inner: '#FFFFFF', // Focus inner stroke
      },
    },
    
    // Background colors
    background: {
      layer: {
        default: '#FFFFFF', // Exact Figma specification
        alt: 'rgba(255, 255, 255, 0.5)', // ~#FFFFFF80
        flyout: '#FFFFFF', // Flyout background
        card: '#FFFFFF', // Card background
        cardAlt: 'rgba(255, 255, 255, 0.8)', // ~#FFFFFFCC
        acrylicDefault: 'rgba(252, 252, 252, 0)', // Acrylic default
        acrylicBase: '#F3F3F3', // Figma app base fill
        acrylicCard: 'rgba(255, 255, 255, 0.7)', // Figma top nav background
        overlay: 'rgba(0, 0, 0, 0.3)', // Overlay background
        contentBackground: '#F9F9F9', // Figma content background
        appSurface: 'rgba(255, 255, 255, 0.5)', // Figma app layer fill
      },
      solid: {
        base: '#F3F3F3', // Solid base
        secondary: '#EEEEEE', // Solid secondary
        tertiary: '#F9F9F9', // Solid tertiary
        quarternary: '#FFFFFF', // Solid quarternary
      },
    },
  },
  
  elevation: {
    low: {
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.04), 0 0 2px rgba(0, 0, 0, 0.06)',
      _description: 'Low elevation (0-2px) for layers and cards',
    },
    medium: {
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.14)',
      _description: 'Medium elevation (4-8px) for standard controls',
    },
    high: {
      boxShadow: '0 16px 32px rgba(0, 0, 0, 0.14), 0 0 2px rgba(0, 0, 0, 0.14)',
      _description: 'High elevation (16-32px) for tooltips',
    },
    flyout: {
      boxShadow: '0 32px 64px rgba(0, 0, 0, 0.14), 0 2px 21px rgba(0, 0, 0, 0.14)',
      _description: 'Flyout elevation (32px) for popup menus',
    },
    dialog: {
      boxShadow: '0px 32px 64px 0px rgba(0,0,0,0.28), 0px 2px 21px 0px rgba(0,0,0,0.22)',
      _description: 'Dialog elevation - exact Figma specification for Notepad window',
    },
    card: {
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.04)',
      _description: 'Card elevation (2px) for card surfaces',
    },
    tooltip: {
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.14)',
      _description: 'Tooltip elevation (8px) for tooltip popups',
    },
  },
};