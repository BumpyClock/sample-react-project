#!/usr/bin/env node
// Script to generate CSS from design tokens

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import tokens directly (we'll inline the generation logic)
const tokens = await import('./tokens/index.js').then(m => m.tokens).catch(() => null);

if (!tokens) {
  console.error('Error: Could not load tokens. Building token structure...');
  process.exit(1);
}

// Convert camelCase to kebab-case
function toKebabCase(str) {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

// Flatten nested object to CSS custom properties
function flattenTokens(obj, prefix = '') {
  const result = {};
  if (!obj || typeof obj !== 'object') return result;

  for (const [key, value] of Object.entries(obj)) {
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
function generateBaseTokensCSS() {
  const baseVars = flattenTokens(tokens.base);
  const cssVars = Object.entries(baseVars)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join('\n');

  return `:root {\n${cssVars}\n}`;
}

// Generate CSS for theme tokens
function generateThemeCSS(theme) {
  const themeVars = flattenTokens(tokens.themes[theme]);
  const cssVars = Object.entries(themeVars)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join('\n');

  const selector = theme === 'light' ? ':root' : `[data-theme="${theme}"]`;
  return `${selector} {\n${cssVars}\n}`;
}

// Generate type ramp utility classes
function generateTypeRampCSS() {
  const typeRamp = tokens.base.typography.typeRamp;
  const classes = [];

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
function generateAnimationCSS() {
  const animations = tokens.base.motion.animation;
  const classes = [];

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
async function generateCSS() {
  const sections = [];

  // Add file header
  sections.push(`/* Auto-generated design tokens - DO NOT EDIT MANUALLY */
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
  for (const theme of ['light', 'dark', 'contrast']) {
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
  const css = await generateCSS();
  const outputPath = path.join(__dirname, 'generated', 'tokens.css');

  // Ensure output directory exists
  await fs.mkdir(path.dirname(outputPath), { recursive: true });

  // Write CSS file
  await fs.writeFile(outputPath, css, 'utf-8');
  console.log(`✅ Generated design tokens CSS: ${outputPath}`);

  // Also generate a Tailwind config helper
  const tailwindConfig = {
    colors: flattenTokens(tokens.themes.light.colors),
    spacing: flattenTokens(tokens.base.spacing),
    borderRadius: flattenTokens(tokens.base.radii),
    animation: Object.entries(tokens.base.motion.animation).reduce((acc, [key, value]) => {
      acc[toKebabCase(key)] = `${value.duration} ${value.easing}`;
      return acc;
    }, {})
  };

  const tailwindOutputPath = path.join(__dirname, 'generated', 'tailwind-tokens.json');
  await fs.writeFile(tailwindOutputPath, JSON.stringify(tailwindConfig, null, 2), 'utf-8');
  console.log(`✅ Generated Tailwind token config: ${tailwindOutputPath}`);

} catch (error) {
  console.error('Error generating tokens:', error);
  process.exit(1);
}