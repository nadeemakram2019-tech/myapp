import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SchedulePaymentService, ScheduledPayment } from '../services/schedule-payment.service';
import { CustomerService, Customer } from '../services/customer.service';

@Component({
  selector: 'app-schedule-payment',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, RouterModule, FormsModule],
  templateUrl: './schedule-payment.component.html'
})
export class SchedulePaymentComponent implements OnInit {
  selectedCustomer = '';
  paymentAmount: number | null = null;
  paymentDate = '';
  paymentMethod = '';
  recurringType = 'None';
  paymentNotes = '';
  showSuccessMessage = false;
  isSubmitting = false;

  paymentMethods = ['ACH Transfer', 'Wire Transfer', 'Credit Card', 'Check', 'Bank Draft'];
  recurringOptions = ['None', 'Weekly', 'Monthly', 'Quarterly'];
  customers: { id: string; name: string }[] = [];

  constructor(
    public schedulePaymentService: SchedulePaymentService,
    private customerService: CustomerService
  ) {}

  ngOnInit() {
    this.schedulePaymentService.loadAll();
    this.customerService.loadAll().then(() => {
      this.customers = this.customerService.customers().map(c => ({
        id: c.customer_id,
        name: c.name
      }));
    });
  }

  get scheduledPayments() {
    return this.schedulePaymentService.scheduledPayments();
  }

  get loading() {
    return this.schedulePaymentService.loading();
  }

  get totalScheduled(): number {
    return this.scheduledPayments.filter(sp => sp.status === 'Scheduled').length;
  }

  get totalScheduledAmount(): number {
    return this.scheduledPayments
      .filter(sp => sp.status === 'Scheduled' || sp.status === 'Processing')
      .reduce((sum, sp) => sum + Number(sp.amount), 0);
  }

  get upcomingThisWeek(): number {
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);
    return this.scheduledPayments.filter(sp => {
      const date = new Date(sp.schedule_date);
      return date >= today && date <= nextWeek && sp.status === 'Scheduled';
    }).length;
  }

  get filteredScheduledPayments(): ScheduledPayment[] {
    return this.scheduledPayments;
  }

  get monthlyRecurring(): number {
    return this.scheduledPayments.filter(sp => sp.recurring === 'Monthly').length;
  }

  async schedulePayment() {
    if (!this.selectedCustomer || !this.paymentAmount || !this.paymentDate || !this.paymentMethod || this.isSubmitting) return;
    this.isSubmitting = true;
    const customer = this.customers.find(c => c.id === this.selectedCustomer);
    await this.schedulePaymentService.add({
      schedule_id: `SCH-${Date.now()}`,
      customer_id: this.selectedCustomer,
      customer_name: customer?.name || 'Unknown',
      customer_avatar: `https://avatar.vercel.sh/${encodeURIComponent(customer?.name || 'Unknown')}.png`,
      amount: this.paymentAmount,
      currency: 'USD',
      schedule_date: this.paymentDate,
      payment_method: this.paymentMethod,
      status: 'Scheduled',
      recurring: this.recurringType as ScheduledPayment['recurring'],
      notes: this.paymentNotes || ''
    });
    this.showSuccessMessage = true;
    setTimeout(() => { this.showSuccessMessage = false; this.isSubmitting = false; }, 3000);
    this.resetForm();
  }

  async cancelSchedule(scheduleId: string) {
    if (!confirm('Are you sure you want to cancel this scheduled payment?')) return;
    await this.schedulePaymentService.update(scheduleId, { status: 'Cancelled' } as any);
  }

  async deleteSchedule(scheduleId: string) {
    if (!confirm('Delete this scheduled payment permanently?')) return;
    await this.schedulePaymentService.remove(scheduleId);
  }

  resetForm() {
    this.selectedCustomer = '';
    this.paymentAmount = null;
    this.paymentDate = '';
    this.paymentMethod = '';
    this.recurringType = 'None';
    this.paymentNotes = '';
  }

  formatCurrency(amount: number, currency: string = 'USD'): string {
    return amount.toLocaleString('en-US', { style: 'currency', currency, minimumFractionDigits: 0 });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Scheduled': return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800';
      case 'Processing': return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800';
      case 'Completed': return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800';
      case 'Cancelled': return 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700';
      default: return '';
    }
  }
}
