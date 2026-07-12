import { TestBed } from '@angular/core/testing';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { provideLucideIcons } from '../lucide-icons';
import { TasksComponent } from './tasks.component';

describe('TasksComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasksComponent],
      providers: [
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
    const fixture = TestBed.createComponent(TasksComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should render the page header', () => {
    const fixture = TestBed.createComponent(TasksComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Tasks');
  });

  it('should render the tasks table with headers', () => {
    const fixture = TestBed.createComponent(TasksComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const headers = compiled.querySelectorAll('th');
    expect(headers.length).toBe(5);
    expect(headers[0]?.textContent?.trim()).toBe('Task Name');
    expect(headers[1]?.textContent?.trim()).toBe('Assigned To');
    expect(headers[2]?.textContent?.trim()).toBe('Due Date');
    expect(headers[3]?.textContent?.trim()).toBe('Status');
    expect(headers[4]?.textContent?.trim()).toBe('Actions');
  });

  it('should render two example task rows', () => {
    const fixture = TestBed.createComponent(TasksComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const rows = compiled.querySelectorAll('tbody tr');
    expect(rows.length).toBe(2);
  });

  it('should render search input and filter buttons', () => {
    const fixture = TestBed.createComponent(TasksComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('input[placeholder="Search tasks..."]')).toBeTruthy();
    const filterButtons = compiled.querySelectorAll('button');
    const hasAllTasks = Array.from(filterButtons).some(b => b.textContent?.trim() === 'All Tasks');
    const hasPending = Array.from(filterButtons).some(b => b.textContent?.trim() === 'Pending');
    const hasCompleted = Array.from(filterButtons).some(b => b.textContent?.trim() === 'Completed');
    expect(hasAllTasks).toBe(true);
    expect(hasPending).toBe(true);
    expect(hasCompleted).toBe(true);
  });
});
