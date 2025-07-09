import {
  Component,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ToastrService } from 'ngx-toastr';
import { ITask, TaskPriority, TaskStatus } from '../../core/models/task.model';

@Component({
  selector: 'app-create-task',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
  ],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.scss',
})
export class CreateTaskComponent {
  private readonly toast = inject(ToastrService);
  task = input<ITask | null>(null);
  createUpdateTaskEvent = output<ITask>();

  today = signal<Date>(new Date());

  form = computed(
    () =>
      new FormGroup({
        id: new FormControl<number | null>(this.task()?.id ?? null),
        title: new FormControl<string>(
          this.task()?.title ?? '',
          Validators.required
        ),
        description: new FormControl<string>(
          this.task()?.description ?? '',
          Validators.required
        ),
        due_date: new FormControl<Date>(
          this.task()?.due_date ?? new Date(),
          Validators.required
        ),
        priority: new FormControl<TaskPriority | null>(
          this.task()?.priority ?? null,
          Validators.required
        ),
        status: new FormControl<TaskStatus | null>(
          this.task()?.status ?? null,
          Validators.required
        ),
      })
  );

  TaskPriority = TaskPriority;
  TaskStatus = TaskStatus;

  createTask() {
    if (this.form().invalid) return;

    this.createUpdateTaskEvent.emit(this.form().value as ITask);
    this.clearForm();
  }

  clearForm() {
    this.form().reset({
      id: null,
      title: null,
      description: null,
      due_date: new Date(),
      priority: null,
      status: null,
    });
  }
}
