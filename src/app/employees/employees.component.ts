import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';

interface Employee {
  id: string;
  name: string;
  email: string;
  initials: string;
  color: string;
  department: string;
  role: string;
  status: 'Active' | 'On Leave' | 'Inactive';
  joinDate: string;
}

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './employees.component.html'
})
export class EmployeesComponent {
  searchQuery: string = '';
  
  employees: Employee[] = [
    { id: 'EMP-001', name: 'Alice Cooper', email: 'alice.c@paysetra.ai', initials: 'AC', color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400', department: 'Engineering', role: 'Senior Developer', status: 'Active', joinDate: '2023-01-15' },
    { id: 'EMP-002', name: 'Bob Smith', email: 'bob.s@paysetra.ai', initials: 'BS', color: 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400', department: 'Marketing', role: 'Marketing Manager', status: 'Active', joinDate: '2023-03-22' },
    { id: 'EMP-003', name: 'Charlie Davis', email: 'charlie.d@paysetra.ai', initials: 'CD', color: 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400', department: 'Sales', role: 'Account Executive', status: 'On Leave', joinDate: '2022-11-05' },
    { id: 'EMP-004', name: 'Diana Prince', email: 'diana.p@paysetra.ai', initials: 'DP', color: 'bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400', department: 'HR', role: 'HR Director', status: 'Active', joinDate: '2021-08-10' },
    { id: 'EMP-005', name: 'Evan Wright', email: 'evan.w@paysetra.ai', initials: 'EW', color: 'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400', department: 'Engineering', role: 'DevOps Engineer', status: 'Inactive', joinDate: '2022-05-18' }
  ];

  get filteredEmployees(): Employee[] {
    if (!this.searchQuery) return this.employees;
    const lowerQuery = this.searchQuery.toLowerCase();
    return this.employees.filter(emp => 
      emp.name.toLowerCase().includes(lowerQuery) || 
      emp.email.toLowerCase().includes(lowerQuery) ||
      emp.department.toLowerCase().includes(lowerQuery)
    );
  }
}
