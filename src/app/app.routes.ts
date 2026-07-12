import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'planner', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component').then((m) => m.DashboardComponent)
  },
  {
    path: 'reconciliation/card-transactions',
    loadComponent: () => import('./reconciliation/card-transactions.component').then((m) => m.CardTransactionsComponent)
  },
  {
    path: 'datastream',
    loadComponent: () => import('./datastream/datastream.component').then((m) => m.DatastreamComponent)
  },
  {
    path: 'planner',
    loadComponent: () => import('./planner/planner-page.component').then((m) => m.PlannerPageComponent)
  },
  {
    path: 'bills',
    loadComponent: () => import('./bills/bills.component').then((m) => m.BillsComponent)
  },
  {
    path: 'approval-delegations',
    loadComponent: () => import('./approval-delegations/approval-delegations.component').then((m) => m.ApprovalDelegationsComponent)
  },
  {
    path: 'tasks',
    loadComponent: () => import('./tasks/tasks.component').then((m) => m.TasksComponent)
  },
  {
    path: 'employees',
    loadComponent: () => import('./employees/employees.component').then((m) => m.EmployeesComponent)
  },
  {
    path: 'intellicapture',
    loadComponent: () => import('./intelli-capture/intelli-capture.component').then((m) => m.IntelliCaptureComponent)
  },
  { path: 'IntelliCapture', redirectTo: 'intellicapture', pathMatch: 'full' },
  {
    path: 'payment-links',
    loadComponent: () => import('./payment-links/payment-links.component').then((m) => m.PaymentLinksComponent)
  },
  {
    path: 'purchase-orders',
    loadComponent: () => import('./purchase-orders/purchase-orders.component').then((m) => m.PurchaseOrdersComponent)
  },
  { path: '**', redirectTo: 'planner' }
];
