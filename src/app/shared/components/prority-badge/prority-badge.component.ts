import { Component, input } from '@angular/core';
import { TaskPriority } from '../../../core/models/task.model';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-prority-badge',
  imports: [NgClass],
  templateUrl: './prority-badge.component.html',
  styleUrl: './prority-badge.component.scss',
})
export class ProrityBadgeComponent {
  label = input<string>('');
  type = input<TaskPriority>();

  TaskPrority = TaskPriority;
}
