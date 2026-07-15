import { Injectable, inject, signal } from '@angular/core';
import { BaseDataService } from '../services/base-data.service';

export interface PurchaseOrder {
  id: string;
  po_id: string;
  poNumber: string;
  vendorName: string;
  createdDate: string;
  approvedAmount: number;
  availableBalance: number;
  currency: string;
  status: 'Open' | 'Draft' | 'Completed';
  created_at?: string;
}

@Injectable({ providedIn: 'root' })
export class PurchaseOrdersService {
  private readonly db = inject(BaseDataService);

  purchaseOrders = signal<PurchaseOrder[]>([]);
  loading = signal(false);
  error = signal('');

  async loadAll() {
    this.loading.set(true);
    this.error.set('');
    try {
      const data = await this.db.getAll<any>('purchase_orders', 'created_at');
      const mapped: PurchaseOrder[] = data.map((item: any) => ({
        id: item.id,
        po_id: item.po_id,
        poNumber: item.po_number,
        vendorName: item.vendor_name,
        createdDate: item.created_date,
        approvedAmount: Number(item.approved_amount) || 0,
        availableBalance: Number(item.available_balance) || 0,
        currency: item.currency || 'USD',
        status: item.status || 'Draft',
        created_at: item.created_at
      }));
      this.purchaseOrders.set(mapped);
    } catch (err) {
      const message = 'Failed to load purchase orders. Please try again later.';
      this.error.set(message);
      console.error('Error fetching purchase orders:', err);
    } finally {
      this.loading.set(false);
    }
  }

  async add(order: Partial<PurchaseOrder>): Promise<PurchaseOrder | null> {
    try {
      const dbRecord = {
        po_id: order.po_id,
        po_number: order.poNumber,
        vendor_name: order.vendorName,
        created_date: order.createdDate,
        approved_amount: order.approvedAmount,
        available_balance: order.availableBalance,
        currency: order.currency,
        status: order.status
      };
      const result = await this.db.insert<any>('purchase_orders', dbRecord);
      const mapped: PurchaseOrder = {
        id: result.id,
        po_id: result.po_id,
        poNumber: result.po_number,
        vendorName: result.vendor_name,
        createdDate: result.created_date,
        approvedAmount: Number(result.approved_amount) || 0,
        availableBalance: Number(result.available_balance) || 0,
        currency: result.currency || 'USD',
        status: result.status || 'Draft',
        created_at: result.created_at
      };
      this.purchaseOrders.update(list => [mapped, ...list]);
      return mapped;
    } catch (err) {
      console.error('Error adding purchase order:', err);
      return null;
    }
  }

  async remove(poId: string): Promise<boolean> {
    try {
      await this.db.delete('purchase_orders', 'po_id', poId);
      this.purchaseOrders.update(list => list.filter(po => po.po_id !== poId));
      return true;
    } catch (err) {
      console.error('Error deleting purchase order:', err);
      return false;
    }
  }

  async update(poId: string, updates: Partial<PurchaseOrder>): Promise<boolean> {
    try {
      const dbUpdates: any = {};
      if (updates.poNumber) dbUpdates.po_number = updates.poNumber;
      if (updates.vendorName) dbUpdates.vendor_name = updates.vendorName;
      if (updates.createdDate) dbUpdates.created_date = updates.createdDate;
      if (updates.approvedAmount) dbUpdates.approved_amount = updates.approvedAmount;
      if (updates.availableBalance) dbUpdates.available_balance = updates.availableBalance;
      if (updates.currency) dbUpdates.currency = updates.currency;
      if (updates.status) dbUpdates.status = updates.status;

      await this.db.update<any>('purchase_orders', 'po_id', poId, dbUpdates);
      this.purchaseOrders.update(list =>
        list.map(po => po.po_id === poId ? { ...po, ...updates } : po)
      );
      return true;
    } catch (err) {
      console.error('Error updating purchase order:', err);
      return false;
    }
  }
}
