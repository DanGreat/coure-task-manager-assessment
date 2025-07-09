import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';
import { TaskStatus } from '../../../core/models/task.model';

@Component({
  selector: 'app-status-badge',
  imports: [NgClass],
  templateUrl: './status-badge.component.html',
  styleUrl: './status-badge.component.scss',
})
export class StatusBadgeComponent {
  label = input<string>('');
  type = input<TaskStatus>();

  TaskStatus = TaskStatus;
}
