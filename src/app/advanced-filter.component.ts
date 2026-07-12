import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-advanced-filter',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './advanced-filter.component.html'
})
export class AdvancedFilterComponent {
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }
}