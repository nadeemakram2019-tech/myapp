import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { PurchaseOrder, PurchaseOrdersService } from './purchase-orders.service';

@Component({
  selector: 'app-purchase-orders',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './purchase-orders.component.html'
})
export class PurchaseOrdersComponent implements OnInit {
  private readonly purchaseOrdersService = inject(PurchaseOrdersService);

  searchQuery = '';
  activeTab: 'Open' | 'Draft' | 'Completed' = 'Open';
  currentPage = 1;
  itemsPerPage = 10;
  showRows = 10;

  purchaseOrders: PurchaseOrder[] = [];
  loading = true;
  error = '';

  ngOnInit(): void {
    this.loadPurchaseOrders();
  }

  private loadPurchaseOrders(): void {
    this.loading = true;
    this.error = '';
    this.purchaseOrdersService.getPurchaseOrders().subscribe({
      next: (data) => {
        this.purchaseOrders = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load purchase orders. Please try again later.';
        this.loading = false;
        console.error('Error fetching purchase orders:', err);
      }
    });
  }

  get openCount(): number {
    return this.purchaseOrders.filter(po => po.status === 'Open').length;
  }

  get draftCount(): number {
    return this.purchaseOrders.filter(po => po.status === 'Draft').length;
  }

  get completedCount(): number {
    return this.purchaseOrders.filter(po => po.status === 'Completed').length;
  }

  get filteredOrders(): PurchaseOrder[] {
    let orders = this.purchaseOrders.filter(po => po.status === this.activeTab);
    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      orders = orders.filter(po =>
        po.poNumber.toLowerCase().includes(query) ||
        po.vendorName.toLowerCase().includes(query)
      );
    }
    return orders;
  }

  get paginatedOrders(): PurchaseOrder[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredOrders.slice(start, start + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredOrders.length / this.itemsPerPage);
  }

  get totalEntries(): number {
    return this.filteredOrders.length;
  }

  get showingStart(): number {
    return (this.currentPage - 1) * this.itemsPerPage + 1;
  }

  get showingEnd(): number {
    return Math.min(this.currentPage * this.itemsPerPage, this.totalEntries);
  }

  setActiveTab(tab: 'Open' | 'Draft' | 'Completed'): void {
    this.activeTab = tab;
    this.currentPage = 1;
  }

  onSearch(): void {
    this.currentPage = 1;
  }

  clearFilter(): void {
    this.searchQuery = '';
    this.currentPage = 1;
  }

  retry(): void {
    this.loadPurchaseOrders();
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  previousPage(): void {
    this.goToPage(this.currentPage - 1);
  }

  nextPage(): void {
    this.goToPage(this.currentPage + 1);
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxVisible = 3;
    let start = Math.max(1, this.currentPage - 1);
    let end = Math.min(this.totalPages, start + maxVisible - 1);
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }
}
