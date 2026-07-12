import { Component, computed, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { SupabaseService } from '../supabase.service';

interface Assignee {
  name: string;
  initials: string;
  avatar?: string;
}

interface Owner {
  name: string;
  initials: string;
  avatar?: string;
}

interface TaskItem {
  id: string;
  title: string;
  description: string;
  type: 'tax' | 'message' | 'call' | 'dispute' | 'promise';
  priority: 'High' | 'Medium' | 'Low';
  status: 'In Progress' | 'Completed' | 'Not Started';
  linkedtask?: string;
  dayspassed?: number;
  promisedate?: string;
  chatcount?: number;
  haslink?: boolean;
  owner: Owner;
  assignees: Assignee[];
  customername?: string;
  customeremail?: string;
  createddate: string;
  createdby: string;
  duedate: string;
  dueoverdue?: boolean;
  invoicenumber: string;
}

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './tasks.component.html',
})
export class TasksComponent implements OnInit {
  // Tabs List
  tabs = [
    { name: 'Overview', count: null },
    { name: 'My Tasks', count: 10 },
    { name: 'In Progress', count: 30 },
    { name: 'Overdue', count: 15 },
    { name: 'Cadence Queue', count: 50 },
    { name: 'Upcoming', count: 20 },
    { name: 'Completed', count: 50 }
  ];

  // Component State Signals
  activeTab = signal<string>('My Tasks');
  searchQuery = signal<string>('');
  currentPage = signal<number>(1);
  itemsPerPage = 5;

  showAddModal = signal<boolean>(false);
  newTask = {
    title: '',
    description: '',
    type: 'tax' as 'tax' | 'message' | 'call' | 'dispute' | 'promise',
    priority: 'Medium' as 'High' | 'Medium' | 'Low'
  };

  // Active task's actions dropdown menu
  activeDropdown = signal<string | null>(null);
  activeStatusDropdown = signal<string | null>(null);

  constructor(private supabase: SupabaseService) {}

  async ngOnInit() {
    await this.loadTasks();
  }

  async loadTasks() {
    const { data, error } = await this.supabase.client
      .from('tasks')
      .select('*');
    
    if (error) {
      console.error('Error fetching tasks', error);
    } else if (data) {
      this.tasks.set(data as TaskItem[]);
    }
  }

  // Tasks Data Set
  tasks = signal<TaskItem[]>([]);



  // Reactive Computed Values
  filteredTasks = computed(() => {
    let list = this.tasks();
    const query = this.searchQuery().toLowerCase().trim();
    const tab = this.activeTab();

    // 1. Filter by Tab
    if (tab === 'My Tasks') {
      list = list.filter(t => t.owner.name === 'Sikandar Hayat' || t.assignees.some(a => a.name === 'Sikandar Hayat'));
    } else if (tab === 'In Progress') {
      list = list.filter(t => t.status === 'In Progress');
    } else if (tab === 'Overdue') {
      list = list.filter(t => t.dueoverdue || (t.dayspassed && t.dayspassed > 0));
    } else if (tab === 'Cadence Queue') {
      list = list.filter(t => t.type === 'tax' || t.type === 'dispute');
    } else if (tab === 'Upcoming') {
      list = list.filter(t => t.status === 'Not Started' || t.status === 'In Progress');
    } else if (tab === 'Completed') {
      list = list.filter(t => t.status === 'Completed');
    }

    // 2. Filter by Search Query
    if (query) {
      list = list.filter(t => 
        t.title.toLowerCase().includes(query) ||
        t.description.toLowerCase().includes(query) ||
        t.invoicenumber.toLowerCase().includes(query) ||
        (t.customername && t.customername.toLowerCase().includes(query)) ||
        (t.customeremail && t.customeremail.toLowerCase().includes(query))
      );
    }

    return list;
  });

  paginatedTasks = computed(() => {
    const list = this.filteredTasks();
    const start = (this.currentPage() - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return list.slice(start, end);
  });

  totalPages = computed(() => {
    const count = this.filteredTasks().length;
    return Math.max(1, Math.ceil(count / this.itemsPerPage));
  });

  pagesArray = computed(() => {
    const total = this.totalPages();
    const arr = [];
    for (let i = 1; i <= total; i++) {
      arr.push(i);
    }
    return arr;
  });

  showingStart = computed(() => {
    const count = this.filteredTasks().length;
    if (count === 0) return 0;
    return (this.currentPage() - 1) * this.itemsPerPage + 1;
  });

  showingEnd = computed(() => {
    return Math.min(this.currentPage() * this.itemsPerPage, this.filteredTasks().length);
  });

  // State Management Actions
  selectTab(tabName: string) {
    this.activeTab.set(tabName);
    this.currentPage.set(1);
    this.closeDropdowns();
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
    this.closeDropdowns();
  }

  clearFilters() {
    this.searchQuery.set('');
    this.activeTab.set('Overview');
    this.currentPage.set(1);
    this.closeDropdowns();
  }

  toggleDropdown(taskId: string, event: Event) {
    event.stopPropagation();
    if (this.activeDropdown() === taskId) {
      this.activeDropdown.set(null);
    } else {
      this.activeDropdown.set(taskId);
      this.activeStatusDropdown.set(null);
    }
  }

  toggleStatusDropdown(taskId: string, event: Event) {
    event.stopPropagation();
    if (this.activeStatusDropdown() === taskId) {
      this.activeStatusDropdown.set(null);
    } else {
      this.activeStatusDropdown.set(taskId);
      this.activeDropdown.set(null);
    }
  }

  closeDropdowns() {
    this.activeDropdown.set(null);
    this.activeStatusDropdown.set(null);
  }

  async updateTaskStatus(taskId: string, newStatus: 'In Progress' | 'Completed' | 'Not Started', event?: Event) {
    if (event) event.stopPropagation();
    
    // Optimistic update locally
    this.tasks.update(allTasks => {
      return allTasks.map(t => {
        if (t.id === taskId) {
          return { ...t, status: newStatus };
        }
        return t;
      });
    });
    this.closeDropdowns();

    // Persist to Supabase
    const { error } = await this.supabase.client
      .from('tasks')
      .update({ status: newStatus })
      .eq('id', taskId);
      
    if (error) {
      console.error('Error updating task status', error);
      // Ideally revert the optimistic update here on failure
    }
  }

  addTask() {
    this.showAddModal.set(true);
  }

  closeAddModal() {
    this.showAddModal.set(false);
    this.newTask = { title: '', description: '', type: 'tax', priority: 'Medium' };
  }

  async submitNewTask() {
    if (!this.newTask.title.trim()) return;

    const newId = 'task-' + Math.floor(Math.random() * 1000000);
    const currentDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    
    const taskRecord = {
      id: newId,
      title: this.newTask.title,
      description: this.newTask.description,
      type: this.newTask.type,
      priority: this.newTask.priority,
      status: 'Not Started',
      createddate: currentDate,
      createdby: 'Current User',
      duedate: currentDate,
      invoicenumber: 'N/A',
      owner: { name: 'Current User', initials: 'CU' },
      assignees: []
    };

    const { data, error } = await this.supabase.client
      .from('tasks')
      .insert([taskRecord])
      .select();

    if (error) {
      console.error('Error creating task', error);
      alert('Failed to create task.');
    } else if (data) {
      // Add to local state
      this.tasks.update(tasks => [data[0] as TaskItem, ...tasks]);
      this.closeAddModal();
    }
  }

  openFilterSettings() {
    alert('Filter options settings panel clicked!');
  }

  onCardAction(actionName: string, task: TaskItem, event: Event) {
    event.stopPropagation();
    alert(`Action "${actionName}" triggered on task: ${task.title}`);
    this.closeDropdowns();
  }
}
