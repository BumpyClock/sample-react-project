// ABOUTME: Base typography tokens for Windows 11 design system, defining the type ramp and font properties

import type { TypographyTokens } from '../../types';

export const typography: TypographyTokens = {
  fontFamily: {
    text: "'Segoe UI Variable Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    small: "'Segoe UI Variable Small', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    display: "'Segoe UI Variable Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    mono: "'Cascadia Code', 'Consolas', 'Courier New', monospace"
  },
  
  fontSize: {
    caption: '12px',
    body: '14px',
    bodyLarge: '18px',
    subtitle: '20px',
    title: '28px',
    titleLarge: '40px',
    display: '68px'
  },
  
  fontWeight: {
    regular: 400,
    semibold: 600
  },
  
  lineHeight: {
    caption: '16px',
    body: '20px',
    bodyStrong: '20px',
    bodyLarge: '24px',
    bodyLargeStrong: '24px',
    subtitle: '28px',
    title: '36px',
    titleLarge: '52px',
    display: '92px'
  },
  
  typeRamp: {
    caption: {
      fontSize: '12px',
      lineHeight: '16px',
      fontWeight: 400,
      fontFamily: 'small'
    },
    body: {
      fontSize: '14px',
      lineHeight: '20px',
      fontWeight: 400,
      fontFamily: 'text'
    },
    bodyStrong: {
      fontSize: '14px',
      lineHeight: '20px',
      fontWeight: 600,
      fontFamily: 'text'
    },
    bodyLarge: {
      fontSize: '18px',
      lineHeight: '24px',
      fontWeight: 400,
      fontFamily: 'text'
    },
    bodyLargeStrong: {
      fontSize: '18px',
      lineHeight: '24px',
      fontWeight: 600,
      fontFamily: 'text'
    },
    subtitle: {
      fontSize: '20px',
      lineHeight: '28px',
      fontWeight: 600,
      fontFamily: 'display'
    },
    title: {
      fontSize: '28px',
      lineHeight: '36px',
      fontWeight: 600,
      fontFamily: 'display'
    },
    titleLarge: {
      fontSize: '40px',
      lineHeight: '52px',
      fontWeight: 600,
      fontFamily: 'display'
    },
    display: {
      fontSize: '68px',
      lineHeight: '92px',
      fontWeight: 600,
      fontFamily: 'display'
    }
  }
};