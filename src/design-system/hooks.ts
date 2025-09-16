// ABOUTME: React hooks for design system - provides easy access to tokens and theme management

import { useEffect, useState, useMemo, useCallback } from 'react';
import { 
  getCurrentTheme, 
  setTheme as setThemeInternal, 
  subscribeToTheme,
  getTokenValue,
  getCSSVariable
} from './runtime';
import { tokens } from './tokens';
import type { ThemeMode } from './types';

// Hook to get and set current theme
export function useTheme(): [ThemeMode, (theme: ThemeMode) => void] {
  const [theme, setThemeState] = useState<ThemeMode>(getCurrentTheme);
  
  useEffect(() => {
    // Subscribe to theme changes
    const unsubscribe = subscribeToTheme(setThemeState);
    return unsubscribe;
  }, []);
  
  const setTheme = useCallback((newTheme: ThemeMode) => {
    setThemeInternal(newTheme);
  }, []);
  
  return [theme, setTheme];
}

// Hook to get a specific token value
export function useToken(path: string): string {
  const [value, setValue] = useState(() => getTokenValue(path));
  const [theme] = useTheme();
  
  useEffect(() => {
    // Update value when theme changes
    setValue(getTokenValue(path));
  }, [theme, path]);
  
  return value;
}

// Hook to get multiple token values
export function useTokens(paths: string[]): Record<string, string> {
  const [theme] = useTheme();
  
  const values = useMemo(() => {
    const result: Record<string, string> = {};
    paths.forEach(path => {
      result[path] = getTokenValue(path);
    });
    return result;
  }, [theme, paths.join(',')]);
  
  return values;
}

// Hook to get CSS variable value
export function useCSSVariable(variableName: string): string {
  const [value, setValue] = useState(() => getCSSVariable(variableName));
  const [theme] = useTheme();
  
  useEffect(() => {
    setValue(getCSSVariable(variableName));
  }, [theme, variableName]);
  
  return value;
}

// Hook to get typed token objects
export function useDesignTokens() {
  const [theme] = useTheme();
  
  return useMemo(() => ({
    base: tokens.base,
    theme: tokens.themes[theme],
    currentTheme: theme,
  }), [theme]);
}

// Hook for responsive tokens
export function useResponsiveToken(tokenConfig: {
  base: string;
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
  '2xl'?: string;
}): string {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 0
  );
  
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const token = useMemo(() => {
    // Tailwind default breakpoints
    if (windowWidth >= 1536 && tokenConfig['2xl']) return tokenConfig['2xl'];
    if (windowWidth >= 1280 && tokenConfig.xl) return tokenConfig.xl;
    if (windowWidth >= 1024 && tokenConfig.lg) return tokenConfig.lg;
    if (windowWidth >= 768 && tokenConfig.md) return tokenConfig.md;
    if (windowWidth >= 640 && tokenConfig.sm) return tokenConfig.sm;
    return tokenConfig.base;
  }, [windowWidth, tokenConfig]);
  
  return useToken(token);
}

// Hook for animation tokens with play state
export function useAnimation(animationName: keyof typeof tokens.base.motion.animation) {
  const [isPlaying, setIsPlaying] = useState(false);
  const animation = tokens.base.motion.animation[animationName];
  
  const play = useCallback(() => {
    setIsPlaying(true);
    // Reset after animation duration
    setTimeout(() => setIsPlaying(false), parseInt(animation.duration));
  }, [animation.duration]);
  
  return {
    duration: animation.duration,
    easing: animation.easing,
    isPlaying,
    play,
    style: isPlaying ? {
      animationDuration: animation.duration,
      animationTimingFunction: animation.easing,
    } : {},
  };
}

// Hook for elevation with hover state
export function useElevation(
  defaultLevel: 'low' | 'medium' | 'high' | 'card' | 'tooltip' | 'flyout' | 'dialog'
) {
  const [isHovered, setIsHovered] = useState(false);
  const [theme] = useTheme();
  const elevation = tokens.themes[theme].elevation[defaultLevel];
  
  return {
    style: {
      boxShadow: elevation.boxShadow,
      transition: 'box-shadow 200ms ease',
    },
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
    isHovered,
  };
}