import { DatePipe } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { ITask, TaskPriority, TaskStatus } from './core/models/task.model';
import { CreateTaskComponent } from './features/create-task/create-task.component';
import { ProrityBadgeComponent } from './shared/components/prority-badge/prority-badge.component';
import { StatusBadgeComponent } from './shared/components/status-badge/status-badge.component';
@Component({
  selector: 'app-root',
  imports: [
    MatTableModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    DatePipe,
    MatBadgeModule,
    MatIconModule,
    MatMenuModule,
    CreateTaskComponent,
    ProrityBadgeComponent,
    StatusBadgeComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private readonly toast = inject(ToastrService);
  private readonly STORAGE_KEY = 'tasks';

  title = 'task-manager';
  editMode = signal<boolean>(false);
  task = signal<ITask | null>(null);
  showFormOverlay = signal<boolean>(false);

  displayedColumns: string[] = [
    'id',
    'title',
    'description',
    'due_date',
    'priority',
    'status',
    'actions',
  ];

  taskLists = signal<ITask[]>([]);
  dataSource = computed(() => this.taskLists());

  selectedPriority = signal<TaskPriority | null>(null);
  selectedStatus = signal<TaskStatus | null>(null);

  TaskPriority = TaskPriority;
  TaskStatus = TaskStatus;

  filteredData = computed(() => {
    return this.dataSource().filter((task) => {
      const matchPriority = this.selectedPriority()
        ? task.priority === this.selectedPriority()
        : true;
      const matchStatus = this.selectedStatus()
        ? task.status === this.selectedStatus()
        : true;
      return matchPriority && matchStatus;
    });
  });

  ngOnInit(): void {
    const tasksList = localStorage.getItem(this.STORAGE_KEY);
    if (tasksList) {
      const parsedTaskList = JSON.parse(tasksList);
      this.taskLists.set(parsedTaskList);
    }
  }

  createTask(task: ITask) {
    if (this.editMode()) {
      this.editTask(task);
      return;
    }

    this.taskLists.update((tasks: ITask[]) => {
      task.id = tasks.length + 1;
      return [...tasks, task];
    });

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.taskLists()));
    this.toast.success('Task created successfully', 'Task Created');
  }

  editTask(updatedTask: ITask) {
    const { id } = updatedTask;

    const newData = this.dataSource().map((task: ITask) =>
      task.id === id ? updatedTask : task
    );

    this.taskLists.set(newData);
    this.editMode.update((edit) => !edit);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.taskLists()));
    this.toast.success('Task updated successfully', 'Task Updated');
  }

  editSelectedTask(row: ITask) {
    this.editMode.update((edit) => !edit);
    this.task.set(row);
  }

  deleteSelectedTask(id: number) {
    const shouldDelete = confirm('This action cannot be undone');

    if (shouldDelete) {
      const filtered = this.dataSource().filter(
        (task: ITask) => task.id !== id
      );

      const reIndexed = filtered.map((task, index) => ({
        ...task,
        id: index + 1,
      }));

      this.taskLists.set(reIndexed);

      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.taskLists()));
      this.toast.success('Task deleted successfully', 'Task Deleted');
    }
  }

  filterByPriority(ev: MatSelectChange) {
    this.selectedPriority.set(ev.value ?? null);
  }

  filterByStatus(ev: MatSelectChange) {
    this.selectedStatus.set(ev.value ?? null);
  }

  toggleFormOverlay() {
    this.showFormOverlay.update((val) => !val);
  }
}
