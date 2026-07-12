import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';

export interface LineItem {
  description: string;
  qty: number;
  price: number;
  total: number;
}

export interface MockDocument {
  id: string;
  fileName: string;
  vendorName: string;
  taxId: string;
  address: string;
  invoiceDate: string;
  dueDate: string;
  invoiceNumber: string;
  amount: number;
  currency: string;
  taxAmount: number;
  subtotal: number;
  extractionStatus: 'Succeeded' | 'Processing' | 'Needs Review' | 'Failed' | 'Duplicate';
  confidenceScore: number;
  lineItems: LineItem[];
}

@Component({
  selector: 'app-intelli-capture',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LucideAngularModule,
    ButtonModule,
    DrawerModule
  ],
  templateUrl: './intelli-capture.component.html',
  styles: [`
    .responsive-queue-table {
      width: 100%;
    }

    @media (max-width: 767px) {
      .responsive-queue-table thead {
        position: absolute;
        width: 1px;
        height: 1px;
        margin: -1px;
        padding: 0;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
      }

      .responsive-queue-table tbody,
      .responsive-queue-table tr,
      .responsive-queue-table td {
        display: block;
      }

      .responsive-queue-table tbody {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
      }

      .responsive-queue-table tr {
        padding: 1rem;
        border: 1px solid var(--border);
        border-radius: 0.75rem;
        background: var(--card);
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05);
        transition: all 0.2s ease;
      }

      .responsive-queue-table tr:hover {
        border-color: var(--accent);
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.05);
        transform: translateY(-1px);
      }

      .responsive-queue-table td {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.625rem 0;
        border: none !important;
        gap: 0.75rem;
      }

      .responsive-queue-table td:not(:last-child) {
        border-bottom: 1px solid var(--border) !important;
        margin-bottom: 0.25rem;
      }

      .responsive-queue-table td::before {
        content: attr(data-label);
        font-size: 0.6875rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: #71717a;
        flex-shrink: 0;
      }

      .responsive-queue-table td[data-label=""]::before {
        content: none;
      }

      .responsive-queue-table td[data-label="Amount"] span {
        font-size: 1rem;
      }
    }
  `]
})
export class IntelliCaptureComponent implements OnInit {
  currentView: 'inbox' | 'settings' = 'inbox';
  
  // Settings mock fields
  uploadEmailUser: string = 'hayatenterprises';
  memoFieldDefault: string = 'Select';
  duplicateDetectionRule: string = 'Select';

  documents: MockDocument[] = [
    {
      id: 'DOC-8012',
      fileName: 'hayat_invoice.pdf',
      vendorName: 'Hayat Enterprises',
      taxId: 'US-90812903',
      address: 'street 1, street 2, Broken Hill, Alberta, Canada',
      invoiceDate: '2023-07-01',
      dueDate: '2023-08-10',
      invoiceNumber: 'INV-345435',
      amount: 245.00,
      currency: 'CAD',
      taxAmount: 0.00,
      subtotal: 245.00,
      extractionStatus: 'Succeeded',
      confidenceScore: 95.0,
      lineItems: [
        { description: 'Consulting services', qty: 1, price: 245.00, total: 245.00 }
      ]
    },
    {
      id: 'DOC-8013',
      fileName: 'mt3_foundation.pdf',
      vendorName: 'MT3 Foundation',
      taxId: 'US-88291023',
      address: '55 Main Street, Calgary, Alberta, Canada',
      invoiceDate: '2023-07-29',
      dueDate: '2023-08-25',
      invoiceNumber: 'INV-MT3-882',
      amount: 32000.00,
      currency: 'USD',
      taxAmount: 2000.00,
      subtotal: 30000.00,
      extractionStatus: 'Processing',
      confidenceScore: 88.5,
      lineItems: [
        { description: 'Foundation grant support', qty: 1, price: 30000.00, total: 30000.00 }
      ]
    },
    {
      id: 'DOC-8014',
      fileName: 'malik_invoice.pdf',
      vendorName: 'Malik Enterprises',
      taxId: 'US-38290123',
      address: '99 Broad St, Vancouver, BC, Canada',
      invoiceDate: '2023-07-29',
      dueDate: '2023-08-31',
      invoiceNumber: 'INV-MALIK-101',
      amount: 145.00,
      currency: 'USD',
      taxAmount: 15.00,
      subtotal: 130.00,
      extractionStatus: 'Needs Review',
      confidenceScore: 72.1,
      lineItems: [
        { description: 'Office supplies', qty: 1, price: 130.00, total: 130.00 }
      ]
    },
    {
      id: 'DOC-8015',
      fileName: 'picasso_ltd.pdf',
      vendorName: 'Picasso LTD',
      taxId: 'US-77382910',
      address: '88 Art Lane, Toronto, ON, Canada',
      invoiceDate: '2023-07-29',
      dueDate: '2023-08-25',
      invoiceNumber: 'INV-PIC-909',
      amount: 876.00,
      currency: 'USD',
      taxAmount: 76.00,
      subtotal: 800.00,
      extractionStatus: 'Failed',
      confidenceScore: 45.3,
      lineItems: [
        { description: 'Creative design service', qty: 1, price: 800.00, total: 800.00 }
      ]
    },
    {
      id: 'DOC-8016',
      fileName: 'lucky_mall.pdf',
      vendorName: 'Lucky One Mall',
      taxId: 'US-66289102',
      address: 'Shop 20, Mall Road, Ottawa, ON, Canada',
      invoiceDate: '2023-07-29',
      dueDate: '2023-08-25',
      invoiceNumber: 'INV-LUCKY-202',
      amount: 695.00,
      currency: 'USD',
      taxAmount: 0.00,
      subtotal: 695.00,
      extractionStatus: 'Duplicate',
      confidenceScore: 91.0,
      lineItems: [
        { description: 'Facility rental fee', qty: 1, price: 695.00, total: 695.00 }
      ]
    },
    {
      id: 'DOC-8017',
      fileName: 'cyber_games.pdf',
      vendorName: 'Cyber Games Karachi',
      taxId: 'PK-9920193',
      address: 'Block 4, Clifton, Karachi, Pakistan',
      invoiceDate: '2023-07-29',
      dueDate: '2023-08-25',
      invoiceNumber: 'INV-CYB-001',
      amount: 245.00,
      currency: 'USD',
      taxAmount: 0.00,
      subtotal: 245.00,
      extractionStatus: 'Succeeded',
      confidenceScore: 97.4,
      lineItems: [
        { description: 'Game testing services', qty: 1, price: 245.00, total: 245.00 }
      ]
    }
  ];

  selectedDocument: MockDocument | null = null;
  isVerifyDrawerOpen = false;
  isUploading = false;
  uploadSuccessMessage = '';

  // New UI State
  activeTab: 'Bills' | 'Receipts' | 'Archived' = 'Bills';
  searchQuery: string = '';
  statusFilter: string = 'All Status';
  statuses: string[] = ['All Status', 'Succeeded', 'Processing', 'Needs Review', 'Failed', 'Duplicate'];

  ngOnInit() {
    if (this.documents.length > 0) {
      this.selectedDocument = this.documents[0];
    }
  }

  get filteredDocuments() {
    return this.documents.filter(doc => {
      const matchesSearch = doc.fileName.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
                            doc.vendorName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                            doc.id.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesStatus = this.statusFilter === 'All Status' || doc.extractionStatus === this.statusFilter;
      // For simulation, all belong to 'Bills'
      return matchesSearch && matchesStatus;
    });
  }

  get tabCounts() {
    return {
      Bills: this.documents.length,
      Receipts: 0,
      Archived: 0
    };
  }

  selectDocument(doc: MockDocument) {
    this.selectedDocument = { ...doc };
  }

  openVerifyDrawer(doc: MockDocument) {
    this.selectedDocument = { ...doc };
    this.isVerifyDrawerOpen = true;
  }

  closeVerifyDrawer() {
    this.isVerifyDrawerOpen = false;
  }

  onLineItemChange(item: LineItem) {
    item.total = Number((item.qty * item.price).toFixed(2));
    this.recalculateTotals();
  }

  recalculateTotals() {
    if (!this.selectedDocument) return;
    const subtotal = this.selectedDocument.lineItems.reduce((acc, item) => acc + item.total, 0);
    this.selectedDocument.subtotal = Number(subtotal.toFixed(2));
    this.selectedDocument.amount = Number((this.selectedDocument.subtotal + this.selectedDocument.taxAmount).toFixed(2));
  }

  onTaxAmountChange() {
    if (!this.selectedDocument) return;
    this.selectedDocument.amount = Number((this.selectedDocument.subtotal + this.selectedDocument.taxAmount).toFixed(2));
  }

  approveDocument() {
    if (!this.selectedDocument) return;
    const index = this.documents.findIndex(d => d.id === this.selectedDocument?.id);
    if (index !== -1) {
      this.documents[index] = {
        ...this.selectedDocument,
        extractionStatus: 'Succeeded',
        confidenceScore: 100
      };
    }
    this.isVerifyDrawerOpen = false;
  }

  rejectDocument() {
    if (!this.selectedDocument) return;
    const index = this.documents.findIndex(d => d.id === this.selectedDocument?.id);
    if (index !== -1) {
      this.documents[index] = {
        ...this.selectedDocument,
        extractionStatus: 'Failed'
      };
    }
    this.isVerifyDrawerOpen = false;
  }

  simulateUpload(event: Event) {
    event.preventDefault();
    this.isUploading = true;
    setTimeout(() => {
      const newDoc: MockDocument = {
        id: `DOC-${Math.floor(1000 + Math.random() * 9000)}`,
        fileName: 'google_workspace_bill.pdf',
        vendorName: 'Google Workspace',
        taxId: 'US-999888777',
        address: '1600 Amphitheatre Pkwy, Mountain View, CA 94043',
        invoiceDate: '2026-05-28',
        dueDate: '2026-06-28',
        invoiceNumber: 'GWS-88329-B',
        amount: 120.00,
        currency: 'USD',
        taxAmount: 10.00,
        subtotal: 110.00,
        extractionStatus: 'Processing',
        confidenceScore: 89.4,
        lineItems: [
          { description: 'Google Workspace Enterprise Starter Seats', qty: 10, price: 11.00, total: 110.00 }
        ]
      };
      this.documents.unshift(newDoc);
      this.selectedDocument = { ...newDoc };
      this.isUploading = false;
      this.uploadSuccessMessage = 'Document uploaded successfully!';
      setTimeout(() => {
        this.uploadSuccessMessage = '';
      }, 3000);
    }, 1500);
  }
}
