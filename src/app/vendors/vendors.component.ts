import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { RouterModule } from '@angular/router';

interface Vendor {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  location?: string;
  website?: string;
  avatar: string;
  status: 'Active' | 'Inactive';
  type: 'Business' | 'Individual';
  currency: string;
  addedDate: string;
  verificationStatus?: 'Pending Verification' | 'Account Missing' | 'Verified';
  qboStatus?: 'synced' | 'error' | 'syncing';
}

@Component({
  selector: 'app-vendors',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, RouterModule],
  templateUrl: './vendors.component.html'
})
export class VendorsComponent {
  searchQuery = '';
  lastSyncTime = '5/9/2026, 2:58:07 PM';

  vendors: Vendor[] = [
    {
      id: '1',
      name: 'TechCorp Solutions',
      email: 'billing@techcorp.com',
      phone: '+1-555-0123',
      location: 'Toronto, ON, Canada',
      avatar: 'https://avatar.vercel.sh/TechCorp%20Solutions.png',
      status: 'Active',
      type: 'Business',
      currency: 'CAD',
      addedDate: '11/19/2025',
      qboStatus: 'synced'
    },
    {
      id: '2',
      name: 'Office Supplies Plus',
      email: 'orders@officesupplies.com',
      phone: '+1-555-0124',
      location: 'Vancouver, BC, Canada',
      avatar: 'https://avatar.vercel.sh/Office%20Supplies%20Plus.png',
      status: 'Active',
      type: 'Business',
      currency: 'CAD',
      addedDate: '11/19/2025',
      qboStatus: 'synced'
    },
    {
      id: '3',
      name: 'Marketing Pro',
      email: 'info@marketingpro.com',
      phone: '+1-555-0125',
      location: 'Montreal, QC, Canada',
      avatar: 'https://avatar.vercel.sh/Marketing%20Pro.png',
      status: 'Active',
      type: 'Business',
      currency: 'CAD',
      addedDate: '11/19/2025',
      qboStatus: 'error'
    },
    {
      id: '4',
      name: 'IT Services Inc',
      email: 'billing@itservices.com',
      phone: '+1-555-0126',
      location: 'Calgary, AB, Canada',
      avatar: 'https://avatar.vercel.sh/IT%20Services%20Inc.png',
      status: 'Active',
      type: 'Business',
      currency: 'CAD',
      addedDate: '11/19/2025',
      qboStatus: 'syncing'
    },
    {
      id: '5',
      name: 'CloudTech Systems',
      email: 'accounts@cloudtech.com',
      phone: '+1 (647) 555-0456',
      location: 'Waterloo, Ontario, Canada',
      website: 'https://cloudtechsystems.ca',
      avatar: 'https://avatar.vercel.sh/CloudTech%20Systems.png',
      status: 'Active',
      type: 'Business',
      currency: 'CAD',
      addedDate: '9/18/2025'
    },
    {
      id: '6',
      name: 'ProServices Ltd',
      email: 'billing@proservices.com',
      phone: '+1 (416) 555-0345',
      location: 'Toronto, Ontario, Canada',
      website: 'https://proservicesltd.com',
      avatar: 'https://avatar.vercel.sh/ProServices%20Ltd.png',
      status: 'Active',
      type: 'Business',
      currency: 'CAD',
      addedDate: '9/18/2025'
    },
    {
      id: '7',
      name: 'Office Supply Central',
      email: 'sales@officesupplycentral.com',
      phone: '+1 (416) 555-0234',
      location: 'Mississauga, Ontario, Canada',
      website: 'https://officesupplycentral.ca',
      avatar: 'https://avatar.vercel.sh/Office%20Supply%20Central.png',
      status: 'Active',
      type: 'Business',
      currency: 'CAD',
      addedDate: '9/18/2025'
    },
    {
      id: '8',
      name: 'Hayat Enterprises',
      email: 'pending@example.com',
      avatar: 'https://avatar.vercel.sh/Hayat%20Enterprises.png',
      status: 'Active',
      type: 'Business',
      currency: 'CAD',
      addedDate: '4/1/2026'
    },
    {
      id: '9',
      name: 'ss',
      email: 'sssss781@gmail.com',
      phone: '033432411111',
      location: 'Canada',
      avatar: 'https://avatar.vercel.sh/ss.png',
      status: 'Active',
      type: 'Business',
      currency: 'CAD',
      addedDate: '4/7/2026',
      verificationStatus: 'Account Missing'
    },
    {
      id: '10',
      name: '',
      avatar: 'https://avatar.vercel.sh/.png',
      status: 'Active',
      type: 'Business',
      currency: 'CAD',
      location: 'Canada',
      addedDate: '4/23/2026',
      verificationStatus: 'Pending Verification'
    }
  ];

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
    // Implement sync logic here
  }

  addNewVendor() {
    console.log('Opening add vendor modal...');
    // Implement add vendor logic here
  }

  editVendor(vendorId: string) {
    console.log('Editing vendor:', vendorId);
    // Implement edit vendor logic here
  }

  viewVendor(vendorId: string) {
    console.log('Viewing vendor:', vendorId);
    // Implement view vendor logic here
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
