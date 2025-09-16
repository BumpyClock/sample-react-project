/**
 * ABOUTME: Stroke base tokens for Windows 11 design system
 * 
 * This file defines the base stroke tokens including border widths and focus ring styles
 * following Windows 11 design standards. These tokens are used for consistent borders,
 * outlines, and focus indicators throughout the application.
 */

import type { StrokeTokens } from '../../types';

export const stroke: StrokeTokens = {
  width: {
    thin: '1px',      // Standard borders for inputs, cards, and containers
    thick: '2px',     // Focus rings and selected states
    thicker: '4px',   // Special emphasis elements
  },
  focusWidth: '2px',  // Standard focus ring width for accessibility
};