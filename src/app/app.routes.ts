import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
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
    path: 'tasks',
    loadComponent: () => import('./tasks/tasks.component').then((m) => m.TasksComponent)
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
    path: 'documents',
    loadComponent: () => import('./document-manager/document-manager.component').then((m) => m.DocumentManagerComponent)
  },
  { path: '**', redirectTo: 'dashboard' }
];
