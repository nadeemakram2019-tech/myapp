import { TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { provideLucideIcons } from '../lucide-icons';
import { ApprovalDelegationsComponent } from './approval-delegations.component';

describe('ApprovalDelegationsComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApprovalDelegationsComponent],
      providers: [
        provideNoopAnimations(),
        providePrimeNG({
          theme: {
            preset: Aura
          }
        }),
        provideLucideIcons()
      ]
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(ApprovalDelegationsComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should switch activeTab correctly', () => {
    const fixture = TestBed.createComponent(ApprovalDelegationsComponent);
    const component = fixture.componentInstance;
    
    // Default activeTab should be 'requests'
    expect(component.activeTab()).toBe('requests');

    // Switch to delegations
    component.activeTab.set('delegations');
    expect(component.activeTab()).toBe('delegations');

    // Switch back to requests
    component.activeTab.set('requests');
    expect(component.activeTab()).toBe('requests');
  });

  it('should approve a request and update the status and timeline', () => {
    const fixture = TestBed.createComponent(ApprovalDelegationsComponent);
    const component = fixture.componentInstance;

    // Find a pending request
    const pendingReq = component.approvalRequests().find(r => r.status === 'Pending');
    expect(pendingReq).toBeTruthy();
    const id = pendingReq!.id;

    // Approve the request
    component.approveRequest(id);

    // Verify status has updated to Approved
    const updatedReq = component.approvalRequests().find(r => r.id === id);
    expect(updatedReq!.status).toBe('Approved');
    
    // Check timeline has Approved event
    const lastTimelineEvent = updatedReq!.timeline[updatedReq!.timeline.length - 1];
    expect(lastTimelineEvent.status).toBe('Approved');
    expect(lastTimelineEvent.user).toBe('Approvals Manager');
  });

  it('should reject a request with reason and update status, reason, and timeline', () => {
    const fixture = TestBed.createComponent(ApprovalDelegationsComponent);
    const component = fixture.componentInstance;

    // Find a pending request
    const pendingReq = component.approvalRequests().find(r => r.status === 'Pending');
    expect(pendingReq).toBeTruthy();
    const id = pendingReq!.id;
    const reason = 'Invalid billing department code.';

    // Reject the request
    component.rejectRequest(id, reason);

    // Verify status has updated to Rejected and reason is stored
    const updatedReq = component.approvalRequests().find(r => r.id === id);
    expect(updatedReq!.status).toBe('Rejected');
    expect(updatedReq!.rejectionReason).toBe(reason);

    // Check timeline has Rejected event
    const lastTimelineEvent = updatedReq!.timeline[updatedReq!.timeline.length - 1];
    expect(lastTimelineEvent.status).toBe('Rejected');
    expect(lastTimelineEvent.reason).toBe(reason);
  });

  it('should validate new delegation form fields', () => {
    const fixture = TestBed.createComponent(ApprovalDelegationsComponent);
    const component = fixture.componentInstance;

    // Open modal to reset fields
    component.openNewDelegationModal();
    expect(component.isModalOpen).toBe(true);

    // 1. Submit empty form - expect errors
    component.submitDelegation();
    expect(component.formErrors().employee).toBe('Please select a delegatee.');
    expect(component.formErrors().dates).toBe('Please select both start and end dates.');
    expect(component.formErrors().reason).toBe('Please provide a reason for the delegation.');
    
    // 2. Submit with employee and reason but invalid dates (start after end)
    component.selectedEmployeeId.set('emp-1');
    component.reason.set('Vacation coverage');
    component.startDate.set('2026-06-15');
    component.endDate.set('2026-06-10');
    component.formErrors.set({});

    component.submitDelegation();
    expect(component.formErrors().employee).toBeFalsy();
    expect(component.formErrors().reason).toBeFalsy();
    expect(component.formErrors().dates).toBe('Start date cannot be after end date.');

    // 3. Submit valid form
    component.startDate.set('2026-06-01');
    component.endDate.set('2026-06-10');
    component.formErrors.set({});

    const initialLength = component.delegations().length;
    component.submitDelegation();
    
    // Form should submit successfully, closing the modal and adding delegation
    expect(component.formErrors().dates).toBeFalsy();
    expect(component.isModalOpen).toBe(false);
    expect(component.delegations().length).toBe(initialLength + 1);
    
    const newDel = component.delegations()[0];
    expect(newDel.delegatedTo.id).toBe('emp-1');
    expect(newDel.startDate).toBe('2026-06-01');
    expect(newDel.endDate).toBe('2026-06-10');
    expect(newDel.reason).toBe('Vacation coverage');
  });
});
