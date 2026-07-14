import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';

interface LineItem {
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

interface PaymentRecord {
  date: string;
  method: string;
  amount: number;
  reference: string;
  status: string;
}

interface InvoiceDetail {
  id: string;
  customerName: string;
  customerAvatar: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  companyAddress: string;
  amount: number;
  currency: string;
  status: 'Paid' | 'Pending' | 'Overdue' | 'Draft' | 'Cancelled';
  issuedDate: string;
  dueDate: string;
  paidDate?: string;
  poNumber?: string;
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  total: number;
  notes: string;
  terms: string;
  lineItems: LineItem[];
  payments: PaymentRecord[];
}

@Component({
  selector: 'app-invoice-view',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, RouterModule],
  templateUrl: './invoice-view.component.html'
})
export class InvoiceViewComponent implements OnInit {
  invoiceId: string = '';
  invoice: InvoiceDetail | null = null;

  fullInvoiceData: InvoiceDetail[] = [
    {
      id: 'INV-2026-0042',
      customerName: 'Acme Corporation',
      customerAvatar: 'https://avatar.vercel.sh/Acme%20Corporation.png',
      customerEmail: 'billing@acmecorp.com',
      customerPhone: '+1-555-0101',
      customerAddress: '123 Business Ave, Suite 400\nNew York, NY 10001\nUnited States',
      companyAddress: 'AR Accounts Inc.\n456 Finance Street\nToronto, ON M5H 2N2\nCanada',
      amount: 284500,
      currency: 'USD',
      status: 'Paid',
      issuedDate: 'June 1, 2026',
      dueDate: 'June 15, 2026',
      paidDate: 'June 14, 2026',
      poNumber: 'PO-2026-0891',
      subtotal: 260000,
      taxRate: 0.0942,
      taxAmount: 24500,
      total: 284500,
      notes: 'Thank you for your business! Payment is due within 15 days from the invoice date.',
      terms: 'Net 15 - Payment due within 15 days of invoice date.',
      lineItems: [
        { description: 'Enterprise Software License - Annual Renewal', quantity: 1, unitPrice: 180000, amount: 180000 },
        { description: 'Cloud Infrastructure Hosting - Q3 2026', quantity: 3, unitPrice: 15000, amount: 45000 },
        { description: 'Premium Support Package - 24/7', quantity: 12, unitPrice: 2500, amount: 30000 },
        { description: 'Data Migration Services', quantity: 1, unitPrice: 5000, amount: 5000 }
      ],
      payments: [
        { date: 'June 14, 2026', method: 'Wire Transfer', amount: 284500, reference: 'WF-3847291', status: 'Cleared' }
      ]
    },
    {
      id: 'INV-2026-0051',
      customerName: 'Northern Lights Retail',
      customerAvatar: 'https://avatar.vercel.sh/Northern%20Lights%20Retail.png',
      customerEmail: 'orders@northernlights.ca',
      customerPhone: '+1-555-0102',
      customerAddress: '789 Queen Street West\nToronto, ON M5V 1A1\nCanada',
      companyAddress: 'AR Accounts Inc.\n456 Finance Street\nToronto, ON M5H 2N2\nCanada',
      amount: 52300,
      currency: 'CAD',
      status: 'Pending',
      issuedDate: 'June 5, 2026',
      dueDate: 'June 20, 2026',
      poNumber: 'PO-2026-0902',
      subtotal: 48000,
      taxRate: 0.13,
      taxAmount: 4300,
      total: 52300,
      notes: 'Please include the PO number with your payment.',
      terms: 'Net 15 - Payment due within 15 days of invoice date.',
      lineItems: [
        { description: 'Inventory Management Suite - Monthly', quantity: 6, unitPrice: 5000, amount: 30000 },
        { description: 'POS Integration Module', quantity: 1, unitPrice: 12000, amount: 12000 },
        { description: 'Staff Training Sessions (4 hours)', quantity: 4, unitPrice: 1500, amount: 6000 }
      ],
      payments: []
    },
    {
      id: 'INV-2026-0067',
      customerName: 'Pacific Tech Solutions',
      customerAvatar: 'https://avatar.vercel.sh/Pacific%20Tech%20Solutions.png',
      customerEmail: 'billing@pacifictech.io',
      customerPhone: '+1-555-0104',
      customerAddress: '321 Innovation Drive\nSan Francisco, CA 94105\nUnited States',
      companyAddress: 'AR Accounts Inc.\n456 Finance Street\nToronto, ON M5H 2N2\nCanada',
      amount: 142000,
      currency: 'USD',
      status: 'Overdue',
      issuedDate: 'May 10, 2026',
      dueDate: 'May 24, 2026',
      subtotal: 130000,
      taxRate: 0.0923,
      taxAmount: 12000,
      total: 142000,
      notes: 'Late payment fees may apply. Please remit payment at your earliest convenience.',
      terms: 'Net 15 - 2% interest per month on overdue balances.',
      lineItems: [
        { description: 'Infrastructure Monitoring Platform - Annual', quantity: 1, unitPrice: 85000, amount: 85000 },
        { description: 'DevOps Consulting (40 hours)', quantity: 40, unitPrice: 875, amount: 35000 },
        { description: 'Security Audit & Compliance Check', quantity: 1, unitPrice: 10000, amount: 10000 }
      ],
      payments: []
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.invoiceId = params.get('id') || '';
      this.invoice = this.fullInvoiceData.find(inv => inv.id === this.invoiceId) || null;
    });
  }

  goBack() {
    this.router.navigate(['/invoices']);
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

  getStatusIcon(status: string): string {
    switch (status) {
      case 'Paid': return 'check-circle';
      case 'Pending': return 'clock';
      case 'Overdue': return 'alert-triangle';
      case 'Draft': return 'file-edit';
      case 'Cancelled': return 'x-circle';
      default: return 'circle';
    }
  }
}
