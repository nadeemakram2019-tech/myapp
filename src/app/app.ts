import { Component, effect, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, LucideAngularModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  darkMode = signal<boolean>(false);
  sidebarCollapsed = signal<boolean>(false);
  customersDropdownOpen = signal<boolean>(false);

  constructor() {
    // Determine the initial dark mode preference
    let initialDarkMode = false;
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme) {
        initialDarkMode = storedTheme === 'dark';
      } else {
        initialDarkMode = (window.matchMedia && typeof window.matchMedia === 'function') ? window.matchMedia('(prefers-color-scheme: dark)').matches : false;
      }
    this.darkMode.set(initialDarkMode);

    // Synchronize darkMode signal with localStorage and root element class
    effect(() => {
      const isDark = this.darkMode();
      if (typeof document !== 'undefined') {
        if (isDark) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
      }
    });
  }
  }
  toggleDarkMode() {
    this.darkMode.update(prev => !prev);
  }
  toggleSidebar() {
    this.sidebarCollapsed.update(prev => !prev);
  }
  toggleCustomersDropdown() {
    this.customersDropdownOpen.update(prev => !prev);
  }
}

