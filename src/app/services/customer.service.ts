import { Injectable, signal } from '@angular/core';
import { BaseDataService } from './base-data.service';

export interface Customer {
  id: string;
  customer_id: string;
  name: string;
  email?: string;
  phone?: string;
  location?: string;
  website?: string;
  avatar: string;
  status: string;
  type: string;
  currency: string;
  added_date: string;
  total_spent: number;
  invoices_count: number;
  last_activity?: string;
  created_at?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  customers = signal<Customer[]>([]);
  loading = signal(false);

  constructor(private db: BaseDataService) {}

  async loadAll() {
    this.loading.set(true);
    try {
      const data = await this.db.getAll<Customer>('customers', 'created_at');
      this.customers.set(data);
    } catch (err) {
      console.error('Error loading customers:', err);
    } finally {
      this.loading.set(false);
    }
  }

  async add(customer: Partial<Customer>): Promise<Customer | null> {
    try {
      const newCustomer = await this.db.insert<Customer>('customers', customer);
      this.customers.update(list => [newCustomer, ...list]);
      return newCustomer;
    } catch (err) {
      console.error('Error adding customer:', err);
      return null;
    }
  }

  async remove(customerId: string): Promise<boolean> {
    try {
      await this.db.delete('customers', 'customer_id', customerId);
      this.customers.update(list => list.filter(c => c.customer_id !== customerId));
      return true;
    } catch (err) {
      console.error('Error deleting customer:', err);
      return false;
    }
  }

  async update(customerId: string, updates: Partial<Customer>): Promise<boolean> {
    try {
      await this.db.update<Customer>('customers', 'customer_id', customerId, updates);
      this.customers.update(list =>
        list.map(c => c.customer_id === customerId ? { ...c, ...updates } : c)
      );
      return true;
    } catch (err) {
      console.error('Error updating customer:', err);
      return false;
    }
  }

  async search(query: string): Promise<Customer[]> {
    return this.db.search<Customer>('customers', query, ['name', 'email', 'phone', 'location']);
  }
}
