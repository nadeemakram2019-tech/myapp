import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

const API_URL = 'https://6a44a80aaab3faec3f68a762.mockapi.io/test/PurchaseOrders';

interface ApiPurchaseOrder {
  id: string;
  PONo: string;
  Vendors: string;
  CREATEDDATE: string;
  APPROVEDAMT: string;
  AVAILABLEBALANCE: string;
}

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  vendorName: string;
  createdDate: string;
  approvedAmount: number;
  availableBalance: number;
  currency: string;
  status: 'Open' | 'Draft' | 'Completed';
}

const CURRENCIES = ['USD', 'SGD', 'EUR', 'GBP', 'CAD'] as const;
const STATUSES: PurchaseOrder['status'][] = ['Open', 'Draft', 'Completed'];

function formatDate(isoString: string): string {
  const d = new Date(isoString);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function pick<T>(arr: readonly T[], index: number): T {
  return arr[index % arr.length];
}

@Injectable({ providedIn: 'root' })
export class PurchaseOrdersService {
  private readonly http = inject(HttpClient);

  getPurchaseOrders(): Observable<PurchaseOrder[]> {
    return this.http.get<ApiPurchaseOrder[]>(API_URL).pipe(
      map((apiOrders) =>
        apiOrders.map((api, i) => ({
          id: api.id,
          poNumber: `PO-${String(1001 + i)}`,
          vendorName: api.Vendors,
          createdDate: formatDate(api.PONo),
          approvedAmount: parseFloat(api.APPROVEDAMT),
          availableBalance: parseFloat(api.AVAILABLEBALANCE),
          currency: pick(CURRENCIES, i),
          status: pick(STATUSES, i)
        } satisfies PurchaseOrder))
      )
    );
  }
}
