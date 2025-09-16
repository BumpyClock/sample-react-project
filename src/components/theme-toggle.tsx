'use client';

import { useTheme } from '@/design-system/hooks';
import { Button } from '@/components/ui/button';
import { Monitor, Moon, Sun } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function ThemeToggle() {
  const [theme, setTheme] = useTheme();

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'contrast') => {
    console.log('Setting theme to:', newTheme);
    setTheme(newTheme);
    // Force update the data-theme attribute immediately
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          {theme === 'light' && <Sun className="h-[1.2rem] w-[1.2rem]" />}
          {theme === 'dark' && <Moon className="h-[1.2rem] w-[1.2rem]" />}
          {theme === 'contrast' && <Monitor className="h-[1.2rem] w-[1.2rem]" />}
          <span className="sr-only">Toggle theme (current: {theme})</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => handleThemeChange('light')}
          className={theme === 'light' ? 'bg-accent' : ''}
        >
          <Sun className="mr-2 h-4 w-4" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleThemeChange('dark')}
          className={theme === 'dark' ? 'bg-accent' : ''}
        >
          <Moon className="mr-2 h-4 w-4" />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleThemeChange('contrast')}
          className={theme === 'contrast' ? 'bg-accent' : ''}
        >
          <Monitor className="mr-2 h-4 w-4" />
          High Contrast
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}