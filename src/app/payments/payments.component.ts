import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { PaymentService, Payment } from '../services/payment.service';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './payments.component.html'
})
export class PaymentsComponent implements OnInit {
  tabs = ['All Payments', 'Completed', 'Pending', 'Failed'];
  activeTab = 'All Payments';

  constructor(public paymentService: PaymentService) {}

  ngOnInit() {
    this.paymentService.loadAll();
  }

  get payments() {
    return this.paymentService.payments();
  }

  get loading() {
    return this.paymentService.loading();
  }

  get totalCompleted(): number {
    return this.payments.filter(p => p.status === 'Completed').length;
  }

  get totalPendingAmount(): number {
    return this.payments
      .filter(p => p.status === 'Pending')
      .reduce((sum, p) => sum + Number(p.amount), 0);
  }

  get totalFailedAmount(): number {
    return this.payments
      .filter(p => p.status === 'Failed')
      .reduce((sum, p) => sum + Number(p.amount), 0);
  }

  get filteredPayments(): Payment[] {
    if (this.activeTab === 'All Payments') {
      return this.payments;
    }
    return this.payments.filter(p => p.status === this.activeTab);
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'Completed':
        return 'bg-emerald-100/70 border-emerald-200 text-emerald-700';
      case 'Pending':
        return 'bg-amber-100/70 border-amber-200 text-amber-700';
      case 'Failed':
        return 'bg-rose-100/70 border-rose-200 text-rose-700';
      case 'Processing':
        return 'bg-blue-100/70 border-blue-200 text-blue-700';
      default:
        return 'bg-slate-100 border-slate-200 text-slate-700';
    }
  }

  getMethodIcon(method: string): string {
    switch (method) {
      case 'ACH Transfer':
        return 'arrow-right-left';
      case 'Wire Transfer':
        return 'send';
      case 'Credit Card':
        return 'credit-card';
      case 'Check':
        return 'file-text';
      default:
        return 'wallet';
    }
  }
}
