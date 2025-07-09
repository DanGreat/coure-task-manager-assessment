export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export enum TaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in-progress',
  COMPLETED = 'completed',
}

export interface ITask {
  id: number;
  title: string;
  description: string;
  due_date: Date;
  priority: TaskPriority;
  status: TaskStatus;
}
