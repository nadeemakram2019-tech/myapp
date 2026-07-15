import { Injectable, signal } from '@angular/core';
import { BaseDataService } from './base-data.service';

export interface Expense {
  id: string;
  expense_id: string;
  employeeName: string;
  employeeAvatar?: string;
  employeeInitials: string;
  employeeColor: string;
  category: string;
  amount: number;
  currency: string;
  date: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Reimbursed';
  description: string;
  receipt?: boolean;
  created_at?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  expenses = signal<Expense[]>([]);
  loading = signal(false);

  constructor(private db: BaseDataService) {}

  async loadAll() {
    this.loading.set(true);
    try {
      const data = await this.db.getAll<any>('expenses', 'created_at');
      const mapped: Expense[] = data.map((item: any) => ({
        id: item.id,
        expense_id: item.expense_id,
        employeeName: item.employee_name,
        employeeAvatar: item.employee_avatar,
        employeeInitials: item.employee_initials || '',
        employeeColor: item.employee_color || 'blue',
        category: item.category,
        amount: Number(item.amount) || 0,
        currency: item.currency || 'USD',
        date: item.date,
        status: item.status || 'Pending',
        description: item.description || '',
        receipt: item.receipt || false,
        created_at: item.created_at
      }));
      this.expenses.set(mapped);
    } catch (err) {
      console.error('Error loading expenses:', err);
    } finally {
      this.loading.set(false);
    }
  }

  async add(expense: Partial<Expense>): Promise<Expense | null> {
    try {
      const dbRecord: any = {
        employee_name: expense.employeeName,
        employee_avatar: expense.employeeAvatar,
        employee_initials: expense.employeeInitials,
        employee_color: expense.employeeColor,
        category: expense.category,
        amount: expense.amount,
        currency: expense.currency,
        date: expense.date,
        status: expense.status,
        description: expense.description,
        receipt: expense.receipt
      };
      if (expense.expense_id) dbRecord.expense_id = expense.expense_id;

      const result = await this.db.insert<any>('expenses', dbRecord);
      const mapped = this.mapExpense(result);
      this.expenses.update(list => [mapped, ...list]);
      return mapped;
    } catch (err) {
      console.error('Error adding expense:', err);
      return null;
    }
  }

  async remove(expenseId: string): Promise<boolean> {
    try {
      await this.db.delete('expenses', 'expense_id', expenseId);
      this.expenses.update(list => list.filter(e => e.expense_id !== expenseId));
      return true;
    } catch (err) {
      console.error('Error deleting expense:', err);
      return false;
    }
  }

  async update(expenseId: string, updates: Partial<Expense>): Promise<boolean> {
    try {
      const dbUpdates: any = {};
      if (updates.employeeName) dbUpdates.employee_name = updates.employeeName;
      if (updates.employeeAvatar !== undefined) dbUpdates.employee_avatar = updates.employeeAvatar;
      if (updates.category) dbUpdates.category = updates.category;
      if (updates.amount !== undefined) dbUpdates.amount = updates.amount;
      if (updates.currency) dbUpdates.currency = updates.currency;
      if (updates.date) dbUpdates.date = updates.date;
      if (updates.status) dbUpdates.status = updates.status;
      if (updates.description !== undefined) dbUpdates.description = updates.description;
      if (updates.receipt !== undefined) dbUpdates.receipt = updates.receipt;

      await this.db.update<any>('expenses', 'expense_id', expenseId, dbUpdates);
      this.expenses.update(list =>
        list.map(e => e.expense_id === expenseId ? { ...e, ...updates } : e)
      );
      return true;
    } catch (err) {
      console.error('Error updating expense:', err);
      return false;
    }
  }

  private mapExpense(item: any): Expense {
    return {
      id: item.id,
      expense_id: item.expense_id,
      employeeName: item.employee_name,
      employeeAvatar: item.employee_avatar,
      employeeInitials: item.employee_initials || '',
      employeeColor: item.employee_color || 'blue',
      category: item.category,
      amount: Number(item.amount) || 0,
      currency: item.currency || 'USD',
      date: item.date,
      status: item.status || 'Pending',
      description: item.description || '',
      receipt: item.receipt || false,
      created_at: item.created_at
    };
  }
}
