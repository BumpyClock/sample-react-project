// ABOUTME: Runtime token manager - handles dynamic theme switching and token access

import type { ThemeMode } from './types';

const THEME_STORAGE_KEY = 'theme';
const THEME_DATA_ATTRIBUTE = 'data-theme';
const VALID_THEMES: readonly ThemeMode[] = ['light', 'dark', 'contrast'];

type ThemeListener = (theme: ThemeMode) => void;

let currentThemeRef: ThemeMode | null = null;
const listeners = new Set<ThemeListener>();
let bootstrapped = false;
let systemListenerCleanup: (() => void) | null = null;
let queuedExplicitPersistence = false;

const isWindowAvailable = (): boolean => typeof window !== 'undefined';
const isDocumentAvailable = (): boolean => typeof document !== 'undefined';

function asTheme(value: unknown): ThemeMode | null {
  return VALID_THEMES.includes(value as ThemeMode) ? (value as ThemeMode) : null;
}

function getDocument(): Document | null {
  return isDocumentAvailable() ? document : null;
}

function getWindow(): Window | null {
  return isWindowAvailable() ? window : null;
}

function getRootElement(): Element | null {
  const doc = getDocument();
  return doc?.documentElement ?? null;
}

function safeLocalStorage(): Storage | null {
  const win = getWindow();
  if (!win) {
    return null;
  }
  try {
    return win.localStorage;
  } catch {
    return null;
  }
}

function readStoredTheme(): ThemeMode | null {
  const storage = safeLocalStorage();
  if (!storage) {
    return null;
  }
  try {
    const value = storage.getItem(THEME_STORAGE_KEY);
    const theme = asTheme(value);
    if (!theme && value) {
      storage.removeItem(THEME_STORAGE_KEY);
    }
    return theme;
  } catch {
    return null;
  }
}

function writeStoredTheme(theme: ThemeMode): void {
  const storage = safeLocalStorage();
  if (!storage) {
    return;
  }
  try {
    storage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Ignored: storage can be unavailable in private browsing or server contexts.
  }
}

function readDomTheme(): ThemeMode | null {
  const root = getRootElement();
  if (!root) {
    return null;
  }
  return asTheme(root.getAttribute(THEME_DATA_ATTRIBUTE));
}

interface MediaQueryWithListeners extends MediaQueryList {
  addEventListener?: (type: 'change', listener: (event: MediaQueryListEvent) => void) => void;
  removeEventListener?: (type: 'change', listener: (event: MediaQueryListEvent) => void) => void;
}

function matchMediaSafe(query: string): MediaQueryWithListeners | null {
  const win = getWindow();
  if (!win || typeof win.matchMedia !== 'function') {
    return null;
  }
  try {
    return win.matchMedia(query) as MediaQueryWithListeners;
  } catch {
    return null;
  }
}

function detectSystemTheme(): ThemeMode | null {
  const forcedColors = matchMediaSafe('(forced-colors: active)');
  if (forcedColors?.matches) {
    return 'contrast';
  }
  const prefersDark = matchMediaSafe('(prefers-color-scheme: dark)');
  if (prefersDark?.matches) {
    return 'dark';
  }
  const prefersLight = matchMediaSafe('(prefers-color-scheme: light)');
  if (prefersLight?.matches) {
    return 'light';
  }
  return null;
}

interface BootThemeResolution {
  theme: ThemeMode;
  persisted: ThemeMode | null;
}

function resolveBootTheme(): BootThemeResolution {
  const persisted = readStoredTheme();
  if (persisted) {
    return { theme: persisted, persisted };
  }
  const domTheme = readDomTheme();
  if (domTheme) {
    return { theme: domTheme, persisted: null };
  }
  const systemTheme = detectSystemTheme();
  if (systemTheme) {
    return { theme: systemTheme, persisted: null };
  }
  return { theme: 'light', persisted: null };
}

interface CommitThemeOptions {
  persist: boolean;
  notify: boolean;
  persistedValue?: ThemeMode | null;
}

function commitTheme(theme: ThemeMode, options: CommitThemeOptions): void {
  const { persist, notify, persistedValue } = options;
  const root = getRootElement();
  if (root && root.getAttribute(THEME_DATA_ATTRIBUTE) !== theme) {
    root.setAttribute(THEME_DATA_ATTRIBUTE, theme);
  }
  if (persist) {
    const stored = persistedValue ?? readStoredTheme();
    if (stored !== theme) {
      writeStoredTheme(theme);
    }
  }
  if (notify) {
    listeners.forEach(listener => listener(theme));
  }
}

function ensureSystemListeners(): void {
  if (systemListenerCleanup || !isWindowAvailable()) {
    return;
  }

  const queries = [
    matchMediaSafe('(prefers-color-scheme: dark)'),
    matchMediaSafe('(prefers-color-scheme: light)'),
    matchMediaSafe('(forced-colors: active)'),
  ].filter(Boolean) as MediaQueryWithListeners[];

  if (!queries.length) {
    return;
  }

  const handleChange = () => {
    if (readStoredTheme()) {
      return;
    }
    const nextTheme = detectSystemTheme() ?? 'light';
    if (currentThemeRef === nextTheme) {
      return;
    }
    currentThemeRef = nextTheme;
    commitTheme(nextTheme, { persist: false, notify: true });
  };

  queries.forEach(query => {
    if (typeof query.addEventListener === 'function') {
      query.addEventListener('change', handleChange);
    } else if (typeof query.addListener === 'function') {
      query.addListener(handleChange);
    }
  });

  systemListenerCleanup = () => {
    queries.forEach(query => {
      if (typeof query.removeEventListener === 'function') {
        query.removeEventListener('change', handleChange);
      } else if (typeof query.removeListener === 'function') {
        query.removeListener(handleChange);
      }
    });
  };
}

export function getCurrentTheme(): ThemeMode {
  if (currentThemeRef) {
    return currentThemeRef;
  }
  const { theme } = resolveBootTheme();
  currentThemeRef = theme;
  return theme;
}

export function setTheme(theme: ThemeMode): void {
  if (currentThemeRef === theme) {
    return;
  }

  currentThemeRef = theme;
  queuedExplicitPersistence = !safeLocalStorage();
  commitTheme(theme, { persist: true, notify: true });
}

export function subscribeToTheme(listener: ThemeListener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function initializeTheme(): void {
  if (bootstrapped) {
    return;
  }

  const { theme, persisted } = resolveBootTheme();
  if (currentThemeRef === null) {
    currentThemeRef = theme;
  }

  const shouldPersist = queuedExplicitPersistence || Boolean(persisted);
  commitTheme(currentThemeRef, {
    persist: shouldPersist,
    notify: false,
    persistedValue: shouldPersist ? (persisted ?? null) : null,
  });

  queuedExplicitPersistence = false;
  ensureSystemListeners();
  bootstrapped = true;
}

export function getCSSVariable(variableName: string): string {
  const doc = getDocument();
  const win = getWindow();
  if (!doc || !win) {
    return '';
  }
  const computed = win.getComputedStyle(doc.documentElement);
  const value = computed.getPropertyValue(variableName);
  return value.trim();
}

export function setCSSVariable(variableName: string, value: string): void {
  const root = getRootElement() as HTMLElement | null;
  if (!root) {
    return;
  }
  root.style.setProperty(variableName, value);
}

export function getTokenValue(path: string): string {
  const cssVarName = `--${path.replace(/\./g, '-')}`;
  return getCSSVariable(cssVarName);
}

export function updateTokens(updates: Record<string, string>): void {
  Object.entries(updates).forEach(([path, value]) => {
    const cssVarName = `--${path.replace(/\./g, '-')}`;
    setCSSVariable(cssVarName, value);
  });
}

export function getResponsiveToken(tokens: {
  base: string;
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
  '2xl'?: string;
}): string {
  return getTokenValue(tokens.base);
}

if (isWindowAvailable() && isDocumentAvailable()) {
  const doc = document;
  if (doc.readyState === 'loading') {
    const boot = () => initializeTheme();
    doc.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    initializeTheme();
  }
}




