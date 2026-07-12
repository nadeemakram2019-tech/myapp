import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';

interface PaymentLink {
  name: string;
  packageName?: string;
  createdDate: string;
  expiryDate: string;
  totalAmount: string;
  totalSubtext?: string;
  checkouts: number;
  status: 'Active' | 'Draft' | '';
}

@Component({
  selector: 'app-payment-links',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './payment-links.component.html'
})
export class PaymentLinksComponent {
  tabs = ['All', 'Active', 'Draft'];
  activeTab = 'All';
  searchQuery = '';
  showLimit = 10;
  copiedIndex: number | null = null;

  isModalOpen = false;
  modalStep = 1;

  openModal(): void {
    this.isModalOpen = true;
    this.modalStep = 1;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  nextStep(): void {
    if (this.modalStep < 3) {
      this.modalStep++;
    }
  }

  prevStep(): void {
    if (this.modalStep > 1) {
      this.modalStep--;
    }
  }

  goToStep(step: number): void {
    if (step >= 1 && step <= 3) {
      this.modalStep = step;
    }
  }

  paymentLinks: PaymentLink[] = [
    {
      name: 'Package 01',
      createdDate: 'Jan 01, 2024',
      expiryDate: 'Jan 31, 2025',
      totalAmount: '2 Payments',
      checkouts: 0,
      status: 'Active'
    },
    {
      name: 'Package 02',
      packageName: 'Liberty home furnishing',
      createdDate: 'Jan 01, 2024',
      expiryDate: 'Jan 31, 2025',
      totalAmount: '$19.97 USD',
      totalSubtext: 'Then $19.97 USD for 2 payments.',
      checkouts: 0,
      status: ''
    },
    {
      name: 'Package 03',
      packageName: 'Liberty home furnishing',
      createdDate: 'Jan 01, 2024',
      expiryDate: 'Jan 31, 2025',
      totalAmount: '$19.97 USD',
      totalSubtext: 'Then $19.97 USD for 2 payments.',
      checkouts: 0,
      status: 'Active'
    },
    {
      name: 'Package 04',
      createdDate: 'Jan 01, 2024',
      expiryDate: 'Jan 31, 2025',
      totalAmount: '$19.97 USD',
      totalSubtext: 'Then $19.97 USD for 2 payments.',
      checkouts: 0,
      status: 'Active'
    },
    {
      name: 'Package 05',
      packageName: 'Liberty home furnishing',
      createdDate: 'Jan 01, 2024',
      expiryDate: 'Jan 31, 2025',
      totalAmount: '$19.97 USD',
      totalSubtext: 'Then $19.97 USD for 2 payments.',
      checkouts: 0,
      status: 'Active'
    },
    {
      name: 'Package 06',
      packageName: 'Liberty home furnishing',
      createdDate: 'Jan 01, 2024',
      expiryDate: 'Jan 31, 2025',
      totalAmount: '$19.97 USD',
      totalSubtext: 'Then $19.97 USD for 2 payments.',
      checkouts: 0,
      status: 'Active'
    },
    {
      name: 'Package 07',
      packageName: 'Liberty home furnishing',
      createdDate: 'Jan 01, 2024',
      expiryDate: 'Jan 31, 2025',
      totalAmount: '$19.97 USD',
      totalSubtext: 'Then $19.97 USD for 2 payments.',
      checkouts: 0,
      status: 'Active'
    },
    {
      name: 'Package 08',
      createdDate: 'Jan 01, 2024',
      expiryDate: 'Jan 31, 2025',
      totalAmount: '$19.97 USD',
      totalSubtext: 'Then $19.97 USD for 2 payments.',
      checkouts: 0,
      status: 'Active'
    },
    {
      name: 'Package 09',
      packageName: 'Liberty home furnishing',
      createdDate: 'Jan 01, 2024',
      expiryDate: 'Jan 31, 2025',
      totalAmount: '$19.97 USD',
      totalSubtext: 'Then $19.97 USD for 2 payments.',
      checkouts: 0,
      status: 'Active'
    },
    {
      name: 'Package 10',
      createdDate: 'Jan 01, 2024',
      expiryDate: 'Jan 31, 2025',
      totalAmount: '$19.97 USD',
      totalSubtext: 'Then $19.97 USD for 2 payments.',
      checkouts: 0,
      status: 'Active'
    }
  ];

  get filteredPaymentLinks(): PaymentLink[] {
    return this.paymentLinks.filter(link => {
      // Tab filter
      if (this.activeTab === 'Active' && link.status !== 'Active') {
        return false;
      }
      if (this.activeTab === 'Draft' && link.status !== 'Draft') {
        return false;
      }

      // Search filter
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        const matchesName = link.name.toLowerCase().includes(query);
        const matchesPackage = link.packageName?.toLowerCase().includes(query) || false;
        return matchesName || matchesPackage;
      }

      return true;
    });
  }

  clearFilter(): void {
    this.searchQuery = '';
    this.activeTab = 'All';
  }

  copyLink(index: number): void {
    const linkUrl = `https://paysetra.ai/pay/link-${index + 1}`;
    navigator.clipboard.writeText(linkUrl).then(() => {
      this.copiedIndex = index;
      setTimeout(() => {
        this.copiedIndex = null;
      }, 2000);
    });
  }
}
