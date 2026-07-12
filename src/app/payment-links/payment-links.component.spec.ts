import { TestBed } from '@angular/core/testing';
import { PaymentLinksComponent } from './payment-links.component';
import { provideLucideIcons } from '../lucide-icons';

describe('PaymentLinksComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentLinksComponent],
      providers: [provideLucideIcons()]
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(PaymentLinksComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should filter payment links by active status when active tab is selected', () => {
    const fixture = TestBed.createComponent(PaymentLinksComponent);
    const component = fixture.componentInstance;
    component.activeTab = 'Active';
    fixture.detectChanges();
    
    const filtered = component.filteredPaymentLinks;
    expect(filtered.every(link => link.status === 'Active')).toBe(true);
  });

  it('should filter payment links by search query', () => {
    const fixture = TestBed.createComponent(PaymentLinksComponent);
    const component = fixture.componentInstance;
    component.searchQuery = 'Package 01';
    fixture.detectChanges();

    const filtered = component.filteredPaymentLinks;
    expect(filtered.length).toBe(1);
    expect(filtered[0].name).toBe('Package 01');
  });
});
