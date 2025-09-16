// ABOUTME: Token generator - converts TypeScript tokens to CSS custom properties

import { tokens } from './tokens';
import type { ThemeMode } from './types';

interface GeneratorOptions {
  themes?: ThemeMode[];
  outputPath?: string;
}

// Convert camelCase to kebab-case
function toKebabCase(str: string): string {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

// Flatten nested object to CSS custom properties
function flattenTokens(obj: unknown, prefix = ''): Record<string, string> {
  const result: Record<string, string> = {};
  if (!obj || typeof obj !== 'object') return result;
  
  for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
    // Skip private properties
    if (key.startsWith('_')) continue;
    
    const kebabKey = toKebabCase(key);
    const cssVarName = prefix ? `${prefix}-${kebabKey}` : kebabKey;
    
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      // Recursively flatten nested objects
      Object.assign(result, flattenTokens(value, cssVarName));
    } else if (typeof value === 'string' || typeof value === 'number') {
      // Convert to CSS variable
      result[`--${cssVarName}`] = String(value);
    }
  }
  
  return result;
}

// Generate CSS for base tokens
function generateBaseTokensCSS(): string {
  const baseVars = flattenTokens(tokens.base);
  const cssVars = Object.entries(baseVars)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join('\n');
  
  return `:root {\n${cssVars}\n}`;
}

// Generate CSS for theme tokens
function generateThemeCSS(theme: ThemeMode): string {
  const themeVars = flattenTokens(tokens.themes[theme]);
  const cssVars = Object.entries(themeVars)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join('\n');
  
  const selector = theme === 'light' ? ':root' : `[data-theme="${theme}"]`;
  return `${selector} {\n${cssVars}\n}`;
}

// Generate type ramp utility classes
function generateTypeRampCSS(): string {
  const typeRamp = tokens.base.typography.typeRamp;
  const classes: string[] = [];
  
  for (const [name, config] of Object.entries(typeRamp)) {
    const kebabName = toKebabCase(name);
    const fontFamily = tokens.base.typography.fontFamily[config.fontFamily];
    
    classes.push(`
.win-type-${kebabName} {
  font-family: ${fontFamily};
  font-size: ${config.fontSize};
  line-height: ${config.lineHeight};
  font-weight: ${config.fontWeight};
}`);
  }
  
  return classes.join('\n');
}

// Main CSS generation function
export function generateCSS(options: GeneratorOptions = {}): string {
  const { themes: themeList = ['light', 'dark', 'contrast'] } = options;
  const sections: string[] = [];
  
  // Add file header
  sections.push(`/* ABOUTME: Auto-generated design tokens - DO NOT EDIT MANUALLY */
/* Generated on ${new Date().toISOString()} */
`);
  
  // Add @font-face declarations
  sections.push(`/* Font Face Declarations */
@font-face {
  font-family: 'Segoe UI Variable Text';
  src: local('Segoe UI Variable Text'), local('SegoeUIVariable-Text');
  font-weight: 300 700;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Segoe UI Variable Small';
  src: local('Segoe UI Variable Small'), local('SegoeUIVariable-Small');
  font-weight: 300 700;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Segoe UI Variable Display';
  src: local('Segoe UI Variable Display'), local('SegoeUIVariable-Display');
  font-weight: 300 700;
  font-style: normal;
  font-display: swap;
}`);
  
  // Add base tokens
  sections.push('\n/* Base Tokens */');
  sections.push(generateBaseTokensCSS());
  
  // Add theme tokens
  sections.push('\n/* Theme Tokens */');
  themeList.forEach(theme => {
    sections.push(generateThemeCSS(theme));
  });
  
  // Add utility classes
  sections.push('\n/* Typography Utility Classes */');
  sections.push(generateTypeRampCSS());
  
  return sections.join('\n\n');
}

// Generate Tailwind config extension
export function generateTailwindExtensions() {
  
  return {
    colors: {
      // Map color tokens to Tailwind utilities
      'text-primary': 'var(--colors-text-primary)',
      'text-secondary': 'var(--colors-text-secondary)',
      'text-tertiary': 'var(--colors-text-tertiary)',
      'text-disabled': 'var(--colors-text-disabled)',
      'fill-accent': 'var(--colors-fill-accent-default)',
      'fill-control': 'var(--colors-fill-control-default)',
      'bg-layer': 'var(--colors-background-layer-default)',
      'bg-solid': 'var(--colors-background-solid-base)',
    },
    spacing: {
      // Map spacing tokens
      ...Object.fromEntries(
        Object.entries(tokens.base.spacing.scale).map(([key]) => [key, `var(--spacing-scale-${key})`])
      ),
    },
    borderRadius: {
      // Map radius tokens
      ...Object.fromEntries(
        Object.entries(tokens.base.radii).map(([key]) => [key, `var(--radii-${key})`])
      ),
    },
    animation: {
      // Map animation tokens
      'fast-invoke': 'var(--motion-animation-fast-invoke-duration) var(--motion-animation-fast-invoke-easing)',
      'strong-invoke': 'var(--motion-animation-strong-invoke-duration) var(--motion-animation-strong-invoke-easing)',
      'fast-dismiss': 'var(--motion-animation-fast-dismiss-duration) var(--motion-animation-fast-dismiss-easing)',
      'soft-dismiss': 'var(--motion-animation-soft-dismiss-duration) var(--motion-animation-soft-dismiss-easing)',
      'point-to-point': 'var(--motion-animation-point-to-point-duration) var(--motion-animation-point-to-point-easing)',
      'fade': 'var(--motion-animation-fade-in-out-duration) var(--motion-animation-fade-in-out-easing)',
    },
    boxShadow: {
      // Map elevation tokens
      'elevation-low': 'var(--elevation-low-box-shadow)',
      'elevation-medium': 'var(--elevation-medium-box-shadow)',
      'elevation-high': 'var(--elevation-high-box-shadow)',
      'elevation-flyout': 'var(--elevation-flyout-box-shadow)',
      'elevation-dialog': 'var(--elevation-dialog-box-shadow)',
      'elevation-card': 'var(--elevation-card-box-shadow)',
      'elevation-tooltip': 'var(--elevation-tooltip-box-shadow)',
    },
  };
}
