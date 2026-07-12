import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

const API_URL = 'https://6a44a80aaab3faec3f68a762.mockapi.io/test/Test';

interface ApiBill {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface Bill {
  id: string;
  vendorName: string;
  vendorInitials: string;
  vendorColor: string;
  date: string;
  dueDate: string;
  amount: number;
  currency: string;
  status: 'Pending Approval' | 'Approved' | 'Paid' | 'Overdue';
  category: string;
}

const COLORS = ['purple', 'blue', 'emerald', 'orange', 'rose'] as const;
const STATUSES: Bill['status'][] = ['Pending Approval', 'Approved', 'Paid', 'Overdue'];
const CATEGORIES = ['Marketing', 'Infrastructure', 'Software', 'Communication', 'Monitoring', 'Consulting', 'Other'];
const CURRENCIES = ['USD', 'SGD', 'EUR', 'GBP', 'CAD'];

function randomItem<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function formatDate(d: Date): string {
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function pick<T>(arr: readonly T[], index: number): T {
  return arr[index % arr.length];
}

@Injectable({ providedIn: 'root' })
export class BillsService {
  private readonly http = inject(HttpClient);

  getBills(): Observable<Bill[]> {
    return this.http.get<ApiBill[]>(API_URL).pipe(
      map((apiBills) =>
        apiBills.map((api, i) => {
          const initials = api.name
            .split(' ')
            .map((w) => w[0])
            .join('')
            .substring(0, 2)
            .toUpperCase();

          // Spread bills across the next 60 days
          const issuedDate = new Date();
          issuedDate.setDate(issuedDate.getDate() + (i % 30));
          const due = new Date(issuedDate);
          due.setDate(due.getDate() + 30);

          return {
            id: `#BILL-${String(100000 + i).slice(0, 6)}`,
            vendorName: api.name,
            vendorInitials: initials,
            vendorColor: pick(COLORS, i),
            date: formatDate(issuedDate),
            dueDate: formatDate(due),
            amount: Math.round((Math.random() * 50000 + 100) * 100) / 100,
            currency: pick(CURRENCIES, i),
            status: pick(STATUSES, i),
            category: pick(CATEGORIES, i)
          } satisfies Bill;
        })
      )
    );
  }
}
