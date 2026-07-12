import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';

interface Payment {
  id: string;
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
}

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './payments.component.html'
})
export class PaymentsComponent {
  tabs = ['All Payments', 'Completed', 'Pending', 'Failed'];
  activeTab = 'All Payments';

  payments: Payment[] = [
    {
      id: 'PMT-001',
      vendorName: 'Acme Supplies Inc.',
      vendorInitials: 'AS',
      vendorColor: 'blue',
      amount: 4500.00,
      currency: 'USD',
      date: '2024-01-15',
      method: 'ACH Transfer',
      status: 'Completed',
      reference: 'REF-78234',
      billId: 'BL-2024-001'
    },
    {
      id: 'PMT-002',
      vendorName: 'Tech Solutions LLC',
      vendorInitials: 'TS',
      vendorColor: 'purple',
      amount: 12500.00,
      currency: 'USD',
      date: '2024-01-14',
      method: 'Wire Transfer',
      status: 'Completed',
      reference: 'REF-78235',
      billId: 'BL-2024-002'
    },
    {
      id: 'PMT-003',
      vendorName: 'Office Depot',
      vendorInitials: 'OD',
      vendorColor: 'emerald',
      amount: 890.50,
      currency: 'USD',
      date: '2024-01-16',
      method: 'Credit Card',
      status: 'Processing',
      reference: 'REF-78236'
    },
    {
      id: 'PMT-004',
      vendorName: 'Global Logistics',
      vendorInitials: 'GL',
      vendorColor: 'orange',
      amount: 7800.00,
      currency: 'USD',
      date: '2024-01-17',
      method: 'ACH Transfer',
      status: 'Pending',
      reference: 'REF-78237'
    },
    {
      id: 'PMT-005',
      vendorName: 'Marketing Pros',
      vendorInitials: 'MP',
      vendorColor: 'rose',
      amount: 3200.00,
      currency: 'USD',
      date: '2024-01-13',
      method: 'Check',
      status: 'Failed',
      reference: 'REF-78238'
    },
    {
      id: 'PMT-006',
      vendorName: 'Cloud Services Ltd',
      vendorInitials: 'CS',
      vendorColor: 'blue',
      amount: 5600.00,
      currency: 'USD',
      date: '2024-01-18',
      method: 'Wire Transfer',
      status: 'Completed',
      reference: 'REF-78239',
      billId: 'BL-2024-003'
    }
  ];

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