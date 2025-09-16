// Script to generate CSS from design tokens
import fs from 'fs';
import path from 'path';
import { tokens } from '../src/design-system/tokens';
import type { ThemeMode } from '../src/design-system/types';

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

// Generate animation utility classes
function generateAnimationCSS(): string {
  const animations = tokens.base.motion.animation;
  const classes: string[] = [];

  for (const [name, config] of Object.entries(animations)) {
    const kebabName = toKebabCase(name);
    classes.push(`
.win-animate-${kebabName} {
  animation-duration: ${config.duration};
  animation-timing-function: ${config.easing};
}`);
  }

  return classes.join('\n');
}

// Main CSS generation
function generateCSS(): string {
  const sections: string[] = [];

  // Add file header
  sections.push(`/* Auto-generated Windows 11 design tokens - DO NOT EDIT MANUALLY */
/* Generated on ${new Date().toISOString()} */
`);

  // Add @font-face declarations
  sections.push(`/* Font Face Declarations */
@font-face {
  font-family: 'Segoe UI Variable Text';
  src: local('Segoe UI Variable Text'), local('SegoeUIVariable-Text'), local('Segoe UI'), local('-apple-system'), local('BlinkMacSystemFont');
  font-weight: 300 700;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Segoe UI Variable Small';
  src: local('Segoe UI Variable Small'), local('SegoeUIVariable-Small'), local('Segoe UI'), local('-apple-system'), local('BlinkMacSystemFont');
  font-weight: 300 700;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Segoe UI Variable Display';
  src: local('Segoe UI Variable Display'), local('SegoeUIVariable-Display'), local('Segoe UI'), local('-apple-system'), local('BlinkMacSystemFont');
  font-weight: 300 700;
  font-style: normal;
  font-display: swap;
}
`);

  // Add base tokens
  sections.push('/* Base Tokens */');
  sections.push(generateBaseTokensCSS());
  sections.push('');

  // Add theme tokens
  sections.push('/* Theme Tokens */');
  const themes: ThemeMode[] = ['light', 'dark', 'contrast'];
  for (const theme of themes) {
    sections.push(generateThemeCSS(theme));
    sections.push('');
  }

  // Add utility classes
  sections.push('/* Typography Utility Classes */');
  sections.push(generateTypeRampCSS());
  sections.push('');

  sections.push('/* Animation Utility Classes */');
  sections.push(generateAnimationCSS());

  return sections.join('\n');
}

// Execute generation
try {
  const css = generateCSS();
  const outputDir = path.join(__dirname, '..', 'src', 'design-system', 'generated');
  const outputPath = path.join(outputDir, 'tokens.css');

  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Write CSS file
  fs.writeFileSync(outputPath, css, 'utf-8');
  console.log(`✅ Generated design tokens CSS: ${outputPath}`);

  // Also generate a Tailwind config helper
  const tailwindConfig = {
    colors: flattenTokens(tokens.themes.light.colors),
    spacing: flattenTokens(tokens.base.spacing),
    borderRadius: flattenTokens(tokens.base.radii),
    animation: Object.entries(tokens.base.motion.animation).reduce((acc, [key, value]) => {
      acc[toKebabCase(key)] = `${value.duration} ${value.easing}`;
      return acc;
    }, {} as Record<string, string>)
  };

  const tailwindOutputPath = path.join(outputDir, 'tailwind-tokens.json');
  fs.writeFileSync(tailwindOutputPath, JSON.stringify(tailwindConfig, null, 2), 'utf-8');
  console.log(`✅ Generated Tailwind token config: ${tailwindOutputPath}`);

} catch (error) {
  console.error('Error generating tokens:', error);
  process.exit(1);
}