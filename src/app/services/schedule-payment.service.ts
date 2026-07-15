import { Injectable, signal } from '@angular/core';
import { BaseDataService } from './base-data.service';

export interface ScheduledPayment {
  id: string;
  schedule_id: string;
  customer_id: string;
  customer_name: string;
  customer_avatar: string;
  amount: number;
  currency: string;
  schedule_date: string;
  payment_method: string;
  status: 'Scheduled' | 'Processing' | 'Completed' | 'Cancelled';
  recurring: 'None' | 'Weekly' | 'Monthly' | 'Quarterly';
  notes: string;
  created_at?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SchedulePaymentService {
  scheduledPayments = signal<ScheduledPayment[]>([]);
  loading = signal(false);

  constructor(private db: BaseDataService) {}

  async loadAll() {
    this.loading.set(true);
    try {
      const data = await this.db.getAll<ScheduledPayment>('scheduled_payments', 'created_at');
      this.scheduledPayments.set(data);
    } catch (err) {
      console.error('Error loading scheduled payments:', err);
    } finally {
      this.loading.set(false);
    }
  }

  async add(payment: Partial<ScheduledPayment>): Promise<ScheduledPayment | null> {
    try {
      const newPayment = await this.db.insert<ScheduledPayment>('scheduled_payments', payment);
      this.scheduledPayments.update(list => [newPayment, ...list]);
      return newPayment;
    } catch (err) {
      console.error('Error scheduling payment:', err);
      return null;
    }
  }

  async remove(scheduleId: string): Promise<boolean> {
    try {
      await this.db.delete('scheduled_payments', 'schedule_id', scheduleId);
      this.scheduledPayments.update(list => list.filter(sp => sp.schedule_id !== scheduleId));
      return true;
    } catch (err) {
      console.error('Error deleting scheduled payment:', err);
      return false;
    }
  }

  async update(scheduleId: string, updates: Partial<ScheduledPayment>): Promise<boolean> {
    try {
      await this.db.update<ScheduledPayment>('scheduled_payments', 'schedule_id', scheduleId, updates);
      this.scheduledPayments.update(list =>
        list.map(sp => sp.schedule_id === scheduleId ? { ...sp, ...updates } : sp)
      );
      return true;
    } catch (err) {
      console.error('Error updating scheduled payment:', err);
      return false;
    }
  }
}
