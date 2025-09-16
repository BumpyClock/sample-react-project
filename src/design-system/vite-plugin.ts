// ABOUTME: Vite plugin for design token generation - generates CSS at build time

import type { Plugin } from 'vite';
import { generateCSS, generateTailwindExtensions } from './generator';
import fs from 'fs/promises';
import path from 'path';

export function designTokensPlugin(): Plugin {
  const cssOutputPath = 'src/design-system/generated/tokens.css';
  const tailwindOutputPath = 'src/design-system/generated/tailwind-tokens.js';
  
  async function generateTokenFiles() {
    // Ensure output directory exists
    const outputDir = path.dirname(cssOutputPath);
    await fs.mkdir(outputDir, { recursive: true });
    
    // Generate CSS
    const css = generateCSS();
    await fs.writeFile(cssOutputPath, css, 'utf-8');
    console.log(`✅ Generated design tokens CSS: ${cssOutputPath}`);
    
    // Generate Tailwind extensions
    const tailwindConfig = generateTailwindExtensions();
    const tailwindContent = `// ABOUTME: Auto-generated Tailwind extensions - DO NOT EDIT MANUALLY
// Generated on ${new Date().toISOString()}

module.exports = ${JSON.stringify(tailwindConfig, null, 2)};
`;
    await fs.writeFile(tailwindOutputPath, tailwindContent, 'utf-8');
    console.log(`✅ Generated Tailwind extensions: ${tailwindOutputPath}`);
  }
  
  return {
    name: 'design-tokens',
    
    async buildStart() {
      await generateTokenFiles();
    },
    
    async handleHotUpdate({ file, server }) {
      // Watch for changes in token files
      if (file.includes('design-system/tokens/')) {
        console.log('🔄 Design tokens changed, regenerating...');
        await generateTokenFiles();
        
        // Trigger full reload to apply new CSS
        server.ws.send({
          type: 'full-reload',
          path: '*',
        });
      }
    },
    
    configureServer() {
      // Generate tokens on server start
      generateTokenFiles();
    },
  };
}