export type TaskStatus = 'todo' | 'in-progress' | 'done';

export interface Task {
  id: string;
  title: string;
  description: string;
  date: string;      // "YYYY-MM-DD"
  time: string;      // "HH:MM" or "" for all-day
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ModalOpenPayload {
  mode: 'create' | 'edit';
  task?: Task;
  defaultDate?: string;
}

export const STATUS_COLORS: Record<TaskStatus, string> = {
  'todo': '#3b82f6',
  'in-progress': '#f59e0b',
  'done': '#10b981',
};

export const STATUS_LABELS: Record<TaskStatus, string> = {
  'todo': 'To Do',
  'in-progress': 'In Progress',
  'done': 'Done',
};

export const STATUS_BG: Record<TaskStatus, string> = {
  'todo': 'bg-blue-100 text-blue-700',
  'in-progress': 'bg-amber-100 text-amber-700',
  'done': 'bg-emerald-100 text-emerald-700',
};
