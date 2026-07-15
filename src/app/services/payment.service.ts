import { Injectable, signal } from '@angular/core';
import { BaseDataService } from './base-data.service';

export interface Payment {
  id: string;
  payment_id: string;
  vendorName: string;
  vendorLogo?: string;
  vendorInitials: string;
  vendorColor: string;
  amount: number;
  currency: string;
  date: string;
  method: string;
  status: 'Completed' | 'Pending' | 'Failed' | 'Processing';
  reference: string;
  billId?: string;
  created_at?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  payments = signal<Payment[]>([]);
  loading = signal(false);

  constructor(private db: BaseDataService) {}

  async loadAll() {
    this.loading.set(true);
    try {
      const data = await this.db.getAll<any>('payments', 'created_at');
      const mapped: Payment[] = data.map((item: any) => ({
        id: item.id,
        payment_id: item.payment_id,
        vendorName: item.vendor_name,
        vendorLogo: item.vendor_logo,
        vendorInitials: item.vendor_initials || '',
        vendorColor: item.vendor_color || 'blue',
        amount: Number(item.amount) || 0,
        currency: item.currency || 'USD',
        date: item.date,
        method: item.method,
        status: item.status || 'Pending',
        reference: item.reference || '',
        billId: item.bill_id,
        created_at: item.created_at
      }));
      this.payments.set(mapped);
    } catch (err) {
      console.error('Error loading payments:', err);
    } finally {
      this.loading.set(false);
    }
  }

  async add(payment: Partial<Payment>): Promise<Payment | null> {
    try {
      const dbRecord: any = {
        vendor_name: payment.vendorName,
        vendor_logo: payment.vendorLogo,
        vendor_initials: payment.vendorInitials,
        vendor_color: payment.vendorColor,
        amount: payment.amount,
        currency: payment.currency,
        date: payment.date,
        method: payment.method,
        status: payment.status,
        reference: payment.reference,
        bill_id: payment.billId
      };
      if (payment.payment_id) dbRecord.payment_id = payment.payment_id;

      const result = await this.db.insert<any>('payments', dbRecord);
      const mapped = this.mapPayment(result);
      this.payments.update(list => [mapped, ...list]);
      return mapped;
    } catch (err) {
      console.error('Error adding payment:', err);
      return null;
    }
  }

  async remove(paymentId: string): Promise<boolean> {
    try {
      await this.db.delete('payments', 'payment_id', paymentId);
      this.payments.update(list => list.filter(p => p.payment_id !== paymentId));
      return true;
    } catch (err) {
      console.error('Error deleting payment:', err);
      return false;
    }
  }

  async update(paymentId: string, updates: Partial<Payment>): Promise<boolean> {
    try {
      const dbUpdates: any = {};
      if (updates.vendorName) dbUpdates.vendor_name = updates.vendorName;
      if (updates.vendorLogo !== undefined) dbUpdates.vendor_logo = updates.vendorLogo;
      if (updates.amount !== undefined) dbUpdates.amount = updates.amount;
      if (updates.currency) dbUpdates.currency = updates.currency;
      if (updates.date) dbUpdates.date = updates.date;
      if (updates.method) dbUpdates.method = updates.method;
      if (updates.status) dbUpdates.status = updates.status;
      if (updates.reference) dbUpdates.reference = updates.reference;
      if (updates.billId !== undefined) dbUpdates.bill_id = updates.billId;

      await this.db.update<any>('payments', 'payment_id', paymentId, dbUpdates);
      this.payments.update(list =>
        list.map(p => p.payment_id === paymentId ? { ...p, ...updates } : p)
      );
      return true;
    } catch (err) {
      console.error('Error updating payment:', err);
      return false;
    }
  }

  private mapPayment(item: any): Payment {
    return {
      id: item.id,
      payment_id: item.payment_id,
      vendorName: item.vendor_name,
      vendorLogo: item.vendor_logo,
      vendorInitials: item.vendor_initials || '',
      vendorColor: item.vendor_color || 'blue',
      amount: Number(item.amount) || 0,
      currency: item.currency || 'USD',
      date: item.date,
      method: item.method,
      status: item.status || 'Pending',
      reference: item.reference || '',
      billId: item.bill_id,
      created_at: item.created_at
    };
  }
}
