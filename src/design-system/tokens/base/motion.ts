// ABOUTME: Base motion tokens for Windows design system animations
// Defines duration, easing, and animation presets based on Windows Animation Values

import type { MotionTokens } from '../../types';

export const motion: MotionTokens = {
  duration: {
    fast: '83ms',      // Fade in/out
    normal: '167ms',   // Fast dismiss, soft dismiss, point to point (fast variant)
    slow: '333ms',     // Fast invoke, fast dismiss, point to point (medium variant)
    slower: '500ms',   // Fast invoke, fast dismiss, point to point (slow variant)
    slowest: '667ms'   // Strong invoke
  },
  easing: {
    // Fast Invoke - Position, Scale, Rotation
    fastInvoke: 'cubic-bezier(0, 0, 0, 1)',
    
    // Strong Invoke - Position, Scale
    strongInvoke: 'cubic-bezier(0.13, 0.42, 0, 0.92)',
    
    // Fast Dismiss - Position, Scale
    fastDismiss: 'cubic-bezier(0, 0, 0, 1)',
    
    // Soft Dismiss - Scale
    softDismiss: 'cubic-bezier(1, 0, 1, 1)',
    
    // Point to Point - Position, Scale, Rotation
    pointToPoint: 'cubic-bezier(0.33, 0.15, 0, 1)',
    
    // Fade - Opacity
    linear: 'linear'
  },
  animation: {
    // Fast Invoke - Direct and subtle
    fastInvoke: {
      duration: '187ms', // Fast variant
      easing: 'cubic-bezier(0, 0, 0, 1)',
      _description: 'Direct and subtle. Transitions that are functional and utilitarian should use this curve.'
    },
    fastInvokeMedium: {
      duration: '333ms',
      easing: 'cubic-bezier(0, 0, 0, 1)',
      _description: 'Medium speed fast invoke animation'
    },
    fastInvokeSlow: {
      duration: '500ms',
      easing: 'cubic-bezier(0, 0, 0, 1)',
      _description: 'Slow speed fast invoke animation'
    },
    
    // Strong Invoke - Bold and emphasizing
    strongInvoke: {
      duration: '667ms',
      easing: 'cubic-bezier(0.13, 0.42, 0, 0.92)',
      _description: 'Bold and emphasizing. Transitions that call attention or reinforce an action should use this curve.'
    },
    
    // Fast Dismiss - Direct and subtle
    fastDismiss: {
      duration: '167ms', // Fast variant
      easing: 'cubic-bezier(0, 0, 0, 1)',
      _description: 'Direct and subtle. Transitions that dismiss a surface without going off screen or within the same area.'
    },
    fastDismissMedium: {
      duration: '333ms',
      easing: 'cubic-bezier(0, 0, 0, 1)',
      _description: 'Medium speed fast dismiss animation'
    },
    fastDismissSlow: {
      duration: '500ms',
      easing: 'cubic-bezier(0, 0, 0, 1)',
      _description: 'Slow speed fast dismiss animation'
    },
    
    // Soft Dismiss - Gentle and mellow
    softDismiss: {
      duration: '167ms',
      easing: 'cubic-bezier(1, 0, 1, 1)',
      _description: 'Gentle and mellow. Transitions that dismiss a surface off screen while confirming a user action.'
    },
    
    // Point to Point - Direct and guiding
    pointToPoint: {
      duration: '167ms', // Fast variant
      easing: 'cubic-bezier(0.33, 0.15, 0, 1)',
      _description: 'Direct and guiding. Transitions that keep the same element on screen going from one place to another.'
    },
    pointToPointMedium: {
      duration: '333ms',
      easing: 'cubic-bezier(0.33, 0.15, 0, 1)',
      _description: 'Medium speed point to point animation'
    },
    pointToPointSlow: {
      duration: '500ms',
      easing: 'cubic-bezier(0.33, 0.15, 0, 1)',
      _description: 'Slow speed point to point animation'
    },
    
    // Fade in + out - Quick and efficient
    fadeIn: {
      duration: '83ms',
      easing: 'linear',
      _description: 'Quick and efficient fade in. Transitions that keep the same element on screen going from one place to another.'
    },
    fadeOut: {
      duration: '83ms',
      easing: 'linear',
      _description: 'Quick and efficient fade out. Transitions that keep the same element on screen going from one place to another.'
    }
  }
};