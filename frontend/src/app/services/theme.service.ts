import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  isDark = signal(true);

  constructor() {
    const saved = localStorage.getItem('theme');
    if (saved === 'light') {
      this.setLight();
    } else {
      this.setDark();
    }
  }

  toggle(): void {
    if (this.isDark()) {
      this.setLight();
    } else {
      this.setDark();
    }
  }

  private setDark(): void {
    document.documentElement.classList.remove('light-theme');
    localStorage.setItem('theme', 'dark');
    this.isDark.set(true);
  }

  private setLight(): void {
    document.documentElement.classList.add('light-theme');
    localStorage.setItem('theme', 'light');
    this.isDark.set(false);
  }
}
