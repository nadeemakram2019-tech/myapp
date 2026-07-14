import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { RouterModule } from '@angular/router';

interface CreditNote {
  id: string;
  customerName: string;
  customerAvatar: string;
  amount: number;
  currency: string;
  reason: string;
  status: 'Issued' | 'Applied' | 'Expired' | 'Draft';
  invoiceRef: string;
  issuedDate: string;
  appliedDate?: string;
}

@Component({
  selector: 'app-credit-notes',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, RouterModule],
  templateUrl: './credit-notes.component.html'
})
export class CreditNotesComponent {
  searchQuery = '';

  creditNotes: CreditNote[] = [
    {
      id: 'CN-2026-001',
      customerName: 'Acme Corporation',
      customerAvatar: 'https://avatar.vercel.sh/Acme%20Corporation.png',
      amount: 12500,
      currency: 'USD',
      reason: 'Invoice overcharge - incorrect quantity billed',
      status: 'Issued',
      invoiceRef: 'INV-2026-0042',
      issuedDate: '06/10/2026'
    },
    {
      id: 'CN-2026-002',
      customerName: 'Northern Lights Retail',
      customerAvatar: 'https://avatar.vercel.sh/Northern%20Lights%20Retail.png',
      amount: 3800,
      currency: 'CAD',
      reason: 'Product return - damaged goods',
      status: 'Applied',
      invoiceRef: 'INV-2026-0051',
      issuedDate: '06/05/2026',
      appliedDate: '06/12/2026'
    },
    {
      id: 'CN-2026-003',
      customerName: 'Pacific Tech Solutions',
      customerAvatar: 'https://avatar.vercel.sh/Pacific%20Tech%20Solutions.png',
      amount: 27500,
      currency: 'USD',
      reason: 'Service credit - SLA breach compensation',
      status: 'Draft',
      invoiceRef: 'INV-2026-0067',
      issuedDate: '06/14/2026'
    },
    {
      id: 'CN-2026-004',
      customerName: 'Emily Chen Design',
      customerAvatar: 'https://avatar.vercel.sh/Emily%20Chen%20Design.png',
      amount: 950,
      currency: 'CAD',
      reason: 'Discount adjustment - loyalty program',
      status: 'Applied',
      invoiceRef: 'INV-2026-0058',
      issuedDate: '05/28/2026',
      appliedDate: '06/02/2026'
    },
    {
      id: 'CN-2026-005',
      customerName: 'Global Logistics Co',
      customerAvatar: 'https://avatar.vercel.sh/Global%20Logistics%20Co.png',
      amount: 8900,
      currency: 'CAD',
      reason: 'Duplicate payment refund',
      status: 'Issued',
      invoiceRef: 'INV-2026-0071',
      issuedDate: '06/15/2026'
    },
    {
      id: 'CN-2026-006',
      customerName: 'Harbor Industries Ltd',
      customerAvatar: 'https://avatar.vercel.sh/Harbor%20Industries%20Ltd.png',
      amount: 15000,
      currency: 'CAD',
      reason: 'Early settlement discount',
      status: 'Expired',
      invoiceRef: 'INV-2026-0062',
      issuedDate: '04/20/2026',
      appliedDate: '05/01/2026'
    },
    {
      id: 'CN-2026-007',
      customerName: 'Quantum Health Inc',
      customerAvatar: 'https://avatar.vercel.sh/Quantum%20Health%20Inc.png',
      amount: 6200,
      currency: 'CAD',
      reason: 'Partial service cancellation',
      status: 'Draft',
      invoiceRef: 'INV-2026-0075',
      issuedDate: '06/17/2026'
    }
  ];

  get totalCreditNotes(): number {
    return this.creditNotes.length;
  }

  get totalIssued(): number {
    return this.creditNotes.filter(cn => cn.status === 'Issued').length;
  }

  get totalApplied(): number {
    return this.creditNotes.filter(cn => cn.status === 'Applied').length;
  }

  get totalAmount(): number {
    return this.creditNotes.reduce((sum, cn) => sum + cn.amount, 0);
  }

  get filteredCreditNotes(): CreditNote[] {
    if (!this.searchQuery) return this.creditNotes;
    const q = this.searchQuery.toLowerCase();
    return this.creditNotes.filter(cn =>
      cn.id.toLowerCase().includes(q) ||
      cn.customerName.toLowerCase().includes(q) ||
      cn.invoiceRef.toLowerCase().includes(q) ||
      cn.reason.toLowerCase().includes(q)
    );
  }

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchQuery = input.value;
  }

  createNewCreditNote() {
    console.log('Opening new credit note form...');
  }

  viewCreditNote(id: string) {
    console.log('Viewing credit note:', id);
  }

  formatCurrency(amount: number, currency: string = 'USD'): string {
    return amount.toLocaleString('en-US', { style: 'currency', currency, minimumFractionDigits: 0 });
  }
}
