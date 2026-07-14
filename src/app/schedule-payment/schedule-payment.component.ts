import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Customer {
  id: string;
  name: string;
}

interface ScheduledPayment {
  id: string;
  customerName: string;
  customerAvatar: string;
  amount: number;
  currency: string;
  scheduleDate: string;
  paymentMethod: string;
  status: 'Scheduled' | 'Processing' | 'Completed' | 'Cancelled';
  recurring: 'None' | 'Weekly' | 'Monthly' | 'Quarterly';
  notes: string;
  createdAt: string;
}

@Component({
  selector: 'app-schedule-payment',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, RouterModule, FormsModule],
  templateUrl: './schedule-payment.component.html'
})
export class SchedulePaymentComponent {
  // Form fields
  selectedCustomer = '';
  paymentAmount: number | null = null;
  paymentDate = '';
  paymentMethod = '';
  recurringType = 'None';
  paymentNotes = '';

  showSuccessMessage = false;
  isSubmitting = false;

  customers: Customer[] = [
    { id: 'CUST-001', name: 'Acme Corporation' },
    { id: 'CUST-002', name: 'Northern Lights Retail' },
    { id: 'CUST-004', name: 'Pacific Tech Solutions' },
    { id: 'CUST-007', name: 'Global Logistics Co' },
    { id: 'CUST-009', name: 'Harbor Industries Ltd' },
    { id: 'CUST-003', name: 'Sarah Johnson' }
  ];

  paymentMethods = ['ACH Transfer', 'Wire Transfer', 'Credit Card', 'Check', 'Bank Draft'];
  recurringOptions = ['None', 'Weekly', 'Monthly', 'Quarterly'];

  scheduledPayments: ScheduledPayment[] = [
    {
      id: 'SCH-2026-0001',
      customerName: 'Acme Corporation',
      customerAvatar: 'https://avatar.vercel.sh/Acme%20Corporation.png',
      amount: 284500,
      currency: 'USD',
      scheduleDate: '2026-07-01',
      paymentMethod: 'ACH Transfer',
      status: 'Scheduled',
      recurring: 'Monthly',
      notes: 'Monthly retainer payment - Enterprise License',
      createdAt: '2026-06-15'
    },
    {
      id: 'SCH-2026-0002',
      customerName: 'Pacific Tech Solutions',
      customerAvatar: 'https://avatar.vercel.sh/Pacific%20Tech%20Solutions.png',
      amount: 50000,
      currency: 'USD',
      scheduleDate: '2026-06-28',
      paymentMethod: 'Wire Transfer',
      status: 'Processing',
      recurring: 'None',
      notes: 'Q3 Infrastructure deposit',
      createdAt: '2026-06-20'
    },
    {
      id: 'SCH-2026-0003',
      customerName: 'Global Logistics Co',
      customerAvatar: 'https://avatar.vercel.sh/Global%20Logistics%20Co.png',
      amount: 12500,
      currency: 'CAD',
      scheduleDate: '2026-07-05',
      paymentMethod: 'Credit Card',
      status: 'Scheduled',
      recurring: 'Weekly',
      notes: 'Weekly logistics support fee',
      createdAt: '2026-06-18'
    },
    {
      id: 'SCH-2026-0004',
      customerName: 'Northern Lights Retail',
      customerAvatar: 'https://avatar.vercel.sh/Northern%20Lights%20Retail.png',
      amount: 8750,
      currency: 'CAD',
      scheduleDate: '2026-07-15',
      paymentMethod: 'ACH Transfer',
      status: 'Scheduled',
      recurring: 'Quarterly',
      notes: 'Quarterly maintenance fee',
      createdAt: '2026-06-22'
    },
    {
      id: 'SCH-2026-0005',
      customerName: 'Sarah Johnson',
      customerAvatar: 'https://avatar.vercel.sh/Sarah%20Johnson.png',
      amount: 3200,
      currency: 'USD',
      scheduleDate: '2026-06-25',
      paymentMethod: 'Check',
      status: 'Completed',
      recurring: 'None',
      notes: 'Consulting services invoice INV-2026-0035',
      createdAt: '2026-06-10'
    }
  ];

  get totalScheduled(): number {
    return this.scheduledPayments.filter(sp => sp.status === 'Scheduled').length;
  }

  get totalScheduledAmount(): number {
    return this.scheduledPayments
      .filter(sp => sp.status === 'Scheduled' || sp.status === 'Processing')
      .reduce((sum, sp) => sum + sp.amount, 0);
  }

  get upcomingThisWeek(): number {
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);
    return this.scheduledPayments.filter(sp => {
      const date = new Date(sp.scheduleDate);
      return date >= today && date <= nextWeek && sp.status === 'Scheduled';
    }).length;
  }

  get monthlyRecurring(): number {
    return this.scheduledPayments.filter(sp => sp.recurring === 'Monthly').length;
  }

  get filteredScheduledPayments(): ScheduledPayment[] {
    return this.scheduledPayments;
  }

  schedulePayment() {
    if (!this.selectedCustomer || !this.paymentAmount || !this.paymentDate || !this.paymentMethod || this.isSubmitting) {
      return;
    }
    this.isSubmitting = true;
    const customer = this.customers.find(c => c.id === this.selectedCustomer);
    const newPayment: ScheduledPayment = {
      id: `SCH-2026-${String(this.scheduledPayments.length + 1).padStart(4, '0')}`,
      customerName: customer?.name || 'Unknown',
      customerAvatar: `https://avatar.vercel.sh/${customer?.name || 'Unknown'}.png`,
      amount: this.paymentAmount,
      currency: 'USD',
      scheduleDate: this.paymentDate,
      paymentMethod: this.paymentMethod,
      status: 'Scheduled',
      recurring: this.recurringType as ScheduledPayment['recurring'],
      notes: this.paymentNotes || 'N/A',
      createdAt: new Date().toISOString().split('T')[0]
    };
    this.scheduledPayments.unshift(newPayment);
    this.showSuccessMessage = true;
    setTimeout(() => {
      this.showSuccessMessage = false;
      this.isSubmitting = false;
    }, 3000);
    this.resetForm();
  }

  resetForm() {
    this.selectedCustomer = '';
    this.paymentAmount = null;
    this.paymentDate = '';
    this.paymentMethod = '';
    this.recurringType = 'None';
    this.paymentNotes = '';
  }

  cancelSchedule(id: string) {
    const payment = this.scheduledPayments.find(sp => sp.id === id);
    if (payment && confirm('Are you sure you want to cancel this scheduled payment?')) {
      payment.status = 'Cancelled';
    }
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
