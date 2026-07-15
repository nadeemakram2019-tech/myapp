import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { RouterModule } from '@angular/router';
import { VendorService, Vendor } from '../services/vendor.service';

@Component({
  selector: 'app-vendors',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, RouterModule],
  templateUrl: './vendors.component.html'
})
export class VendorsComponent implements OnInit {
  searchQuery = '';

  constructor(public vendorService: VendorService) {}

  ngOnInit() {
    this.vendorService.loadAll();
  }

  get vendors() {
    return this.vendorService.vendors();
  }

  get loading() {
    return this.vendorService.loading();
  }

  get totalVendors(): number {
    return this.vendors.length;
  }

  get activeVendors(): number {
    return this.vendors.filter(v => v.status === 'Active').length;
  }

  get pendingBills(): number {
    return this.vendors.filter(v => !!v.verificationStatus && v.verificationStatus !== 'Verified').length;
  }

  get totalBilled(): string {
    const amount = this.vendors.length * 15.2;
    return `${amount.toFixed(1)}k`;
  }

  get filteredVendors(): Vendor[] {
    if (!this.searchQuery) return this.vendors;
    const q = this.searchQuery.toLowerCase();
    return this.vendors.filter(v =>
      v.name.toLowerCase().includes(q) ||
      (v.email && v.email.toLowerCase().includes(q)) ||
      (v.phone && v.phone.includes(q)) ||
      (v.location && v.location.toLowerCase().includes(q))
    );
  }

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchQuery = input.value;
  }

  syncWithQBO() {
    console.log('Syncing with QuickBooks Online...');
  }

  addNewVendor() {
    console.log('Opening add vendor modal...');
  }

  editVendor(vendorId: string) {
    console.log('Editing vendor:', vendorId);
  }

  viewVendor(vendorId: string) {
    console.log('Viewing vendor:', vendorId);
  }

  getQBOStatusIcon(status?: string) {
    switch (status) {
      case 'synced':
        return 'circle-check-big';
      case 'error':
        return 'triangle-alert';
      case 'syncing':
        return 'refresh-cw';
      default:
        return '';
    }
  }

  getQBOStatusClass(status?: string) {
    switch (status) {
      case 'synced':
        return 'bg-green-50 text-green-700 ring-green-600/20';
      case 'error':
        return 'bg-red-50 text-red-700 ring-red-600/20';
      case 'syncing':
        return 'bg-blue-50 text-blue-700 ring-blue-600/20';
      default:
        return '';
    }
  }
}
