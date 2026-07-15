import { Injectable, signal } from '@angular/core';
import { BaseDataService } from './base-data.service';

export interface Employee {
  id: string;
  employee_id: string;
  name: string;
  email: string;
  initials: string;
  color: string;
  department: string;
  role: string;
  status: 'Active' | 'On Leave' | 'Inactive';
  joinDate: string;
  created_at?: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  employees = signal<Employee[]>([]);
  loading = signal(false);

  constructor(private db: BaseDataService) {}

  async loadAll() {
    this.loading.set(true);
    try {
      const data = await this.db.getAll<any>('employees', 'created_at');
      const mapped: Employee[] = data.map((item: any) => ({
        id: item.id,
        employee_id: item.employee_id,
        name: item.name,
        email: item.email,
        initials: item.initials || '',
        color: item.color || 'bg-blue-100 text-blue-700',
        department: item.department,
        role: item.role,
        status: item.status || 'Active',
        joinDate: item.join_date,
        created_at: item.created_at
      }));
      this.employees.set(mapped);
    } catch (err) {
      console.error('Error loading employees:', err);
    } finally {
      this.loading.set(false);
    }
  }

  async add(employee: Partial<Employee>): Promise<Employee | null> {
    try {
      const dbRecord: any = {
        name: employee.name,
        email: employee.email,
        initials: employee.initials,
        color: employee.color,
        department: employee.department,
        role: employee.role,
        status: employee.status,
        join_date: employee.joinDate
      };
      if (employee.employee_id) dbRecord.employee_id = employee.employee_id;

      const result = await this.db.insert<any>('employees', dbRecord);
      const mapped = this.mapEmployee(result);
      this.employees.update(list => [mapped, ...list]);
      return mapped;
    } catch (err) {
      console.error('Error adding employee:', err);
      return null;
    }
  }

  async remove(employeeId: string): Promise<boolean> {
    try {
      await this.db.delete('employees', 'employee_id', employeeId);
      this.employees.update(list => list.filter(e => e.employee_id !== employeeId));
      return true;
    } catch (err) {
      console.error('Error deleting employee:', err);
      return false;
    }
  }

  async update(employeeId: string, updates: Partial<Employee>): Promise<boolean> {
    try {
      const dbUpdates: any = {};
      if (updates.name) dbUpdates.name = updates.name;
      if (updates.email) dbUpdates.email = updates.email;
      if (updates.initials) dbUpdates.initials = updates.initials;
      if (updates.color) dbUpdates.color = updates.color;
      if (updates.department) dbUpdates.department = updates.department;
      if (updates.role) dbUpdates.role = updates.role;
      if (updates.status) dbUpdates.status = updates.status;
      if (updates.joinDate) dbUpdates.join_date = updates.joinDate;

      await this.db.update<any>('employees', 'employee_id', employeeId, dbUpdates);
      this.employees.update(list =>
        list.map(e => e.employee_id === employeeId ? { ...e, ...updates } : e)
      );
      return true;
    } catch (err) {
      console.error('Error updating employee:', err);
      return false;
    }
  }

  async search(query: string): Promise<Employee[]> {
    const results = await this.db.search<any>('employees', query, ['name', 'email', 'department', 'role']);
    return results.map(item => this.mapEmployee(item));
  }

  private mapEmployee(item: any): Employee {
    return {
      id: item.id,
      employee_id: item.employee_id,
      name: item.name,
      email: item.email,
      initials: item.initials || '',
      color: item.color || 'bg-blue-100 text-blue-700',
      department: item.department,
      role: item.role,
      status: item.status || 'Active',
      joinDate: item.join_date,
      created_at: item.created_at
    };
  }
}
