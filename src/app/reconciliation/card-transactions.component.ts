import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { FormsModule } from '@angular/forms';

interface ActionItem {
  count: string;
  label: string;
  icon?: string;
}

interface PaymentMethod {
  brand: string;
  logoText: string;
  amount: string;
  paymentsText: string;
  percentage: number;
  barColor: string;
}

interface RefundItem {
  month: string;
  cad: number;
  usd: number;
  gbp: number;
}

interface DepositItem {
  month: string;
  cad: number;
  usd: number;
  gbp: number;
}

interface BillingItem {
  month: string;
  cad: number;
  usd: number;
}

@Component({
  selector: 'app-card-transactions',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, FormsModule],
  templateUrl: './card-transactions.component.html'
})
export class CardTransactionsComponent implements OnInit {
  activeTab = 'Summary';
  selectedPeriod = 'Last 3 months';
  selectedCurrency = 'USD';
  selectedBrandFilter = 'All';

  // Sub-tabs navigation
  tabs = [
    { name: 'Summary', count: '' },
    { name: 'Transactions', count: '5 Payments' },
    { name: 'Deposits', count: '10 Payments' },
    { name: 'Billing', count: '' },
    { name: 'Chargebacks', count: '' }
  ];

  // Requires Action list
  actionItems: ActionItem[] = [
    { count: '03', label: 'with Amount Mismatch' },
    { count: '05', label: 'from Unknown customer', icon: 'user' },
    { count: '03', label: 'with Data Error', icon: 'database' }
  ];

  // Payment Methods
  paymentMethods: PaymentMethod[] = [
    { brand: 'Mastercard', logoText: 'MC', amount: '69,834 USD', paymentsText: '3 Payments', percentage: 90, barColor: 'bg-blue-600' },
    { brand: 'Visa', logoText: 'VISA', amount: '5,834 USD', paymentsText: '3 Payments', percentage: 20, barColor: 'bg-blue-500' },
    { brand: 'Amex', logoText: 'AMEX', amount: '48,834 USD', paymentsText: '5 Payments', percentage: 70, barColor: 'bg-blue-400' },
    { brand: 'Discover', logoText: 'DISC', amount: '67,592 CAD', paymentsText: '14 Payments', percentage: 88, barColor: 'bg-teal-500' },
    { brand: 'Visa CAD', logoText: 'VISA', amount: '47,592 CAD', paymentsText: '8 Payments', percentage: 65, barColor: 'bg-teal-400' },
    { brand: 'UnionPay', logoText: 'UP', amount: '38,743 CAD', paymentsText: '5 Payments', percentage: 50, barColor: 'bg-teal-300' }
  ];

  // Refunds Overview Monthly data
  refunds: RefundItem[] = [
    { month: 'Jan', cad: 35, usd: 50, gbp: 25 },
    { month: 'Feb', cad: 45, usd: 38, gbp: 18 },
    { month: 'Mar', cad: 52, usd: 42, gbp: 30 },
    { month: 'Apr', cad: 70, usd: 58, gbp: 45 },
    { month: 'May', cad: 40, usd: 35, gbp: 28 },
    { month: 'Jun', cad: 65, usd: 48, gbp: 32 },
    { month: 'Jul', cad: 58, usd: 40, gbp: 24 },
    { month: 'Aug', cad: 48, usd: 38, gbp: 22 },
    { month: 'Sep', cad: 72, usd: 52, gbp: 35 },
    { month: 'Oct', cad: 85, usd: 62, gbp: 48 },
    { month: 'Nov', cad: 55, usd: 42, gbp: 30 },
    { month: 'Dec', cad: 90, usd: 75, gbp: 55 }
  ];

  // Deposits Monthly data
  deposits: DepositItem[] = [
    { month: 'Jan', cad: 65, usd: 70, gbp: 30 },
    { month: 'Feb', cad: 58, usd: 62, gbp: 25 },
    { month: 'Mar', cad: 72, usd: 75, gbp: 35 },
    { month: 'Apr', cad: 80, usd: 85, gbp: 42 },
    { month: 'May', cad: 60, usd: 65, gbp: 28 },
    { month: 'Jun', cad: 75, usd: 78, gbp: 36 }
  ];

  // Billing Amount Monthly data
  billingAmounts: BillingItem[] = [
    { month: 'Jan', cad: 48, usd: 35 },
    { month: 'Feb', cad: 40, usd: 32 },
    { month: 'Mar', cad: 55, usd: 42 },
    { month: 'Apr', cad: 70, usd: 58 },
    { month: 'May', cad: 35, usd: 28 },
    { month: 'Jun', cad: 62, usd: 48 }
  ];

  ngOnInit() {
    // Initialized
  }

  setActiveTab(tabName: string) {
    this.activeTab = tabName;
  }

  triggerReview(label: string) {
    alert(`Launching reconciliation review panel for action item: "${label}"`);
  }

  customizeView() {
    alert('Customizing view preferences for Card Transactions Dashboard');
  }
}
