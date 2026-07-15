import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { ExpenseService, Expense } from '../services/expense.service';
import { PageHeaderComponent } from '../components/page-header.component';

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, PageHeaderComponent],
  templateUrl: './expenses.component.html'
})
export class ExpensesComponent implements OnInit {
  tabs = ['All Expenses', 'Pending', 'Approved', 'Rejected', 'Reimbursed'];
  activeTab = 'All Expenses';

  constructor(public expenseService: ExpenseService) {}

  ngOnInit() {
    this.expenseService.loadAll();
  }

  get expenses() {
    return this.expenseService.expenses();
  }

  get loading() {
    return this.expenseService.loading();
  }

  get filteredExpenses(): Expense[] {
    if (this.activeTab === 'All Expenses') {
      return this.expenses;
    }
    return this.expenses.filter(e => e.status === this.activeTab);
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'Approved':
        return 'bg-emerald-50 border-emerald-200 text-emerald-700';
      case 'Pending':
        return 'bg-amber-50 border-amber-200 text-amber-700';
      case 'Rejected':
        return 'bg-rose-50 border-rose-200 text-rose-700';
      case 'Reimbursed':
        return 'bg-blue-50 border-blue-200 text-blue-700';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-700';
    }
  }

  getCategoryIcon(category: string): string {
    switch (category) {
      case 'Travel':
        return 'plane';
      case 'Meals':
        return 'utensils-crossed';
      case 'Office Supplies':
        return 'paperclip';
      case 'Software':
        return 'laptop';
      case 'Hotel':
        return 'bed';
      case 'Transport':
        return 'car';
      default:
        return 'receipt';
    }
  }
}
