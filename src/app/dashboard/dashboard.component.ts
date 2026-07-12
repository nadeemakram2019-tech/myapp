import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { FormsModule } from '@angular/forms';

interface ActionItem {
  icon: string;
  name: string;
  count: number;
  iconBg: string;
  iconColor: string;
  badgeBg: string;
  badgeColor: string;
}

interface ARAgingItem {
  range: string;
  amount: string;
  percentage: number;
  invoicesText: string;
  barColor: string;
}

interface PaidCustomer {
  name: string;
  amount: string;
  percentage: number;
  barColor: string;
}

interface ProjectedReceipt {
  id: string;
  title: string;
  amount: string;
  dateRange: string;
  isActive: boolean;
  tasksDone: number;
  totalTasks: number;
}

interface TeamMemberActivity {
  avatar: string;
  name: string;
  role: string;
  created: number;
  touched: number;
  emails: number;
  calls: number;
}

interface TopDebtor {
  age: number;
  name: string;
  amount: string;
  percentage: number;
  invoicesCount: number;
  barColor: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, FormsModule],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  currentDate = '2024-11-22';
  selectedDateRange = '2024-11-22 - 2024-11-22';
  selectedCurrency = 'CAD';
  selectedPeriod = 'This Month';
  selectedActivityPage = 1;
  pageSize = 3;

  actionItems: ActionItem[] = [
    { icon: 'clipboard-list', name: 'Task Due Today', count: 1, iconBg: 'bg-cyan-50 dark:bg-cyan-950/40', iconColor: 'text-cyan-600 dark:text-cyan-400', badgeBg: 'bg-rose-50 dark:bg-rose-950/40', badgeColor: 'text-rose-600 dark:text-rose-400' },
    { icon: 'alert-triangle', name: 'Invoices need attention', count: 28, iconBg: 'bg-fuchsia-50 dark:bg-fuchsia-950/40', iconColor: 'text-fuchsia-600 dark:text-fuchsia-400', badgeBg: 'bg-purple-50 dark:bg-purple-950/40', badgeColor: 'text-purple-600 dark:text-purple-400' },
    { icon: 'message-square', name: 'Support Messages', count: 14, iconBg: 'bg-teal-50 dark:bg-teal-950/40', iconColor: 'text-teal-600 dark:text-teal-400', badgeBg: 'bg-emerald-50 dark:bg-emerald-950/40', badgeColor: 'text-emerald-600 dark:text-emerald-400' },
    { icon: 'sliders-horizontal', name: 'Cadence queue', count: 221, iconBg: 'bg-rose-50 dark:bg-rose-950/40', iconColor: 'text-rose-600 dark:text-rose-400', badgeBg: 'bg-pink-50 dark:bg-pink-950/40', badgeColor: 'text-pink-600 dark:text-pink-400' },
    { icon: 'clock', name: 'Over due tasks', count: 135, iconBg: 'bg-orange-50 dark:bg-orange-950/40', iconColor: 'text-orange-600 dark:text-orange-400', badgeBg: 'bg-orange-50 dark:bg-orange-950/40', badgeColor: 'text-orange-600 dark:text-orange-400' }
  ];

  arAgingItems: ARAgingItem[] = [
    { range: 'Current', amount: '9.6K', percentage: 76.8, invoicesText: 'Current (13 Invoices)', barColor: 'bg-emerald-500' },
    { range: '1-30', amount: '1.73K', percentage: 13.8, invoicesText: '1-30 days (79 Invoices)', barColor: 'bg-indigo-500' },
    { range: '31-60', amount: '0', percentage: 2.0, invoicesText: '31-60 days (0 Invoices)', barColor: 'bg-amber-500' },
    { range: '61-90', amount: '0', percentage: 1.0, invoicesText: '61-90 days (0 Invoices)', barColor: 'bg-rose-500' },
    { range: 'Above 90', amount: '0', percentage: 1.0, invoicesText: 'Above 90 days (0 Invoices)', barColor: 'bg-red-500' }
  ];

  paidCustomers: PaidCustomer[] = [
    { name: 'Emma Taylor', amount: '1.38k', percentage: 74, barColor: 'bg-emerald-500' },
    { name: 'Aiden Johnson', amount: '226.00', percentage: 20, barColor: 'bg-emerald-500' },
    { name: 'James Doe', amount: '175.24', percentage: 15, barColor: 'bg-emerald-500' },
    { name: 'Ethan Williams', amount: '50.00', percentage: 8, barColor: 'bg-emerald-500' },
    { name: 'Hana Kim', amount: '20.84', percentage: 5, barColor: 'bg-emerald-500' }
  ];

  projectedReceipts: ProjectedReceipt[] = [
    { id: '1', title: 'Current month end', amount: '25,680 CAD', dateRange: 'Nov 1, 2024 to Nov 30, 2024', isActive: true, tasksDone: 3, totalTasks: 4 },
    { id: '2', title: 'Q4 Forecast target', amount: '84,100 CAD', dateRange: 'Oct 1, 2024 to Dec 31, 2024', isActive: false, tasksDone: 1, totalTasks: 4 },
    { id: '3', title: 'Next month estimate', amount: '31,500 CAD', dateRange: 'Dec 1, 2024 to Dec 31, 2024', isActive: false, tasksDone: 2, totalTasks: 4 },
    { id: '4', title: 'Year end estimation', amount: '345,000 CAD', dateRange: 'Jan 1, 2024 to Dec 31, 2024', isActive: false, tasksDone: 0, totalTasks: 4 }
  ];

  teamActivities: TeamMemberActivity[] = [
    { avatar: 'ET', name: 'Emma Taylor', role: 'All Rights', created: 12, touched: 18, emails: 12, calls: 4 },
    { avatar: 'BB', name: 'Billing Blitz', role: 'All Rights', created: 2, touched: 32, emails: 48, calls: 5 },
    { avatar: 'LL', name: 'Ledger Legends', role: 'All Rights', created: 10, touched: 5, emails: 12, calls: 14 },
    { avatar: 'JD', name: 'John Doe', role: 'Finance Administrator', created: 5, touched: 22, emails: 19, calls: 8 },
    { avatar: 'AW', name: 'Alice Wright', role: 'Accounts Receivable', created: 8, touched: 14, emails: 25, calls: 12 },
    { avatar: 'RH', name: 'Robert Hill', role: 'Audit Lead', created: 1, touched: 8, emails: 10, calls: 2 }
  ];

  topDebtors: TopDebtor[] = [
    { age: 30, name: 'Emma Taylor', amount: '2.24K', percentage: 85, invoicesCount: 10, barColor: 'bg-rose-500' },
    { age: 28, name: 'Aiden Johnson', amount: '1.8K', percentage: 70, invoicesCount: 8, barColor: 'bg-rose-500' },
    { age: 18, name: 'James Doe', amount: '1.2K', invoicesCount: 5, percentage: 50, barColor: 'bg-rose-500' },
    { age: 15, name: 'Ethan Williams', amount: '1.1K', invoicesCount: 3, percentage: 45, barColor: 'bg-rose-500' },
    { age: 8, name: 'Hana Kim', amount: '1K', invoicesCount: 1, percentage: 40, barColor: 'bg-rose-500' }
  ];

  get paginatedActivities(): TeamMemberActivity[] {
    const start = (this.selectedActivityPage - 1) * this.pageSize;
    return this.teamActivities.slice(start, start + this.pageSize);
  }

  get totalActivityPages(): number {
    return Math.ceil(this.teamActivities.length / this.pageSize);
  }

  ngOnInit() {
    // Initialized
  }

  selectReceiptTarget(targetId: string) {
    this.projectedReceipts.forEach(t => t.isActive = t.id === targetId);
  }

  get activeProjectedTarget(): ProjectedReceipt {
    return this.projectedReceipts.find(t => t.isActive) || this.projectedReceipts[0];
  }

  changeActivityPage(page: number) {
    if (page >= 1 && page <= Math.ceil(this.teamActivities.length / this.pageSize)) {
      this.selectedActivityPage = page;
    }
  }

  customizeDashboard() {
    alert('Dashboard customization modal coming soon!');
  }
}