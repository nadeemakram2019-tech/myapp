import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { FormsModule } from '@angular/forms';

interface DataBatch {
  id: string;
  batchNumber: string;
  fileName: string;
  uploadedBy: string;
  uploadedAt: string;
  dataType: string;
  dataTypeColor: string;
  totalRecords: number;
  validRecords: number;
  errorRecords: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
}

@Component({
  selector: 'app-datastream',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, FormsModule],
  templateUrl: './datastream.component.html'
})
export class DatastreamComponent {
  activeTab: 'pending' | 'completed' = 'pending';
  searchQuery = '';
  selectedDataType: string = 'all';

  dataTypes = ['All Data Types', 'Bills', 'Card Transactions', 'Vendors', 'Expenses', 'Employees'];

  pendingBatches: DataBatch[] = [
    {
      id: '1', batchNumber: 'CC2AA2', fileName: 'Import Card Transactions - 2.csv',
      uploadedBy: 'Sikandar Hayat', uploadedAt: 'Apr 24, 2026 14:47',
      dataType: 'Card Transactions', dataTypeColor: 'text-purple-600 bg-purple-50',
      totalRecords: 245, validRecords: 176, errorRecords: 69, status: 'pending'
    },
    {
      id: '2', batchNumber: 'B7F3D1', fileName: 'Vendors_Master_List_March.xlsx',
      uploadedBy: 'Aisha Khan', uploadedAt: 'Apr 23, 2026 09:12',
      dataType: 'Vendors', dataTypeColor: 'text-emerald-600 bg-emerald-50',
      totalRecords: 89, validRecords: 85, errorRecords: 4, status: 'pending'
    },
    {
      id: '3', batchNumber: 'E9A1C4', fileName: 'Bulk_Bills_Invoice_1122.pdf',
      uploadedBy: 'Omar Farooq', uploadedAt: 'Apr 22, 2026 16:30',
      dataType: 'Bills', dataTypeColor: 'text-blue-600 bg-blue-50',
      totalRecords: 512, validRecords: 498, errorRecords: 14, status: 'processing'
    },
    {
      id: '4', batchNumber: 'D4F8B0', fileName: 'Employee_Expenses_Q2.xlsx',
      uploadedBy: 'Zara Malik', uploadedAt: 'Apr 21, 2026 11:05',
      dataType: 'Expenses', dataTypeColor: 'text-orange-600 bg-orange-50',
      totalRecords: 178, validRecords: 162, errorRecords: 16, status: 'pending'
    },
    {
      id: '5', batchNumber: 'A1C9E7', fileName: 'New_Hires_March_2026.csv',
      uploadedBy: 'Sikandar Hayat', uploadedAt: 'Apr 20, 2026 08:45',
      dataType: 'Employees', dataTypeColor: 'text-cyan-600 bg-cyan-50',
      totalRecords: 34, validRecords: 34, errorRecords: 0, status: 'pending'
    }
  ];

  completedBatches: DataBatch[] = [
    {
      id: '6', batchNumber: 'F2E6C1', fileName: 'Card_Transactions_March.csv',
      uploadedBy: 'Aisha Khan', uploadedAt: 'Apr 19, 2026 13:22',
      dataType: 'Card Transactions', dataTypeColor: 'text-purple-600 bg-purple-50',
      totalRecords: 892, validRecords: 876, errorRecords: 16, status: 'completed'
    },
    {
      id: '7', batchNumber: 'G8H2I5', fileName: 'Vendor_Payments_Apr.xlsx',
      uploadedBy: 'Omar Farooq', uploadedAt: 'Apr 18, 2026 10:00',
      dataType: 'Vendors', dataTypeColor: 'text-emerald-600 bg-emerald-50',
      totalRecords: 156, validRecords: 156, errorRecords: 0, status: 'completed'
    },
    {
      id: '8', batchNumber: 'J3K9L7', fileName: 'Office_Supplies_Bills.pdf',
      uploadedBy: 'Zara Malik', uploadedAt: 'Apr 17, 2026 15:30',
      dataType: 'Bills', dataTypeColor: 'text-blue-600 bg-blue-50',
      totalRecords: 67, validRecords: 65, errorRecords: 2, status: 'completed'
    }
  ];

  get filteredBatches(): DataBatch[] {
    const source = this.activeTab === 'pending' ? this.pendingBatches : this.completedBatches;
    return source.filter(batch => {
      const matchesSearch = !this.searchQuery ||
        batch.fileName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        batch.batchNumber.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesType = this.selectedDataType === 'all' ||
        this.selectedDataType === 'All Data Types' ||
        batch.dataType === this.selectedDataType;
      return matchesSearch && matchesType;
    });
  }

  get pendingCount(): number {
    return this.pendingBatches.length;
  }

  get completedCount(): number {
    return this.completedBatches.length;
  }

  get totalPendingErrors(): number {
    return this.pendingBatches.reduce((sum, b) => sum + b.errorRecords, 0);
  }

  setTab(tab: 'pending' | 'completed') {
    this.activeTab = tab;
  }
}
