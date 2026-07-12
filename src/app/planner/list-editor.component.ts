import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TextareaModule } from 'primeng/textarea';

@Component({
  selector: 'app-list-editor',
  standalone: true,
  imports: [FormsModule, ButtonModule, TextareaModule],
  template: `
    <div class="mb-4 flex items-center justify-between gap-4">
      <h2 class="text-lg font-bold text-foreground transition-theme">{{ title() }}</h2>
      <button pButton type="button" class="border border-border text-foreground hover:bg-muted bg-card !px-3 !py-1.5 text-xs rounded-xl font-semibold transition-theme" (click)="add.emit()">Add</button>
    </div>

    <div class="space-y-3">
      @for (item of items(); track $index; let i = $index) {
        <div class="grid gap-2 sm:grid-cols-[1fr_auto]">
          <label class="sr-only" [for]="editorId + '-' + i">{{ title() }} item {{ i + 1 }}</label>
          <textarea
            pTextarea
            [id]="editorId + '-' + i"
            class="field bg-card border border-border text-foreground rounded-xl shadow-sm focus:ring-2 focus:ring-accent/20 focus:border-accent w-full p-3 text-sm min-h-20 transition-theme"
            [ngModel]="item"
            (ngModelChange)="edit.emit({ index: i, value: $event })"
          ></textarea>
          <button pButton type="button" class="border border-destructive/20 text-destructive hover:bg-destructive/10 hover:border-destructive px-3 py-1.5 text-xs rounded-xl font-semibold transition-theme self-start" (click)="remove.emit(i)">Remove</button>
        </div>
      } @empty {
        <div class="rounded-xl border border-dashed border-border bg-muted/40 p-5 text-sm text-muted-foreground text-center">No items yet. Add one or generate a plan.</div>
      }
    </div>
  `,
  styles: [`
    :host { display: block; }
    .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }
  `]
})
export class ListEditorComponent {
  readonly title = input.required<string>();
  readonly items = input.required<string[]>();
  readonly add = output<void>();
  readonly edit = output<{ index: number; value: string }>();
  readonly remove = output<number>();
  readonly editorId = `list-editor-${Math.random().toString(36).slice(2)}`;
}
