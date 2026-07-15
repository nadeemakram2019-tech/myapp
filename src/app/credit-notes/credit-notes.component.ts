import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { RouterModule } from '@angular/router';
import { CreditNoteService, CreditNote } from '../services/credit-note.service';
import { PageHeaderComponent } from '../components/page-header.component';

@Component({
  selector: 'app-credit-notes',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, RouterModule, PageHeaderComponent],
  templateUrl: './credit-notes.component.html'
})
export class CreditNotesComponent implements OnInit {
  searchQuery = '';

  constructor(public creditNoteService: CreditNoteService) {}

  ngOnInit() {
    this.creditNoteService.loadAll();
  }

  get creditNotes() {
    return this.creditNoteService.creditNotes();
  }

  get loading() {
    return this.creditNoteService.loading();
  }

  get totalCreditNotes(): number {
    return this.creditNotes.length;
  }

  get totalIssued(): number {
    return this.creditNotes.filter(cn => cn.status === 'Issued').length;
  }

  get totalApplied(): number {
    return this.creditNotes.filter(cn => cn.status === 'Applied').length;
  }

  get totalAmount(): number {
    return this.creditNotes.reduce((sum, cn) => sum + Number(cn.amount), 0);
  }

  get filteredCreditNotes(): CreditNote[] {
    if (!this.searchQuery) return this.creditNotes;
    const q = this.searchQuery.toLowerCase();
    return this.creditNotes.filter(cn =>
      cn.credit_note_id.toLowerCase().includes(q) ||
      cn.customer_name.toLowerCase().includes(q) ||
      cn.invoice_ref.toLowerCase().includes(q) ||
      (cn.reason || '').toLowerCase().includes(q)
    );
  }

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchQuery = input.value;
  }

  async deleteCreditNote(id: string) {
    if (!confirm('Are you sure you want to delete this credit note?')) return;
    await this.creditNoteService.remove(id);
  }

  formatCurrency(amount: number, currency: string = 'USD'): string {
    return amount.toLocaleString('en-US', { style: 'currency', currency, minimumFractionDigits: 0 });
  }
}
