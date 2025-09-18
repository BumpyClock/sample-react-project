// ABOUTME: Design demo page showcasing design system tokens and components.
// ABOUTME: Updated to use a black full-page background as requested.
'use client';

import React from 'react';
import { ThemeToggle } from '@/components/theme-toggle';
import { useDesignTokens } from '@/design-system/hooks';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function DesignDemoPage() {
  const { base, theme, currentTheme } = useDesignTokens();

  // Add useEffect to debug theme changes
  React.useEffect(() => {
    console.log('Current theme from hook:', currentTheme);
    console.log('data-theme attribute:', document.documentElement.getAttribute('data-theme'));
  }, [currentTheme]);

  return (
    <div className="min-h-screen w-full bg-black text-white">
      <div className="container mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Windows 11 Design System Demo</h1>
          <ThemeToggle />
        </div>

      <div className="space-y-8">
        {/* Current Theme Display */}
        <Card>
          <CardHeader>
            <CardTitle>Current Theme</CardTitle>
            <CardDescription>Active theme mode</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold capitalize">{currentTheme}</p>
          </CardContent>
        </Card>

        {/* Typography Examples */}
        <Card>
          <CardHeader>
            <CardTitle>Typography</CardTitle>
            <CardDescription>Windows 11 type ramp</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="win-type-display">Display</div>
            <div className="win-type-title-large">Title Large</div>
            <div className="win-type-title">Title</div>
            <div className="win-type-subtitle">Subtitle</div>
            <div className="win-type-body-large-strong">Body Large Strong</div>
            <div className="win-type-body-large">Body Large</div>
            <div className="win-type-body-strong">Body Strong</div>
            <div className="win-type-body">Body</div>
            <div className="win-type-caption">Caption</div>
          </CardContent>
        </Card>

        {/* Color Swatches */}
        <Card>
          <CardHeader>
            <CardTitle>Colors</CardTitle>
            <CardDescription>Theme color palette</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-4">
              <div className="space-y-2">
                <h3 className="font-semibold">Text Colors</h3>
                <div className="space-y-1">
                  <div
                    className="h-12 rounded flex items-center px-3"
                    style={{
                      backgroundColor: 'var(--colors-fill-solid-background)',
                      color: 'var(--colors-text-primary)'
                    }}
                  >
                    Primary
                  </div>
                  <div
                    className="h-12 rounded flex items-center px-3"
                    style={{
                      backgroundColor: 'var(--colors-fill-solid-background)',
                      color: 'var(--colors-text-secondary)'
                    }}
                  >
                    Secondary
                  </div>
                  <div
                    className="h-12 rounded flex items-center px-3"
                    style={{
                      backgroundColor: 'var(--colors-fill-solid-background)',
                      color: 'var(--colors-text-tertiary)'
                    }}
                  >
                    Tertiary
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold">Accent Colors</h3>
                <div className="space-y-1">
                  <div
                    className="h-12 rounded flex items-center px-3 text-white"
                    style={{ backgroundColor: 'var(--colors-fill-accent-default)' }}
                  >
                    Accent Default
                  </div>
                  <div
                    className="h-12 rounded flex items-center px-3 text-white"
                    style={{ backgroundColor: 'var(--colors-fill-accent-secondary)' }}
                  >
                    Accent Secondary
                  </div>
                  <div
                    className="h-12 rounded flex items-center px-3 text-white"
                    style={{ backgroundColor: 'var(--colors-fill-accent-tertiary)' }}
                  >
                    Accent Tertiary
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold">System Colors</h3>
                <div className="space-y-1">
                  <div
                    className="h-12 rounded flex items-center px-3 text-white"
                    style={{ backgroundColor: 'var(--colors-fill-system-critical)' }}
                  >
                    Critical
                  </div>
                  <div
                    className="h-12 rounded flex items-center px-3 text-white"
                    style={{ backgroundColor: 'var(--colors-fill-system-success)' }}
                  >
                    Success
                  </div>
                  <div
                    className="h-12 rounded flex items-center px-3 text-white"
                    style={{ backgroundColor: 'var(--colors-fill-system-caution)' }}
                  >
                    Caution
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold">Background</h3>
                <div className="space-y-1">
                  <div
                    className="h-12 rounded flex items-center px-3 border"
                    style={{ backgroundColor: 'var(--colors-background-layer-default)' }}
                  >
                    Default
                  </div>
                  <div
                    className="h-12 rounded flex items-center px-3 border"
                    style={{ backgroundColor: 'var(--colors-background-layer-alt)' }}
                  >
                    Alt
                  </div>
                  <div
                    className="h-12 rounded flex items-center px-3 border"
                    style={{ backgroundColor: 'var(--colors-background-layer-card)' }}
                  >
                    Card
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Spacing Examples */}
        <Card>
          <CardHeader>
            <CardTitle>Spacing</CardTitle>
            <CardDescription>4px base spacing scale</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24].map((scale) => (
                <div key={scale} className="flex items-center gap-4">
                  <span className="w-20 text-sm">Scale {scale}</span>
                  <div
                    className="bg-blue-500 h-4"
                    style={{ width: `calc(var(--spacing-scale-${scale}))` }}
                  />
                  <span className="text-sm opacity-60">var(--spacing-scale-{scale})</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Animation Examples */}
        <Card>
          <CardHeader>
            <CardTitle>Animations</CardTitle>
            <CardDescription>Fluent motion presets</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <Button
                className="win-animate-fast-invoke"
                onClick={(e) => {
                  e.currentTarget.style.animation = 'none';
                  setTimeout(() => {
                    e.currentTarget.style.animation = '';
                  }, 10);
                }}
              >
                Fast Invoke
              </Button>
              <Button
                className="win-animate-strong-invoke"
                onClick={(e) => {
                  e.currentTarget.style.animation = 'none';
                  setTimeout(() => {
                    e.currentTarget.style.animation = '';
                  }, 10);
                }}
              >
                Strong Invoke
              </Button>
              <Button
                className="win-animate-soft-dismiss"
                onClick={(e) => {
                  e.currentTarget.style.animation = 'none';
                  setTimeout(() => {
                    e.currentTarget.style.animation = '';
                  }, 10);
                }}
              >
                Soft Dismiss
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Elevation Examples */}
        <Card>
          <CardHeader>
            <CardTitle>Elevation</CardTitle>
            <CardDescription>Shadow depth levels</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-6">
              <div
                className="h-24 rounded bg-white flex items-center justify-center"
                style={{ boxShadow: 'var(--elevation-low-box-shadow)' }}
              >
                Low
              </div>
              <div
                className="h-24 rounded bg-white flex items-center justify-center"
                style={{ boxShadow: 'var(--elevation-medium-box-shadow)' }}
              >
                Medium
              </div>
              <div
                className="h-24 rounded bg-white flex items-center justify-center"
                style={{ boxShadow: 'var(--elevation-high-box-shadow)' }}
              >
                High
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      </div>
    </div>
  );
}