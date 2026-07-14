import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedBy: string;
  uploadedDate: string;
  status: 'Approved' | 'Pending' | 'Rejected' | 'Draft';
  folder: string;
}

@Component({
  selector: 'app-document-manager',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './document-manager.component.html'
})
export class DocumentManagerComponent {
  searchQuery = '';
  activeView: 'list' | 'grid' = 'list';
  showGearMenu = false;
  showAddDrawer = false;
  activeTab: string = 'All';

  documents: Document[] = [
    { id: 'DOC-001', name: 'Q4 Financial Report.pdf', type: 'PDF', size: '2.4 MB', uploadedBy: 'Sarah Johnson', uploadedDate: 'Dec 12, 2025', status: 'Approved', folder: 'Reports' },
    { id: 'DOC-002', name: 'Vendor Agreement - TechCorp.docx', type: 'DOCX', size: '1.1 MB', uploadedBy: 'Mike Chen', uploadedDate: 'Dec 10, 2025', status: 'Pending', folder: 'Contracts' },
    { id: 'DOC-003', name: 'Invoice Summary Nov 2025.xlsx', type: 'XLSX', size: '856 KB', uploadedBy: 'Emily Davis', uploadedDate: 'Dec 8, 2025', status: 'Approved', folder: 'Invoices' },
    { id: 'DOC-004', name: 'Tax Documents 2025.pdf', type: 'PDF', size: '3.2 MB', uploadedBy: 'John Doe', uploadedDate: 'Dec 5, 2025', status: 'Approved', folder: 'Tax' },
    { id: 'DOC-005', name: 'Project Proposal Draft.docx', type: 'DOCX', size: '4.7 MB', uploadedBy: 'Lisa Park', uploadedDate: 'Dec 3, 2025', status: 'Draft', folder: 'Projects' },
    { id: 'DOC-006', name: 'Audit Report - Final.pdf', type: 'PDF', size: '5.8 MB', uploadedBy: 'Robert Kim', uploadedDate: 'Nov 28, 2025', status: 'Approved', folder: 'Audits' },
    { id: 'DOC-007', name: 'Employee Handbook v3.pdf', type: 'PDF', size: '1.9 MB', uploadedBy: 'HR Team', uploadedDate: 'Nov 25, 2025', status: 'Rejected', folder: 'HR' },
    { id: 'DOC-008', name: 'Budget Planning 2026.xlsx', type: 'XLSX', size: '1.3 MB', uploadedBy: 'Finance Dept', uploadedDate: 'Nov 20, 2025', status: 'Pending', folder: 'Finance' },
  ];

  gearMenuItems = [
    { icon: 'upload', label: 'Upload Document', action: 'upload' },
    { icon: 'folder-plus', label: 'New Folder', action: 'new-folder' },
    { icon: 'settings', label: 'Document Settings', action: 'settings' },
    { icon: 'archive', label: 'Archive', action: 'archive' },
    { icon: 'trash-2', label: 'Trash', action: 'trash' },
  ];

  get filteredDocuments(): Document[] {
    return this.documents.filter(doc => {
      if (this.searchQuery) {
        const q = this.searchQuery.toLowerCase();
        return doc.name.toLowerCase().includes(q) || doc.folder.toLowerCase().includes(q);
      }
      return true;
    });
  }

  toggleGearMenu(): void {
    this.showGearMenu = !this.showGearMenu;
  }

  closeGearMenu(): void {
    this.showGearMenu = false;
  }

  onGearAction(action: string): void {
    this.closeGearMenu();
    if (action === 'upload') {
      this.openAddDrawer();
    }
  }

  openAddDrawer(): void {
    this.showAddDrawer = true;
  }

  closeAddDrawer(): void {
    this.showAddDrawer = false;
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Approved': return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800';
      case 'Pending': return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800';
      case 'Rejected': return 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800';
      case 'Draft': return 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700';
      default: return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  }

  getFileIcon(type: string): string {
    switch (type) {
      case 'PDF': return 'file-text';
      case 'DOCX': return 'file-text';
      case 'XLSX': return 'file-spreadsheet';
      default: return 'file';
    }
  }

  getFileColor(type: string): string {
    switch (type) {
      case 'PDF': return 'text-red-500 bg-red-50 dark:bg-red-900/20';
      case 'DOCX': return 'text-blue-500 bg-blue-50 dark:bg-blue-900/20';
      case 'XLSX': return 'text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20';
      default: return 'text-slate-500 bg-slate-100';
    }
  }
}
