import { Injectable, computed, signal } from '@angular/core';
import { environment } from '../../environments/environment';

type AppTheme = 'material' | 'custom';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly activeTheme = signal<AppTheme>(environment.useMaterialTheme ? 'material' : 'custom');

  readonly themeClass = computed(() =>
    this.activeTheme() === 'material' ? 'material-theme' : 'custom-theme'
  );

  constructor() {
    this.applyThemeClass(this.themeClass());
  }

  toggleTheme() {
    const nextTheme = this.activeTheme() === 'material' ? 'custom' : 'material';
    this.activeTheme.set(nextTheme);
    this.applyThemeClass(this.themeClass());
  }

  private applyThemeClass(themeClass: string) {
    const body = document.body;
    body.classList.remove('material-theme', 'custom-theme');
    body.classList.add(themeClass);
  }
}
