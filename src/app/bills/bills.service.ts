import { Injectable, inject } from '@angular/core';
import { signal } from '@angular/core';
import { BaseDataService } from '../services/base-data.service';

export interface Bill {
  id: string;
  bill_id?: string;
  vendorName: string;
  vendorInitials: string;
  vendorColor: string;
  date: string;
  dueDate: string;
  amount: number;
  currency: string;
  status: 'Pending Approval' | 'Approved' | 'Paid' | 'Overdue';
  category: string;
  created_at?: string;
}

@Injectable({ providedIn: 'root' })
export class BillsService {
  private readonly db = inject(BaseDataService);

  bills = signal<Bill[]>([]);
  loading = signal(false);
  error = signal('');

  async loadAll() {
    this.loading.set(true);
    this.error.set('');
    try {
      const data = await this.db.getAll<any>('bills', 'created_at');
      const mapped: Bill[] = data.map((item: any) => ({
        id: item.bill_id || item.id,
        bill_id: item.bill_id,
        vendorName: item.vendor_name,
        vendorInitials: item.vendor_initials || '',
        vendorColor: item.vendor_color || 'blue',
        date: item.date,
        dueDate: item.due_date,
        amount: Number(item.amount) || 0,
        currency: item.currency || 'USD',
        status: item.status || 'Pending Approval',
        category: item.category || 'Other',
        created_at: item.created_at
      }));
      this.bills.set(mapped);
    } catch (err) {
      const message = 'Failed to load bills. Please try again later.';
      this.error.set(message);
      console.error('Error fetching bills:', err);
    } finally {
      this.loading.set(false);
    }
  }

  async add(bill: Partial<Bill>): Promise<Bill | null> {
    try {
      const dbRecord: any = {
        vendor_name: bill.vendorName,
        vendor_initials: bill.vendorInitials,
        vendor_color: bill.vendorColor,
        date: bill.date,
        due_date: bill.dueDate,
        amount: bill.amount,
        currency: bill.currency,
        status: bill.status,
        category: bill.category
      };
      if (bill.bill_id) dbRecord.bill_id = bill.bill_id;

      const result = await this.db.insert<any>('bills', dbRecord);
      const mapped: Bill = {
        id: result.bill_id || result.id,
        bill_id: result.bill_id,
        vendorName: result.vendor_name,
        vendorInitials: result.vendor_initials || '',
        vendorColor: result.vendor_color || 'blue',
        date: result.date,
        dueDate: result.due_date,
        amount: Number(result.amount) || 0,
        currency: result.currency || 'USD',
        status: result.status || 'Pending Approval',
        category: result.category || 'Other',
        created_at: result.created_at
      };
      this.bills.update(list => [mapped, ...list]);
      return mapped;
    } catch (err) {
      console.error('Error adding bill:', err);
      return null;
    }
  }

  async remove(billId: string): Promise<boolean> {
    try {
      await this.db.delete('bills', 'bill_id', billId);
      this.bills.update(list => list.filter(b => b.bill_id !== billId));
      return true;
    } catch (err) {
      console.error('Error deleting bill:', err);
      return false;
    }
  }

  async update(billId: string, updates: Partial<Bill>): Promise<boolean> {
    try {
      const dbUpdates: any = {};
      if (updates.vendorName) dbUpdates.vendor_name = updates.vendorName;
      if (updates.vendorInitials) dbUpdates.vendor_initials = updates.vendorInitials;
      if (updates.vendorColor) dbUpdates.vendor_color = updates.vendorColor;
      if (updates.date) dbUpdates.date = updates.date;
      if (updates.dueDate) dbUpdates.due_date = updates.dueDate;
      if (updates.amount) dbUpdates.amount = updates.amount;
      if (updates.currency) dbUpdates.currency = updates.currency;
      if (updates.status) dbUpdates.status = updates.status;
      if (updates.category) dbUpdates.category = updates.category;

      await this.db.update<any>('bills', 'bill_id', billId, dbUpdates);
      this.bills.update(list =>
        list.map(b => b.bill_id === billId ? { ...b, ...updates } : b)
      );
      return true;
    } catch (err) {
      console.error('Error updating bill:', err);
      return false;
    }
  }
}
