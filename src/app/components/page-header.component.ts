import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  template: `
    <div class="px-6 lg:px-10 py-6 border-b border-border bg-card shrink-0">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4 min-w-0">
          @if (backRoute) {
            <a [routerLink]="backRoute">
              <button class="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 w-9 rounded-xl">
                <lucide-icon name="arrow-left" class="w-4 h-4"></lucide-icon>
              </button>
            </a>
          }
          @if (iconName) {
            <div class="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                 [class]="iconBg">
              <lucide-icon [name]="iconName" class="w-6 h-6" [class]="iconColor"></lucide-icon>
            </div>
          }
          <div class="min-w-0">
            <h1 class="text-2xl font-bold text-foreground tracking-tight truncate">{{ title }}</h1>
            @if (subtitle) {
              <p class="text-sm text-muted-foreground truncate">{{ subtitle }}</p>
            }
          </div>
        </div>
        <div class="flex items-center gap-3 shrink-0 ml-4">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `
})
export class PageHeaderComponent {
  @Input() backRoute?: string;
  @Input() iconName?: string;
  @Input() iconBg = 'bg-blue-100 dark:bg-blue-900/40';
  @Input() iconColor = 'text-blue-600 dark:text-blue-400';
  @Input() title = '';
  @Input() subtitle = '';
}
