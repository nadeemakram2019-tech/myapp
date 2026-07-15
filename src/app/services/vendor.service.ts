import { Injectable, signal } from '@angular/core';
import { BaseDataService } from './base-data.service';

export interface Vendor {
  id: string;
  vendor_id: string;
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
  verificationStatus?: string;
  qboStatus?: string;
  created_at?: string;
}

@Injectable({
  providedIn: 'root'
})
export class VendorService {
  vendors = signal<Vendor[]>([]);
  loading = signal(false);

  constructor(private db: BaseDataService) {}

  async loadAll() {
    this.loading.set(true);
    try {
      const data = await this.db.getAll<any>('vendors', 'created_at');
      const mapped: Vendor[] = data.map((item: any) => ({
        id: item.id,
        vendor_id: item.vendor_id,
        name: item.name,
        email: item.email,
        phone: item.phone,
        location: item.location,
        website: item.website,
        avatar: item.avatar,
        status: item.status || 'Active',
        type: item.type || 'Business',
        currency: item.currency || 'CAD',
        addedDate: item.added_date || item.addedDate,
        verificationStatus: item.verification_status || item.verificationStatus,
        qboStatus: item.qbo_status || item.qboStatus,
        created_at: item.created_at
      }));
      this.vendors.set(mapped);
    } catch (err) {
      console.error('Error loading vendors:', err);
    } finally {
      this.loading.set(false);
    }
  }

  async add(vendor: Partial<Vendor>): Promise<Vendor | null> {
    try {
      const dbRecord: any = {};
      if (vendor.vendor_id) dbRecord.vendor_id = vendor.vendor_id;
      if (vendor.name) dbRecord.name = vendor.name;
      if (vendor.email !== undefined) dbRecord.email = vendor.email;
      if (vendor.phone !== undefined) dbRecord.phone = vendor.phone;
      if (vendor.location !== undefined) dbRecord.location = vendor.location;
      if (vendor.website !== undefined) dbRecord.website = vendor.website;
      if (vendor.avatar) dbRecord.avatar = vendor.avatar;
      if (vendor.status) dbRecord.status = vendor.status;
      if (vendor.type) dbRecord.type = vendor.type;
      if (vendor.currency) dbRecord.currency = vendor.currency;
      if (vendor.addedDate) dbRecord.added_date = vendor.addedDate;
      if (vendor.verificationStatus) dbRecord.verification_status = vendor.verificationStatus;
      if (vendor.qboStatus) dbRecord.qbo_status = vendor.qboStatus;

      const result = await this.db.insert<any>('vendors', dbRecord);
      const mapped = this.mapVendor(result);
      this.vendors.update(list => [mapped, ...list]);
      return mapped;
    } catch (err) {
      console.error('Error adding vendor:', err);
      return null;
    }
  }

  async remove(vendorId: string): Promise<boolean> {
    try {
      await this.db.delete('vendors', 'vendor_id', vendorId);
      this.vendors.update(list => list.filter(v => v.vendor_id !== vendorId));
      return true;
    } catch (err) {
      console.error('Error deleting vendor:', err);
      return false;
    }
  }

  async update(vendorId: string, updates: Partial<Vendor>): Promise<boolean> {
    try {
      const dbUpdates: any = {};
      if (updates.name) dbUpdates.name = updates.name;
      if (updates.email !== undefined) dbUpdates.email = updates.email;
      if (updates.phone !== undefined) dbUpdates.phone = updates.phone;
      if (updates.location !== undefined) dbUpdates.location = updates.location;
      if (updates.website !== undefined) dbUpdates.website = updates.website;
      if (updates.avatar) dbUpdates.avatar = updates.avatar;
      if (updates.status) dbUpdates.status = updates.status;
      if (updates.type) dbUpdates.type = updates.type;
      if (updates.currency) dbUpdates.currency = updates.currency;
      if (updates.addedDate) dbUpdates.added_date = updates.addedDate;
      if (updates.verificationStatus) dbUpdates.verification_status = updates.verificationStatus;
      if (updates.qboStatus) dbUpdates.qbo_status = updates.qboStatus;

      await this.db.update<any>('vendors', 'vendor_id', vendorId, dbUpdates);
      this.vendors.update(list =>
        list.map(v => v.vendor_id === vendorId ? { ...v, ...updates } : v)
      );
      return true;
    } catch (err) {
      console.error('Error updating vendor:', err);
      return false;
    }
  }

  async search(query: string): Promise<Vendor[]> {
    const results = await this.db.search<any>('vendors', query, ['name', 'email', 'phone', 'location']);
    return results.map(item => this.mapVendor(item));
  }

  private mapVendor(item: any): Vendor {
    return {
      id: item.id,
      vendor_id: item.vendor_id,
      name: item.name,
      email: item.email,
      phone: item.phone,
      location: item.location,
      website: item.website,
      avatar: item.avatar,
      status: item.status || 'Active',
      type: item.type || 'Business',
      currency: item.currency || 'CAD',
      addedDate: item.added_date || item.addedDate,
      verificationStatus: item.verification_status || item.verificationStatus,
      qboStatus: item.qbo_status || item.qboStatus,
      created_at: item.created_at
    };
  }
}
