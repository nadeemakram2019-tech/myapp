import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

interface Plan {
  id: string;
  title: string;
  description: string;
  initials: string;
  color: string;
  type: string;
  date: string;
  status: 'Draft' | 'In Progress' | 'Completed' | 'Archived';
  tasks: number;
  completedTasks: number;
}

@Component({
  selector: 'app-planner-page',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './planner-page.component.html',
  styleUrl: './planner-page.component.css'
})
export class PlannerPageComponent {
  tabs = ['All Briefs', 'Draft', 'In Progress', 'Completed'];
  activeTab = 'All Briefs';

  plans: Plan[] = [
    {
      id: 'PLN-001',
      title: 'SaaS Customer Portal',
      description: 'Self-service portal for customers to manage subscriptions, invoices, and support tickets.',
      initials: 'SC',
      color: 'blue',
      type: 'Web App',
      date: '2024-01-15',
      status: 'Completed',
      tasks: 24,
      completedTasks: 24
    },
    {
      id: 'PLN-002',
      title: 'Mobile Wallet Integration',
      description: 'Digital wallet with QR payments, peer-to-peer transfers, and expense tracking.',
      initials: 'MW',
      color: 'purple',
      type: 'Mobile',
      date: '2024-01-14',
      status: 'Completed',
      tasks: 18,
      completedTasks: 18
    },
    {
      id: 'PLN-003',
      title: 'AI Document Processor',
      description: 'Intelligent document ingestion and OCR extraction for automated bill processing.',
      initials: 'AD',
      color: 'emerald',
      type: 'AI/ML',
      date: '2024-01-16',
      status: 'In Progress',
      tasks: 32,
      completedTasks: 14
    },
    {
      id: 'PLN-004',
      title: 'Team Dashboard Redesign',
      description: 'Complete overhaul of the analytics dashboard with real-time metrics and custom widgets.',
      initials: 'TD',
      color: 'orange',
      type: 'UI/UX',
      date: '2024-01-17',
      status: 'Draft',
      tasks: 15,
      completedTasks: 2
    },
    {
      id: 'PLN-005',
      title: 'Payment Gateway Upgrade',
      description: 'Migrate to new payment processor with support for multiple currencies and faster settlements.',
      initials: 'PG',
      color: 'rose',
      type: 'Backend',
      date: '2024-01-13',
      status: 'Draft',
      tasks: 20,
      completedTasks: 0
    },
    {
      id: 'PLN-006',
      title: 'Automated Approval Workflow',
      description: 'Multi-tier approval engine for purchase orders, expenses, and vendor bills with smart routing.',
      initials: 'AW',
      color: 'blue',
      type: 'Workflow',
      date: '2024-01-18',
      status: 'Completed',
      tasks: 28,
      completedTasks: 28
    }
  ];

  get filteredPlans(): Plan[] {
    if (this.activeTab === 'All Briefs') {
      return this.plans;
    }
    return this.plans.filter(p => p.status === this.activeTab);
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'Completed':
        return 'bg-emerald-100/70 border-emerald-200 text-emerald-700';
      case 'Draft':
        return 'bg-slate-100/70 border-slate-200 text-slate-600';
      case 'In Progress':
        return 'bg-blue-100/70 border-blue-200 text-blue-700';
      case 'Archived':
        return 'bg-rose-100/70 border-rose-200 text-rose-700';
      default:
        return 'bg-slate-100 border-slate-200 text-slate-700';
    }
  }

  getProgressPercent(plan: Plan): number {
    if (plan.tasks === 0) return 0;
    return Math.round((plan.completedTasks / plan.tasks) * 100);
  }
}
