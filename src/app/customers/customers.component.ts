import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CustomerService, Customer } from '../services/customer.service';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, RouterModule, FormsModule],
  templateUrl: './customers.component.html'
})
export class CustomersComponent implements OnInit {
  searchQuery = '';
  showAddModal = false;
  isSubmitting = false;

  // Add Customer Form
  newCustomer = {
    customer_id: '',
    name: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    type: 'Business',
    currency: 'USD',
    status: 'Active'
  };

  constructor(public customerService: CustomerService) {}

  ngOnInit() {
    this.customerService.loadAll();
  }

  get customers() {
    return this.customerService.customers();
  }

  get loading() {
    return this.customerService.loading();
  }

  get totalCustomers(): number {
    return this.customers.length;
  }

  get activeCustomers(): number {
    return this.customers.filter(c => c.status === 'Active').length;
  }

  get totalRevenue(): number {
    return this.customers.reduce((sum, c) => sum + Number(c.total_spent || 0), 0);
  }

  get totalInvoices(): number {
    return this.customers.reduce((sum, c) => sum + Number(c.invoices_count || 0), 0);
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

  openAddModal() {
    this.newCustomer = {
      customer_id: `CUST-${String(this.customers.length + 1).padStart(3, '0')}`,
      name: '',
      email: '',
      phone: '',
      location: '',
      website: '',
      type: 'Business',
      currency: 'USD',
      status: 'Active'
    };
    this.showAddModal = true;
  }

  closeAddModal() {
    this.showAddModal = false;
  }

  async addCustomer() {
    if (!this.newCustomer.name || this.isSubmitting) return;
    this.isSubmitting = true;

    const customerData: any = {
      customer_id: this.newCustomer.customer_id,
      name: this.newCustomer.name,
      email: this.newCustomer.email || null,
      phone: this.newCustomer.phone || null,
      location: this.newCustomer.location || null,
      website: this.newCustomer.website || null,
      avatar: `https://avatar.vercel.sh/${encodeURIComponent(this.newCustomer.name)}.png`,
      type: this.newCustomer.type,
      currency: this.newCustomer.currency,
      status: this.newCustomer.status,
      total_spent: 0,
      invoices_count: 0,
      last_activity: 'Just added'
    };

    await this.customerService.add(customerData);
    this.isSubmitting = false;
    this.showAddModal = false;
  }

  async deleteCustomer(customerId: string) {
    if (!confirm('Are you sure you want to delete this customer?')) return;
    const success = await this.customerService.remove(customerId);
    if (success) {
      console.log('Customer deleted successfully');
    }
  }

  formatCurrency(amount: number, currency: string = 'USD'): string {
    return amount.toLocaleString('en-US', { style: 'currency', currency, minimumFractionDigits: 0 });
  }
}
