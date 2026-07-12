import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';

export interface Employee {
  id: string;
  name: string;
  email: string;
  initials: string;
  avatar: string;
  color: string; // Tailwind background color class
}

export interface Delegation {
  id: string;
  delegatedTo: Employee;
  startDate: string;
  endDate: string;
  status: 'Active' | 'Scheduled' | 'Expired';
  reason: string;
  dateCreated: string;
}

export interface RequestItem {
  description: string;
  qty: number;
  rate: number;
  amount: number;
}

export interface ApprovalRequest {
  id: string;
  title: string;
  submitter: Employee;
  department: string;
  type: 'Bill' | 'Expense';
  amount: number;
  currency: string;
  submitDate: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  description: string;
  items?: RequestItem[];
  rejectionReason?: string;
  timeline: { status: string; date: string; user: string; reason?: string }[];
}

const EMPLOYEES: Employee[] = [
  {
    id: 'emp-1',
    name: 'Sarah Connor',
    email: 'sarah.connor@paysetra.com',
    initials: 'SC',
    avatar: 'https://avatar.vercel.sh/Sarah%20Connor.png',
    color: 'bg-indigo-500'
  },
  {
    id: 'emp-2',
    name: 'Michael Scott',
    email: 'michael.scott@paysetra.com',
    initials: 'MS',
    avatar: 'https://avatar.vercel.sh/Michael%20Scott.png',
    color: 'bg-purple-500'
  },
  {
    id: 'emp-3',
    name: 'Elena Rostova',
    email: 'elena.rostova@paysetra.com',
    initials: 'ER',
    avatar: 'https://avatar.vercel.sh/Elena%20Rostova.png',
    color: 'bg-emerald-500'
  },
  {
    id: 'emp-4',
    name: 'David Beckham',
    email: 'david.beckham@paysetra.com',
    initials: 'DB',
    avatar: 'https://avatar.vercel.sh/David%20Beckham.png',
    color: 'bg-amber-500'
  },
  {
    id: 'emp-5',
    name: 'Marcus Aurelius',
    email: 'marcus.aurelius@paysetra.com',
    initials: 'MA',
    avatar: 'https://avatar.vercel.sh/Marcus%20Aurelius.png',
    color: 'bg-rose-500'
  }
];

@Component({
  selector: 'app-approval-delegations',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule, ButtonModule, DrawerModule],
  templateUrl: './approval-delegations.component.html'
})
export class ApprovalDelegationsComponent {
  // Selectable employees list
  employees: Employee[] = EMPLOYEES;

  // Tabs and request filtering signals
  activeTab = signal<'requests' | 'delegations'>('delegations');
  statusFilter = signal<'All' | 'Pending' | 'Approved' | 'Rejected'>('All');
  typeFilter = signal<'All' | 'Bill' | 'Expense'>('All');
  searchQuery = signal<string>('');

  // Details drawer signals
  isDetailsDrawerOpen = signal<boolean>(false);
  selectedRequest = signal<ApprovalRequest | null>(null);
  rejectionReason = signal<string>('');
  rejectionError = signal<string>('');
  isRejecting = signal<boolean>(false);

  // High-fidelity approval requests mock dataset
  approvalRequests = signal<ApprovalRequest[]>([
    {
      id: 'REQ-101',
      title: 'Quarterly AWS Infrastructure Bill',
      submitter: EMPLOYEES[0], // Sarah Connor
      department: 'Engineering',
      type: 'Bill',
      amount: 14250.00,
      currency: 'USD',
      submitDate: '2026-05-28',
      status: 'Pending',
      description: 'Production AWS billing charges for Feb-Apr 2026.',
      items: [
        { description: 'EC2 & ECS Compute Instances', qty: 1, rate: 8500.00, amount: 8500.00 },
        { description: 'Amazon RDS Databases', qty: 1, rate: 3250.00, amount: 3250.00 },
        { description: 'S3 Storage & CloudFront CDN Data Transfer', qty: 1, rate: 2500.00, amount: 2500.00 }
      ],
      timeline: [
        { status: 'Submitted', date: '2026-05-28', user: 'Sarah Connor' }
      ]
    },
    {
      id: 'REQ-102',
      title: 'Client Dinner - Q2 Review',
      submitter: EMPLOYEES[1], // Michael Scott
      department: 'Sales',
      type: 'Expense',
      amount: 450.00,
      currency: 'USD',
      submitDate: '2026-05-29',
      status: 'Pending',
      description: "Client dinner with Dunder Mifflin executives at Chili's.",
      items: [
        { description: 'Food and beverages', qty: 6, rate: 75.00, amount: 450.00 }
      ],
      timeline: [
        { status: 'Submitted', date: '2026-05-29', user: 'Michael Scott' }
      ]
    },
    {
      id: 'REQ-103',
      title: 'Office Supplies Restocking',
      submitter: EMPLOYEES[2], // Elena Rostova
      department: 'Operations',
      type: 'Expense',
      amount: 120.50,
      currency: 'EUR',
      submitDate: '2026-05-30',
      status: 'Pending',
      description: 'Printers ink, A4 papers, and stationery items.',
      items: [
        { description: 'A4 Paper Reams', qty: 5, rate: 6.10, amount: 30.50 },
        { description: 'HP LaserJet Toner Cartridge', qty: 1, rate: 90.00, amount: 90.00 }
      ],
      timeline: [
        { status: 'Submitted', date: '2026-05-30', user: 'Elena Rostova' }
      ]
    },
    {
      id: 'REQ-104',
      title: 'SaaS Dev License - Github Enterprise',
      submitter: EMPLOYEES[0], // Sarah Connor
      department: 'Engineering',
      type: 'Bill',
      amount: 2400.00,
      currency: 'USD',
      submitDate: '2026-05-15',
      status: 'Approved',
      description: 'Annual developer licenses for Github Enterprise tier.',
      items: [
        { description: 'Github Enterprise Seat Licenses', qty: 12, rate: 200.00, amount: 2400.00 }
      ],
      timeline: [
        { status: 'Submitted', date: '2026-05-15', user: 'Sarah Connor' },
        { status: 'Approved', date: '2026-05-16', user: 'Approvals Manager' }
      ]
    },
    {
      id: 'REQ-105',
      title: 'Travel to Berlin Conference',
      submitter: EMPLOYEES[3], // David Beckham
      department: 'Marketing',
      type: 'Expense',
      amount: 890.00,
      currency: 'EUR',
      submitDate: '2026-05-10',
      status: 'Rejected',
      description: 'Flight and lodging for tech summit in Berlin.',
      items: [
        { description: 'Lufthansa flight ticket', qty: 1, rate: 450.00, amount: 450.00 },
        { description: 'Hotel accommodation 2 nights', qty: 2, rate: 220.00, amount: 440.00 }
      ],
      rejectionReason: 'Exceeded travel policy budget limits for standard marketing trips without prior written authorization.',
      timeline: [
        { status: 'Submitted', date: '2026-05-10', user: 'David Beckham' },
        { status: 'Rejected', date: '2026-05-12', user: 'Approvals Manager', reason: 'Exceeded travel policy budget limits for standard marketing trips without prior written authorization.' }
      ]
    }
  ]);

  // List of delegations (signal)
  delegations = signal<Delegation[]>([
    {
      id: 'DEL-001',
      delegatedTo: EMPLOYEES[1], // Michael Scott
      startDate: '2026-05-01',
      endDate: '2026-05-15',
      status: 'Expired',
      reason: 'Annual leaves / vacation coverage',
      dateCreated: '2026-04-30'
    },
    {
      id: 'DEL-002',
      delegatedTo: EMPLOYEES[0], // Sarah Connor
      startDate: '2026-06-01',
      endDate: '2026-06-10',
      status: 'Scheduled',
      reason: 'Medical leave backup',
      dateCreated: '2026-05-25'
    },
    {
      id: 'DEL-003',
      delegatedTo: EMPLOYEES[2], // Elena Rostova
      startDate: '2026-05-28',
      endDate: '2026-06-15',
      status: 'Active',
      reason: 'Business travel delegation',
      dateCreated: '2026-05-28'
    }
  ]);

  // Computed counts for requests statistics
  pendingCount = computed(() => this.approvalRequests().filter(r => r.status === 'Pending').length);
  approvedCount = computed(() => this.approvalRequests().filter(r => r.status === 'Approved').length);
  rejectedCount = computed(() => this.approvalRequests().filter(r => r.status === 'Rejected').length);

  // Computed counts for delegations statistics
  activeCount = computed(() => this.delegations().filter(d => d.status === 'Active').length);
  scheduledCount = computed(() => this.delegations().filter(d => d.status === 'Scheduled').length);
  expiredCount = computed(() => this.delegations().filter(d => d.status === 'Expired').length);

  // Computed filtered approval requests
  filteredRequests = computed(() => {
    let list = this.approvalRequests();
    
    // Status filter
    const status = this.statusFilter();
    if (status !== 'All') {
      list = list.filter(r => r.status === status);
    }
    
    // Type filter
    const type = this.typeFilter();
    if (type !== 'All') {
      list = list.filter(r => r.type === type);
    }
    
    // Search query filter (case-insensitive matching title/id/submitter name)
    const query = this.searchQuery().trim().toLowerCase();
    if (query) {
      list = list.filter(r => 
        r.title.toLowerCase().includes(query) ||
        r.id.toLowerCase().includes(query) ||
        r.submitter.name.toLowerCase().includes(query)
      );
    }
    
    return list;
  });

  // Modal display state for delegations
  isModalOpen = false;

  // Form Fields for delegations
  selectedEmployeeId = signal<string>('');
  startDate = signal<string>('');
  endDate = signal<string>('');
  reason = signal<string>('');

  // Form errors for delegations
  formErrors = signal<{ employee?: string; dates?: string; reason?: string }>({});

  // Helper to determine status dynamically based on current local date (2026-05-30)
  private calculateStatus(startStr: string, endStr: string): 'Active' | 'Scheduled' | 'Expired' {
    const today = new Date('2026-05-30T12:00:00'); // Consistent with the current system metadata context
    const start = new Date(startStr + 'T00:00:00');
    const end = new Date(endStr + 'T23:59:59');

    if (today > end) {
      return 'Expired';
    } else if (today < start) {
      return 'Scheduled';
    } else {
      return 'Active';
    }
  }

  // Opens the delegation modal & resets fields
  openNewDelegationModal() {
    this.selectedEmployeeId.set('');
    this.startDate.set('');
    this.endDate.set('');
    this.reason.set('');
    this.formErrors.set({});
    this.isModalOpen = true;
  }

  // Closes the delegation modal
  closeModal() {
    this.isModalOpen = false;
  }

  // Validates and adds a new delegation
  submitDelegation() {
    const errors: { employee?: string; dates?: string; reason?: string } = {};

    if (!this.selectedEmployeeId()) {
      errors.employee = 'Please select a delegatee.';
    }

    if (!this.startDate() || !this.endDate()) {
      errors.dates = 'Please select both start and end dates.';
    } else if (new Date(this.startDate()) > new Date(this.endDate())) {
      errors.dates = 'Start date cannot be after end date.';
    }

    if (!this.reason().trim()) {
      errors.reason = 'Please provide a reason for the delegation.';
    }

    if (Object.keys(errors).length > 0) {
      this.formErrors.set(errors);
      return;
    }

    // Find the employee object
    const employee = this.employees.find(e => e.id === this.selectedEmployeeId());
    if (!employee) return;

    // Create delegation ID
    const newId = `DEL-${Math.floor(100 + Math.random() * 900)}`;

    const newDelegation: Delegation = {
      id: newId,
      delegatedTo: employee,
      startDate: this.startDate(),
      endDate: this.endDate(),
      status: this.calculateStatus(this.startDate(), this.endDate()),
      reason: this.reason().trim(),
      dateCreated: new Date('2026-05-30').toISOString().split('T')[0]
    };

    // Update delegations list signal
    this.delegations.update(current => [newDelegation, ...current]);

    // Close modal
    this.closeModal();
  }

  // Revoke/Delete delegation
  revokeDelegation(id: string) {
    this.delegations.update(current => current.filter(d => d.id !== id));
  }

  // Action methods for approval requests
  approveRequest(id: string) {
    const todayStr = new Date('2026-05-30').toISOString().split('T')[0];
    this.approvalRequests.update(current => 
      current.map(req => {
        if (req.id === id) {
          return {
            ...req,
            status: 'Approved' as const,
            timeline: [
              ...req.timeline,
              { status: 'Approved', date: todayStr, user: 'Approvals Manager' }
            ]
          };
        }
        return req;
      })
    );
    
    // Update selectedRequest if details drawer is open for this request
    const currentSelected = this.selectedRequest();
    if (currentSelected && currentSelected.id === id) {
      this.selectedRequest.set({
        ...currentSelected,
        status: 'Approved' as const,
        timeline: [
          ...currentSelected.timeline,
          { status: 'Approved', date: todayStr, user: 'Approvals Manager' }
        ]
      });
    }
  }

  rejectRequest(id: string, reason: string) {
    const todayStr = new Date('2026-05-30').toISOString().split('T')[0];
    this.approvalRequests.update(current => 
      current.map(req => {
        if (req.id === id) {
          return {
            ...req,
            status: 'Rejected' as const,
            rejectionReason: reason,
            timeline: [
              ...req.timeline,
              { status: 'Rejected', date: todayStr, user: 'Approvals Manager', reason }
            ]
          };
        }
        return req;
      })
    );
    
    // Update selectedRequest if details drawer is open for this request
    const currentSelected = this.selectedRequest();
    if (currentSelected && currentSelected.id === id) {
      this.selectedRequest.set({
        ...currentSelected,
        status: 'Rejected' as const,
        rejectionReason: reason,
        timeline: [
          ...currentSelected.timeline,
          { status: 'Rejected', date: todayStr, user: 'Approvals Manager', reason }
        ]
      });
    }
  }

  openRequestDetails(req: ApprovalRequest) {
    this.selectedRequest.set(req);
    this.rejectionReason.set('');
    this.rejectionError.set('');
    this.isRejecting.set(false);
    this.isDetailsDrawerOpen.set(true);
  }

  initiateReject() {
    this.isRejecting.set(true);
  }

  closeRequestDetails() {
    this.isDetailsDrawerOpen.set(false);
  }

  confirmRejection() {
    const reason = this.rejectionReason().trim();
    if (!reason) {
      this.rejectionError.set('Please enter a rejection reason.');
      return;
    }
    const current = this.selectedRequest();
    if (!current) return;
    this.rejectRequest(current.id, reason);
    this.closeRequestDetails();
  }
}
