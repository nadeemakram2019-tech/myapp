import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { EmployeeService, Employee } from '../services/employee.service';
import { PageHeaderComponent } from '../components/page-header.component';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule, PageHeaderComponent],
  templateUrl: './employees.component.html'
})
export class EmployeesComponent implements OnInit {
  searchQuery: string = '';

  constructor(public employeeService: EmployeeService) {}

  ngOnInit() {
    this.employeeService.loadAll();
  }

  get employees() {
    return this.employeeService.employees();
  }

  get loading() {
    return this.employeeService.loading();
  }

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
