import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { Bill, BillsService } from './bills.service';

@Component({
  selector: 'app-bills',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './bills.component.html'
})
export class BillsComponent implements OnInit {
  private readonly billsService = inject(BillsService);

  tabs = ['All Bills', 'Pending Approval', 'Approved', 'Paid', 'Overdue'];
  activeTab = 'All Bills';

  // Pagination
  currentPage = 1;
  pageSize = 10;
  pageSizeOptions = [5, 10, 20, 50];

  ngOnInit(): void {
    this.billsService.loadAll();
  }

  get bills() {
    return this.billsService.bills();
  }

  get loading() {
    return this.billsService.loading();
  }

  get error() {
    return this.billsService.error();
  }

  get paginatedBills(): Bill[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredBills.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.filteredBills.length / this.pageSize));
  }

  get startIndex(): number {
    return Math.min((this.currentPage - 1) * this.pageSize + 1, this.filteredBills.length);
  }

  get endIndex(): number {
    return Math.min(this.currentPage * this.pageSize, this.filteredBills.length);
  }

  getPageNumbers(): number[] {
    const total = this.totalPages;
    const current = this.currentPage;
    const pages: number[] = [];

    if (total <= 7) {
      for (let i = 1; i <= total; i++) pages.push(i);
    } else {
      pages.push(1);
      if (current > 3) pages.push(-1); // ellipsis sentinel
      const start = Math.max(2, current - 1);
      const end = Math.min(total - 1, current + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (current < total - 2) pages.push(-1); // ellipsis sentinel
      pages.push(total);
    }

    return pages;
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  setPageSize(size: number): void {
    this.pageSize = size;
    this.currentPage = 1;
  }

  onTabChange(tab: string): void {
    this.activeTab = tab;
    this.currentPage = 1;
  }

  get filteredBills(): Bill[] {
    if (this.activeTab === 'All Bills') {
      return this.bills;
    }
    return this.bills.filter(b => b.status === this.activeTab);
  }

  get totalPendingAmount(): number {
    return this.bills
      .filter(b => b.status === 'Pending Approval')
      .reduce((sum, b) => sum + b.amount, 0);
  }

  get totalOverdueAmount(): number {
    return this.bills
      .filter(b => b.status === 'Overdue')
      .reduce((sum, b) => sum + b.amount, 0);
  }

  get totalPaidAmount(): number {
    return this.bills
      .filter(b => b.status === 'Paid')
      .reduce((sum, b) => sum + b.amount, 0);
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'Paid':
        return 'bg-emerald-100/70 border-emerald-200 text-emerald-700';
      case 'Pending Approval':
        return 'bg-amber-100/70 border-amber-200 text-amber-700';
      case 'Approved':
        return 'bg-blue-100/70 border-blue-200 text-blue-700';
      case 'Overdue':
        return 'bg-rose-100/70 border-rose-200 text-rose-700';
      default:
        return 'bg-slate-100 border-slate-200 text-slate-700';
    }
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case 'Paid': return 'circle-check';
      case 'Pending Approval': return 'clock';
      case 'Approved': return 'circle-check';
      case 'Overdue': return 'alert-triangle';
      default: return 'circle';
    }
  }

  // New Bill Modal
  isNewBillModalOpen = false;
  newBillForm = {
    vendorName: '',
    amount: null as number | null,
    currency: 'USD',
    date: '',
    dueDate: '',
    category: ''
  };
  formSubmitted = false;

  openNewBillModal() {
    this.formSubmitted = false;
    this.newBillForm = { vendorName: '', amount: null, currency: 'USD', date: '', dueDate: '', category: '' };
    this.isNewBillModalOpen = true;
  }

  closeNewBillModal() {
    this.isNewBillModalOpen = false;
    this.formSubmitted = false;
  }

  retry(): void {
    this.billsService.loadAll();
  }

  async createBill() {
    this.formSubmitted = true;

    if (!this.newBillForm.vendorName.trim() || !this.newBillForm.amount || !this.newBillForm.date || !this.newBillForm.dueDate) {
      return;
    }

    const billNumber = Math.floor(100000 + Math.random() * 900000);
    const initials = this.newBillForm.vendorName
      .split(' ')
      .map(w => w[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
    const colors = ['purple', 'blue', 'emerald', 'orange', 'rose'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const formatDate = (dateStr: string) => {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    const newBill: Partial<Bill> = {
      bill_id: `#BILL-${billNumber}`,
      vendorName: this.newBillForm.vendorName,
      vendorInitials: initials,
      vendorColor: randomColor,
      date: formatDate(this.newBillForm.date),
      dueDate: formatDate(this.newBillForm.dueDate),
      amount: this.newBillForm.amount,
      currency: this.newBillForm.currency,
      status: 'Pending Approval',
      category: this.newBillForm.category || 'Other'
    };

    await this.billsService.add(newBill);
    this.closeNewBillModal();
  }
}
