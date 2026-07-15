import { Injectable, signal } from '@angular/core';
import { BaseDataService } from './base-data.service';

export interface Invoice {
  id: string;
  invoice_id: string;
  customer_id: string;
  customer_name: string;
  customer_avatar: string;
  amount: number;
  currency: string;
  status: 'Paid' | 'Pending' | 'Overdue' | 'Draft' | 'Cancelled';
  issued_date: string;
  due_date: string;
  paid_date?: string;
  created_at?: string;
}

export interface InvoiceLineItem {
  id: string;
  invoice_id: string;
  description: string;
  quantity: number;
  unit_price: number;
  amount: number;
}

export interface InvoicePayment {
  id: string;
  invoice_id: string;
  date: string;
  method: string;
  amount: number;
  reference: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  invoices = signal<Invoice[]>([]);
  loading = signal(false);

  constructor(private db: BaseDataService) {}

  async loadAll() {
    this.loading.set(true);
    try {
      const data = await this.db.getAll<Invoice>('invoices', 'created_at');
      this.invoices.set(data);
    } catch (err) {
      console.error('Error loading invoices:', err);
    } finally {
      this.loading.set(false);
    }
  }

  async add(invoice: Partial<Invoice>): Promise<Invoice | null> {
    try {
      const newInvoice = await this.db.insert<Invoice>('invoices', invoice);
      this.invoices.update(list => [newInvoice, ...list]);
      return newInvoice;
    } catch (err) {
      console.error('Error adding invoice:', err);
      return null;
    }
  }

  async remove(invoiceId: string): Promise<boolean> {
    try {
      await this.db.delete('invoices', 'invoice_id', invoiceId);
      this.invoices.update(list => list.filter(i => i.invoice_id !== invoiceId));
      return true;
    } catch (err) {
      console.error('Error deleting invoice:', err);
      return false;
    }
  }

  async getLineItems(invoiceId: string): Promise<InvoiceLineItem[]> {
    try {
      return await this.db.getByColumn<InvoiceLineItem>('invoice_line_items', 'invoice_id', invoiceId);
    } catch (err) {
      console.error('Error loading line items:', err);
      return [];
    }
  }

  async getPayments(invoiceId: string): Promise<InvoicePayment[]> {
    try {
      return await this.db.getByColumn<InvoicePayment>('invoice_payments', 'invoice_id', invoiceId);
    } catch (err) {
      console.error('Error loading payments:', err);
      return [];
    }
  }
}
