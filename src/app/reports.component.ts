import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { TableModule } from 'primeng/table';
import { AdvancedFilterComponent } from './advanced-filter.component';

interface ReportRecord {
  id: string;
  vendor: string;
  amount: number;
  category: string;
  status: string;
  date: string;
}

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule, TableModule, AdvancedFilterComponent],
  templateUrl: './reports.component.html'
})
export class ReportsComponent {
  isAdvancedFilterOpen = false;
  selectedGroupBy: string | null = null;
  collapsedGroups = new Set<string>();

  groupByOptions = [
    { label: 'No grouping', value: null },
    { label: 'Vendor', value: 'vendor' },
    { label: 'Category', value: 'category' },
    { label: 'Status', value: 'status' }
  ];

  reportRecords: ReportRecord[] = [
    { id: 'BILL-2025-001', vendor: 'ABC Corporation', amount: 2500, category: 'Office Supplies', status: 'Paid', date: '2025-09-15' },
    { id: 'BILL-2025-002', vendor: 'Tech Solutions Inc', amount: 8750, category: 'IT Equipment', status: 'Pending Approval', date: '2025-09-18' },
    { id: 'BILL-2025-003', vendor: 'Marketing Pro', amount: 1200, category: 'Marketing', status: 'Approved', date: '2025-10-05' },
    { id: 'BILL-2025-004', vendor: 'Office Plus', amount: 945, category: 'Office Supplies', status: 'Paid', date: '2025-10-12' },
    { id: 'BILL-2025-005', vendor: 'Legal Associates', amount: 4500, category: 'Professional Services', status: 'Pending Approval', date: '2025-10-25' },
    { id: 'BILL-2025-006', vendor: 'ABC Corporation', amount: 3200, category: 'IT Equipment', status: 'Approved', date: '2025-11-08' },
    { id: 'BILL-2025-007', vendor: 'Office Plus', amount: 650, category: 'Office Supplies', status: 'Draft', date: '2025-11-15' },
    { id: 'BILL-2025-008', vendor: 'Tech Solutions Inc', amount: 5400, category: 'IT Equipment', status: 'Rejected', date: '2025-11-22' },
    { id: 'BILL-2025-009', vendor: 'Marketing Pro', amount: 2800, category: 'Marketing', status: 'Paid', date: '2025-12-03' },
    { id: 'BILL-2025-010', vendor: 'Legal Associates', amount: 6200, category: 'Professional Services', status: 'Disputed', date: '2025-12-10' },
    { id: 'BILL-2025-011', vendor: 'Marketing Pro', amount: 1850, category: 'Marketing', status: 'Approved', date: '2025-12-18' },
    { id: 'BILL-2025-012', vendor: 'Office Plus', amount: 420, category: 'Office Supplies', status: 'Paid', date: '2025-12-28' },
    { id: 'BILL-2026-001', vendor: 'ABC Corporation', amount: 3800, category: 'IT Equipment', status: 'Approved', date: '2026-01-05' },
    { id: 'BILL-2026-002', vendor: 'Tech Solutions Inc', amount: 7200, category: 'IT Equipment', status: 'Paid', date: '2026-01-12' },
    { id: 'BILL-2026-003', vendor: 'Legal Associates', amount: 5100, category: 'Professional Services', status: 'Pending Approval', date: '2026-01-20' },
    { id: 'BILL-2026-004', vendor: 'Marketing Pro', amount: 2200, category: 'Marketing', status: 'Approved', date: '2026-01-28' },
    { id: 'BILL-2026-005', vendor: 'Office Plus', amount: 890, category: 'Office Supplies', status: 'Paid', date: '2026-02-03' },
    { id: 'BILL-2026-006', vendor: 'ABC Corporation', amount: 4600, category: 'IT Equipment', status: 'Pending Approval', date: '2026-02-08' },
  ];

  get totalAmount(): number {
    return this.reportRecords.reduce((sum, record) => sum + record.amount, 0);
  }

  calculateGroupTotal(groupName: string): number {
    if (!this.selectedGroupBy) return 0;
    return this.reportRecords
      .filter(record => (record as any)[this.selectedGroupBy as string] === groupName)
      .reduce((sum, record) => sum + record.amount, 0);
  }

  calculateGroupCount(groupName: string): number {
    if (!this.selectedGroupBy) return 0;
    return this.reportRecords
      .filter(record => (record as any)[this.selectedGroupBy as string] === groupName).length;
  }

  toggleGroup(groupName: string) {
    if (this.collapsedGroups.has(groupName)) {
      this.collapsedGroups.delete(groupName);
    } else {
      this.collapsedGroups.add(groupName);
    }
  }

  isGroupCollapsed(groupName: string): boolean {
    return this.collapsedGroups.has(groupName);
  }

  onGroupByChange() {
    this.collapsedGroups.clear(); // Jab group by type change ho to reset kar de
  }
}