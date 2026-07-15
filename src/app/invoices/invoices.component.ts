import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { RouterModule } from '@angular/router';
import { InvoiceService, Invoice } from '../services/invoice.service';

@Component({
  selector: 'app-invoices',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, RouterModule],
  templateUrl: './invoices.component.html'
})
export class InvoicesComponent implements OnInit {
  searchQuery = '';

  constructor(public invoiceService: InvoiceService) {}

  ngOnInit() {
    this.invoiceService.loadAll();
  }

  get invoices() {
    return this.invoiceService.invoices();
  }

  get loading() {
    return this.invoiceService.loading();
  }

  get totalInvoices(): number {
    return this.invoices.length;
  }

  get totalPending(): number {
    return this.invoices.filter(inv => inv.status === 'Pending').length;
  }

  get totalOverdue(): number {
    return this.invoices.filter(inv => inv.status === 'Overdue').length;
  }

  get totalAmountDue(): number {
    return this.invoices
      .filter(inv => inv.status === 'Pending' || inv.status === 'Overdue')
      .reduce((sum, inv) => sum + Number(inv.amount), 0);
  }

  get filteredInvoices(): Invoice[] {
    if (!this.searchQuery) return this.invoices;
    const q = this.searchQuery.toLowerCase();
    return this.invoices.filter(inv =>
      inv.invoice_id.toLowerCase().includes(q) ||
      inv.customer_name.toLowerCase().includes(q) ||
      inv.status.toLowerCase().includes(q)
    );
  }

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchQuery = input.value;
  }

  createInvoice() {
    console.log('Navigate to create invoice form...');
  }

  async deleteInvoice(invoiceId: string) {
    if (!confirm('Are you sure you want to delete this invoice?')) return;
    const success = await this.invoiceService.remove(invoiceId);
    if (success) console.log('Invoice deleted');
  }

  formatCurrency(amount: number, currency: string = 'USD'): string {
    return amount.toLocaleString('en-US', { style: 'currency', currency, minimumFractionDigits: 0 });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Paid': return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800';
      case 'Pending': return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800';
      case 'Overdue': return 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-900/20 dark:text-rose-400 dark:border-rose-800';
      case 'Draft': return 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700';
      case 'Cancelled': return 'bg-gray-50 text-gray-500 border-gray-200 dark:bg-zinc-800 dark:text-zinc-500 dark:border-zinc-700';
      default: return '';
    }
  }
}
