import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';

interface Expense {
  id: string;
  employeeName: string;
  employeeAvatar?: string;
  employeeInitials: string;
  employeeColor: string;
  category: string;
  categoryIcon: string;
  amount: number;
  currency: string;
  date: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Reimbursed';
  description: string;
  receipt?: boolean;
}

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './expenses.component.html'
})
export class ExpensesComponent {
  tabs = ['All Expenses', 'Pending', 'Approved', 'Rejected', 'Reimbursed'];
  activeTab = 'All Expenses';

  expenses: Expense[] = [
    {
      id: 'EXP-001',
      employeeName: 'John Smith',
      employeeInitials: 'JS',
      employeeColor: 'blue',
      category: 'Travel',
      categoryIcon: 'plane',
      amount: 1250.00,
      currency: 'USD',
      date: '2024-01-15',
      status: 'Approved',
      description: 'Flight tickets for client meeting',
      receipt: true
    },
    {
      id: 'EXP-002',
      employeeName: 'Sarah Johnson',
      employeeInitials: 'SJ',
      employeeColor: 'purple',
      category: 'Meals',
      categoryIcon: 'utensils',
      amount: 85.50,
      currency: 'USD',
      date: '2024-01-14',
      status: 'Reimbursed',
      description: 'Client dinner at Restaurant',
      receipt: true
    },
    {
      id: 'EXP-003',
      employeeName: 'Mike Davis',
      employeeInitials: 'MD',
      employeeColor: 'emerald',
      category: 'Office Supplies',
      categoryIcon: 'paperclip',
      amount: 234.00,
      currency: 'USD',
      date: '2024-01-16',
      status: 'Pending',
      description: 'Printer ink and paper',
      receipt: true
    },
    {
      id: 'EXP-004',
      employeeName: 'Emily Chen',
      employeeInitials: 'EC',
      employeeColor: 'orange',
      category: 'Software',
      categoryIcon: 'laptop',
      amount: 599.00,
      currency: 'USD',
      date: '2024-01-13',
      status: 'Rejected',
      description: 'Software subscription - duplicate request',
      receipt: true
    },
    {
      id: 'EXP-005',
      employeeName: 'Alex Wilson',
      employeeInitials: 'AW',
      employeeColor: 'rose',
      category: 'Hotel',
      categoryIcon: 'bed',
      amount: 890.00,
      currency: 'USD',
      date: '2024-01-17',
      status: 'Pending',
      description: 'Hotel stay for conference',
      receipt: true
    },
    {
      id: 'EXP-006',
      employeeName: 'Lisa Brown',
      employeeInitials: 'LB',
      employeeColor: 'cyan',
      category: 'Transport',
      categoryIcon: 'car',
      amount: 45.00,
      currency: 'USD',
      date: '2024-01-18',
      status: 'Reimbursed',
      description: 'Taxi to airport',
      receipt: true
    }
  ];

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