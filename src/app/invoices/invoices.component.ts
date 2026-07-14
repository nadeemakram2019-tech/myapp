import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { RouterModule } from '@angular/router';

interface Invoice {
  id: string;
  customerName: string;
  customerAvatar: string;
  amount: number;
  currency: string;
  status: 'Paid' | 'Pending' | 'Overdue' | 'Draft' | 'Cancelled';
  issuedDate: string;
  dueDate: string;
  paidDate?: string;
}

@Component({
  selector: 'app-invoices',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, RouterModule],
  templateUrl: './invoices.component.html'
})
export class InvoicesComponent {
  searchQuery = '';

  invoices: Invoice[] = [
    {
      id: 'INV-2026-0042',
      customerName: 'Acme Corporation',
      customerAvatar: 'https://avatar.vercel.sh/Acme%20Corporation.png',
      amount: 284500,
      currency: 'USD',
      status: 'Paid',
      issuedDate: '06/01/2026',
      dueDate: '06/15/2026',
      paidDate: '06/14/2026'
    },
    {
      id: 'INV-2026-0051',
      customerName: 'Northern Lights Retail',
      customerAvatar: 'https://avatar.vercel.sh/Northern%20Lights%20Retail.png',
      amount: 52300,
      currency: 'CAD',
      status: 'Pending',
      issuedDate: '06/05/2026',
      dueDate: '06/20/2026'
    },
    {
      id: 'INV-2026-0067',
      customerName: 'Pacific Tech Solutions',
      customerAvatar: 'https://avatar.vercel.sh/Pacific%20Tech%20Solutions.png',
      amount: 142000,
      currency: 'USD',
      status: 'Overdue',
      issuedDate: '05/10/2026',
      dueDate: '05/24/2026'
    },
    {
      id: 'INV-2026-0058',
      customerName: 'Emily Chen Design',
      customerAvatar: 'https://avatar.vercel.sh/Emily%20Chen%20Design.png',
      amount: 12400,
      currency: 'CAD',
      status: 'Paid',
      issuedDate: '05/28/2026',
      dueDate: '06/11/2026',
      paidDate: '06/10/2026'
    },
    {
      id: 'INV-2026-0071',
      customerName: 'Global Logistics Co',
      customerAvatar: 'https://avatar.vercel.sh/Global%20Logistics%20Co.png',
      amount: 78900,
      currency: 'CAD',
      status: 'Draft',
      issuedDate: '06/10/2026',
      dueDate: '06/25/2026'
    },
    {
      id: 'INV-2026-0062',
      customerName: 'Harbor Industries Ltd',
      customerAvatar: 'https://avatar.vercel.sh/Harbor%20Industries%20Ltd.png',
      amount: 312000,
      currency: 'CAD',
      status: 'Pending',
      issuedDate: '06/12/2026',
      dueDate: '06/26/2026'
    },
    {
      id: 'INV-2026-0075',
      customerName: 'Quantum Health Inc',
      customerAvatar: 'https://avatar.vercel.sh/Quantum%20Health%20Inc.png',
      amount: 46700,
      currency: 'CAD',
      status: 'Cancelled',
      issuedDate: '05/15/2026',
      dueDate: '06/01/2026',
      paidDate: '05/20/2026'
    },
    {
      id: 'INV-2026-0048',
      customerName: 'Acme Corporation',
      customerAvatar: 'https://avatar.vercel.sh/Acme%20Corporation.png',
      amount: 89000,
      currency: 'USD',
      status: 'Overdue',
      issuedDate: '04/20/2026',
      dueDate: '05/04/2026'
    },
    {
      id: 'INV-2026-0035',
      customerName: 'Sarah Johnson',
      customerAvatar: 'https://avatar.vercel.sh/Sarah%20Johnson.png',
      amount: 3200,
      currency: 'USD',
      status: 'Paid',
      issuedDate: '05/22/2026',
      dueDate: '06/05/2026',
      paidDate: '06/03/2026'
    },
    {
      id: 'INV-2026-0080',
      customerName: 'Pacific Tech Solutions',
      customerAvatar: 'https://avatar.vercel.sh/Pacific%20Tech%20Solutions.png',
      amount: 191000,
      currency: 'USD',
      status: 'Draft',
      issuedDate: '06/15/2026',
      dueDate: '06/30/2026'
    }
  ];

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
      .reduce((sum, inv) => sum + inv.amount, 0);
  }

  get filteredInvoices(): Invoice[] {
    if (!this.searchQuery) return this.invoices;
    const q = this.searchQuery.toLowerCase();
    return this.invoices.filter(inv =>
      inv.id.toLowerCase().includes(q) ||
      inv.customerName.toLowerCase().includes(q) ||
      inv.status.toLowerCase().includes(q)
    );
  }

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchQuery = input.value;
  }

  createInvoice() {
    console.log('Opening create invoice form...');
  }

  viewInvoice(id: string) {
    console.log('Viewing invoice:', id);
  }

  formatCurrency(amount: number, currency: string = 'USD'): string {
    return amount.toLocaleString('en-US', { style: 'currency', currency, minimumFractionDigits: 0 });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Paid':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800';
      case 'Pending':
        return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800';
      case 'Overdue':
        return 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-900/20 dark:text-rose-400 dark:border-rose-800';
      case 'Draft':
        return 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700';
      case 'Cancelled':
        return 'bg-gray-50 text-gray-500 border-gray-200 dark:bg-zinc-800 dark:text-zinc-500 dark:border-zinc-700';
      default:
        return '';
    }
  }
}
