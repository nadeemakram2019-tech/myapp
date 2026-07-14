import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { RouterModule } from '@angular/router';

interface Customer {
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
  totalSpent: number;
  invoicesCount: number;
  lastActivity?: string;
}

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, RouterModule],
  templateUrl: './customers.component.html'
})
export class CustomersComponent {
  searchQuery = '';

  customers: Customer[] = [
    {
      id: 'CUST-001',
      name: 'Acme Corporation',
      email: 'billing@acmecorp.com',
      phone: '+1-555-0101',
      location: 'New York, NY, USA',
      website: 'https://acmecorp.com',
      avatar: 'https://avatar.vercel.sh/Acme%20Corporation.png',
      status: 'Active',
      type: 'Business',
      currency: 'USD',
      addedDate: '01/15/2025',
      totalSpent: 284500,
      invoicesCount: 48,
      lastActivity: 'Today'
    },
    {
      id: 'CUST-002',
      name: 'Northern Lights Retail',
      email: 'orders@northernlights.ca',
      phone: '+1-555-0102',
      location: 'Toronto, ON, Canada',
      avatar: 'https://avatar.vercel.sh/Northern%20Lights%20Retail.png',
      status: 'Active',
      type: 'Business',
      currency: 'CAD',
      addedDate: '02/03/2025',
      totalSpent: 152300,
      invoicesCount: 24,
      lastActivity: 'Yesterday'
    },
    {
      id: 'CUST-003',
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '+1-555-0103',
      location: 'Chicago, IL, USA',
      avatar: 'https://avatar.vercel.sh/Sarah%20Johnson.png',
      status: 'Active',
      type: 'Individual',
      currency: 'USD',
      addedDate: '03/22/2025',
      totalSpent: 8750,
      invoicesCount: 6,
      lastActivity: '3 days ago'
    },
    {
      id: 'CUST-004',
      name: 'Pacific Tech Solutions',
      email: 'billing@pacifictech.io',
      phone: '+1-555-0104',
      location: 'San Francisco, CA, USA',
      website: 'https://pacifictech.io',
      avatar: 'https://avatar.vercel.sh/Pacific%20Tech%20Solutions.png',
      status: 'Active',
      type: 'Business',
      currency: 'USD',
      addedDate: '04/10/2025',
      totalSpent: 423000,
      invoicesCount: 67,
      lastActivity: 'Yesterday'
    },
    {
      id: 'CUST-005',
      name: 'Quantum Health Inc',
      email: 'finance@quantumhealth.com',
      phone: '+1-416-555-0199',
      location: 'Vancouver, BC, Canada',
      avatar: 'https://avatar.vercel.sh/Quantum%20Health%20Inc.png',
      status: 'Active',
      type: 'Business',
      currency: 'CAD',
      addedDate: '05/18/2025',
      totalSpent: 96700,
      invoicesCount: 15,
      lastActivity: '1 week ago'
    },
    {
      id: 'CUST-006',
      name: 'Michael Torres',
      email: 'm.torres@outlook.com',
      phone: '+1-647-555-0321',
      location: 'Miami, FL, USA',
      avatar: 'https://avatar.vercel.sh/Michael%20Torres.png',
      status: 'Inactive',
      type: 'Individual',
      currency: 'USD',
      addedDate: '06/05/2025',
      totalSpent: 3200,
      invoicesCount: 3,
      lastActivity: '1 month ago'
    },
    {
      id: 'CUST-007',
      name: 'Global Logistics Co',
      email: 'accounts@globallogistics.co.uk',
      phone: '+1-905-555-0456',
      location: 'London, ON, Canada',
      website: 'https://globallogistics.co.uk',
      avatar: 'https://avatar.vercel.sh/Global%20Logistics%20Co.png',
      status: 'Active',
      type: 'Business',
      currency: 'CAD',
      addedDate: '07/12/2025',
      totalSpent: 178900,
      invoicesCount: 31,
      lastActivity: '2 days ago'
    },
    {
      id: 'CUST-008',
      name: 'Emily Chen Design',
      email: 'hello@emilychendesign.com',
      phone: '+1-416-555-0789',
      location: 'Montreal, QC, Canada',
      avatar: 'https://avatar.vercel.sh/Emily%20Chen%20Design.png',
      status: 'Active',
      type: 'Individual',
      currency: 'CAD',
      addedDate: '08/20/2025',
      totalSpent: 12400,
      invoicesCount: 8,
      lastActivity: '5 days ago'
    },
    {
      id: 'CUST-009',
      name: 'Harbor Industries Ltd',
      email: 'billing@harborind.com',
      location: 'Halifax, NS, Canada',
      avatar: 'https://avatar.vercel.sh/Harbor%20Industries%20Ltd.png',
      status: 'Active',
      type: 'Business',
      currency: 'CAD',
      addedDate: '09/01/2025',
      totalSpent: 312000,
      invoicesCount: 42,
      lastActivity: 'Today'
    },
    {
      id: 'CUST-010',
      name: 'Robert Kim',
      email: 'rkim@gmail.com',
      phone: '+1-778-555-0111',
      location: 'Seattle, WA, USA',
      avatar: 'https://avatar.vercel.sh/Robert%20Kim.png',
      status: 'Inactive',
      type: 'Individual',
      currency: 'USD',
      addedDate: '10/14/2025',
      totalSpent: 5800,
      invoicesCount: 4,
      lastActivity: '2 months ago'
    }
  ];

  get totalCustomers(): number {
    return this.customers.length;
  }

  get activeCustomers(): number {
    return this.customers.filter(c => c.status === 'Active').length;
  }

  get totalRevenue(): number {
    return this.customers.reduce((sum, c) => sum + c.totalSpent, 0);
  }

  get totalInvoices(): number {
    return this.customers.reduce((sum, c) => sum + c.invoicesCount, 0);
  }

  get filteredCustomers(): Customer[] {
    if (!this.searchQuery) return this.customers;
    const q = this.searchQuery.toLowerCase();
    return this.customers.filter(c =>
      c.name.toLowerCase().includes(q) ||
      (c.email && c.email.toLowerCase().includes(q)) ||
      (c.phone && c.phone.includes(q)) ||
      (c.location && c.location.toLowerCase().includes(q))
    );
  }

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchQuery = input.value;
  }

  syncWithCRM() {
    console.log('Syncing with CRM...');
  }

  addNewCustomer() {
    console.log('Opening add customer modal...');
  }

  editCustomer(customerId: string) {
    console.log('Editing customer:', customerId);
  }

  viewCustomer(customerId: string) {
    console.log('Viewing customer:', customerId);
  }

  formatCurrency(amount: number, currency: string = 'USD'): string {
    return amount.toLocaleString('en-US', { style: 'currency', currency, minimumFractionDigits: 0 });
  }
}
